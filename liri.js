// assign required options
var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

// set global variables
var dataArr = [];
var a = process.argv[2];
var b = process.argv.splice(3).join(' ');

// log commands to the log file - log.txt
fs.appendFile('log.txt', process.argv + '\n', function (err) {
    if (err) {
        console.log(err);
    }
});

// functionalize the switch/case
if (a === 'do-what-it-says') {
    getThis();
    setTimeout(function () {
        switchCall();
    }, 100);
} else {
    switchCall();
}

function switchCall() {
    // select the option to run
    switch (a) {
        case "my-tweets":
            getTwitter();
            break;
        case "spotify-this-song":
            getSpotify(b);
            break;
        case 'movie-this':
            getMovie();
            break;
        // case 'do-what-it-says':
        // // read the input file (getThis()) and then select the option.
        //     getThis();
        //     setTimeout(function () {
        //         switch (dataArr[0]) {
        //             case 'my-tweets':
        //                 getTwitter();
        //                 break;
        //             case "spotify-this-song":
        //                 getSpotify(dataArr[1]);
        //                 break;
        //             case 'movie-this':
        //                 getMovie();
        //                 break;
        //             default:
        //                 break;
        //         }

        //     }, 100);
        //     break;
        default:
            break;
    }
}

// get twitter results
function getTwitter() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    var params = { screen_name: '@tsdcanavan' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (element) {
                fs.appendFile('log.txt', JSON.stringify(element, null, 2) + '\n', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log('Created at: ' + element.created_at);
                console.log(element.text);
                console.log("\n=============\n");
            });
            console.log(tweets.length);
        } else {
            console.log(error);
        }
    });
}

// get spotify results
function getSpotify(dataTrack) {
    var dataTrack;
    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });
    dataTrack = dataTrack.replace(/['"]+/g, '');
    if (!dataTrack) {
        var trackName = 'The Sign';
    } else {
        var trackName = dataTrack;
    }

    spotify
        .search({ type: 'track', query: trackName })
        .then(function (response) {
            response.tracks.items.forEach(function (element) {
                fs.appendFile('log.txt', JSON.stringify(element, null, 2) + '\n', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });

                if (element.name.toLowerCase() === trackName.toLowerCase()) {
                    console.log("Artist:", element.album.artists[0].name)
                    console.log("Track Name:", element.name);
                    console.log("Spotify song link:", element.album.external_urls.spotify);
                    console.log("Album Name:", element.album.name);
                    console.log("========End Of Track Info======================\n")
                }
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

// get movie results
function getMovie() {
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

// get the data from a file and do what it says.
// one command only
function getThis() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // log the data read from the file
        fs.appendFile('log.txt', data + '\n', function (err) {
            if (err) {
                console.log(err);
            }
        });

        // convert to an array
        dataArr = data.split(",");
        a = dataArr[0];
        b = dataArr[1];
    });
}