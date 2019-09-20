var adicionar = function () {
    var inputElement = document.querySelector('#app input');
    var valor = inputElement.value;
    
    var pesquisar = function() {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://api.github.com/users/' + valor + '/repos');
            xhr.send(null);
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject('Erro na requisição!');
                    }
                }
            }
        });
    }

    pesquisar()
        .then(function(response) {
            var texto = 'Repositórios no GitHub de: ' + valor;
            var paragrafo = document.createElement('p');
            var paragrafoText = document.createTextNode(texto);
            paragrafo.appendChild(paragrafoText);
            document.querySelector('#lista').appendChild(paragrafo);

            var listElement = document.createElement('ul');
            for (todo of response) {
                var todoElement = document.createElement('li');
                var todoText = document.createTextNode(todo.name);
                todoElement.appendChild(todoText);
                listElement.appendChild(todoElement);
            }

            document.querySelector('#lista').appendChild(listElement);
        })
        .catch(function(error) {
            console.log(error);
        });
}

