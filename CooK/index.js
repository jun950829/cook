// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var ejs = require('ejs');

	
//main
const fs = require('fs');
const request = require('request');

const clientId = '2mxjmtf3kg';
const clientSecret = 'RY38OwFP6KKE3tTLkPTOqDvwE8NiR3aGan4vJTnK';


// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://test_username:test_password@cluster0-u2mhd.mongodb.net/<dbname>?retryWrites=true&w=majority');
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));



// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts')); // 1
app.use('/rameon', require('./routes/rameon'));



////stt
//function stt(Kor, filePath) {
//    const url = `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=${Kor}`;
//    const requestConfig = {
//        url: url,
//        method: 'POST',	
//        headers: {
//            'Content-Type': 'application/octet-stream',
//            'X-NCP-APIGW-API-KEY-ID': clientId,
//            'X-NCP-APIGW-API-KEY': clientSecret
//        },
//        body: fs.createReadStream(filePath)
//    };
//
//    request(requestConfig, (err, response, body) => {
//        if (err) {
//            console.log(err);
//            return;
//        }
////
////        console.log(response.statusCode);
////        console.log(body);
//
//        
//        const obj = JSON.parse(body);
//        
//        
//        if ( obj.text == "안녕") {
//        	console.log ("안녕으로 인식했습니다.");
//        }
//        else {
//        	console.log ("인식불가")
//        }
//        
//    });
//}
//
//// Port setting
//var port = 3000;
//app.listen(port, function(){
//	
//  console.log('server on! http://localhost:'+port);
//});
//
//
//var WebSocketServer = require('websocket').server;
//var http = require('http');
//
//var server = http.createServer(function (req, res) {
//  console.log('Received request for ' + req.url);
//  res.writeHead(404);
//  res.end();
//});
//var server1 = http.createServer(function (req, res) {
//  console.log('Received request for ' + req.url);
//  res.writeHead(404);
//  res.end();
//});
//server.listen(8000, function () {
//  console.log('Server is listening on port 8000');
//});
//
//server1.listen(8001, function () {
//  console.log('Server is listening on port 8001');
//});
//wsServer = new WebSocketServer({
//  httpServer: server,
//  autoAcceptConnections: false
//});
//wsServer1 = new WebSocketServer({
//  httpServer: server1,
//  autoAcceptConnections: false
//});
//var connection;
//wsServer.on('request', function (request) {
//  connection = request.accept('example-echo', request.origin);
//  connection.on('message', function (message) {
//    if (message.type === 'utf8') {
//      console.log('Received message: ' + message.utf8Data);
//      connection.sendUTF(message.utf8Data);
//    }
//    else if (message.type === 'binary') {
//      connection.sendBytes(message.binaryData);
//    }
//
//    connection.on('close', function (reasonCode, description) {
//      console.log('Peer ' + connection.remoteAddress + ' disconnected.');
//    });
//  });
//});
//var connection1;
//wsServer1.on('request', function (request) {
//  connection1 = request.accept('example-echo', request.origin);
//  connection1.on('message', function (message) {
//    if (message.type === 'utf8') {
//      console.log('Received message: ' + message.utf8Data);
//      connection1.sendUTF(message.utf8Data);
//    }
//    else if (message.type === 'binary') {
//      connection1.sendBytes(message.binaryData);
//    }
//
//    connection1.on('close', function (reasonCode, description) {
//      console.log('Peer ' + connection.remoteAddress + ' disconnected.');
//    });
//  });
//});
//
//var SerialPort = require('serialport'),
//	portName = 'COM4',
//	sp = new SerialPort(portName),
//	sensorVal = 0;
//
//sp.on('open',function(){
//	console.log('serial port on');
//	
//	sp.on('data', function(data){
//		
//		console.log(typeof(data));
//		console.log("Value : " + data);
//		console.log(JSON.stringify(data));
//console.log(data.length());
//		console.log("type : " + type(data));
//      	connection.sendBytes(data);
//connection.send(String(data));
//	});
//});
