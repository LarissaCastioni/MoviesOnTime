var artistsRequestURL = 'https://api.themoviedb.org/3/person/popular?api_key=2f1a925c8c43d6a99e99cb33b29dcc36';
var artistsRequest = new XMLHttpRequest(); //XMLHttpRequest é um objeto que fornece funcionalidade ao cliente para transferir dados entre um cliente e um servidor.
artistsRequest.open('GET', artistsRequestURL);
artistsRequest.responseType = 'json';
artistsRequest.send();

artistsRequest.onload = function () {
    var responseArtists = artistsRequest.response;
    for (var i = 0; i <= 4; i++) {
        document.getElementsByClassName("populares__artistas__nome")[i].innerHTML = responseArtists.results[i].name;
        document.getElementsByClassName("populares__artistas__imagem")[i].src = `https://image.tmdb.org/t/p/w500${responseArtists.results[i].profile_path}`;
    }
}


var moviesRequestURL = 'https://api.themoviedb.org/3/movie/popular?api_key=2f1a925c8c43d6a99e99cb33b29dcc36';
var moviesRequest = new XMLHttpRequest();
moviesRequest.open('GET', moviesRequestURL);
moviesRequest.responseType = 'json';
moviesRequest.send();

moviesRequest.onload = function () {
    var responseMovie = moviesRequest.response;
    for (var i = 0; i <= 4; i++) {
        document.getElementsByClassName("populares_filmes__nome")[i].innerHTML = responseMovie.results[i].title;
        document.getElementsByClassName("populares_filmes__imagem")[i].src = `https://image.tmdb.org/t/p/w500${responseMovie.results[i].poster_path}`;;
    }
}
