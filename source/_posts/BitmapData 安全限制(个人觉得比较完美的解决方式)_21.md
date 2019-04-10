---
title: BitmapData 安全限制(个人觉得比较完美的解决方式)
date: 2007-01-01 08:00:21
tags:
categories:
- as技术
---
      之前提到过的BitmapData 安全限制今天突然心血来潮做了一个测试，发现用后台做中间代理先把运程的图片流进内存再以流的形式发送到客服端的FLASH可以解决上面的问题！   
 System.Net.WebClient cl = new System.Net.WebClient();   
 byte[] buffer = cl.DownloadData(new Uri("url"));   
 Response.AppendHeader("Content-Disposition", "attachment; filename=a.jpg");   
 Response.BinaryWrite(buffer);   
 Response.End();   
   
 希望对大家有用！