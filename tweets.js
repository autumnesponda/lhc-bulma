let request = require('request');
let config = require('./config.json');
let fetch = require('node-fetch');

const timestamp = () => {
    var d = new Date();
    var n = d.getTime();
    return n;
}

let auth = {
    oauth_consumer_key: config.consumerKey,
    consumer_secret: config.consumerKeySecret,
    oauth_token: config.accessToken,
    token_secret: config.accessTokenSecret,
    oauth_version: "1.0",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp()

}

let search_config = {
    url: config.searchURL
}

let query = {
    "query": "#littlehousecreative @Nicole_LHC omit_script=true"
}

let request_options = {
    //POST form with "body: query" below
    url: search_config['url'],

    oauth: auth,
    json: true,
    headers: {
        'content-type': 'application/json',
        'User-Agent': 'OAuth gem v0.4.4',
        'OAuth': auth
    },
    body: query
}

function getData() {
    return fetch(request_options['url'], {
            method: 'POST',
            headers: request_options['headers'],
            body: request_options['body']
        })
        .then(response => {
            console.log(response.json());
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        });
}

function getPost(request_options) {
    fetch(request_options['url'], {
            method: 'POST',
            headers: request_options['headers'],
            body: request_options['body']
        })
        .then(res => {
            return new Promise((resolve, reject) => {
                res.body.pipe(dest);
                res.body.on('error', err => {
                    reject(err);
                });
                dest.on('finish', () => {
                    resolve(res => res.json());
                });
                dest.on('error', err => {
                    reject(err);
                });
            });
        });
}

// POST request
request.post(request_options, function (error, response, body) {
    if (error) {
        console.log('Error making search request');
        console.log(error);
        return;
    }

    return body;
});

module.exports.getData = getData;