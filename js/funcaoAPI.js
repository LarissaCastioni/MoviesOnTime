var artistsRequestURL = 'https://api.themoviedb.org/3/person/popular?api_key=2f1a925c8c43d6a99e99cb33b29dcc36&language=pt-BR'
var moviesRequestURL = 'https://api.themoviedb.org/3/movie/popular?api_key=2f1a925c8c43d6a99e99cb33b29dcc36&language=pt-BR'
var movieUpcomingRequestURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=2f1a925c8c43d6a99e99cb33b29dcc36&language=pt-BR'
var sectionArtist = document.getElementById("artistas")
var sectionMovie = document.getElementById("filmes")
var sectionLancamentos = document.getElementById("lancamentos")
var sectionBestMovie = document.getElementById("top1")

function carregaDados(api, section) {

    var requestAPI = new XMLHttpRequest(); //XMLHttpRequest é um objeto que fornece funcionalidade ao cliente para transferir dados entre um cliente e um servidor.
    requestAPI.open('GET', api)
    requestAPI.responseType = 'json'
    requestAPI.send()

    requestAPI.onload = function () {
        var responseAPI = requestAPI.response


        for (var i = 0; i <= 4; i++) { //cria o loop de repetição para executar 5 vezes
            let divContent = document.createElement("div") //gera uma div que ainda não existe em nenhum lugar, porém vamos colocar no container
            divContent.classList.add("populares_container_content") //mencionamos a variavel divContent usando classList.add para adiciona uma classe para a div criada

            if (section.id === "filmes") {
                //divContent.setAttribute("onclick", `createTop1(${i})`)
                divContent.setAttribute("onclick", `createTop2(${i}, "${responseAPI.results[i].title}", "${responseAPI.results[i].overview}", "${responseAPI.results[i].poster_path}")`)
            }


            let imageContent = document.createElement("img") //dentro da div tem uma imagem, então criamos um elemento img 
            imageContent.classList.add("populares_container_content_imagem") //adicionando uma classe para a imagem


            if (responseAPI.results[i].name) { //validação com um IF se o resultado de responseAPI tem o valor "name", SE tiver colocamos o ALT na imagem
                imageContent.setAttribute("alt", responseAPI.results[i].name) //setAttribute serve para setarmos qualquer atibuto de HTML de tag (pode ser src, title, class...)
                imageContent.setAttribute("title", responseAPI.results[i].name)
            } else if (responseAPI.results[i].title) {
                imageContent.setAttribute("alt", responseAPI.results[i].title) //acessibilidade
                imageContent.setAttribute("title", responseAPI.results[i].title) //tratativa visual
            }

            let pathImage
            if (responseAPI.results[i].profile_path) { //se profile.path existir ele vai colocar em "pathImage" o valor de caminho da imagem
                pathImage = `https://image.tmdb.org/t/p/w500${responseAPI.results[i].profile_path}`

            } else if (responseAPI.results[i].poster_path) { //usamos elseif pois caso o "profile.path" nao existir, pode ser que o "poster_path" exista
                pathImage = `https://image.tmdb.org/t/p/w500${responseAPI.results[i].poster_path}`
            } else { //regra genérica de que se nenhuma das condições anteriores funcionar, ele cai no ELSE, exemplo: null, undefined...
                pathImage = "https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png"
            }

            imageContent.setAttribute("src", pathImage) //apos tratarmos o caminho da imagem, podemos então setar o SRC da imagem para carregar na tela. Já que essa propriedade por alterar o valor de um atributo
            divContent.appendChild(imageContent) //para isso usamos o appendChild que sempre adiciona no fim da tag o conteudo q "selecionamos". Obs: mencionamos o elemento pai que queremos adicionar um filho que será adicionado no appendChild

            let nomeContent
            nomeContent = document.createElement("p") //vai criar um elemento parágrafo
            nomeContent.classList.add("populares_container_content_nome") //colocar a classe
            if (responseAPI.results[i].name) { //validamos a existência de name vindo de responseAPI, e SE existir
                nomeContent.innerText = responseAPI.results[i].name //e com o innerText adicionar o texto
            } else if (responseAPI.results[i].title) {
                nomeContent.innerText = responseAPI.results[i].title
            } else {
                nomeContent.innerText = "Desconhecido"
            }
            divContent.appendChild(nomeContent)//como sabemos que queremos na sequencia de <img> o paragrafo com o nome, damos o appendChild de nomeContent no elemento de divContent



            //da mesma forma que validou o nome, vamos validar a data. Criamos um IF aqui, porque existe seção (lançamentos) onde aparece a data completa, então lancamentos ira passar por aqui. Já filmes populares irá pro próximo IF.
            if (responseAPI.results[i].release_date) {
                let dataNova
                if (section.id === "lancamentos") { //utilizamos o parametro da função "section" que foi declarado no começo do código e que usa o "getElementById". O valor de "section" é dinâmico baseado na chamada da função, então para validar o seu valor dentro da função, usamos o "section.id", que retornara o valor de ID da tag <section>
                    console.log(responseAPI.results[i].release_date)
                    let dataAtual = new Date(responseAPI.results[i].release_date) //então, se "section.id" for "lancamentos", usaremos o "new Date" 
                    dataNova = dataAtual.toLocaleDateString( // e o "toLocaleDateString" que tratará a data para exibição 
                        'pt-BR',
                        {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }
                    )

                }

                if (section.id === "filmes") { //caso section.id for filmes 
                    let dataAtual = responseAPI.results[i].release_date
                    dataNova = dataAtual.split("-")[0] //usaremos o split (quebramos a string pelo caracter -) e pegamos a primeira posição
                }

                let dataContent = document.createElement("p") //criamos o elemento paragrafo 
                dataContent.classList.add("populares_container_content_data") //colocamos a classe no paragrafo
                dataContent.innerText = dataNova //usamos o innerText para atribuir o valor de data
                divContent.appendChild(dataContent) //assim como em <img> e <p> de nome, vamos também dar o appendChild do paragrafo da data após o innerText. Já que o appendChild coloca o que ta entre () como filho do que vem antes do ponto

            }

            section.querySelector(".populares_container").appendChild(divContent) //adicionar a divContent dentro do container de populares. Como ainda estamos dentro do laço de repetição, irão ser criadas 5 divContent e será eecutado 5 vezes essa linha
            //section é o valor dinâmico da seção que pode e será: artistas, filmes e lançamentos
            //querySelector busca dentro do elemento mencionado, no caso "section" que será dinamico o valor declarado internamente. Como queremos buscar classe, colocamos um "." na frente do nome
            //usamos o appendChild colocando "divContent" que foi criado no laço de repetição


        }

    }
}
function createTop1(indice) {
    var requestAPI = new XMLHttpRequest(); //XMLHttpRequest é um objeto que fornece funcionalidade ao cliente para transferir dados entre um cliente e um servidor.
    requestAPI.open('GET', moviesRequestURL)
    requestAPI.responseType = 'json'
    requestAPI.send()

    requestAPI.onload = function () {
        var responseAPI = requestAPI.response.results
        var pathImage = `https://image.tmdb.org/t/p/w500${responseAPI[indice].poster_path}`
        document.querySelector(".top1_container_content_titulo span").innerText = indice + 1
        document.getElementsByClassName("top1_container_content_nome")[0].innerHTML = responseAPI[indice].title
        document.getElementsByClassName("top1_container_content_sinopse")[0].innerHTML = responseAPI[indice].overview
        document.querySelector(".top1_container_imagem").setAttribute("src", pathImage)
    }

}

