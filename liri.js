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

// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the commands
var liriCommands = "";

// Capture all the words in the commands (again ignoring the first two Node arguments)
for (var i = 2; i < nodeArgs.length; i++) {

    // Build a string with the commands.
    liriCommands = liriCommands + "" + liriCommands[i];

    debugger;


    // See exercise 15 - Bank

    switch (liriCommands) {
        case "my-tweets":
            console.log(tweets);
            myTweets();
            break;

        case "spotify-this-song":
            thisSong();
            break;

        case "movie-this":
            thisMovie();
            break;

        case "do-what-it-says":
            doWhat();
            break;
    }

};


//Twitter 
var client = new Twitter(keys.twitter);

var params = { screen_name: 'thehodge36', count: 10 };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

//Request to grab OMDB
var omdbURL = 'http://www.omdbapi.com/?apikey=eb3fa0d5&' + thisMovie;

request(omdbURL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML.
});

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

