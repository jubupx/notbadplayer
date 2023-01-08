function page(request, response, global)
{
    let token = request.headers.token;
    let accessinfo = global.tokens[token];

    ///超级管理员才可以

    if(!accessinfo.issuper)
    {
        response.write('[]');
        response.end();

        return;
    }


    let dataManager = global.dataManager;
    dataManager.GetUserInfos(function (userinfos)
    {
        response.write(JSON.stringify(userinfos));
        response.end();
        
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["userlist"] = page;
    sessionCheck["userlist"] = require('../GlobalTokenCheck');
}