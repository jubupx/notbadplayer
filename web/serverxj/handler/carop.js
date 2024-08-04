function errorend(msg, response) {
    let data = {};
    data.msg = msg;
    response.write(JSON.stringify(data));
    response.end();
}

function page(request, response, global) {
    let queryString = request.urlpart2;
    let urlParams = new URLSearchParams(queryString);
    let op = urlParams.get("op");
    let dataManager = global.dataManager;
    let accessinfo = global.tokens[request.headers.token];
    if(!accessinfo) {

        errorend("没有登录信息", response);
        return;
    }

    if(op == "add") {


        let carnum = urlParams.get("carnum");
        let weight = parseFloat(urlParams.get("weight"));
        let phone = urlParams.get("phone");
        let owner = urlParams.get("owner");

        if(!carnum || isNaN(weight))
        {
            errorend("数据为空", response);
            return;
        }

        let carinfo = dataManager.CreateCarInfo(carnum, weight);

        carinfo.phone = phone;
        carinfo.owner = owner;


        dataManager.AddCarInfo(carinfo, false, function (ret, err) {

            if(ret){
                response.write('{}');
            }else{
                let data = {};
                data.msg = err.toString();
                response.write(JSON.stringify(data));
            }
            response.end();
        });
        return;
    }
    else if(op == "delete") {


        let carnum = urlParams.get("carnum");

        dataManager.RemoveCarInfo(carnum, function (ret, err) {

            if(ret){
                response.write('{}');

            }else{
                let data = {};
                data.msg = err.toString();
                response.write(JSON.stringify(data));
            }
            response.end();
        });
        return;
    }
    else if(op == "update"){

        let carnum = urlParams.get("carnum");

        if(!carnum)
        {
            errorend("数据为空", response);
            return;
        }

        let weight = parseFloat(urlParams.get("weight")) ;
        let phone = urlParams.get("phone");
        let owner = urlParams.get("owner");

        let newcarinfo = {};

        newcarinfo.carnum = carnum;

        if(phone)
            newcarinfo.phone = phone;

        if(owner)
            newcarinfo.owner = owner;

        if(!isNaN(weight))
            newcarinfo.weight = weight;

        dataManager.AddCarInfo(newcarinfo, true, function (ret, err) {

            if(ret){
                response.write('{}');
            }else{
                let data = {};
                data.msg = err.toString();
                response.write(JSON.stringify(data));
            }
            response.end();
        });
        return;
    }

    errorend("没有处理成功!", response);
}

exports.init = function (pagemap, sessionCheck) {
    pagemap["carop"] = page;
    sessionCheck["carop"] = require('../GlobalTokenCheck');
}