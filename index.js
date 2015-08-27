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

<<<<<<< HEAD
app.post('/issues', function(req, res){
	// do something with user data
=======
app.get('/issues', function(req, res, next){
	res.render('step2_issues')
})
app.post('/issues', dataServices.get_issues); 	


// app.post('/issues', function(req, res){
// 	// do something with user data
>>>>>>> fd4e96827446a47fb65c82d567cd46b4e0c66851

	res.render('step2_issues')
});

app.post('/step4_ref_no', dataServices.save_driver_issues);

app.get('/step4_ref_no', dataServices.get_ref_info)
// app.get('/users', function(req, res){
// 	res.render('users');
// }); 	

app.get('/issues', function(req, res){
	res.render('issues');
}); 	

var port = process.env.port || 2020;

	app.listen(port,function(){
		console.log(' *.*listening to localhost:' + port);
	});
