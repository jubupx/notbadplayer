---
title: SQL SERVER2005 与FLASH
date: 2007-01-01 08:00:25
tags:
categories:
- as技术
---
      插曲:   
 昨天自己用as3写了一个TDS的LOGIN PACKET连上去了报数据包不完整的错，多尝试了几次更多的时候连个错了不报，有点迷茫了，瞎忙了一天的时间连个动静也没有。搞了一个抓包的工具直接提取十六进制数据再发无果，连个错了不报，很多东东都是第一次尝试，下了FREETDS与JTDS下来研究。也不知道FLASH与SQL SERVER2005建TCP/IP连接完成COMMUNICATION 是否真的可行，尝试吧，不管能不能成，至少能对SQL SERVER2005有所了解。   
   
 以前也没有深放研究SQL SERVER 2005，今天分了一下身看了下他可以直接建WEB SERVICE，看来用FLASH连SQL SERVER 2005是相当容易了基于HTTP协义就可以完了   
 粘一段代码（没测试）   
 ----建一个函数   
 USE MyFlashDB   
 GO   
 create PROCEDURE pro\_getUserList   
 @NameID INT   
 as   
 select *   
 from MyFlashDB   
 where [email=pk\_id=@NameID]pk\_id=@NameID[/email]   
 go   
   
 --将存储过程发布成web服务   
 create endpoint list\_endpoint   
 STATE = STARTED   
 AS HTTP   
 (   
 --SITE = 'localhost', ---Server name   
 site='localhost',   
 PATH = '/list',   
 AUTHENTICATION = ( INTEGRATED ),   
 PORTS = ( CLEAR )   
 )   
 FOR SOAP   
 (   
 WEBMETHOD 'getUserList'   
 (   
 NAME = 'MyFlashDB.dbo.pro\_getUserList',   
 FORMAT = ROWSETS\_ONLY   
 ),   
 WSDL = DEFAULT,   
 BATCHES = DISABLED,   
 DATABASE = 'MyFlashDB' ,   
 NAMESPACE=' [ http://localhost.com ](http://localhost.com) '   
 )   
 打开浏览器输入 [ http://localhost/list?wdsl ](http://localhost/list?wdsl)  访问下看看   
  注意:     
  运行这个终端创建里，先关闭IIS，不然会报端口冲突的错误     
   
 在EXPRESS版本里是不支持create endpoint的，好了也不测试了,继续我们的尝试了，加油!!