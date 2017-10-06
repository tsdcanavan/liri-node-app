var fs = require('fs');
var request = require("request");

var ModMovie = function () {
// get movie results
this.getMovie = function () {
    if (!process.argv[3]) {
        var movieName = 'Mr. Nobody'
    } else {
        movieName = process.argv.splice(3).join(" ");
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            fs.appendFile('log.txt', JSON.stringify(body, null, 2) + '\n', function (err) {
                if (err) {
                    console.log(err);
                }
            });

            console.log("Your movie: " +
                JSON.parse(body).Title);
            console.log("The release year: " +
                JSON.parse(body).Year);
            console.log("The IMDB rating: " +
                JSON.parse(body).imdbRating);
            console.log("The Rotten Tomatoes rating: " +
                'JSON.parse(body).imdbRating');
            console.log("The production country: " +
                JSON.parse(body).Country);
            console.log("The movie language: " +
                JSON.parse(body).Language);
            console.log("The plot: " +
                JSON.parse(body).Plot);
            console.log("The actors: " +
                JSON.parse(body).Actors);

        }

    });
}
}

module.exports = ModMovie;