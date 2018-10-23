let config = require('./config.json');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerKeySecret,
    access_token_key: config.accessToken,
    access_token_secret: config.accessTokenSecret
});

var params = {
    screen_name: 'Nicole_LHC'
};

function getData() {
    client.get('search/tweets', {
        q: '#littlehousecreative'
    }, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        console.log(error);
    });
}

module.exports.getData = getData;