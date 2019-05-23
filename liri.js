
 require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const Spotify = require("node-spotify-api");

 
let comd = process.argv[2];
let action = process.argv[3];


var queryUrlConcert = "https://rest.bandsintown.com/artists/"+ action +"/events?app_id=codingbootcamp"
var queryUrlMovie = "http://www.omdbapi.com/?t=" + action + "&y=&plot=short&apikey=trilogy";
 

switch(comd){
    case "concert-this":
    concertThis();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;

    case "spotify-this-song":
    spotifyThisSong();
    break;
}


function concertThis() {
    
  
    axios.get(queryUrlConcert).then(function(response) {
      var obj = response.data;
      for (i = 0; i < 5; i++) {
        //console.log(response[i])
        console.log("**********************");
        console.log("Venue: " + obj[i].venue.name);
        console.log("Country: " + obj[i].venue.country);
        console.log("City: " + obj[i].venue.city);
        console.log("Date " + moment(obj[i].datetime).format("l"));
      }
    });
  }

function movieThis(){
console.log(queryUrlMovie);

axios.get(queryUrlMovie).then(
  function(response) {  
      const film = response.data
    console.log("The Title is: " +film.Title )
    console.log(  "Release Year: " + film.Year)
    console.log("Rotten Tomatoes Rating of the movie; "+ film.Ratings.Value)
    console.log( "This movie was produced in: " +film.Country)
    console.log("The language of the movie is: "+ film.Language )
    console.log("The plot of the movie is: "+film.Plot)
    console.log("The actors that played in this movie are: "+ film.Actors)
    
  })
}


// Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.     

function songs(){
    const spotify = new Spotify({
          id: keys.spotify.id,
          secret: keys.spotify.secret
        });
   
        spotify.search({ type: "track", query: info }, function(err, data) {
          if (!err) {
        for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
                      //artist
            console.log("Artist: " + songData.artists[0].name);
                      //song name
            console.log("Song: " + songData.name);
                      //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
                      //album name
            console.log("Album: " + songData.album.name);
            console.log("------------------------------------------------------------------------------");
            }
          }
          else{
            console.log('Error occurred.');
          }
   
          });
   
        }