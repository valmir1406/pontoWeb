console.log("Carregando configuração do Firebase...");

var firebaseConfig = {
  apiKey: "AIzaSyCWtWidRdVL368ugBy8GO9AUYVyGhA8ve0",
  authDomain: "pontoweb-13c71.firebaseapp.com",
  databaseURL: "https://pontoweb-13c71-default-rtdb.firebaseio.com",
  projectId: "pontoweb-13c71",
  storageBucket: "pontoweb-13c71.appspot.com",
  messagingSenderId: "362407078518",
  appId: "1:362407078518:web:d63e281027e19590a9cd57"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase inicializado"); // Debug após a inicialização
} else {
  firebase.app(); // if already initialized, use that one
}

console.log("Firebase carregado");
