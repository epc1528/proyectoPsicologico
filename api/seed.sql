USE cartillas_psicologicas;

-- Limpiar datos existentes (opcional pero util para resets)
DELETE FROM respuestas;
DELETE FROM talleres;
DELETE FROM compras;
DELETE FROM cartillas;
DELETE FROM usuarios;

-- Insertar Usuario Admin (Contraseña: admin123 -> $2b$10$C826n9D1Kxk9Q2gGvVd86.6L... hashed con bcrypt)
-- Para propósitos de este seed, insertamos un admin con password admin123
INSERT INTO usuarios (nombre, correo, password, role) VALUES 
('Doctora (Admin)', 'admin@psicocartillas.com', '$2b$10$wB9L1yXo5UvK.t7J0pI9e.oH6k.k.V0Z6v9I.k.k.k.k.k.k.k', 'admin');

-- Insertar Cartillas
INSERT INTO cartillas (id, titulo, descripcion, precio, imagen_url) VALUES
(1, 'Ansiedad Bajo Control', 'Aprende a identificar y gestionar tus ataques de ansiedad con ejercicios prácticos cognitivo-conductuales.', 12000.00, 'ansiedad.jpg'),
(2, 'Autoestima y Amor Propio', 'Un viaje hacia tu interior para perdonarte, valorarte y construir una autoestima inquebrantable.', 12000.00, 'autoestima.jpg'),
(3, 'Gestión de Emociones', 'Aprende a surfear las olas emocionales sin dejarte arrastrar por ellas. Inteligencia emocional práctica.', 12000.00, 'emociones.jpg');

-- Insertar Talleres para cada Cartilla
INSERT INTO talleres (id, cartilla_id, titulo, contenido, tipo_ejercicio) VALUES
(1, 1, 'Reconociendo mi Ansiedad', 'Reflexiona sobre tu día. ¿Cómo te has sentido hoy? ¿Identificaste algún detonante de ansiedad?', 'reflexion'),
(2, 2, 'El Espejo Compasivo', 'Escribe 3 cosas que te gusten de ti mismo/a hoy, sin juzgarlas.', 'reflexion'),
(3, 3, 'Termómetro Emocional', 'Registra las emociones predominantes que sentiste hoy y cómo las manejaste.', 'reflexion');
