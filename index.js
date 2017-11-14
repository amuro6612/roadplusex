/**
 * http://usejsdoc.org/
 */

//var config = require('./config.json');

var fs = require('fs');

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mime = require('mime');

var cluster = require('cluster');
var os = require('os');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cpuCount = os.cpus().length;

var worker = [];

if(cluster.isMaster) {
    cluster.on('death', function(worker) {
        console.log('worker' + worker.pid + ' died --> start again');
        cluster.fork();
    });

    console.log('CPU Count:', cpuCount);
    for(var i = 0; i < cpuCount; i++) {
        worker[i] = cluster.fork();
    }
}
else {
    http.globalAgent.maxSockets = 1000000;

    var server = http.createServer(app);
	server.listen(app.get('port'), function(){
	 console.log('road-plus-ex server start');
	});
}

app.get('/', function(req,res) {
	//console.log(__dirname);
	 return res.send('roadplus-ex');
});

app.get('/routetraffic.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/routetraffic.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/getNoticeInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/getNoticeInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/getNewIncidentInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/getNewIncidentInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/broadvod.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/broadvod.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/broadcast.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/broadcast.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/routeInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/routeInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/roadInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/roadInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/nodeInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/nodeInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/mapInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/mapInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});


