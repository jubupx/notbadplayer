
module.exports = function (request, response, global)
{
    let token = request.headers.token;

    if(     !token
        ||  !global.tokens[token]
        ||  !global.tokens[token].userinfo)
    {
        response.write('{"msg":"operation prohibit!"}')
        response.end();
        return false;
    }

    return true;
}