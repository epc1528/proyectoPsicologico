# 🎨 Frontend - PsicoCartillas (React + Vite)

Este directorio contiene todo el código de la interfaz de usuario de la Plataforma de Cartillas Psicológicas.

## 🛠 Tecnologías Utilizadas

- **React.js**: Biblioteca base para construir la interfaz.
- **Vite**: Bundler ultra-rápido para el desarrollo local.
- **Tailwind CSS v4**: Framework de utilidades CSS para estilos rápidos y modo oscuro por clases (`@custom-variant dark`).
- **React Router DOM**: Gestión de rutas de la Single Page Application (SPA).

## ✨ Características Principales

- **Diseño Premium**: Interfaz limpia orientada a salud mental (colores turquesa/índigo y fondos en degradado glassmorphism).
- **Modo Oscuro Integrado**: Persistente mediante `ThemeContext` y LocalStorage.
- **Formularios Dinámicos**: Control exhaustivo de autenticación y registros de pacientes con validaciones.
- **Responsive Design**: Navegación adaptada a dispositivos móviles con menús colapsables.

## 🚀 Inicio Rápido

1. Instala los paquetes:
   ```bash
   npm install
   ```
2. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Para construir a producción:
   ```bash
   npm run build
   ```

*(Nota: Asegúrate de tener el backend corriendo en el puerto 5000 para que el login y la consulta de cartillas funcionen correctamente).*
