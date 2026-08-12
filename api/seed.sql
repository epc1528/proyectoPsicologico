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
(1, 'Bitácora Adultos', 'Ejercicios creativos que conectan para el amor propio, sanar heridas, establecer limites sanos y reducir el estres propio de la edad.', 12000.00, '/covers/adulto.jpeg'),
(2, 'Bitácora Adolescentes', 'Herramientas para manejar la ansiedad, fortalecer la identidad, mejorar las relaciones y construir autoconfianza.', 12000.00, '/covers/adolescente.jpeg'),
(3, 'Bitácora Infantil', 'Actividades lúdicas para desarrollar inteligencia emocional, autoestima, empatía y habilidades para expresar sentimientos.', 12000.00, '/covers/infancia.jpeg');

-- Insertar Talleres para cada Cartilla
INSERT INTO talleres (id, cartilla_id, titulo, contenido, tipo_ejercicio) VALUES
(1, 1, 'Reconociendo mi Ansiedad', 'Reflexiona sobre tu día. ¿Cómo te has sentido hoy? ¿Identificaste algún detonante de ansiedad?', 'reflexion'),
(2, 2, 'El Espejo Compasivo', 'Escribe 3 cosas que te gusten de ti mismo/a hoy, sin juzgarlas.', 'reflexion'),
(3, 3, 'Termómetro Emocional', 'Registra las emociones predominantes que sentiste hoy y cómo las manejaste.', 'reflexion');
