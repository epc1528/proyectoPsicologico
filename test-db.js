const http = require('http');

const runTest = async () => {
  // 1. Register a test user
  const registerRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Test User',
      correo: 'testdb@psicocartillas.com',
      password: 'password123',
      telefono: '1234567890',
      fecha_nacimiento: '1990-01-01',
      codigoAdmin: '2409@'
    })
  });
  
  const registerData = await registerRes.json();
  console.log('Registration:', registerData);
  
  const token = registerData.token;
  if (!token) return console.error("Failed to register and get token");

  // 2. Save a response (simulate InteractiveWorkbook)
  const saveRes = await fetch('http://localhost:5000/api/respuestas', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({
      taller_id: 1, // ID de la cartilla
      respuesta: JSON.stringify({ "0": "Respuesta test 1", "1": "Respuesta test 2" }),
      energia: 8
    })
  });
  
  const saveData = await saveRes.json();
  console.log('Save response:', saveData);

  // 3. Get my responses
  const getRes = await fetch('http://localhost:5000/api/mis-respuestas', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const getData = await getRes.json();
  console.log('Get responses:', getData);
};

runTest().catch(console.error);
