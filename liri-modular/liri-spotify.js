var keys = require('./keys.js');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var ModSpotify = function(){
// get spotify results
this.getSpotify = function(dataTrack) {
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
}
module.exports = ModSpotify;