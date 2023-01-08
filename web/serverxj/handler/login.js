
function page(request, response, global) {

    let queryString = request.urlpart2;
    let urlParams = new URLSearchParams(queryString);

    let quittoken = urlParams.get("token");
    if(quittoken) {

        global.deleteToken(quittoken);

        console.log("system quit success!!");
        response.write('{}');
        response.end();
        return;
    }

    let username = urlParams.get("username");
    let pwd = urlParams.get("pwd");

    let dataManager = global.dataManager;

    dataManager.GetUserInfoByName(username, function (userinfo)
    {
        if(userinfo && userinfo.name == username && userinfo.pwd == pwd)
        {
            let accessinfo = global.makeAccessInfo(userinfo);

            response.write('{"token":"' + accessinfo.token +'"}');
            response.end();
        }
        else
        {
            response.write('{"msg":"用户名不存在或密码错误!"}');
            response.end();
        }

    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["login"] = page;
}