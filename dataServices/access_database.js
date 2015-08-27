var Promise = require("bluebird");

function QueryExecute(connection) {
    this.connection = connection;

    this.execute = function(query, data){
        data = data || [];
        return new Promise(function(accept, error){
            connection.query(query, data, function(err, results){
              if (err){
                return error(err)
              }
              accept(results);
            });
        })
    };
}

module.exports = function (connection) {
	var queryExecutor = new QueryExecute(connection); 

	this.show_issues = function () {
			return queryExecutor.execute('SELECT issue, id from issues_table');
	        
	};
}