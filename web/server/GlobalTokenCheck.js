
module.exports = function (request, response, global)
{
    let token = request.headers.token;

    if(!token || token != global.token)
    {
        response.write('{"msg":"操作失败!"}')
        response.end();
        return false;
    }

    return true;
}