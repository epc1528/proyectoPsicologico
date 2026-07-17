# 🧠 Plataforma de Cartillas Psicológicas

¡Bienvenido al repositorio principal de la Plataforma de Cartillas Psicológicas! Esta es una aplicación web Full-Stack diseñada con un enfoque profesional y clínico, permitiendo a los usuarios acceder a cartillas terapéuticas interactivas, registrar sus reflexiones y mantener un proceso guiado a su propio ritmo.

## 🌟 Arquitectura del Proyecto

Este proyecto se divide en dos partes principales, cada una dentro de su propio directorio:

1. **`client/` (Frontend):** Construido con React (Vite) y Tailwind CSS v4. Presenta una interfaz de usuario premium, sistema de modo claro/oscuro y diseño responsivo móvil (mobile-first).
2. **`api/` (Backend):** Servidor Node.js/Express.js conectado a una base de datos MySQL relacional. Gestiona la autenticación segura (JWT) y el almacenamiento persistente de cartillas y respuestas.

## 🚀 Cómo Levantar el Proyecto Localmente

Para correr todo el proyecto en tu máquina de desarrollo, sigue estos pasos:

### 1. Requisitos Previos
- **Node.js** (v16+) y `npm`.
- **MySQL** corriendo en tu máquina local.

### 2. Configurar la Base de Datos MySQL
En tu terminal de MySQL o aplicación de gestión (ej. MySQL Workbench), ejecuta el script base para crear las tablas y datos necesarios:
```bash
cd api
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql
```
*(Se te pedirá tu contraseña de MySQL).*

### 3. Configurar el Backend (API)
```bash
# Entra a la carpeta de la API
cd api/

# Instala las dependencias
npm install

# Crea o verifica tu archivo .env
# (Debe contener DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, y JWT_SECRET)

# Levanta el servidor de desarrollo
npm run dev
```
El servidor backend iniciará en `http://localhost:5000`.

### 4. Configurar el Frontend (Client)
Abre **una nueva terminal** y ejecuta:
```bash
# Entra a la carpeta del cliente
cd client/

# Instala las dependencias
npm install

# Levanta el entorno de React con Vite
npm run dev
```
La aplicación web estará disponible en `http://localhost:5174` (o el puerto que te indique la terminal).

## 🔑 Credenciales de Prueba

**Modo Administrador (Psicóloga):**
- Correo: `admin@psicocartillas.com`
- Contraseña: `admin123`

*(Puedes crear usuarios regulares directamente desde la interfaz de registro).*
