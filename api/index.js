const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_psicocartillas_123';

const app = express();
app.use(cors());
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

// Autenticación - Registro
app.post('/api/auth/register', async (req, res) => {
  const { nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta } = req.body;
  
  if (!nombre || !correo || !password || !telefono || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben ser llenados' });
  }

  try {
    const [existing] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const motivo = motivo_consulta || 'No especificado';
    
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, correo, hashedPassword, telefono, fecha_nacimiento, motivo, 'user']
    );

    const token = jwt.sign({ id: result.insertId, correo, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.insertId, nombre, correo, role: 'user' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Autenticación - Login
app.post('/api/auth/login', async (req, res) => {
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
    const [usuarios] = await db.execute('SELECT id, nombre, correo, role FROM usuarios');
    res.json(usuarios);
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
