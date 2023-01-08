function page(request, response, global)
{
    let queryString = request.urlpart2;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    if(!id)
    {
        response.write('{"msg":"数据为空"}');
        response.end();

        return;
    }

    let dataManager = global.dataManager;
    dataManager.DeleteMessageByID(id, function (ret, msg)
    {
        ret     ?   response.write('{}')
                :   response.write('{"msg":"'+ msg +'"}');

        response.end();
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["delete"] = page;
    sessionCheck["delete"] = require('../GlobalTokenCheck');
}