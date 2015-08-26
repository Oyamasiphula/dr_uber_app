var express = require('express'),
	exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('./public' ));

app.get('/', function(req, res){
	res.render('users')
}); 

app.post('/step/1', function(req, res){
	// do something with user data

	res.render('step2')
});

app.post('/step/2', function(req, res){
	// do something with user data

	res.render('step3')
});


app.get('/users', function(req, res){
	res.render('users');
}); 	

app.get('/issues', function(req, res){
	res.render('issues');
}); 	

var port = process.env.port || 2000;

	app.listen(port,function(){
		console.log(' *.*listening to localhost:' + port);
	});
