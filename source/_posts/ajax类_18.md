---
title: ajax类
date: 2007-01-01 08:00:18
tags:
categories:
- 程序
---
      AJAX类   
 var xmlHttpClass = function(url,type,method){//构造函数   
 this.URL = url;   
 this.Response = null;//服务器的返回内容   
 this.BstrMethod ="get";//发送方式   
 this.ResponseType = type;//请求的内容类型   
 this.ResponseMethod = method;//处理函数,用来处理返回数据   
 this.ErrorHander = this.defaultError;//错误处理函数,函数参数为一个错误代码   
 this.Body = "";//提交的http报头的主体内容   
 this.xmlHttpRequest = this.getXmlHttpObject();   
 if(this.xmlHttpRequest){   
 var loader = this;//局部变量,开辟一条途径给onreadystatechange指向该类   
 this.xmlHttpRequest.onreadystatechange = function(){   
 loader.readyStateChange.call(loader);   
 }   
 }else{   
 this.ErrorHander(this.errCodeValues.errInitialize);   
 return;   
 }   
 }   
 xmlHttpClass.prototype.getXmlHttpObject = function(){//初始化xmlHttpRequest对象   
 if(window.XMLHttpRequest)   
 return new XMLHttpRequest();   
 else if(typeof ActiveXObject != "undefined")   
 return new ActiveXObject("Microsoft.XMLHTTP");   
 }   
 xmlHttpClass.prototype.ResponseTypeValues = {//返回类型常量   
 XML:1,   
 text:2,   
 script:3   
 }   
 xmlHttpClass.prototype.readyStateChange = function(){//onreadystatechange处理函数   
 var xmlHttpRequest = this.xmlHttpRequest;   
 if(xmlHttpRequest.readyState == 4)   
 if(xmlHttpRequest.status == 200){   
 switch(this.ResponseType){   
 case this.ResponseTypeValues.XML:   
 this.Respon** = *mlHttpRequest.respon***ML;   
 break;   
 case this.ResponseTypeValues.text:   
 this.Respon** = *mlHttpRequest.responseText;   
 break;   
 case this.ResponseTypeValues.script:   
 this.Respon** = *mlHttpRequest.ResponseText;   
 if(!this.ResponseMethod)   
 eval(this.Response);   
 break;   
 default:   
 this.Respon** = *mlHttpRequest;   
 }   
 if(this.ResponseMethod)   
 this.ResponseMethod(this.Response);   
 }else{   
 this.ErrorHander(this.errCodeValues.errServer);   
 return;   
 }   
 }   
 xmlHttpClass.prototype.Send = function(){//发送方法   
 if(!this.URL || typeof(this.URL)!="string"){   
 this.ErrorHander(this.errCodeValues.errURL);   
 return;   
 }   
 if(!this.ResponseType || typeof(this.ResponseType)!="number"){   
 this.ErrorHander(this.errCodeValues.errResponseType);   
 return;   
 }   
 if(!this.ResponseMethod || typeof(this.ResponseMethod)!="function"){   
 this.ErrorHander(this.errCodeValues.errMethod);   
 return;   
 }   
 this.xmlHttpRequest.open(this.BstrMethod,this.URL,true);   
 this.xmlHttpRequest.setRequestHeader("content-length",this.Body.length);   
 this.xmlHttpRequest.setRequestHeader("content-type","application/x-www-form-urlencoded");   
 this.xmlHttpRequest.send(this.Body);   
 }   
 xmlHttpClass.prototype.errCodeValues = {//错误代码   
 errURL:0,   
 errResponseType:1,   
 errMethod:2,   
 errInitialize:3,   
 errServer:4   
 }   
 xmlHttpClass.prototype.defaultError=function(ErrCode){//默认错误处理   
 switch(ErrCode){   
 case 0:   
 window.status = "URL为空";   
 break;   
 case 1:   
 window.status = "返回类型属性的类型不正确";   
 break;   
 case 2:   
 window.status = "处理函数的类型不正确";   
 break;   
 case 3:   
 window.status = "XMLHttpRequest对象初始化失败";   
 break;   
 default:   
 window.status = "未知错误";   
 }   
 }   
