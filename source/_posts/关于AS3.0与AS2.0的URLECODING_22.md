---
title: 关于AS3.0与AS2.0的URLECODING
date: 2007-01-01 08:00:22
tags:
categories:
- as技术
---
      今天在用QUICKSERVER这个JAVA开源类库写一个FLASH SOCEKT服务器，又碰到了JAVA的中文乱码问题，于是用了老办法，把中文什么的转成URLECODING（URLEncoder.encode(msg,"UTF-8")）结果发现原来在AS2。0里好好的，UNESCAPE函数在3.0里接收JAVA SERVER传过来的值变成了乱码。开始还很茫然是不是JAVA的转换出了错，几经尝试终于发现，原来AS2。0的UNESCAPE与AS3。0的UNESCAPE不同，把他换做   
 /***/   
 var str:String = sock.readUTFBytes(sock.bytesAvailable);   
 wen\_txt.appendText(unescapeMultiByte(str));   
 /***/