
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

    let queryString = request.url;
    let urlParams = new URLSearchParams(queryString);
    let username = urlParams.get("username");
    let pwd = urlParams.get("pwd");

    if(username == "jubupx" && pwd == "jubupx2012") {

        global.token = makeid(8);
        response.write('{"token":"' + global.token +'"}');
    }
    else{
        response.write('{"msg":"用户名或密码错误!"}');
        response.end();
    }
}

exports.init = function (pagemap)
{
    pagemap["login"] = page;
}