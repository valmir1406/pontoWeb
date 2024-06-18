const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin'); // Importando o SDK Admin do Firebase
const path = require('path');

app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para a página de registro de ponto
app.get('/registroPonto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registroPonto.html'));
});

// Configuração do Firebase Admin SDK
console.log("Carregando configuração do Firebase...");

const serviceAccount = require('./config/pontoweb-13c71-firebase-adminsdk-a2mzl-09b4597930.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cadteste-14458-default-rtdb.firebaseio.com"
});

console.log("Firebase inicializado");

app.post('/api/getUserRole', async (req, res) => {
  const uid = req.body.uid; // Obtenha o UID do usuário da requisição

  try {
    // Obtenha o papel do usuário do Firebase
    const userRecord = await admin.auth().getUser(uid);
    const role = userRecord.customClaims?.role || 'user'; // Assume 'user' se o papel não estiver definido
    res.json({ role: role });
  } catch (error) {
    console.error('Erro ao obter papel:', error);
    res.status(500).send('Erro ao obter papel');
  }
});

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
