var express = require('express');
var app = express();
var port = process.env.PORT || 8008;
var bodyParser = require('body-parser');
var Path = require('path');
var mysql = require('mysql');
var env = process.env.NODE_ENV || "development";
if (env === "development") {
	var pool = mysql.createPool({
	  host: "localhost",
	  user: "root",
	  password: null,
	  database: "givepulse_test"
	});
} else {
	var pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
}

var assetFolder = Path.resolve(__dirname, '../client/');
app.use( express.static(assetFolder) );
app.use( bodyParser.json() );

app.get('/data', function(req, res) {
	pool.getConnection(function(err, connection){
		if(err) {
			console.log('Error connecting to givepulse_test:', err);
    	return;
		}
		var query = 'select sum(duration_hours) hours, groups.type' + 
								' from groups, events, impacts' + 
								' where groups.id = events.group_id' +
								' and events.id = impacts.event_id' +
								' group by groups.type';
		console.log('query', query);
		connection.query(query, function(err, rows) {
			connection.release();
			res.send(rows);
		});
	});
});

app.get('/data2', function(req, res) {
	pool.getConnection(function(err, connection){
		if(err) {
			console.log('Error connecting to givepulse_test:', err);
	  	return;
		}
		var query2 = 'select skills_by_event.skill, events, users from' + 
								' (select skills.skill, count(events.id) events' +
								' from skills, event_skills, events' +
								' where event_skills.event_id = events.id' +
								' and event_skills.skill_id = skills.id' +
								' group by skills.skill) skills_by_event,' +
								' (select skills.skill, count(users.id) users' +
								' from skills, user_skills, users' +
								' where skills.id = user_skills.skill_id' +
								' and users.id = user_skills.user_id' +
								' group by skills.skill) skills_by_users' +
								' where skills_by_event.skill = skills_by_users.skill';
		console.log('query2', query2);
		connection.query(query2, function(err, rows) {
			connection.release();
			res.send(rows);
		});
	});
});


// Start the server!
app.listen(port);
console.log("Listening on port", port);