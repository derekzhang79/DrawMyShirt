var express = require('express');

var app = express();

app.get('/add', function(req, res) {
	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://tomobil.firebaseio.com/test/');
	myRootRef.push({name: 'dd', text: 'tsd'});
    res.setHeader('Content-Type', 'text/plain');
    res.end('ajouter');
});


app.listen(8080);