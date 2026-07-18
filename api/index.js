const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_psicocartillas_123';

const app = express();
app.use(helmet());
app.use(cors({ origin: 'https://stellar-vision-production.up.railway.app' }));
app.use(express.json());

// Middlewares
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1] || authHeader;
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Require Admin Role' });
  }
  next();
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API MySQL is running' });
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Límite de 10 peticiones por ventana por IP
  message: { error: 'Demasiados intentos desde esta IP, por favor intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Autenticación - Registro
app.post('/api/auth/register', 
  authLimiter, 
  [
    body('nombre').trim().isLength({ min: 2, max: 50 }).escape(),
    body('correo').isEmail().normalizeEmail(),
    body('telefono').trim().isLength({ min: 7, max: 15 }).escape()
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Los datos proporcionados son inválidos o contienen caracteres no permitidos.' });
    }

    const { nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta, codigoAdmin } = req.body;
    
    if (!nombre || !correo || !password || !telefono || !fecha_nacimiento) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser llenados' });
    }

  // Validación de seguridad de contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número.' });
  }

  try {
    const [existing] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const motivo = motivo_consulta || 'No especificado';
    
    const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || '2409@';
    const assignedRole = codigoAdmin === ADMIN_SECRET ? 'admin' : 'user';
    
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, correo, hashedPassword, telefono, fecha_nacimiento, motivo, assignedRole]
    );

    const token = jwt.sign({ id: result.insertId, correo, role: assignedRole }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.insertId, nombre, correo, role: assignedRole } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Autenticación - Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { correo, password } = req.body;
  
  try {
    const [users] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, correo: user.correo, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, correo: user.correo, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Autenticación - Recuperar Contraseña (Simulación de Email)
app.post('/api/auth/forgot-password', authLimiter, [
  body('correo').isEmail().normalizeEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'Correo inválido' });

  const { correo } = req.body;
  try {
    const [users] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (users.length > 0) {
      // Generamos un token temporal para resetear la clave
      const resetToken = jwt.sign({ id: users[0].id }, JWT_SECRET, { expiresIn: '15m' });
      const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `"PsicoCartillas" <${process.env.EMAIL_USER}>`,
        to: correo,
        subject: 'Recuperación de Contraseña - PsicoCartillas',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
            <h2 style="color: #312e81; text-align: center;">Recuperación de Acceso</h2>
            <p style="color: #475569; font-size: 16px;">Hola <b>${users[0].nombre}</b>,</p>
            <p style="color: #475569; font-size: 16px;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en PsicoCartillas.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Restablecer mi contraseña</a>
            </div>
            <p style="color: #475569; font-size: 14px;">Este enlace expirará en 15 minutos por tu seguridad.</p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 40px; text-align: center;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
          </div>
        `
      };

      if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'tu_contraseña_de_aplicacion') {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Correo real enviado a: ${correo}`);
      } else {
        console.log('----------------------------------------------------');
        console.log(`📧 [MODO PRUEBA] Correo simulado a: ${correo}`);
        console.log(`🔗 Enlace de recuperación: ${resetLink}`);
        console.log('⚠️ Añade tu contraseña de Gmail en el archivo .env para enviar correos reales');
        console.log('----------------------------------------------------');
      }
    }
    // Siempre se responde éxito por seguridad (para no revelar qué correos existen)
    res.json({ message: 'Si el correo existe, recibirás un enlace.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Obtener todas las cartillas
app.get('/api/cartillas', async (req, res) => {
  try {
    const [cartillas] = await db.execute('SELECT * FROM cartillas');
    res.json(cartillas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener una cartilla por id
app.get('/api/cartillas/:id', async (req, res) => {
  try {
    const [cartillas] = await db.execute('SELECT * FROM cartillas WHERE id = ?', [req.params.id]);
    if (cartillas.length > 0) {
      res.json(cartillas[0]);
    } else {
      res.status(404).json({ error: 'Cartilla no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Comprar cartilla (Simulado)
app.post('/api/compras', verifyToken, async (req, res) => {
  const { cartilla_id } = req.body;
  try {
    const [existing] = await db.execute(
      'SELECT * FROM compras WHERE usuario_id = ? AND cartilla_id = ?',
      [req.userId, cartilla_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Ya has adquirido esta cartilla' });
    }

    await db.execute(
      'INSERT INTO compras (usuario_id, cartilla_id) VALUES (?, ?)',
      [req.userId, cartilla_id]
    );
    res.json({ message: 'Compra registrada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Mis compras (para saber a qué tiene acceso el usuario)
app.get('/api/mis-compras', verifyToken, async (req, res) => {
  try {
    if (req.userRole === 'admin') {
      const [cartillas] = await db.execute('SELECT * FROM cartillas');
      return res.json(cartillas);
    }

    const [compras] = await db.execute(
      'SELECT c.* FROM compras co JOIN cartillas c ON co.cartilla_id = c.id WHERE co.usuario_id = ?',
      [req.userId]
    );
    res.json(compras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Guardar respuesta de una cartilla (Usuario normal)
app.post('/api/respuestas', verifyToken, async (req, res) => {
  const { taller_id, respuesta, energia } = req.body;
  
  try {
    const [result] = await db.execute(
      'INSERT INTO respuestas (usuario_id, taller_id, respuesta, energia) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE respuesta = VALUES(respuesta), energia = VALUES(energia)',
      [req.userId, taller_id, respuesta, energia]
    );
    res.json({ message: 'Respuesta guardada', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener respuestas del usuario actual
app.get('/api/mis-respuestas', verifyToken, async (req, res) => {
  try {
    const [respuestas] = await db.execute('SELECT * FROM respuestas WHERE usuario_id = ?', [req.userId]);
    res.json(respuestas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener talleres de una cartilla (solo si la compró o es admin)
app.get('/api/cartillas/:id/talleres', verifyToken, async (req, res) => {
  try {
    const cartillaId = req.params.id;
    if (req.userRole !== 'admin') {
      const [compras] = await db.execute(
        'SELECT * FROM compras WHERE usuario_id = ? AND cartilla_id = ?',
        [req.userId, cartillaId]
      );
      if (compras.length === 0) {
        return res.status(403).json({ error: 'No tienes acceso a esta cartilla. Debes adquirirla primero.' });
      }
    }
    
    const [talleres] = await db.execute('SELECT * FROM talleres WHERE cartilla_id = ?', [cartillaId]);
    res.json(talleres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoints de Administración (Sólo Admin)
app.get('/api/admin/usuarios', verifyToken, isAdmin, async (req, res) => {
  try {
    const [usuarios] = await db.execute('SELECT id, nombre, correo, telefono, fecha_nacimiento, motivo_consulta, role FROM usuarios');
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/api/admin/usuarios/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await db.execute('DELETE FROM usuarios WHERE id = ? AND role != "admin"', [req.params.id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.delete('/api/admin/cartillas/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await db.execute('DELETE FROM cartillas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Cartilla eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.get('/api/admin/respuestas', verifyToken, isAdmin, async (req, res) => {
  try {
    const [respuestas] = await db.execute('SELECT id, usuario_id as userId, taller_id as cartillaId, respuesta, energia, fecha FROM respuestas');
    const formated = respuestas.map(r => {
      let reflexion = r.respuesta || '';
      try {
        const parsed = JSON.parse(r.respuesta);
        reflexion = Object.values(parsed).filter(val => val.trim() !== '').join(' | ');
      } catch (e) {
        // No es JSON, se deja igual
      }
      return {
        id: r.id,
        userId: r.userId,
        cartillaId: r.cartillaId,
        reflexion: reflexion || 'Sin respuestas',
        energia: r.energia,
        fecha: r.fecha
      };
    });
    res.json(formated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/admin/cartillas', verifyToken, isAdmin, async (req, res) => {
  const { titulo, descripcion, precio, imagen_url } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO cartillas (titulo, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)',
      [titulo, descripcion, precio, imagen_url]
    );
    res.json({ message: 'Cartilla creada', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
