function page(request, response, global) {

    let dataManager = global.dataManager;
    dataManager.GetMessageList(function (msglist)
    {
        //先拿到当前的列表然后现写入数据
        let postData = request.postData;
        let oldid = null;
        let newmsg = null;

        if(postData.id && postData.id != "") {
            oldid = postData.id;
            for(let itmmsg of msglist){
                if(itmmsg.id == oldid) {
                    newmsg = itmmsg;
                    break;
                }
            }
        }

        let now = new Date();

        if(newmsg == null)
        {
            newmsg = {};
            newmsg.id = now.getTime() + "";
            newmsg.date = now.toLocaleString();
        }

        newmsg.title = postData.title;
        newmsg.private = (postData.private == "true");
        newmsg.inde = (postData.inde == "true");

        //私有的ID前面加了_
        if(newmsg.private && newmsg.id.startsWith("_") == false)
            newmsg.id = "_" + newmsg.id;
        else if(newmsg.id.startsWith("_"))
            newmsg.id = newmsg.id.replace("_","");

        let newmsgname = newmsg.id + "";

        dataManager.Write(newmsgname, postData.content, function (ret,msg){
            if(ret) {

                ///插入到最新的位置
                if(oldid == null)
                        msglist.splice(0, 0, newmsg);

                    dataManager.UpdateMessageList(msglist, function (ret, err) {

                        if (ret) {

                            console.log("添加文章成功", newmsg.title);
                            response.write('{}');
                            response.end();

                        } else {
                            response.write('{"msg":"更新消息列表失败!"}');
                            response.end();
                        }
                    });


            }else{

                response.write('{"msg":"' + msg + '"}');
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