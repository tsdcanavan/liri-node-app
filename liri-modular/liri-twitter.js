var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');

var ModTwitter = function () {
    this.getTwitter = function(){
    // get twitter results
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
}

module.exports = ModTwitter;