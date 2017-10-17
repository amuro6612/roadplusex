/**
 * http://usejsdoc.org/
 */

//var config = require('./config.json');

var fs = require('fs');

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

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
	 return res.send('hellow world2');
});

app.get('/routetraffic.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/routetraffic.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});


