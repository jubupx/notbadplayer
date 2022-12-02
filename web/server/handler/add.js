function page(request, response, global) {

    let dataManager = global.dataManager;
    dataManager.GetMessageList(function (msglist)
    {
        //先拿到当前的列表然后现写入数据
        let postData = request.postData;

        let now = new Date();
        let newmsg = {};

        newmsg.id = now.getTime();
        newmsg.title = postData.title;
        newmsg.date = now.toLocaleString();
        newmsg.private = (postData.private == "true");

        let newmsgname = newmsg.id + "";

        dataManager.Write(newmsgname, postData.content, function (ret,msg){
            if(ret) {

                ///插入到最新的位置
                msglist.splice(0, 0, newmsg);

                dataManager.UpdateMessageList(msglist, function (ret, err){

                    if(ret){

                        console.log("添加文章成功", newmsg.title);
                        response.write('{}');
                        response.end();

                    }else{
                        response.write('{"msg":"更新消息列表失败!"}');
                        response.end();
                    }
                });

            }else{

                response.write('{"msg":"文件写入失败!"}');
                response.end();
            }
        });

        //response.write(JSON.stringify(msglist));
        //response.end();
    });
}

exports.init = function (pagemap, sessionCheck)
{
    pagemap["add"] = page;
    sessionCheck["add"] = require('../GlobalTokenCheck');
}