---
title: FLEX SDK EMBED压缩BUG和ADOBE愤怒的程序员
date: 2011-10-23 10:49:22
tags:
categories:
- as技术
---
       最近和同事发现了一个FLEX SDK EMBED图片天大的BUG，简直就是有点无法想象。如果将一张半透明的PNG图片做JPEG的压缩，居然偏色非常严重如下图：   

  

  ![图片](http://a4.qpic.cn/psu?/V14DzTs12NMSI8/xOPopLZ5mEp4U4.sU*v6n3lsmzQcYXtwOWo7tqSg6zQ!/b/YXGLDlqPEQAAYnkNDVqbEgAA&ek=1&kp=1&pt=0&t=5&tl=3&su=059299953&tm=1554897600&sce=0-12-12&rf=2-9) 

    
 

  本以为ADOBE人的程序相当垃圾，其实不然。查看源码发现了一个隐藏的属性能解决问题如下图，具体就不解释了 

  

  

  ![图片](http://a1.qpic.cn/psu?/V14DzTs12NMSI8/9T4evrVFp6uySW8wxm5Izk6C9m6pxK4gweHGtYqQJz0!/b/YYOSpVpgBAAAYpiCn1onBAAA&ek=1&kp=1&pt=0&t=5&tl=3&su=0250350625&tm=1554897600&sce=0-12-12&rf=2-9) 

  

   
  

  