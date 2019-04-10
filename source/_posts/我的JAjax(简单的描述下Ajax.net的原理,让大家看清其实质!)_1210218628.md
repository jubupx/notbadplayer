---
title: 我的JAjax(简单的描述下Ajax.net的原理,让大家看清其实质!)
date: 2008-05-08 11:50:28
tags:
categories:
- 程序
---
      本不打算把这东西写上来的,考虑到是日志以后可以回顾下所以记上来吧   
 JAjax我大约花了1个小时左右写的东东,只是原理的一剖析.让大家明白其实只是那么回事   
 一句话来说Ajax.net就是将一个请求给提定的类(IHttpHandler)处理返回.   
 JAjax的类包里只有两个类和一个接口:   
 JAjaxCollection(让页面类引用收集在此类中)   
 JustTestHanlder(一个ihttpHandler的实现)   
 IJajax(所有想使用Ajax的页面都实现这个接口)   
 ///   
 如何使用:   
 服务端脚本(c#)   
 public partial class \_Default : System.Web.UI.Page,JAjax.IJajax//实现接口   
 {   
 protected void Page\_Load(object sender, EventArgs e)   
 {   
 if(!this.IsPostBack)   
 JAjax.JAjaxCollection.RegisterHandler(typeof(\_Default));//注册页面类   
 }   
   
 #region IJajax 成员   
 public string process(string method, string data)   
 {   
 return "new服务器:"+method + "->call(" + data + ")";   
 }   
 #endregion   
 }   
 //客户端调用:   
 <script type="text/javascript" language="javascript">   
 document.onclick=function()   
 {   
 \_Default.call({method:"测试",data:"HELLO"},function(data){alert(data);});   
 }   
 </script>   
 注:客服端的JS我直接使用的jquery这个包所以调试成功要在页面同目录的下建一个js的文件夹放jquery.js这个包   
 配置web.config   
 <httpHandlers>   
 <add verb="*" path="jajax/ajax.request" type="JAjax.JustTestHanlder,JAjax"/>   
 </httpHandlers>   
 如果想通过源文件了解所以细节可以直接在   
 [ http://styleforus.net/JubupxAjax.rar ](http://styleforus.net/JubupxAjax.rar)    
 下载