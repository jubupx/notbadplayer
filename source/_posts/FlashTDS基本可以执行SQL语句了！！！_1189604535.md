---
title: FlashTDS基本可以执行SQL语句了！！！
date: 2007-09-12 21:42:15
tags:
categories:
- as技术
---
      FlashTDS终于可以执行SQL语句了，还回也很正常，只是对一些数据不支持，以后有时间会不断改进！   
   
 public function TestDocument()   
 {   
 MSSqlDriver.registeConnectEventFun(this.connectionEventHandler);   
 MSSqlDriver.registeConnectErrorFun(this.connectionErrorHandler);   
   
 var myConnection:ISqlC.getConnection("flashtds:MSSqlConnection:localhost:1433/MyFlashDB;user=gates;password=gates88");   
   
 myConnection.getEventDispatcher().addEventListener(ResDataEvent.RES\_DATA,userDataIn);   
   
 var command:SqlCommand=myConnection.getCommand();   
   
 command.commandText="select pk\_id,name from tb\_NewTable";   
   
 command.executeQuery();   
   
 }   
   
 function userDataIn(evt:ResDataEvent):void   
 {   
 while(evt.resData.next())   
 {   
 trace("我取得数据pk\_id:"+evt.resData.getValueByColIndex(0));   
 trace("我取得数据name:"+evt.resData.getValueByColIndex(1));   
 }   
   
 }