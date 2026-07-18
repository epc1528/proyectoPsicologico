# 📧 Guía de Configuración de Correos (Nodemailer)

Este proyecto (PsicoCartillas) incluye un sistema profesional de recuperación de contraseñas. Por defecto, cuando estás programando (desarrollo), el servidor solo imprime el correo en la terminal para que no gastes recursos.

Para que tu plataforma empiece a **enviar correos electrónicos reales** a la bandeja de entrada de tus pacientes sin pagar ningún servicio externo, hemos configurado **Nodemailer** para trabajar directamente con Gmail. 

Solo debes seguir estos pasos para activarlo:

## Paso 1: Configurar tu cuenta de Gmail
Por seguridad, Google no permite que una aplicación externa inicie sesión con tu contraseña normal. Debes crear una "Contraseña de Aplicación".

1. Inicia sesión en la cuenta de Gmail que usarás para el proyecto (ej. `soporte.psicocartillas@gmail.com`).
2. Ve a la configuración de tu cuenta de Google: [Mi Cuenta Google - Seguridad](https://myaccount.google.com/security)
3. Asegúrate de tener activada la **"Verificación en dos pasos"** (es un requisito obligatorio de Google).
4. En el buscador de ajustes de Google, escribe **"Contraseñas de aplicaciones"** (App passwords).
5. Crea una nueva contraseña. Ponle de nombre algo como "PsicoCartillas Web".
6. Google te mostrará una clave secreta de 16 letras en un cuadro amarillo (ej. `abcd efgh ijkl mnop`). **Cópiala**, porque no la volverás a ver.

## Paso 2: Conectar la aplicación (Archivo .env)
Ahora debes inyectar esta clave secreta en tu servidor para darle autorización de enviar correos en tu nombre.

1. En la carpeta `api/` de este proyecto, abre tu archivo `.env`.
2. Verás dos variables al final del archivo:
   ```env
   EMAIL_USER=soporte.psicocartillas@gmail.com
   EMAIL_PASS=tu_contraseña_de_aplicacion
   ```
3. Cambia `EMAIL_USER` por el correo de Gmail que usaste.
4. Reemplaza `tu_contraseña_de_aplicacion` pegando la clave de 16 letras que Google te dio (puedes pegarla con o sin espacios, Node.js la entenderá igual).

Ejemplo final de tu `.env`:
```env
EMAIL_USER=mi.clinica@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

## Paso 3: ¡Listo para Producción!
Guarda el archivo `.env` y reinicia tu servidor Node.js (`npm run dev` o `nodemon index.js`).

**¿Cómo sé que funcionó?**
1. Entra a tu página web de React.
2. Ve al Login y haz clic en "¿Olvidaste tu contraseña?".
3. Ingresa tu propio correo.
4. En cuestión de 2 segundos, revisa tu bandeja de entrada de Gmail. ¡Verás un hermoso correo HTML con tu botón de recuperación!

> ⚠️ **Límites Importantes:** Este método es gratuito, pero Gmail restringe el envío a un máximo de **500 correos por día**. Para un consultorio clínico es un margen gigantesco, pero si en un futuro escalas a miles de pacientes, te recomendamos migrar las variables del `.env` hacia un servicio como **Resend** o **AWS SES**.
