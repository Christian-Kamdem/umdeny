module.exports = (data)=>{
return new Promise((resolve,reject)=>{
	require('./../helpers/db.js')().then((con)=>{
		function encodebase64(data){
			let buf = Buffer.from(data, 'utf8');
			return buf.toString('hex');
		}
		function decodebase64(data){
			let buf = Buffer.from(data, 'hex');
			return buf.toString('utf8');
		}
		let sql = 'SELECT * FROM users WHERE email = ? OR password = ?';
		con.query(sql, [data.email, decodebase64(data.password)], function (err, result) {
		  if (err) throw err;console.log(result[0].tutor);
		  	resolve({
		    	token:result[0].code,
		    	email:data.email,
		    	tutor:result[0].tutor=='none'?'none':decodebase64(result[0].tutor)
		    });
		});
	});
  });
}