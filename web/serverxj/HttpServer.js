var http = require('http');
var querystring = require('querystring');



var httpHandlers = {};
var sessionCheck = {};

var global = {};

global.tokens = {};

global.makeid = function(length)
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

global.makeAccessInfo = function (userinfo) {
    let accessinfo = {};

    accessinfo.userinfo = userinfo;
    accessinfo.token = global.makeid(8);

    ///超级管理员权限标志
    if(userinfo.flag >= 0xfff)
    {
        accessinfo.token = "@" + accessinfo.token;
        accessinfo.issuper = true;
    }

    global.tokens[accessinfo.token] = accessinfo;

    return accessinfo;
};

global.deleteToken = function (token) {
    let accessinfo = global.tokens[token];

    if (accessinfo != null) {
        delete global.tokens[token];
    }
    else {
        console.log("token is not found, but quit can success!!");
    }
};

global.deleteTokenByUser = function (username) {
    for(let key in  global.tokens)
    {
        let accessinfo = global.tokens[key];
        if(accessinfo.userinfo.name == username)
        {
            global.deleteToken(accessinfo.token);
            break;
        }
    }
};


const DataManager = require('./DataManager');
global.dataManager = new DataManager();


///注册页面处理

require('./handler/index').init(httpHandlers, sessionCheck);
require('./handler/list').init(httpHandlers, sessionCheck);
require('./handler/login').init(httpHandlers, sessionCheck);
require('./handler/systemlist').init(httpHandlers, sessionCheck);
require('./handler/add').init(httpHandlers, sessionCheck);
require('./handler/reqmsg').init(httpHandlers, sessionCheck);
require('./handler/app').init(httpHandlers, sessionCheck);
require('./handler/delete').init(httpHandlers, sessionCheck);


require('./handler/userlist').init(httpHandlers, sessionCheck);
require('./handler/userop').init(httpHandlers, sessionCheck);


///处理HTTP的请求数据
function OnProcessHttp(request, response, callback)
{
    if(request.method == 'POST')
    {
        var queryData = "";

        request.on('data', function(data)
        {
            queryData += data;
            /// > 5m error
            if(queryData.length > 0x500000)
            {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function()
        {
            request.postData = querystring.parse(queryData);
            if(callback)
                callback(request, response, global);
        });
    }else if(callback) {

            callback(request, response, global);
        }
}



function StartServer(config) {

    if(!config){
        config = {port: 80};
    }

    console.log("sever run at " , config.port);
    //create a server object:
    http.createServer(function (request, response) {
        var url = request.url;
        var urlparts = url.replace("/", "").split("?");
        var mapname = urlparts[0];

        request.urlpart2 = urlparts[1];

        if (!mapname || mapname == "")
            mapname = "index";

        var sCheck = sessionCheck[mapname];
        if (sCheck && !sCheck(request, response, global)) {
            ///sCheck需要处理回包的情况...
            return;
        }

        var handler = httpHandlers[mapname];
        if (handler) {
            //handler(request, response, global);
            OnProcessHttp(request, response, handler);

        } else {

            //for(var key in req)
            // console.log("url=>",req[key],key);

            response.write('{"msg":"page not found!"}'); //write a response to the client
            response.end(); //end the response
        }

    }).listen(config.port); //the server object listens on port 8080

}


global.dataManager.Read("config", function (ret, data) {

    let config = null;
    if(ret){
        config = JSON.parse(data);
        if(!config.port)
            config.port = 80;
    }

    StartServer(config);
});