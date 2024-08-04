function page(request, response, global)
{
    let token = request.headers.token;
    let accessinfo = global.tokens[token];

    let dataManager = global.dataManager;
    dataManager.GetCarInfos(function (userinfos)
    {
        response.write(JSON.stringify(userinfos));
        response.end();
    });

}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["carlist"] = page;
    sessionCheck["carlist"] = require('../GlobalTokenCheck');
}