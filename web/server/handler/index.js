

function page(request, response, global)
{
    response.write("wellcome notbadplayer!");
    response.end();
}


exports.init = function (pagemap)
{
    pagemap["index"] = page;
}