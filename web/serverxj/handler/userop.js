function errorend(msg, response) {
    let data = {};
    data.msg = msg;
    response.write(JSON.stringify(data));
    response.end();
}

function page(request, response, global) {
    let queryString = request.urlpart2;
    let urlParams = new URLSearchParams(queryString);
    let op = urlParams.get("op");
    let dataManager = global.dataManager;
    let accessinfo = global.tokens[request.headers.token];
    if(!accessinfo) {

        errorend("没有登录信息", response);
        return;
    }

    if(op == "add") {

        if(!accessinfo.issuper) {

            errorend("权限不够", response);
            return;
        }

        let username = urlParams.get("username");
        let pwd = urlParams.get("pwd");
        let phone = urlParams.get("phone");

        if(!username || !pwd)
        {
            errorend("数据为空", response);
            return;
        }

        let userinfo = dataManager.CreateUserInfo(username, pwd);
        userinfo.phone = phone;

        dataManager.AddUserInfo(userinfo, false, function (ret, err) {

            if(ret){
                response.write('{}');
            }else{
                let data = {};
                data.msg = err.toString();
                response.write(JSON.stringify(data));
            }
            response.end();
        });
        return;
    }
    else if(op == "delete") {

        if(!accessinfo.issuper)
        {
            errorend("权限不够", response);
            return;
        }

        let username = urlParams.get("username");

        dataManager.RemoveUserInfo(username, function (ret, err) {

            if(ret){

                global.deleteTokenByUser(username);
                response.write('{}');

            }else{
                let data = {};
                data.msg = err.toString();
                response.write(JSON.stringify(data));
            }
            response.end();
        });
        return;
    }
    else if(op == "update"){

        ///更改指定用户需要超级权限
        let username = urlParams.get("username");

        if(!accessinfo.issuper && username != "") {

            errorend("权限不够", response);
            return;
        }

        if(username == "")
            username = accessinfo.userinfo.name;

        if(!username)
        {
            errorend("数据为空", response);
            return;
        }

        let pwd = urlParams.get("pwd");
        let phone = urlParams.get("phone");

        let newuserinfo = {};

        newuserinfo.name = username;

        if(pwd != "")
            newuserinfo.pwd = pwd;
        if(phone != "")
            newuserinfo.phone = phone;

        dataManager.AddUserInfo(newuserinfo, true, function (ret, err) {

            if(ret){
                response.write('{}');
            }else{
                let data = {};
                data.msg = err.toString();
                response.write(JSON.stringify(data));
            }
            response.end();
        });
        return;
    }

    errorend("没有处理成功!", response);
}

exports.init = function (pagemap, sessionCheck) {
    pagemap["userop"] = page;
    sessionCheck["userop"] = require('../GlobalTokenCheck');
}