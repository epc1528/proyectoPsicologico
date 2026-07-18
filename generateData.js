const fs = require('fs');
const parsePDFText = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const text = fs.readFileSync(filePath, 'utf-8');
    const questions = [];
    const lines = text.split('\n');
    let dayCount = 1;
    for (let line of lines) {
        if (line.includes('?') && line.length > 15) {
            questions.push({
                tipo: 'ejercicio',
                titulo: `Día ${dayCount}`,
                instruccion: line.trim(),
                placeholder: 'Escribe tu respuesta aquí...'
            });
            dayCount++;
            if (dayCount > 20) break; // Limit to 20 per cartilla to avoid huge payload
        }
    }
    return questions;
};

const adulto = parsePDFText('/tmp/adulto.txt');
const adolescentes = parsePDFText('/tmp/adolescentes.txt');
const infancia = parsePDFText('/tmp/infancia.txt');

const output = `export const cartillasData = {
  1: {
    titulo: "Adulto Mayor - Dale un Click a tus Emociones",
    colorTema: "from-emerald-400 to-teal-500",
    colorFondo: "bg-emerald-50 dark:bg-emerald-950",
    paginas: [
      { tipo: "portada", titulo: "DALE UN CLICK A TUS EMOCIONES", subtitulo: "ADULTO MAYOR", descripcion: "Guía Activa para una Mente en Equilibrio.", imagen: "🌿" },
      { tipo: "teoria", titulo: "Salud Mental", contenido: "La salud mental en el adulto mayor es buscar el equilibrio emocional..." },
      ...${JSON.stringify(adulto)}
    ]
  },
  2: {
    titulo: "Adolescentes - Dale un Click a tus Emociones",
    colorTema: "from-indigo-400 to-violet-500",
    colorFondo: "bg-indigo-50 dark:bg-indigo-950",
    paginas: [
      { tipo: "portada", titulo: "DALE UN CLICK A TUS EMOCIONES", subtitulo: "ADOLESCENTES", descripcion: "Guía Activa para una Mente en Equilibrio.", imagen: "✨" },
      { tipo: "teoria", titulo: "Tu Salud Mental", contenido: "Cuidar tu salud mental significa aprender a escucharte..." },
      ...${JSON.stringify(adolescentes)}
    ]
  },
  3: {
    titulo: "Infancia - Dale un Click a tus Emociones",
    colorTema: "from-sky-400 to-blue-500",
    colorFondo: "bg-sky-50 dark:bg-sky-950",
    paginas: [
      { tipo: "portada", titulo: "DALE UN CLICK A TUS EMOCIONES", subtitulo: "INFANCIA", descripcion: "Un espacio divertido para aprender a manejar lo que sentimos.", imagen: "🎨" },
      { tipo: "teoria", titulo: "Salud Mental para Niños", contenido: "La salud mental es cuando nuestra mente y nuestro corazón se sienten bien." },
      ...${JSON.stringify(infancia)}
    ]
  }
};`;

fs.writeFileSync('./client/src/cartillasData.js', output);
