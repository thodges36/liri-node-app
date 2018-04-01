//Tasks:
//variables: data keys; fs; twitter; spotify; request; arg to hold? 
//functions: find song from spotify and display info; find latest tweets and display; find movie info and display; do what it says

//Must be able to: 
//`my-tweets`; `spotify-this-song`; `movie-this`; and `do-what-it-says`

//Set environment variables with dotenv package
require("dotenv").config();

//Data keys per keys.js
var dataKeys = require("./keys.js");

//Requesting the npm package and others
var fs = require('fs');
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");


// The first will be the liri command
// The second will be the specific request
var command = process.argv[2];
var value = process.argv[3];

// See exercise 15 - Bank
switch (command) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        thisSong(value);
        break;

    case "movie-this":
        thisMovie(value);
        break;

    case "do-what-it-says":
        doWhat();
        break;
}


//If "my-tweets" is called, this function:
function myTweets() {

    var twitter = new Twitter(keys.twitter);

    var params = { screen_name: 'thehodge36', count: 10 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};

//If "movie-this" is called, request to grab OMDB
function thisMovie(movie) {

    if (movie === undefined){
        movie = "Mr. Nobody";
    }

    var omdbURL = 'http://www.omdbapi.com/?apikey=eb3fa0d5&' + movie;

    request(omdbURL, function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body); 
    });
};


//Spotify
var spotify = new Spotify(keys.spotify);

var getSpotify = function (trackName) {

    if (trackName === undefined) {
        trackname = "The Sign";
    }
    spotify.search({ type: 'track', query: trackName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
};

