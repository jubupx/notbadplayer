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

    ///私有的数据需要验证一个登录情况
    if(id.startsWith("_"))
    {
        let token = request.headers.token;

        if(!token || token != global.token)
        {
            response.write('{"msg":"权限验证失败!"}');
            response.end();

            return;
        }
    }

    let dataManager = global.dataManager;
    dataManager.GetMessageByID(id, true, function (msgobj)
    {
        msgobj  ?   response.write(JSON.stringify(msgobj))
                :   response.write('{"msg":"数据为空"}');

        response.end();
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["reqmsg"] = page;
}