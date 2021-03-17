module.exports = (data)=>{
return new Promise((resolve,reject)=>{
	let mysql = require('mysql');
	let con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "umdeny"
	});
	con.connect(function(err) {
	  if (err) throw err;
	  con.query("CREATE DATABASE IF NOT EXISTS umdeny", function (err, result) {
	    if (err) throw err;
	    resolve(con);
	  });
	});
  });
}