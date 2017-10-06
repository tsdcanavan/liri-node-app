var modTwitter = require('./liri-twitter');
var modMovie = require('./liri-movie');
var modSpotify = require('./liri-spotify');

switch (process.argv[2]) {
    case "my-tweets":
        var runTwitter = new modTwitter;
        runTwitter.getTwitter();
        break;
    case "movie-this":
        var runMovie = new modMovie;
        runMovie.getMovie();
        break;
    case "spotify-this-song":
        var runSpotify = new modSpotify;
        runSpotify.getSpotify(process.argv.splice(3).join(" "));
        break;
}
