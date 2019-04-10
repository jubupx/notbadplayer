---
title: FlashTDS横空出世！
date: 2007-01-01 08:00:26
tags:
categories:
- as技术
---
      经过两个星期的努力，FlashTDS即AS的SQLSERVER2005的驱动，已经有了不小的进展，估计这周能有一个粗糙的测试版出来，一早就提出了，这个驱动的实际应用性几乎没有，只是一种尝试与突破！做为我自己在AS3与MSSQL上研究的加深！   
 //登陆测试代码   
   
 package {   
 import com.jubupx.mssqlserver.driver.MSSqlDriver;   
 import com.jubupx.mssqlserver.driver.ISqlConnection;   
 import com.jubupx.mssqlserver.driver.events.*;   
   
 import flash.display.MovieClip;   
 public class TestDocument extends MovieClip   
 {   
   
 public function TestDocument()   
 {   
 MSSqlDriver.registeConnectEventFun(this.connectionEventHandler);   
 MSSqlDriver.registeConnectErrorFun(this.connectionErrorHandler);   
   
 var myConnection:ISqlC.getConnection("flashtds:MSSqlConnection:localhost:1433/MyFlashDB;user=gates;password=gates88");   
   
 }   
   
 function connectionErrorHandler(evt:SqlErrorEvent):void   
 {   
 trace(evt.message);   
 }   
 function connectionEventHandler(evt:MSSqlEvent):void   
 {   
 trace(evt.message);   
 }   
   
 }   
   
 }