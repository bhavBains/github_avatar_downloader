const request = require('request');
const token = require('./secrets.js')
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // console.log("hello world");
  // return "hello wold"
  var options = {
  	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  	headers: {
  		'User-Agent': 'bhavBains',
  		'Authorization': ('token ' + token.GITHUB_TOKEN)
  	}
  };

  request(options, function(err, res, body){
  	var parsed = JSON.parse(body);
  	cb(err, parsed);
  });


}

function getAvatarUrl(contributors) {
	contributors.forEach((contributors)=>{
		console.log(contributors.avatar_url);
	})
}

getRepoContributors("jquery", "jquery", function(err, result){
	console.log("errors: ", err);
	//console.log("result: ", result);
	getAvatarUrl(result);
});