/* this is were I call the file to get the keys for tweets, spotify, and OMDB API */
var keys = require("./keys.js")
 console.log(keys);

 var Twitter = require('twitter');
 
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

var getSpotify = function(){
	var 
}
/*Here are my switch cases to pick a function to run depending on what the user is looking for */
var pick = function(searchType, searchInput){
	switch (searchType){
		case "my-tweets":
			getTweets();
			break;
		case "spotify-this-song":
			 getSpotify();
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