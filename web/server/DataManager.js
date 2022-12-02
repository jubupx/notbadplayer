const fs = require('fs');


function DataManager() {

    ///先不设置大小后面再说吧
    this.fileDataCache = {};
    this.objectDatas = {};
    this.htmlFilePath = "html/";

    let htmlFilePath = this.htmlFilePath;
    let fileDataCache = this.fileDataCache;

    fs.watch(htmlFilePath,(event,filename)=>{

        if(filename.endsWith("~"))
            return;
        console.log("html modify:", filename , (new Date()).toLocaleString());

        let htmlFileName = htmlFilePath + filename;
        if (filename && fileDataCache[htmlFileName])
        {
            fileDataCache[htmlFileName] = null;
        }
    })
}

DataManager.prototype.GetPath = function(filename)
{
    if(filename.indexOf(".html") != -1)
        return this.htmlFilePath + filename;
    return "data/" + filename;
}



DataManager.prototype.DeleteMessageByID = function(id, callback) {

    let self = this;
    self.GetMessageList(function (msglist)
    {
        let msg = null;
        for(let i = 0;i < msglist.length; i++){
            let item = msglist[i];
            if(item.id == id) {
                msg = item;
                msglist.splice(i,1);
                break;
            }
        }

        if(msg){

            ///更新列表
            self.UpdateMessageList(
                msglist, callback
            );

            ///删除文件
            fs.unlink( self.GetPath(msg.id)
                , function (err) {

                    if(err) console.log("删除文件:", msg.id, err);
                    else console.log("删除文件成功", msg.id);
                }
            );

        }else if(callback){
            callback(false, "没有找到相关ID数据!!");
        }
    });
}

DataManager.prototype.GetMessageByID = function(id, encode, callback)
{
    let self = this;
    self.GetMessageList(function (msglist)
    {
        let msg = null;
        for(var item of msglist){
            if(item.id == id) {

                msg = {};
                msg.id = id;
                msg.title = item.title;
                msg.date = item.date;
                msg.private = item.private;
                msg.inde = item.inde;

                break;
            }
        }

        if(msg == null){
            if(callback) callback(null)
        }else{

            self.Read(msg.id, function (ret, data) {
                if(!ret){
                    msg = null;
                }else{
                    msg.content = encode ? encodeURIComponent(data) : data;
                }

                if(callback) callback(msg);
            })
        }
    });
}

DataManager.prototype.GetMessageList = function(callback)
{
    let objectDatas = this.objectDatas;
    let MessageList = objectDatas["MessageList"];

    if(MessageList) {
        if(callback)
            callback(MessageList);
        return;
    }

    this.Read("MessageList", function (ret, data)
    {
        if(!ret || data == "") {
            MessageList = [];
        }else{
                MessageList = JSON.parse(data);
        }

        objectDatas["MessageList"] = MessageList;

        if(callback)
            callback(MessageList);
    });
};

DataManager.prototype.UpdateMessageList = function(MessageList, callback)
{
    let objectDatas = this.objectDatas;
    objectDatas["MessageList"] = MessageList;
    let data = JSON.stringify(MessageList);

    this.Write("MessageList", data, function (ret, err)
    {
        if(callback)
            callback(ret, err);
    });
};


DataManager.prototype.Read = function(filename, callback) {

    let cache = this.fileDataCache;
    let path = this.GetPath(filename);
    let data = cache[path];

    if(data)
    {
        if(callback)
            callback(true, data);
        return;
    }

    fs.readFile(path, 'utf-8', (err, data) => {
        if(err)
        {
            if(callback) callback(false, err);
            return;
        }

        cache[path] = data;
        if(callback) callback(true, data);
    });

};

DataManager.prototype.Write = function(filename, data, callback) {

    let path = this.GetPath(filename);
    let cache = this.fileDataCache;

    cache[path] = data;

    fs.writeFile(path, data, (err) => {
        if(err) {

            if(callback) callback(false, err);
            return;
        }

        if(callback) callback(true);
    });
};

module.exports = DataManager;