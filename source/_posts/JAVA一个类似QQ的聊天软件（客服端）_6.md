---
title: JAVA一个类似QQ的聊天软件（客服端）
date: 2007-01-01 08:00:06
tags:
categories:
- 程序
---
      这个程序参考了别人的一些源码BUG当然很多，毕竟不是产品！   
 因为这个程序就客服务端代码有1500行左右所以只粘出部分代码   
 import java.awt.*;   
 import java.awt.event.*;   
 import javax.swing.*;   
 import java.net.*;   
 import java.io.*;   
 import java.util.Vector;   
 import javax.swing.border.*;   
 class Pic extends JPanel   
 {Image b;   
 Toolkit tool;   
 Pic(){   
 setSize(376,94);   
 tool=getToolkit();   
 b=tool.getImage("image/b.gif");   
 }   
 public void paint(Graphics g){   
 g.drawImage(b,0,0,376,94,this);   
 }   
 }   
 class Rep extends JPanel   
 {   
 Image b;   
 Toolkit tool;   
 String s="image/1.jpg";   
 public void setS(String s){this.s=s;}   
 Rep()   
 {   
 setSize(50,50);   
   
 }   
   
 public void paint(Graphics g){   
 tool=getToolkit();   
 b=tool.getImage(s);   
 g.drawImage(b,0,0,50,50,this);   
 }   
 }   
 ////// 我的图标*/********************   
 class Repp extends JPanel   
 {   
 Image b;   
 Toolkit tool;   
 String s;   
 Repp(String s)   
 { this.s=s;   
 setSize(50,50);   
   
 }   
   
 public void paint(Graphics g){   
 tool=getToolkit();   
 b=tool.getImage(s);   
 g.drawImage(b,0,0,50,50,this);   
 }   
 }   
 ///////////////////////////////   
   
 class Win extends JFrame implements ActionListener,ItemListener   
 {//新建用户类以下创建程序界面   
 String sername;//服务器名   
 int serverport;//服务器端口   
 int flag=1;   
 int myid;   
 String[] pics = new String[] {//头像   
 "image/1.jpg","image/2.jpg", "image/3.jpg","image/4.jpg",   
 "image/5.jpg","image/6.jpg", "image/7.jpg","image/8.jpg","image/9.jpg",};   
   
 Rep b=new Rep();   
   
 JLabel jLabel2 = new JLabel("请填写以下内容");   
 JLabel jLabel1 = new JLabel("昵 称");   
 JTextField nickname = new JTextField();   
 JLabel jLabel0 = new JLabel("性 别");   
 Checkbox boy,girl;   
 CheckboxGroup group;   
 JLabel jLabel3=new JLabel("密 码");   
 JPasswordField password = new JPasswordField();   
 JLabel jLabel4=new JLabel("电子邮件");   
 JTextField email = new JTextField();   
 JLabel jLabel5 = new JLabel("头 像");   
 Choice jChoice5=new Choice();   
 JLabel jLabel8=new JLabel("年 龄");   
 JTextField age=new JTextField();   
 JLabel jLabel6=new JLabel("职 业");   
 Choice jChoice=new Choice();   
 JLabel jLabel7=new JLabel("个人简介");   
 JTextPane introduce = new JTextPane();   
 //JTextField resume=new JTextField();   
 JButton jButton1 = new JButton("提 交");   
 JButton jButton2 = new JButton("重 填");   
   
   
 public Win(String s,String k,int port,int flag,int myid)   
 {   
 super(s);   
 sername=k;   
 serverport=port;   
 this.flag=flag;   
 this.myid=myid;   
 setBounds(400,200,400,400);   
 addWindowListener(new WindowAdapter()   
 { public void windowClosing(WindowEvent e)   
 {   
 dispose();   
 }   
 });   
 setResizable(false);//设成最大化不可用   
   
 jLabel2.setBounds(15,12,150,20); //请填写以下内容   
 jLabel1.setBounds(15,50,60,20); //昵称   
 nickname.setBounds(80,50,80,22);   
 jLabel0.setBounds(15,80,60,20); //性别   
 group=new CheckboxGroup();   
 boy=new Checkbox("男",true,group);   
 girl=new Checkbox("女",false,group);   
 boy.setBounds(80,80,40,20);   
 girl.setBounds(120,80,40,20);   
 jLabel3.setBounds(15,110,60,20); //密码   
 password.setBounds(80,110,80,20);   
 jLabel4.setBounds(15,140,60,20); //电子邮件   
 email.setBounds(80,140,80,20);   
 jLabel8.setBounds(15,170,60,20); //age   
 age.setBounds(80,170,40,20);   
 jLabel6.setBounds(180,170,60,20); //职业   
 jChoice.add("小偷");   
 jChoice.add("强盗");   
 jChoice.add("流氓");   
 jChoice.setBounds(250,170,60,20);   
 jLabel7.setBounds(15,200,60,20); //个人简介   
 introduce.setBounds(15,230,370,80);   
 jLabel5.setBounds(280,50,50,20); //头 像   
 jChoice5.add("Man1");   
 jChoice5.add("Man2");   
 jChoice5.add("Man3");   
 jChoice5.add("Woman1");   
 jChoice5.add("Woman2");   
 jChoice5.add("Woman3");   
 jChoice5.add("Pet1");   
 jChoice5.add("Pet2");   
 jChoice5.add("Pet3");   
 jChoice5.addItemListener(this);   
 jChoice5.setBounds(280,75,80,20);   
 b.setBounds(220,50,50,50);   
 jButton1.setBounds(75,320,80,30);   
 jButton2.setBounds(200,320,80,30);   
 jButton1.addActionListener(this);   
 jButton2.addActionListener(this);   
   
 //**********************************   
 /*FlowLayout flow=new FlowLayout();   
 //flow.setAlignment(FlowLayout.LEFT);   
 //flow.setHgap(5);   
 //flow.setVgap(10);*/   
 //********************************   
   
 Container con1=getContentPane();   
 //Container con2=getContentPane();   
 con1.setBackground(new Color(0xc6defb));   
   
   
 con1.setLayout(null);   
 con1.add(jLabel2);   
 con1.add(jLabel1);   
 con1.add(nickname);   
 con1.add(jLabel3);   
 con1.add(jLabel0);   
 con1.add(password);   
 con1.add(jLabel4);   
 con1.add(email);   
 con1.add(jLabel5);   
 con1.add(jChoice5);   
 con1.add(b);   
 con1.add(jLabel6);   
 con1.add(introduce);   
 con1.add(jLabel7);   
 con1.add(jLabel8);   
 con1.add(age);   
 con1.add(jChoice);   
 con1.add(jButton1);   
 con1.add(jButton2);   
 con1.add(boy);   
 con1.add(girl);   
 setIconImage((new ImageIcon("image/a.gif")).getImage());   
 setVisible(true);   
 validate();   
 }   
   
 public void itemStateChanged(ItemEvent e)   
 {   
 b.setS(pics[jChoice5.getSelectedIndex()]);   
 b.repaint();   
 }   
   
 public void actionPerformed(ActionEvent e)   
 {   
 if (e.getSource()==jButton2)   
 {   
 System.out.println("已清空");   
 nickname.setText("");   
 password.setText("");   
 email.setText("");   
 age.setText("");   
 introduce.setText("");   
 }   
 if (e.getSource()==jButton1)   
 {   
 if(nickname.getText().length()!=0&&password.getText().length()!=0&&email.getText().length()!=0&&age.getText().length()!=0&&introduce.getText().length()!=0){   
 try{ System.out.println(sername);   
 System.out.println(serverport);   
 Socket socket=new Socket(InetAddress.getByName(sername),serverport);//连接服务器   
   
 BufferedReader in=new BufferedReader(new InputStreamReader(socket.getInputStream()));   
 PrintWriter out=new PrintWriter(new BufferedWriter(   
 new OutputStreamWriter(socket.getOutputStream())),true);   
 if(flag==1)//////////////////如果是注册就发送NEW如果是设置就发送SET   
 out.println("new");//发送新建用户请求   
 else{   
 out.println("set");   
 out.println(myid); }//发送设置请求   
 out.println(nickname.getText().trim());//发送呢称等信息   
 out.println(password.getPassword());   
 out.println(email.getText().trim());   
 out.println(introduce.getText().trim());   
 out.println(age.getText().trim());   
 out.println(jChoice5.getSelectedIndex());//head picindex   
 String ***;   
 if(boy.getState ()==true)***="男人";   
 else ***="女人";   
 out.println(***);   
 out.println( jChoice.getSelectedItem());   
 int no;   
 no=Integer.parseInt(in.readLine());   
 System.out.print(no);   
 String str="";   
 //do{   
 str=in.readLine().trim();//从服务器读取信息   
 //如果出错   
 if(str.equals("ok")){if(flag==1)JOptionPane.showMessageDialog(this, "你的ID是："+no,"OK",JOptionPane.INFORMATION\_MESSAGE);   
   
 else JOptionPane.showMessageDialog(this, "服务器已经接收你的资料!你要刷新才能改变!","OK",JOptionPane.INFORMATION\_MESSAGE);   
 }   
 else{//如果成功就告诉用户其号码   
 JOptionPane.showMessageDialog(this, "网络或其他问题！","OK",JOptionPane.INFORMATION\_MESSAGE);   
 this.dispose();//并打开主窗口   
 //* ** MainWin f2=new MainWin(no,sername,serverport);   
 //*** f2.setVisible(true);}   
 }   
 //System.out.println("\n");   
 //}while(!str.equals("ok"));   
 // socket.close();   
 }catch(IOException e1){ JOptionPane.showMessageDialog(this, "网络或其他问题！","OK",JOptionPane.INFORMATION\_MESSAGE); }   
 }else{ System.out.println("*****");JOptionPane.showMessageDialog(this, "填完你的资料，大哥!","OK",JOptionPane.INFORMATION\_MESSAGE); }   
 }   
 }   
 }