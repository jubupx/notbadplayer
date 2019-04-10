---
title: JAVA＋FLASH实现的网络版五子棋（JAVA服务端）
date: 2007-01-01 08:00:08
tags:
categories:
- 程序
---
      import java.net.*;   
 import java.io.*;   
 import java.util.*;   
 import java.sql.*;   
 public class Myserver   
 {   
 public static void main(String[] args)   
 { Validate load;   
 ServerSocket socket = null;   
 Vector m\_threads = new Vector();   
 //Vector street\_info=new Vector();   
 System.out.println("listen....");   
 try{   
 socket = new ServerSocket(9000);   
 }   
 catch(Exception e){ System.out.println("new serversocket() failed"); return;}   
 try   
 {   
 int nid=0;   
 while(true)   
 {   
 Socket s =socket.accept();   
 System.out.println("accepted");   
 load=new Validate(s);   
 if(load.getpass()==1){   
 ServerThread st = new ServerThread(s,m\_threads);   
 st.setID(nid++);   
 st.setnicknameandmyid(load.getnickname(),load.getid());   
 m\_threads.addElement(st);   
 new Thread(st).start();   
 System.out.println("listen again.........."+m\_threads.size());   
 }//判断是否是已注册用户;   
 if(m\_threads.isEmpty()) System.out.println("no user on line");   
 }   
 }catch(Exception e)   
 {   
 System.out.println("server is down....");   
 }   
 }   
 }   
 //连接数据库进行验证   
 class Validate{   
 private Socket socket;   
 private DataInputStream in =null;   
 private PrintStream out = null;   
 private int flagpass=0;   
 private String nickname;   
 String str;   
 private String ss;   
 public Validate(Socket s) {   
 socket=s;//取得传递参数   
 System.out.println("***receive 1 ");   
 try{   
 in = new DataInputStream(socket.getInputStream());   
 out = new PrintStream(socket.getOutputStream());   
 }catch(Exception e){}   
 str="1";   
 String psw="";   
 try{   
 ss=in.readLine();   
 System.out.println("***receive2 ");   
 int start0=ss.indexOf("login&");   
 int endpos0=ss.indexOf("&login");   
 int start1=ss.indexOf("psw&");   
 int endpos1=ss.indexOf("&psw");   
 if(start0!=-1&&endpos0!=-1){   
 str=ss.substring(start0+6,endpos0);   
 if(start1!=-1&&endpos1!=-1)psw=ss.substring(start1+4,endpos1);   
 }   
 System.out.println("888receive4"+psw);   
   
 try{   
 Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");//连接数据库   
 Connection c=DriverManager.getConnection("jdbc:odbc:player");   
 String sql="select password,nickname from infor where number=?";   
 PreparedStatement prepare=c.prepareCall(sql);   
 int g=Integer.parseInt(str);   
 prepare.clearParameters();   
 prepare.setInt(1,g);   
 ResultSet r=prepare.executeQuery();   
 System.out.println("1ok");   
 if(r.next()){//以下比较输入的号码于密码是否相同   
 String pass=r.getString("password").trim();   
 nickname=r.getString("nickname").trim();   
 //score=r.getInt("score").trim();   
   
 if(psw.compareTo(pass)==0)   
 { flagpass=1;   
 String bianma=URLEncoder.encode(nickname,"UTF-8");   
 String seout="land&"+"true"+"&"+bianma+"&\n\0";   
 out.println(seout);   
 System.out.println("ok");   
 }else { out.println("land&false&\0");System.out.println("oh no");}   
 }else { out.println("land&false&\0");System.out.println("oh no");}   
 r.close();//   
 c.close();//关闭联结!   
   
 }catch(Exception e){System.out.println("can not connect database");}   
 }catch(Exception e){}   
   
 }