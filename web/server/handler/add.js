function page(request, response, global)
{
    let token = request.headers.token;
    if(!token || token != global.token) {

        response.write('{"msg":"操作失败!"}')
        response.end();
        return;
    }


    let dataManager = global.dataManager;


    dataManager.GetMessageList(function (msglist)
    {

        response.write(JSON.stringify(msglist));
        response.end();

    });
}

exports.init = function (pagemap)
{
    pagemap["add"] = page;
}