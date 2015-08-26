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

		connection.query('SELECT issue, id from issues_table', [], function(err, results) {
        	if (err){
        		return next(err);
        	}

    		res.render( 'step2_issues', {
    			issues : results
    		});
		});
	});
};

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
		})
	})
}