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

var myConnectionProvider = new connectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);

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
app.set("x-powered-by", false)

