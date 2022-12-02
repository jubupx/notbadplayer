
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function page(request, response, global) {

    let queryString = request.urlpart2;
    let urlParams = new URLSearchParams(queryString);

    let quittoken = urlParams.get("token");
    if(quittoken) {
        if (quittoken == global.token) {
            global.token = "";
        }else {
            console.log("token is diffrent but quit can success!!");
        }

        console.log("system quit success!!");
        response.write('{}');
        response.end();
        return;
    }

    let username = urlParams.get("username");
    let pwd = urlParams.get("pwd");

    if(username == "jubupx" && pwd == "jubupx2012") {
        global.token = makeid(8);
        response.write('{"token":"' + global.token +'"}');
        response.end();
    }
    else{
        response.write('{"msg":"用户名或密码错误!"}');
        response.end();
    }
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["login"] = page;
}