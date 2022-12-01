var http = require('http');

var port = 80;

console.log("sever run at " , port)



//create a server object:
http.createServer(function (req, res) {

    var url = req.url;

    //for(var key in req)
    // console.log("url=>",req[key],key);

    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response

}).listen(port); //the server object listens on port 8080