---
title: 自已写了一个IOC框架AsSelf，包含AOP部分
date: 2008-11-09 22:12:54
tags:
categories:
- as技术
---
      AsSelf是本人开发的一款IOC框架，其他包括了对于AS3来说非常难实现的AOP部分（通过字节码动态生成类）   
 目前的版本号是:0.3.2.3[目前未公开]   
 框架特点:   
 1,根据AS的特点本框架的对象引用相当的自由,ref不但可以引用对象的属性方法还可以递归寻找其子属性的属性与方法如   
 <property name="graphics.beginFill" value="params:{num:0xff00ff}"/>   
 2.支持一些类型如 数字(num:),字符(str:),数组及数组嵌套(arr:{}{}),以后会支持 类(cls),XML（xml:）   
 3,支持远程调用,amx包是提供用户以LC的通信方式管理容器内的对象，实现动态的调试或远程对象访问控制   
 4,支持AOP，通过AS动态生成类。在动态类里做方法拦截实现AOP   
   
 5即将支持VAR标签,系统分量可以分散到多个XML或是TEXT里   
   
 package   
 {   
 import com.asself.AppFactory;   
 import com.asself.AsSSystemFactory;   
 import com.asself.MainApp;   
 import com.asself.events.AsSelfEvent;   
 import com.fzone.libs.test.AsSelfMan;   
 import com.fzone.libs.test.AsSelfWoman;   
 import com.fzone.libs.test.TestInterceptor;   
 import com.jlog.JLoggerFactory;   
 import com.jlog.itf.ILog;   
   
 import flash.display.Sprite;   
 public class AsSelftTest extends Sprite implements MainApp   
 {   
 static public var logger:ILog=JLoggerFactory.getLogger(AsSelftTest);   
 private var arr:Array=[AsSelfMan,AsSelfWoman,TestInterceptor];   
   
 private var app:AppFactory;   
   
 public function AsSelftTest()   
 {   
 app=AsSSystemFactory.createApp("demo.xml",this);   
 app.addEventListener(AsSelfEvent.APPSETUP\_EVENT,onCreated);   
 app.addEventListener(AsSelfEvent.ONCONFIGED\_EVENT,onConfiged);   
 app.buildNow();   
 }   
   
 public function onConfiged(e:AsSelfEvent):void   
 {   
 //e.stopImmediatePropagation();   
 }   
   
 public function onCreated(e:AsSelfEvent):void   
 {   
   
 }   
   
 public function exitApp(bool:Boolean=true,msg:String=""):Boolean   
 {   
 return true;   
 }   
   
 }   
 }   
   
 //xml   
 <?xml version="1.0" encoding="UTF-8"?>   
 <config>   
 <beans>   
 <bean id="strongMan" class="com.fzone.libs.test.AsSelfMan">   
 <constructors>   
 <constructor value="str:mark"/>   
 <constructor value="ref:woman1"/>   
 </constructors>   
 <propertys>   
 <property name="addWoman" value="params:{ref:woman1}"/>   
 <property name="kissWomen" value="params:void"/>   
 </propertys>   
 </bean>   
 <bean id="woman1" class="com.fzone.libs.test.AsSelfWoman">   
 <constructors>   
 <constructor value="str:merray"/>   
 </constructors>   
 </bean>   
 <bean id="rect" class="flash.display.Sprite">   
 <propertys>   
 <property name="graphics.beginFill" value="params:{num:0xff00ff}"/>   
 <property name="graphics.drawRect" value="params:{num:0}{num:0}{num:200}{num:300}"/>   
 <property name="graphics.endFill" value="params:void"/>   
 </propertys>   
 </bean>   
 <bean id="temp0bj" class="Object" by="true">   
 <propertys>   
 <property name="root" value="ref:\_ROOT"/>   
 <property name="root.addChild" value="params:{ref:rect}"/>   
 </propertys>   
 </bean>   
 <bean id="testInterceptor" class="com.fzone.libs.test.TestInterceptor" by="true">   
 </bean>   
 </beans>   
 <aop\_config CCPath="DynamicCreateClass.swf" CCName="com.jcommlib.swf.createcls.impl.JClsFactroy" >   
 <aop\_aspect ref="testInterceptor" >   
 <aop\_pointcut id="test" expression="execution(* *.*.*(..))"/>   
 <aop\_around pointcut-ref="test" method="aroundAdvice" />   
 <aop\_before pointcut-ref="test" method="beforeAdvice" />   
 <aop\_returning pointcut-ref="test" method="returningAdvice" />   
 <aop\_throwing pointcut-ref="test" method="throwingAdvice" />   
 <aop\_after pointcut-ref="test" method="afterAdvice" />   
 </aop\_aspect>   
 </aop\_config>   
 </config>   
   
  [ ![](http://xa.photo.store.qq.com/http_imgload.cgi?/rurl4_b=dd4a193bd611fd53860a4d94d6c74fb3073b92194c9f35cf26f3053157e1b52563e5d8458fce4821e4cb74786f6deecb3533555d4fbf5372818a0347eec9f8a60cd77a1fa94a52b7d16c852b5d1b026a67ca45dc) ](http://xa.photo.store.qq.com/http_imgload.cgi?/rurl4_b=dd4a193bd611fd53860a4d94d6c74fb3073b92194c9f35cf26f3053157e1b52563e5d8458fce4821e4cb74786f6deecb3533555d4fbf5372818a0347eec9f8a60cd77a1fa94a52b7d16c852b5d1b026a67ca45dc)    
 可以在 [ http://subversion.assembla.com/svn/jubupx/AsSelf ](http://subversion.assembla.com/svn/jubupx/AsSelf)  下载最新的源码   
 两个支持包   
 可以在 [ http://subversion.assembla.com/svn/jubupx/JCommlib ](http://subversion.assembla.com/svn/jubupx/JCommlib)  下载最新的源码   
 可以在 [ http://subversion.assembla.com/svn/jubupx/JLog ](http://subversion.assembla.com/svn/jubupx/JLog)  下载最新的源码