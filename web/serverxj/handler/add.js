function page(request, response, global) {

    let accessinfo = global.tokens[request.headers.token];
    let userinfo = accessinfo.userinfo;
    let dataManager = global.dataManager;
    let postData = request.postData;
    let username = postData.username;

    if(accessinfo.issuper && username && username != "" && username != "undefined"){
        ///管理员写了username 先去查一下他的信息

        dataManager.GetUserInfoByName(username, function (finduser) {

            if(!finduser || finduser.name != username){

                response.write('{"msg":"找不到此业务员['+ username +'],您重新输入!"}');
                response.end();

            }else {
                processMsgWrite(request, response, global, finduser);
            }

        });

    }else{

        processMsgWrite(request, response, global, userinfo);
    }
}


function processMsgWrite(request, response, global, userinfo)
{
    let dataManager = global.dataManager;

    dataManager.GetMessageList(function (msglist)
    {
        ///先拿一下所有的车记录吧
        if(global.carmapuser == undefined) {
            global.carmapuser = {};
            for(let msg of msglist)
            {
                global.carmapuser[msg.carnumber] = msg.username;
            }
        }


        //先拿到当前的列表然后现写入数据
        let postData = request.postData;
        let oldid = null;
        let newmsg = null;

        if(postData.id && postData.id != "") {
            oldid = postData.id;
            for(let itmmsg of msglist) {
                if(itmmsg.id == oldid) {
                    newmsg = itmmsg;
                    break;
                }
            }
        }

        ///查看车辆是否属于自己
        let caruser = global.carmapuser[postData.carnumber];
        if(caruser && caruser != userinfo.name) {

            response.write('{"msg":"此车已经属于['+ caruser +'],你不能录入!"}');
            response.end();

            return;
        }


        let now = new Date();

        if(newmsg == null) {

            newmsg = {};
            newmsg.id = now.getTime() + "" + msglist.length;
            newmsg.date = now.getTime();
        }

        newmsg.username = userinfo.name;
        newmsg.userphone = userinfo.phone;

        newmsg.carnumber = postData.carnumber;
        newmsg.cartype = postData.cartype;
        newmsg.money = postData.money;

        ///插入到最新的位置
        if(oldid == null)
        {
            msglist.splice(0, 0, newmsg);
            global.carmapuser[newmsg.carnumber] = userinfo.name;
        }

        dataManager.UpdateMessageList(msglist, function (ret, err) {

            if (ret) {

                console.log("添加信息成功", newmsg.title);
                response.write('{}');
                response.end();

            } else {
                response.write('{"msg":"更新消息列表失败!"}');
                response.end();
            }
        });

    });
}

exports.init = function (pagemap, sessionCheck) {
    pagemap["add"] = page;
    sessionCheck["add"] = require('../GlobalTokenCheck');
}