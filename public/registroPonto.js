document.addEventListener('DOMContentLoaded', function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const emailField = document.getElementById('email');
            const dataHoraField = document.getElementById('dataHora');
            const localizacaoField = document.getElementById('localizacao');

            if (emailField && dataHoraField && localizacaoField) {
                emailField.value = user.email;
                dataHoraField.value = new Date().toLocaleString();

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const coords = latitude + ', ' + longitude;
                        localizacaoField.value = coords;
                    }, function(error) {
                        console.error('Erro ao obter localização:', error);
                        alert('Erro ao obter localização: ' + error.message);
                    });
                } else {
                    alert('Geolocalização não é suportada pelo seu navegador.');
                }
            } else {
                console.error('Elementos do formulário não encontrados.');
            }
        } else {
            window.location.href = 'login.html';
        }
    });

    const registroPontoForm = document.getElementById('registroPontoForm');
    if (registroPontoForm) {
        registroPontoForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailField = document.getElementById('email');
            const dataHoraField = document.getElementById('dataHora');
            const localizacaoField = document.getElementById('localizacao');
            const imagemField = document.getElementById('imagem');
            const enderecoField = document.getElementById('endereco');

            if (emailField && dataHoraField && localizacaoField && imagemField && enderecoField) {
                const email = emailField.value;
                const dataHora = dataHoraField.value;
                const localizacao = localizacaoField.value;
                const imagem = imagemField.files[0];
                const endereco = enderecoField.value;

                if (!imagem) {
                    alert('Por favor, capture uma imagem.');
                    return;
                }

                const storageRef = firebase.storage().ref('imagens/' + imagem.name);
                storageRef.put(imagem).then(snapshot => {
                    return snapshot.ref.getDownloadURL();
                }).then(downloadURL => {
                    return firebase.database().ref('registrosPonto/' + firebase.auth().currentUser.uid).push({
                        email: email,
                        dataHora: dataHora,
                        localizacao: localizacao,
                        endereco: endereco,
                        imagemURL: downloadURL
                    });
                }).then(() => {
                    alert('Ponto registrado com sucesso!');
                    dataHoraField.value = new Date().toLocaleString();
                    imagemField.value = '';
                }).catch((error) => {
                    console.error('Erro ao registrar ponto:', error);
                    alert('Erro ao registrar ponto: ' + error.message);
                });
            } else {
                console.error('Elementos do formulário não encontrados.');
            }
        });
    } else {
        console.error('Formulário de registro de ponto não encontrado.');
    }
});
