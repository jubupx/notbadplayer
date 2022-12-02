

function page(request, response, global)
{
    let urlpart2 = request.urlpart2;
    let htmlpath = "index.html";

    if(urlpart2 && urlpart2.indexOf(".html") != -1)
    {
        htmlpath = urlpart2.split("#")[0];
    }

    let dataManager = global.dataManager;
    dataManager.Read( htmlpath,function (ret, data)
    {
        if(!ret) data = "page not found!!";

        response.write(data);
        response.end();

    });
}


exports.init = function (pagemap, sessionCheck)
{
    pagemap["index"] = page;
    ///不检测是否登录在页面检测吧
    /*sessionCheck["index"] = function (request, response, global)
    {
        let htmlpath = request.url;

        if(htmlpath.indexOf("system_") != -1)
        {
            let token = request.headers.token;

            if(!token || token != global.token)
            {
                //response.write('{"msg":"操作失败!"}')

                response.writeHead(301, {
                    Location: 'index?admin.html'
                }).end();
                return false;
            }
        }

        return true;
    }*/
}