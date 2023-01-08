function page(request, response, global)
{
    let accessinfo = global.tokens[request.headers.token];
    let userinfo = accessinfo.userinfo;
    let dataManager = global.dataManager;

    let queryString = request.urlpart2;
    let urlParams = new URLSearchParams(queryString);

    let datetype = urlParams.get("datetype");
    let username = urlParams.get("username");

    if(!datetype || datetype == "null") datetype = "undefined";
    if(!username || username == "null") username = "undefined";


    if(datetype == "undefined") datetype = "today";//all yesterday

    let currtime = 0;

    if(datetype == "today") {
        currtime = new Date().setHours(0,0,0, 0);
    }else if(datetype == "yesterday") {
        currtime = new Date().setHours(0,0,0, 0) - (24 * 60 * 60 * 1000);
    }


    if(!accessinfo.issuper && username != userinfo.name) {
        username = userinfo.name;
    }else if(username == "undefined") {
        username = "";
    }


    dataManager.GetMessageList(function (msglist)
    {
        let newlist = [];

        for(let msg of msglist){

            if(username == "" || username == msg.username) {

                if(     currtime == 0
                    || (new Date(parseInt(msg.date, 10)).setHours(0, 0,0, 0) == currtime) ) {

                    newlist.push(msg);
                }

            }
        }

        response.write(JSON.stringify(newlist));
        response.end();
        
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["list"] = page;
    sessionCheck["list"] = require('../GlobalTokenCheck');
}