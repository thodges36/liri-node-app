//Tasks:
//variables: data keys; fs; twitter; spotify; request; arg to hold? 
//functions: find song from spotify and display info; find latest tweets and display; find movie info and display; do what it says

//Must be able to: 
//`my-tweets`; `spotify-this-song`; `movie-this`

//Set environment variables with dotenv package
require("dotenv").config();

//Data keys per keys.js
var dataKeys = require("./keys.js");

//Requesting the npm package and others
var fs = require('fs');
var request = require("request");
var Twitter = require("twitter");
var spotify = require("node-spotify-api");


// The first will be the liri command
// The second will be the specific request
var liriCommand = process.argv[2];
var value = process.argv[3];

// See exercise 15 - Bank
switch (liriCommand) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        thisSong(value);
        break;

    case "movie-this":
        thisMovie(value);
        break;

    case "do-what-it-says";
        doWhatItSays();
        break;
}

//If "my-tweets" is called, this function is used:
function myTweets() {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'thehodge36', count: 10 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};

//If "movie-this" is called, request to grab OMDB info: 
function thisMovie(value) {

    // Create an empty variable for holding the movie name
    var thisMovie = "";

    // Loop through all the words in the node argument
    for (var i = 2; i < value.length; i++) {

        if (i > 2 && i < value.length) {

            thisMovie = thisMovie + "+" + value[i];

        }

        else {

            thisMovie += value[i];

        }
    }

    var omdbURL = 'http://www.omdbapi.com/?apikey=eb3fa0d5&' + thisMovie;

    if (thisMovie === undefined) {
        thisMovie = "Mr. Nobody";
    }

    request(omdbURL, function (error, response, body) {
        console.log("Release Year: " + JSON.parse(body).Year);
    });

};

//If "spotify-this-song" is called, this function is used:
function thisSong(trackName) {

    var spotify = new Spotify(keys.spotify);

    if (trackName === undefined) {
        trackname = "The Sign";
    }
    spotify.search({ type: 'track', query: trackName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
    console.log(thisSong);
};

// This "do-what-it-says" function is ran:
function doWhatItSays() {

    // Running the readFile module that's inside of fs.
    // Stores the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {

            // Print each element (item) of the array/
            console.log(output[i]);
        }
    });
};