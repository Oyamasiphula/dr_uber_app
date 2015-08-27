driver_details = {}

exports.get_issues = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next(err);

		var input = JSON.parse(JSON.stringify(req.body));

		driver_details.name = input.name,
		driver_details.surname = input.surname,
		driver_details.cell_number = input.cell_number,
		driver_details.email = input.email

		connection.query("INSERT INTO driver_details (name, surname, cell_number, email) SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp WHERE NOT EXISTS (SELECT name,surname,cell_number,email FROM driver_details WHERE cell_number = ? AND email = ?) LIMIT 1", [input.name, input.surname, input.cell_number, input.email, input.cell_number, input.email], function(err, status){
			if (err) {
				console.log(err)
				return next(err);
			};
			connection.query('SELECT issue, id from issues_table', [], function(err, results) {
	        	if (err){
	        		return next(err);
	        	}

	    		res.render( 'step2_issues', {
	    			issues : results,
	    			details : driver_details
	    		});
			});
		});
	});
};

exports.save_driver_issues = function (req, res, next) {
	req.getConnection(function(err, connection){
		if(err){
			return next(err);
		}

		var input = JSON.parse(JSON.stringify(req.body));
		concat_issues = "";
		// console.log(input)


		concat_issues += (input.issues).toString();

		// concat_issues = concat_issues.slice(0, concat_issues.length-1);
		// console.log(concat_issues)
		driver_details.date = input.date;

			connection.query("INSERT INTO ref_table (driver_details_id, issues, date) values((SELECT id FROM driver_details WHERE cell_number=? AND surname = ?), ?, ?)", [driver_details.cell_number, driver_details.surname, concat_issues, input.date], function(err, status){
				if (err) {
					console.log(err)
					return next(err);
				};

				connection.query("SELECT ref_no, date, surname FROM ref_table INNER JOIN driver_details ON driver_details_id = driver_details.id WHERE date=?",driver_details.date, function(err, results){
					if (err) {
						console.log(err, results)
						return next(err);
					};
					console.log(results)
					res.redirect('/');
				})
			});
	});
}

exports.insert_driver_details = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) {
			return next(err);
		};

		var input = JSON.parse(JSON.stringify(req.body));

		connection.query("INSERT INTO driver_details (name, surname, cell_number, email) SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp WHERE NOT EXISTS (SELECT name,surname,cell_number,email FROM driver_details WHERE cell_number = ? AND email = ? AND date=?) LIMIT 1", [input.name, input.surname, input.cell_number, input.email, input.cell_number, input.email, driver_details.date], function(err, results){
			if (err) {
				console.log(err)
				return next(err);
			};
			console.log(results)
			res.redirect('/');
		})
	})
}

exports.get_ref_info = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) {
			return next(err);
		};

		// var input = JSON.parse(JSON.stringify(req.body));

		connection.query("SELECT ref_no, date, surname FROM ref_table INNER JOIN driver_details ON driver_details_id = driver_details.id", function(err, results){
			if (err) {
				console.log(err, results)
				return next(err);
			};
			console.log(results)
			res.redirect('/');
		})
	})
}