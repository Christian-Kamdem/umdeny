const http = require('http');
const url = require('url');
const endpoint = ['registration','authentification'];
/*
require('./helpers/saveDataToRedis.js')().then((response)=>{
  console.log(response);
});
*/
  http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let body = [];
    let bufferError = false;
    req.on('error',(err)=>{
      console.log(err);
    });
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      let dataToSend = {};
      try{
        dataToSend = JSON.parse(Buffer.concat(body).toString());
      }catch(error){
        console.log(error);
        bufferError = true;
      }
          if(bufferError === false && endpoint.includes(dataToSend.requestName) === true){
            let module_file = require('./modules/'+dataToSend.requestName+'.js')(dataToSend.data).then((response)=>{
              res.end(JSON.stringify({message:response}));
            });
          }else{
              res.end(JSON.stringify({message:'Command name not found!'}));
          }
    });
  }).listen(8080);
