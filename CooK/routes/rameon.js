/**
 * http://usejsdoc.org/
 */

var express  = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');


//Index 
router.get('/', function(req, res){
	
	
	//폴더 안의 파일내용을 읽어 실행 시킬지 말지 판단
	fs.readFile('public/sync_text.txt', 'utf-8', function(err, data) {
		if (err) throw err;
		 
	    var newValue = data.replace(/True/gim, 'False');
	 
	    fs.writeFile('public/sync_text.txt', newValue, 'utf-8', function(err, data) {
	        if (err) throw err;
	        console.log('Done!');
	    })
	})
	
	fs.readFile('public/sync_text.txt', 'utf-8', function(err, data) {
		if (err) throw err;
		 
	    var newValue = data.replace(/10/gim, '0');
	 
	    fs.writeFile('public/sync_text.txt', newValue, 'utf-8', function(err, data) {
	        if (err) throw err;
	        console.log('Done!');
	    })
	})
	
	  res.render('rameon/index');
	});
//second page
router.get('/2step', function(req, res){
	fs.readFile('public/sync_text.txt', 'utf-8', function(err, data) {
		if (err) throw err;
		 
	    var newValue = data.replace(/T-10/gim, 'F-0');
	 
	    fs.writeFile('public/sync_text.txt', newValue, 'utf-8', function(err, data) {
	        if (err) throw err;
	        console.log('Done!');
	    })
	})
	
	res.render('rameon/2step'); 
});


//third page
router.get('/3step', function(req, res){
	fs.readFile('public/sync_text.txt', 'utf-8', function(err, data) {
		if (err) throw err;
		 
		
		//자르는 선 만드는 파일 실행
	    var newValue = data.replace(/F-0/gim, 'T-10');
	 
	    fs.writeFile('public/sync_text.txt', newValue, 'utf-8', function(err, data) {
	        if (err) throw err;
	        console.log('Done!');
	    })
	})
	
	res.render('rameon/3step');
});
//fourthpage
router.get('/4step', function(req, res){
	fs.readFile('public/sync_text.txt', 'utf-8', function(err, data) {
		if (err) throw err;
		 
	    var newValue = data.replace(/T-10/gim, 'F-0');
	 
	    fs.writeFile('public/sync_text.txt', newValue, 'utf-8', function(err, data) {
	        if (err) throw err;
	        console.log('Done!');
	    })
	})
	

	
	res.render('rameon/4step');
});

app.use(express.static("../public"));

module.exports = router;