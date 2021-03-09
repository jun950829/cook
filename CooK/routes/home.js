// routes/home.js

var express = require('express');
var router = express.Router();

var fs = require('fs');

// Home
router.get('/', function(req, res){
  res.render('home/welcome');
});
router.get('/about', function(req, res){
  res.render('home/about');
});

router.get('/projector', function(req, res){
	
		var dir = 'public/projector';
		var condition;
		var url;
		fs.readdir(dir, (err, filelist) => {
			condition = filelist.length -2 ;
			url = 'Clientfile_' + condition + '.png';
			console.log(filelist.length);
			console.log(url);
		});
		 
		setTimeout(function(){ console.log(condition); }, 2000);
		setTimeout(function(){res.render("home/test", {condition : condition, url : url})}, 1000);
	
	});


module.exports = router;