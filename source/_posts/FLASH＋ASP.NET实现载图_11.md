---
title: FLASH＋ASP.NET实现载图
date: 2007-01-01 08:00:11
tags:
categories:
- as技术
---
        
 private int height;   
 private int width;   
 private void Page\_Load(object sender, System.EventArgs e)   
 {   
 // 在此处放置用户代码以初始化页面   
 if(!this.IsPostBack)acceptdata();   
 }   
 private void acceptdata()   
 {   
 height=Convert.ToInt32(Request.Form["height"]);   
 width=Convert.ToInt32(Request.Form["width"]);   
 //Response.Write("path="+Request.Form["px0"]+"-"+width.ToString());   
 try   
 {   
 createimage(width,height);   
 }   
 catch(Exception)   
 {   
 //Response.Write("path="+e.Message.ToString());   
 }   
 finally   
 {   
   
 }   
 Response.Write("path=成功了！");   
   
 }   
 private void createimage(int w,int h)   
 {   
 Bitmap image=new Bitmap(w,h);   
 int xx=-1;   
 int yy=-1;   
 try   
 {   
 string []strpixl;   
 int r,g,b;   
 for(int x=0;x<h;x++)   
 {   
 yy++;   
 strpixl=System.Text.RegularExpressions.Regex.Split(Request.Form["px"+x.ToString()],",");   
 xx=-1;   
 for(int y=0;y<w;y++)   
 {   
 xx++;   
 if(strpixl[y].Length<6)strpixl[y]="000000";   
 r=int.Parse(strpixl[y].Substring(0,2),System.Globalization.NumberStyles.HexNumber);   
 g=int.Parse(strpixl[y].Substring(2,2),System.Globalization.NumberStyles.HexNumber);   
 b=int.Parse(strpixl[y].Substring(4,2),System.Globalization.NumberStyles.HexNumber);   
 image.SetPixel(y,x,Color.FromArgb(r,g,b));   
 }   
 }   
 }   
 catch(Exception)   
 {   
 Response.Write("path="+xx.ToString()+"-"+yy.ToString()+"-"+h.ToString());   
 }   
 image.Save(Server.MapPath("./flashimage.jpg"),System.Drawing.Imaging.ImageFormat.Jpeg);   
 image.Dispose();   
 }   
