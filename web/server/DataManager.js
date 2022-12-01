const fs = require('fs');


function DataManager() {

    ///先不设置大小后面再说吧
    this.fileDataCache = {};
    this.objectDatas = {};
}

DataManager.prototype.GetPath = function(filename)
{
    return "data/" + filename;
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
        if(!ret) {
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