/* this is were I call the file to get the keys for tweets, spotify, and OMDB API */
var keys = require("./keys.js") 
var fs = require('fs'); //file system
var Twitter = require('twitter');
var Spotify = require('spotify');
console.log(keys);

/*this is the function to get my tweets */
var getTweets = function(){ 
	var client = new Twitter(
 	 keys.twitterKeys
	);
	var params = {screen_name: 'cnn'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	    /*console.log(tweets);*/
	    for (var i = 0; i < tweets.length; i++){
	    	console.log(tweets[i].text); 
	    	console.log("");
	    	console.log(tweets[i].created_at)
	    }

	  }
	});
}

var getSpotify = function(songName){

	if (songName === undefined) {
		songName = "The Sign"
	}


spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
	console.log('Error occurred: ' + err);
	return;
  }

  var songs = data.tracks.items;
  var data = []; //empty array for the data

  for (var i = 0; i < songs.length; i++)
  	data.push({
  		'artist: ': songs[i].artists.map(getArtistNames),
  		'song name: ': songs[i].preview_url,
  		'album: ': songs[i].album.name,

  		});
	
 
	console.log(data); 

	});
};




var getMovie = function(movieName) {

	if (movieName === undefined){
		movieName = 'Mr Nobody';
	}

	var urlHit = "httpp://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

	request(urlHit, function(error, response, body) {
		if (!error && response.statusCode == 200){
			var data = [];
			var jsonData = JSON.parse(body);

			data.push({
      		'Title: ' : jsonData.Title,
      		'Year: ' : jsonData.Year,
      		'IMDB Rating: ' : jsonData.imdbRating,
      		'Country: ' : jsonData.Country,
      		'Language: ' : jsonData.Language,
      		'Plot: ' : jsonData.Plot,
      		'Actors: ' : jsonData.Actors,
      		'Rotton Tomatoes URL: ' : jsonData.tomatoURL,

		});
			console.log(data);
			
}	
	});
}

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    writeToLog(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }

  });


/*Here are my switch cases to pick a function to run depending on what the user is looking for */
var pick = function(searchType, searchInput){
	switch (searchType){
		case "my-tweets":
			getTweets();
			break;
		case "spotify-this-song":
			 getSpotify(searchInput);
			 break;
		case "movie-this":
			 getMovie(searchInput);
			 break;
		case "do-what-it-says":
			 doWhatItSays();
			 break;
		default:
			console.log("Oops")

	}




}




// Function which takes in command line arguments and executes correct function accordigly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);



console.log(process.argv[2])
process.argv.slice(2)
console.log(process.argv.slice(2))