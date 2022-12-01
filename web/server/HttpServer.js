var http = require('http');

var port = 81;

console.log("sever run at " , port);

var httpHandlers = {};
var global = {};

const DataManager = require('./DataManager');
global.dataManager = new DataManager();


require('./handler/index').init(httpHandlers);
require('./handler/list').init(httpHandlers);
require('./handler/login').init(httpHandlers);

//create a server object:
http.createServer(function (request, response) {

    var url = request.url;
    var mapname = url.replace("/","").split("?")[0] ;

    if(!mapname || mapname == "")
        mapname = "index";

    var handler = httpHandlers[mapname];
    if(handler) {
        handler(request, response, global);
    } else {

        //for(var key in req)
        // console.log("url=>",req[key],key);

        response.write('page not found!'); //write a response to the client
        response.end(); //end the response
    }

}).listen(port); //the server object listens on port 8080