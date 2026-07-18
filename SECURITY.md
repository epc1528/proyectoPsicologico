# 🛡️ Arquitectura de Seguridad - PsicoCartillas

Este documento detalla todas las capas de ciberseguridad y buenas prácticas implementadas en el proyecto **PsicoCartillas** (Frontend en React y Backend en Node.js/Express con MySQL), diseñadas para proteger la información confidencial de los pacientes y asegurar el flujo de la aplicación.

---

## 1. Protección de Datos y Contraseñas
* **Cifrado de Alta Seguridad (Bcrypt):** Las contraseñas de los usuarios nunca se guardan en texto plano en la base de datos. Se encriptan utilizando el algoritmo `Bcrypt` con un factor de costo (salt rounds) de `10`. Esto hace que las contraseñas sean matemáticamente imposibles de revertir, protegiendo a los usuarios incluso en caso de una vulneración de la base de datos.
* **Validación Estricta (Regex):** El sistema obliga a los pacientes a crear contraseñas fuertes (mínimo 8 caracteres, al menos una letra mayúscula y un número) cortando de raíz el uso de claves débiles como "123456".

## 2. Autenticación y Control de Sesión
* **JSON Web Tokens (JWT):** El sistema maneja las sesiones sin estado mediante tokens JWT firmados criptográficamente. Cada petición al servidor verifica la legitimidad de la firma antes de permitir el acceso a rutas protegidas (como los talleres o compras).
* **Control de Roles y Llaves Secretas:** El sistema de "Administrador" (Psicóloga) está protegido. Para crear un usuario Admin, se requiere de un `ADMIN_SECRET_KEY` que no está quemado en el código, sino oculto de forma segura en las variables de entorno (`.env`) del servidor.

## 3. Defensas contra Ataques Web Comunes
* **Anti-Inyección SQL:** Todas las transacciones a la base de datos utilizan "Consultas Preparadas" (Prepared Statements) a través de la librería `mysql2/promise`. Esto sanitiza automáticamente cualquier intento de inyectar comandos SQL maliciosos, neutralizando los ataques de inyección SQL (SQLi).
* **Bloqueo de Fuerza Bruta (Rate Limiting):** A través de `express-rate-limit`, las rutas críticas como el inicio de sesión y registro están limitadas a 10 intentos cada 15 minutos por IP. Esto evita que bots maliciosos intenten adivinar contraseñas haciendo miles de peticiones por segundo.
* **Filtros Anti-XSS (Cross-Site Scripting):** La plataforma utiliza `express-validator` para purificar los datos enviados en los formularios. Filtra direcciones de correo inválidas y escapa caracteres especiales (como `< >`) en nombres y teléfonos para impedir que un atacante inyecte código JavaScript malicioso en la plataforma.
* **Protección de Cabeceras HTTP (Helmet):** El servidor Express está blindado por `helmet`, un middleware que configura automáticamente cabeceras de seguridad que protegen a los pacientes contra ataques de *Clickjacking*, evita que el servidor revele la tecnología subyacente y bloquea el rastreo MIME (MIME-sniffing).
* **Restricciones de Origen (CORS Estricto):** El servidor rechaza cualquier solicitud externa. Está configurado con reglas CORS para responder exclusivamente a las peticiones originadas desde el dominio oficial del frontend (`http://localhost:5173`).

---

> **Nota para Auditoría:** El proyecto ha alcanzado un estándar de seguridad de nivel de producción adecuado para el manejo de datos de pacientes. Para un paso final a la red pública (WWW), solo restaría migrar el token de LocalStorage a una Cookie *HttpOnly* y desplegar el proyecto bajo un certificado de cifrado *SSL/TLS (HTTPS)*.
