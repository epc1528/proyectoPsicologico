import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';

// ── Middlewares ───────────────────────────────────────────────────────────────
import { errorHandler } from './middlewares/errorHandler.middleware';

// ── Config ────────────────────────────────────────────────────────────────────
import mailer from './config/mailer';
import { initializeDatabase } from './config/db';

// ── Repositories ──────────────────────────────────────────────────────────────
import { UsuarioRepository } from './repositories/usuario.repository';
import { CartillaRepository } from './repositories/cartilla.repository';
import { CompraRepository } from './repositories/compra.repository';
import { RespuestaRepository } from './repositories/respuesta.repository';
import { TallerRepository } from './repositories/taller.repository';

// ── Services ──────────────────────────────────────────────────────────────────
import { AuthService } from './services/auth.service';
import { CartillaService } from './services/cartilla.service';
import { CompraService } from './services/compra.service';
import { RespuestaService } from './services/respuesta.service';
import { AdminService } from './services/admin.service';

// ── Controllers ───────────────────────────────────────────────────────────────
import { AuthController } from './controllers/auth.controller';
import { CartillaController } from './controllers/cartilla.controller';
import { CompraController } from './controllers/compra.controller';
import { RespuestaController } from './controllers/respuesta.controller';
import { AdminController } from './controllers/admin.controller';

// ── Routes ────────────────────────────────────────────────────────────────────
import { createAuthRouter } from './routes/auth.routes';
import { createCartillaRouter } from './routes/cartilla.routes';
import { createCompraRouter } from './routes/compra.routes';
import { createRespuestaRouter } from './routes/respuesta.routes';
import { createAdminRouter } from './routes/admin.routes';

// =============================================================================
// COMPOSITION ROOT — Instanciación y cableado de dependencias
// =============================================================================

// Repositories (sin dependencias externas más allá del pool)
const usuarioRepo = new UsuarioRepository();
const cartillaRepo = new CartillaRepository();
const compraRepo = new CompraRepository();
const respuestaRepo = new RespuestaRepository();
const tallerRepo = new TallerRepository();

// Services (reciben repositories por inyección de dependencias)
const authService = new AuthService(usuarioRepo, mailer);
const cartillaService = new CartillaService(cartillaRepo);
const compraService = new CompraService(compraRepo, cartillaRepo);
const respuestaService = new RespuestaService(respuestaRepo);
const adminService = new AdminService(usuarioRepo, cartillaRepo, respuestaRepo, compraRepo, tallerRepo);

// Controllers (reciben services por inyección de dependencias)
const authController = new AuthController(authService);
const cartillaController = new CartillaController(cartillaService, adminService);
const compraController = new CompraController(compraService);
const respuestaController = new RespuestaController(respuestaService);
const adminController = new AdminController(adminService);

// =============================================================================
// Express App
// =============================================================================

const app = express();

app.use(helmet());
app.use(cors({
    origin: true, // Permite cualquier origen dinámicamente en producción y desarrollo
    credentials: true,
}));
app.use(express.json());

// Rate Limiter para rutas de autenticación
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Permitir suficientes peticiones para pruebas
    message: { error: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos' },
    standardHeaders: true,
    legacyHeaders: false,
});


// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'API MySQL is running' });
});

// Rutas montadas con routers configurados
app.use('/api/auth', authLimiter, createAuthRouter(authController));
app.use('/api/cartillas', createCartillaRouter(cartillaController));
app.use('/api/compras', createCompraRouter(compraController));
app.use('/api/respuestas', createRespuestaRouter(respuestaController));
app.use('/api/admin', createAdminRouter(adminController));

// Middleware de Manejo de Errores (debe ser el último)
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

// Evitar que excepciones o promesas no capturadas tumben el proceso de Node en Railway
process.on('unhandledRejection', (reason) => {
    console.error('⚠️ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('⚠️ Uncaught Exception:', err);
});

app.listen(PORT, '0.0.0.0', async () => {
    console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
    await initializeDatabase();
});

export default app;
