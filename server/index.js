var express = require('express');
var app = express();
var port = process.env.PORT || 8008;
var bodyParser = require('body-parser');
var Path = require('path');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "givepulse_test"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to givepulse_test');
    return;
  }
  console.log('Connection established to givepulse_test');
});

var assetFolder = Path.resolve(__dirname, '../client/');
app.use( express.static(assetFolder) );
app.use( bodyParser.json() );

app.get('/data', function(req, res) {
	var query = 'select sum(duration_hours) hours, groups.type' + 
							' from groups, events, impacts' + 
							' where groups.id = events.group_id' +
							' and events.id = impacts.event_id' +
							' group by groups.type';
	console.log('query', query);
	con.query(query, function(err, rows){
		console.log('rows', rows)
		res.send(rows);
	})
})


// Start the server!
app.listen(port);
console.log("Listening on port", port);