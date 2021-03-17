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
			const code = encodebase64(data.email);
			const tutor = data.tutor!=''?'none':data.tutor;
			const password = encodebase64(data.password);
		  	let sql = 'INSERT INTO users (email, password, tutor, code) VALUES ?';
		  	let values = [[data.email,password,tutor,code]];
		con.connect(function(err) {
		  con.query(sql,[values],function (err, result) {
		    if (err) throw err;
		    resolve({
		    	token:code,
		    	email:data.email,
		    	tutor:tutor=='none'?'none':decodebase64(tutor)
		    });
		  });
		});
	});
  });
}