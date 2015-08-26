exports.get_issues = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){
			return next(err);
		}
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