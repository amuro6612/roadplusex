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

app.get('/intro.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/intro.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});


app.get('/getNewNotice.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/getNewNotice.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/getNewFAQ.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/getNewFAQ.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/conzonedsrcInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/conzonedsrcInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/getRpInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/routeDetail.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/getPredictionInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/predictionInfo.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/mapAdditionInfo.do', function(req,res) {
	//console.log(__dirname);
	fs.readFile(__dirname + '/json' +  '/test.json', 'utf8', function(err, data) {
	    return res.send(data);
	});
});

app.get('/download', function(req,res) {
	//console.log(__dirname);
	
	 var file = __dirname + '/json' +  '/ROUSEN.zip';
	 var mimetype = mime.getType( 'ROUSEN.zip' );
	 var stats = fs.statSync(file);
	  
   res.setHeader('Content-disposition', 'attachment; filename=' + 'ROUSEN.zip' ); //origFileNm PC  
   res.setHeader('Content-type', mimetype);
   res.setHeader('Content-Length', stats["size"]);
   

   var filestream = fs.createReadStream(file);
   return filestream.pipe(res);
  

  
});

app.get('/ExpresswayDemo', function(req,res) {
	//console.log(__dirname);
	
	 var file = __dirname + '/json' +  '/ExpresswayDemo_.zip';
	 var mimetype = mime.getType( 'ExpresswayDemo_.zip' );
	 
	 var stats = fs.statSync(file);
   res.setHeader('Content-disposition', 'attachment; filename=' + 'ExpresswayDemo.zip' ); //origFileNm PC  
   res.setHeader('Content-type', mimetype);
   res.setHeader('Content-Length', stats["size"]);

   var filestream = fs.createReadStream(file);
   return filestream.pipe(res);
  

  
});

app.get('/ExpresswayDemo2', function(req,res) {
	//console.log(__dirname);
	
	 var file = __dirname + '/json' +  '/ExpresswayDemo(2).zip';
	 var mimetype = mime.getType( 'ExpresswayDemo(2).zip' );
	 
	 var stats = fs.statSync(file);
   res.setHeader('Content-disposition', 'attachment; filename=' + 'ExpresswayDemo.zip' ); //origFileNm PC  
   res.setHeader('Content-type', mimetype);
   res.setHeader('Content-Length', stats["size"]);

   var filestream = fs.createReadStream(file);
   return filestream.pipe(res);
  

  
});

app.get('/location', function(req,res) {
	//console.log(__dirname);
	
	 var file = __dirname + '/json' +  '/location.db';
	 var mimetype = mime.getType( 'location.db' );
	  
	 var stats = fs.statSync(file);
   res.setHeader('Content-disposition', 'attachment; filename=' + 'location.db' ); //origFileNm PC  
   res.setHeader('Content-type', mimetype);
   res.setHeader('Content-Length', stats["size"]);

   var filestream = fs.createReadStream(file);
   return filestream.pipe(res);
  

  
});

