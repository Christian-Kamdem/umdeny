module.exports = (data)=>{
return new Promise((resolve,reject)=>{
	let MongoClient = require('mongodb').MongoClient;
	let url = "mongodb://localhost:27017/umdeny";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database created!");
	  resolve(db);
	  db.close();
	});
  });
}