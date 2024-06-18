document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Tenta criar o usuário no Firebase Authentication
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Usuário criado com sucesso, envia dados adicionais para o banco de dados
                    const user = userCredential.user;
                    enviarDadosParaDatabase(user);
                })
                .catch((error) => {
                    // Erro ao criar usuário, mostra mensagem de erro
                    console.error('Erro no cadastro:', error);
                    alert('Erro no cadastro: ' + error.message);
                    console.log(error.code); // Exibe o código de erro
                    console.log(error.message); // Exibe a mensagem de erro
                });
        });
    } else {
        console.error("Formulário de inscrição não encontrado.");
    }
});

function enviarDadosParaDatabase(user) {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const perfil = document.getElementById('perfil').value;  // Captura o perfil selecionado

    // Insere os dados do usuário no Firebase Realtime Database
    firebase.database().ref('users/' + user.uid).set({
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        perfil: perfil
    }).then(() => {
        // Dados adicionais armazenados com sucesso, redireciona para a página de login
        console.log('Dados adicionais armazenados com sucesso!');
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html'; 
    }).catch((error) => {
        // Erro ao salvar dados adicionais, mostra mensagem de erro
        console.error('Erro ao enviar dados adicionais:', error);
        alert('Erro ao salvar dados adicionais: ' + error.message);
    });
}
