---
title: FLASHPLAYER P2P的试用
date: 2009-03-21 17:50:21
tags:
categories:
- as技术
---
      今天稍微看了下P2P的例程，也看了下别人写的例子,一个小小的CHAT整个长篇大论出来了，其实FLASH P2P的应用还是相当简单，几行代码就可以做p2p的聊天了   
 下面代码片段:   
 先建联连到服务器(搭桥)   
 netConnection = new NetConnection();   
 netConnection.addEventListener(NetStatusEvent.NET\_STATUS, netConnectionHandler);   
 netConnection.connect(StratusAddress + "/" + DeveloperKey);   
 /////case "NetConnection.Connect.Success": 建自已的"侦听" 如果你不想侦听也不用写这段(比如你是一个客户端我没有必要接受别人发的信息)   
 myStream = new NetStream(netConnection, NetStream.DIRECT\_CONNECTIONS);   
 myStream.addEventListener(NetStatusEvent.NET\_STATUS, netStreamHandler);   
 myStream.publish(netConnection.nearID);   
 如果你建立了侦听你肯定要绑定一个事件处理类吧（如果你没有侦听下面的部分也不用写）   
 //监听onPeerConnect事件   
 var o:Object = new Object();   
 o.onPeerConnect = function(subscriberStream:NetStream):Boolean   
 {   
 if (!is\_host) return false;//这里是客户端服务端写在一块这么写的   
 toClientStream = subscriberStream;   
 toClientStream.client =   
 {   
 onClient:function(txt:String):void   
 {   
 info.text += "ccccc=>:" + txt + "\n";   
 }   
 }   
 info.text += "有用户连接\n";   
 toClientStream.send("onHostData", "连接成功");   
 return true;   
 }   
 myStream.client = o;   
 ///////////////////上面一个侦听PEER连接的部分就完了//////////   
 现在用另一个SWF连接   
 这个SWF连接到公共服务器后，如想CALL另一台建立了以上侦听的SWF   
 //通过对方的peerId链接被呼叫者   
 fromHostStream = new NetStream(netConnection,hostPeerId);   
 fromHostStream.addEventListener(NetStatusEvent.NET\_STATUS, netStreamHandler);   
 fromHostStream.play(hostPeerId)   
 var o:Object = { };   
 o.onHostData=function(txt:String):void   
 {   
 info.text+="onHostData:"+txt+"\n";   
 }   
 fromHostStream.client=o;   
   
 //给主机发信息直接用fromHostStream.send("onClient","xxxxx");   
 ///主机对象有一个myStream.peerStreams维持了所有的连接   
 如果有连接关闭，FP也做得很好，直接侦听netconnect的   
 case "NetStream.Connect.Closed":   
 info.text+="有连接:"+(e.info.stream)+"关闭!";   
 再访问 myStream.peerStreams就会发现少一个netSTREAM   
 /////////   
 很简单，小巧吧,呵呵   
 发现还可以不用建myStream = new NetStream(netConnection, NetStream.DIRECT\_CONNECTIONS);   
 同样用send代替play可以接受那STREAM的连接，不过P2P的连接保持在NETCONNECTION的未连接PEER里的同样可以使用   
   
 写了一个类包，用于P2P的游戏   
  [ ![](http://b16.photo.store.qq.com/http_imgload.cgi?/rurl4_b=dd4a193bd611fd53860a4d94d6c74fb3c31abf036098d2c6ec241d759a50d48dbc1fba1166a7f10a9fa3ff3a50ff36afb058ebc6956010436d567d11901223e3e0c6f3845c8222771aba8429bd2eb9b1a54b895b) ](http://b16.photo.store.qq.com/http_imgload.cgi?/rurl4_b=dd4a193bd611fd53860a4d94d6c74fb3c31abf036098d2c6ec241d759a50d48dbc1fba1166a7f10a9fa3ff3a50ff36afb058ebc6956010436d567d11901223e3e0c6f3845c8222771aba8429bd2eb9b1a54b895b)    
   
 可以通过:   
 [ http://subversion.assembla.com/svn/jubupx/FlashGamePlatform/ ](http://subversion.assembla.com/svn/jubupx/FlashGamePlatform/)  下载   
 使用:   
 建主机:   
 host = new P2PHost;   
 host.listener = this;   
 host.establish();   
 //另一个客户端连接:   
 client = new P2PClient;   
 client.addEventListener(P2PEvent.CONNECTED\_HOST, function(e:P2PEvent):void   
 {   
 info.text += "已经连接上服务器\n";   
 });   
 client.addEventListener(P2PEvent.ON\_HOST\_DATA, function(e:P2PEvent):void   
 {info.text += e.data+"";});   
 client.connect(这里是主机的PEERID);   
   
 一般如果是一个联机游戏上面两部分都要实现的，看谁做主机就要负责网络部分与网络逻辑了