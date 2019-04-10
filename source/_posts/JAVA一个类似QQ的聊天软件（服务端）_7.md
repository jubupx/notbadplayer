---
title: JAVA一个类似QQ的聊天软件（服务端）
date: 2007-01-01 08:00:07
tags:
categories:
- 程序
---
      import java.io.*;   
 import java.net.*;   
 import java.sql.*;   
 import java.util.Vector;   
 class ServerThread extends Thread{   
 private Socket socket;   
 private PrintWriter out;   
 private BufferedReader in;//定义输入流   
 int no;   
 public ServerThread(Socket s) throws IOException {//线程构造函数   
 socket=s;//取得传递参数   
 in=new BufferedReader(new InputStreamReader(socket.getInputStream()));//创建输入流   
 out=new PrintWriter(new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())),true);//创建输出流   
 start();//启动线程   
 }   
 public void run(){//线程监听函数   
 try{   
 while(true){   
 String str=in.readLine();//取得输入字符串   
 if(str.equals("end"))break;//如果是结束就关闭连接   
 else if(str.equals("login")) {//如果是登录   
 System.out.println("load");   
 try{   
 Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");//连接数据库   
 Connection c=DriverManager.getConnection("jdbc:odbc:javaicq");   
 String sql="select nickname,password from icq where number=?";   
 PreparedStatement prepare=c. prepareCall(sql);//设定数据库查寻条件(？为何要准备，其中的，number未定)   
 String number=in.readLine();   
 int g=Integer.parseInt(number);//取得输入的号码   
 System.out.println(number);   
 String password=in.readLine().trim();//取得输入的密码   
 System.out.println(password);   
 prepare.clearParameters();   
 prepare.setInt(1,g);//设定参数   
 ResultSet r=prepare.executeQuery();//执行数据库查寻   
 if(r.next()){//以下比较输入的号码于密码是否相同   
 String pass=r.getString("password").trim();   
 System.out.println(pass);   
 if(password.regionMatches(0,pass,0,pass.length()))   
 { out.println("ok");   
 //判断密码是否正确   
 //将其在线状态置1   
 //以及设置其ip地址import java.io.*;   
 import java.net.*;   
 import java.sql.*;   
 import java.util.Vector;   
 class ServerThread extends Thread{   
 private Socket socket;   
 private PrintWriter out;   
 private BufferedReader in;//定义输入流   
 int no;   
 public ServerThread(Socket s) throws IOException {//线程构造函数   
 socket=s;//取得传递参数   
 in=new BufferedReader(new InputStreamReader(socket.getInputStream()));//创建输入流   
 out=new PrintWriter(new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())),true);//创建输出流   
 start();//启动线程   
 }   
 public void run(){//线程监听函数   
 try{   
 while(true){   
 String str=in.readLine();//取得输入字符串   
 if(str.equals("end"))break;//如果是结束就关闭连接   
 else if(str.equals("login")) {//如果是登录   
 System.out.println("load");   
 try{   
 Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");//连接数据库   
 Connection c=DriverManager.getConnection("jdbc:odbc:javaicq");   
 String sql="select nickname,password from icq where number=?";   
 PreparedStatement prepare=c. prepareCall(sql);//设定数据库查寻条件(？为何要准备，其中的，number未定)   
 String number=in.readLine();   
 int g=Integer.parseInt(number);//取得输入的号码   
 System.out.println(number);   
 String password=in.readLine().trim();//取得输入的密码   
 System.out.println(password);   
 prepare.clearParameters();   
 prepare.setInt(1,g);//设定参数   
 ResultSet r=prepare.executeQuery();//执行数据库查寻   
 if(r.next()){//以下比较输入的号码于密码是否相同   
 String pass=r.getString("password").trim();   
 System.out.println(pass);   
 if(password.regionMatches(0,pass,0,pass.length()))   
 { out.println("ok");   
 //判断密码是否正确   
 //将其在线状态置1   
 //以及设置其ip地址