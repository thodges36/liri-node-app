//Tasks:
//variables: data keys; fs; twitter; spotify; request; arg to hold? 
//functions: find song from spotify and display info; find latest tweets and display; find movie info and display; do what it says

//Must be able to: 
//`my-tweets`; `spotify-this-song`; `movie-this`; do-what-it-says

//Set environment variables with dotenv package
require("dotenv").config();

//Data keys per keys.js
var dataKeys = require("./keys.js");

//Requesting the npm package and others
var fs = require('fs');
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");


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
        thisSong();
        break;

    case "movie-this":
        thisMovie();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

//If "my-tweets" is called, this function is used:
function myTweets() {

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = { screen_name: 'thehodge36', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("--------");
                console.log("Created at: " + tweets[i].created_at);
                console.log("Text: " + tweets[i].text);
                console.log("--------");
            }
        }
    });
};

//If "movie-this" is called, request to grab OMDB info: 
function thisMovie() {

    if (value !== "") {
        value = "Mr. Nobody";
        'http://www.omdbapi.com/?apikey=eb3fa0d5&t=' + value;
    }
    request('http://www.omdbapi.com/?apikey=eb3fa0d5&t=' + value,
        function (error, response, body) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot);
        });
};

//If "spotify-this-song" is called, this function is used:
function thisSong(song) {

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    // If no song is provided, default to 'The Sign' by Ace Of Base
    if (song === '') {
        search = 'The Sign';
    } else {
        search = song;
    }

    spotify.search({ type: 'track', limit: 1, query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
    });
};

//If "do-what-it-says" is called, this function is used:
function doWhatItSays() {

    // Running the readFile module that's inside of fs.
    // Stores the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        value = data;
        console.log(data);

    });
};