function page(request, response, global)
{
    let dataManager = global.dataManager;
    dataManager.GetMessageList(function (msglist)
    {
        response.write(JSON.stringify(msglist));
        response.end();
        
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["systemlist"] = page;
    sessionCheck["systemlist"] = require('../GlobalTokenCheck');
}