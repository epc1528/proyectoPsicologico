CREATE DATABASE IF NOT EXISTS cartillas_psicologicas;
USE cartillas_psicologicas;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  fecha_nacimiento DATE,
  motivo_consulta VARCHAR(50),
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS cartillas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  imagen_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS compras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cartilla_id INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (cartilla_id) REFERENCES cartillas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS talleres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cartilla_id INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  contenido TEXT,
  tipo_ejercicio VARCHAR(50),
  FOREIGN KEY (cartilla_id) REFERENCES cartillas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS respuestas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  taller_id INT NOT NULL,
  respuesta TEXT,
  energia INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (taller_id) REFERENCES talleres(id) ON DELETE CASCADE,
  UNIQUE (usuario_id, taller_id)
);
