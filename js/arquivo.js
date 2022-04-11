var artistsRequestURL = 'https://api.themoviedb.org/3/person/popular?api_key=2f1a925c8c43d6a99e99cb33b29dcc36'
var artistsRequest = new XMLHttpRequest(); //XMLHttpRequest é um objeto que fornece funcionalidade ao cliente para transferir dados entre um cliente e um servidor.
artistsRequest.open('GET', artistsRequestURL)
artistsRequest.responseType = 'json'
artistsRequest.send()

artistsRequest.onload = function () {
    var responseArtists = artistsRequest.response
    for (var i = 0; i <= 4; i++) {
        document.getElementsByClassName("populares__artistas__nome")[i].innerHTML = responseArtists.results[i].name
        document.getElementsByClassName("populares__artistas__imagem")[i].src = `https://image.tmdb.org/t/p/w500${responseArtists.results[i].profile_path}`
    }
}


var moviesRequestURL = 'https://api.themoviedb.org/3/movie/popular?api_key=2f1a925c8c43d6a99e99cb33b29dcc36'
var moviesRequest = new XMLHttpRequest()
moviesRequest.open('GET', moviesRequestURL)
moviesRequest.responseType = 'json'
moviesRequest.send()

var responseMovie

moviesRequest.onload = function () {
    responseMovie = moviesRequest.response
    console.log(responseMovie)
    for (var i = 0; i <= 4; i++) {
        let releaseDate = responseMovie.results[i].release_date
        let newDate = releaseDate.split("-")

        document.getElementsByClassName("populares_filmes__imagem")[i].src = `https://image.tmdb.org/t/p/w500${responseMovie.results[i].poster_path}`
        document.getElementsByClassName("populares_filmes__data")[i].innerHTML = newDate[0]
        document.getElementsByClassName("populares_filmes__nome")[i].innerHTML = responseMovie.results[i].title
    }
    document.getElementsByClassName("populares_filmes__sinopse")[0].innerHTML = responseMovie.results[0].overview
    document.getElementsByClassName("populares_filmes__nometop1")[0].innerHTML = responseMovie.results[0].title

}
var trailerRequestURL = `https://api.themoviedb.org/3/movie/406759/videos?api_key=2f1a925c8c43d6a99e99cb33b29dcc36`
var trailerRequest = new XMLHttpRequest()
trailerRequest.open('GET', trailerRequestURL)
trailerRequest.responseType = 'json'
trailerRequest.send()

trailerRequest.onload = function () {
    var responseTrailer = trailerRequest.response;
    console.log(responseTrailer.results[0].key)
    document.getElementsByClassName("trailer").src = `https://www.youtube.com/embed/${responseTrailer.results[0].key}`

}






