# ⚙️ Backend - PsicoCartillas (Node + Express + MySQL)

Este directorio contiene todo el código del servidor (API REST) que sirve como motor de datos para la Plataforma de Cartillas Psicológicas.

## 🛠 Tecnologías Utilizadas

- **Node.js y Express.js**: Para construir y gestionar las rutas de la API de forma rápida y sencilla.
- **MySQL2**: Conector promesificado (async/await) para manejar la base de datos relacional.
- **JSON Web Tokens (JWT)**: Generación de sesiones seguras sin estado, controlando caducidad (`exp`).
- **Bcrypt**: Para hashear y comparar las contraseñas, protegiendo la identidad de los pacientes.

## ✨ Características Principales

- **Registro Profesional**: Capta datos clínicos vitales (teléfono, edad/fecha de nacimiento, motivo de consulta) e impide correos duplicados.
- **Middleware de Autenticación**: Protege rutas como las compras o la visualización de progresos (`verifyToken`), y diferencia entre pacientes y la psicóloga administradora (`isAdmin`).
- **Arquitectura de Base de Datos Robusta**: Restricciones de unicidad en las compras para evitar que un usuario adquiera dos veces la misma cartilla y validaciones de integridad relacional.

## 🚀 Inicio Rápido

1. Crea la base de datos importando `schema.sql` y `seed.sql`.
2. Instala los paquetes de Node:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` en la raíz de `api/`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=TuPasswordAqui
   DB_NAME=cartillas_psicologicas
   JWT_SECRET=tu_secreto_aqui
   PORT=5000
   ```
4. Levanta el servidor en modo desarrollo (usando `nodemon`):
   ```bash
   npm run dev
   ```
