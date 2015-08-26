var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session');

var dbOptions = {
		host: 'localhost',
		user: 'uber',
		password: 'Uber_Uber123',
		port: 3306,
		database: 'uber_data'
	};

app = express();

app.use(myConnection(mysql, dbOptions, 'pool'));

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use("/static", express.static("views"))
app.use("/static", express.static("."))

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({secret: "yada yada", saveUninitialized : false, resave: true, cookie : {maxAge : 5*60000}}));
app.set("x-powered-by", false);

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
