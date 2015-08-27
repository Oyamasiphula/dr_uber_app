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
				console.log(err, status)
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

		for(issue in input){
			concat_issues += input[issue]+" ";
		}

		concat_issues = concat_issues.slice(0, concat_issues.length-1);

			connection.query("INSERT INTO ref_table (driver_details_id, issues) values((SELECT id FROM driver_details WHERE cell_number=? AND surname = ?), ?)", [driver_details.cell_number, driver_details.surname, concat_issues], function(err, status){
				if (err) {
					console.log(err, status)
					return next(err);
				};

				res.redirect('step4_ref_no')
			});
	});
}

exports.insert_driver_details = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) {
			return next(err);
		};

		var input = JSON.parse(JSON.stringify(req.body));

		connection.query("INSERT INTO driver_details (name, surname, cell_number, email) SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp WHERE NOT EXISTS (SELECT name,surname,cell_number,email FROM driver_details WHERE cell_number = ? AND email = ?) LIMIT 1", [input.name, input.surname, input.cell_number, input.email, input.cell_number, input.email], function(err, status){
			if (err) {
				console.log(err, status)
				return next(err);
			};

			res.redirect('/');
		})
	})
}

exports.get_ref_info = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) {
			return next(err);
		};

		var input = JSON.parse(JSON.stringify(req.body));

		connection.query("SELECT ref_no, date, surname FROM ref_table INNER JOIN driver_details ON driver_details_id = driver_details.id", function(err, status){
			if (err) {
				console.log(err, status)
				return next(err);
			};

			res.redirect('/');
		})
	})
}