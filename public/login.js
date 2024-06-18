window.addEventListener('load', function() {
    console.log("Página carregada");

    if (!firebase.apps.length) {
        console.error("Firebase não foi inicializado.");
        return; // Para de executar se o Firebase não foi inicializado
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Login bem-sucedido");
                const user = userCredential.user;

                // Obtenha o papel do usuário do banco de dados
                fetch('/api/getUserRole', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid: user.uid }) 
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter papel: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    const role = data.role;
                    console.log(`Usuário logado com papel: ${role}`);
                    redirectBasedOnRole(role);
                })
                .catch((error) => {
                    console.error('Erro ao obter papel:', error);
                    // Lidar com o erro (por exemplo, mostrar uma mensagem)
                });

            })
            .catch((error) => {
                console.error('Erro ao entrar:', error.message);
                alert('Erro ao entrar: ' + error.message);
            });
    });
});

function redirectBasedOnRole(role) {
    if (role === 'admin') {
        window.location.href = 'adminDashboard.html';
    } else {
        window.location.href = 'registroPonto.html';
    }
}
