document.addEventListener('DOMContentLoaded', function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            buscarRegistrosDePonto(user.uid);
        } else {
            window.location.href = 'login.html';
        }
    });
});

function buscarRegistrosDePonto(uid) {
    const registrosRef = firebase.database().ref('registrosPonto/' + uid);
    registrosRef.once('value', snapshot => {
        const registros = snapshot.val();
        const listaRegistros = document.getElementById('listaRegistros');
        listaRegistros.innerHTML = '';

        if (registros) {
            Object.keys(registros).forEach(key => {
                const registro = registros[key];
                const item = document.createElement('li');
                item.innerHTML = `
                    <strong>Data e Hora:</strong> ${registro.dataHora}<br>
                    <strong>Localização:</strong> ${registro.localizacao}<br>
                    <strong>Endereço:</strong> ${registro.endereco}<br>
                    <strong>Imagem:</strong> <img src="${registro.imagemURL}" alt="Imagem do Ponto" style="width:100px; height:auto;">
                `;
                listaRegistros.appendChild(item);
            });
        } else {
            listaRegistros.innerHTML = '<li>Nenhum registro encontrado.</li>';
        }
    }).catch(error => {
        console.error('Erro ao buscar registros:', error);
        alert('Erro ao buscar registros: ' + error.message);
    });
}
