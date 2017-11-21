const request = require('request');
const fs = require('fs');
const token = require('./secrets.js')
const repoOwner = process.argv[2];
const repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, callback) {
  
  var options = {
  	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  	headers: {
  		'User-Agent': 'bhavBains',
  		'Authorization': 'token ' + token.GITHUB_TOKEN
  	}
  };

  request(options, function(err, res, body){
  	var parsed = JSON.parse(body);
  	callback(err, parsed);
  });
}

function downloadImageByUrl(url, filePath){
	request.get(url)
		.on('error', function (err){
			throw console.log('rip', err);
		})

		.on('response', function (response){
			console.log('Response status code: ', response.statusCode);
		})
		.pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, function(err, contributors){
	console.log("errors: ", err);
	
	contributors.forEach(function(contributor){
		var filePath = 'avatar/' + contributor.login + '.jpg';
		var url =contributor.avatar_url;

		downloadImageByUrl(url, filePath);
	})
});