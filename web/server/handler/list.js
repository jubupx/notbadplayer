function page(request, response, global)
{
    let token = request.headers.token;

    let dataManager = global.dataManager;
    dataManager.GetMessageList(function (msglist)
    {
        response.write(JSON.stringify(msglist));
        response.end();
        
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["list"] = page;
}