function createTop2(indice, titulo, sinopse, imagem) {
    var pathImage = `https://image.tmdb.org/t/p/w500${imagem}` //mudar respondeAPI.poster_path, para pathImage
    document.querySelector(".top1_container_content_titulo span").innerText = indice + 1
    document.getElementsByClassName("top1_container_content_nome")[0].innerHTML = titulo
    document.getElementsByClassName("top1_container_content_sinopse")[0].innerHTML = sinopse
    document.querySelector(".top1_container_imagem").setAttribute("src", pathImage)


}

carregaDados(artistsRequestURL, sectionArtist)
carregaDados(moviesRequestURL, sectionMovie)
carregaDados(movieUpcomingRequestURL, sectionLancamentos)
createTop1(0)

//trailer
/*var trailerRequestURL = `https://api.themoviedb.org/3/movie/675353/videos?api_key=2f1a925c8c43d6a99e99cb33b29dcc36&language=pt-BR`
var trailerRequest = new XMLHttpRequest()
trailerRequest.open('GET', trailerRequestURL)
trailerRequest.responseType = 'json'
trailerRequest.send()

trailerRequest.onload = function () {
    var responseTrailer = trailerRequest.response;
    console.log(responseTrailer.results[0].key)
    document.getElementByClassId("trailer").src = `https://www.youtube.com/embed/${responseTrailer.results[0].key}`

}*/
