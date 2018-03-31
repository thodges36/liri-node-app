//Tasks:
//variables: data keys; fs; twitter; spotify; request; arg to hold? 
//functions: find song from spotify; find latest tweets; find movie info; do what it says

//Requesting the npm package
var request = require("request");

require("dotenv").config();

//Twitter example from npm website
var twitter = require('twitter');
 
var params = {screen_name: 'thehodge36', count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

//Request info from npm website
var request = require('request');

request('http://www.omdbapi.com/?apikey=eb3fa0d5&', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML.
});

//Spotify example from npn website
var spotify = require('node-spotify-api');
 
spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
})
;


