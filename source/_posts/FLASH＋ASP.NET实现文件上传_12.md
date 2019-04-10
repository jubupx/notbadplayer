---
title: FLASH＋ASP.NET实现文件上传
date: 2007-01-01 08:00:12
tags:
categories:
- as技术
---
        
 private void Page\_Load(object sender, System.EventArgs e)   
 {   
   
 HttpFileCollection uploadedFiles = Request.Files;   
 for(int i = 0 ; i < uploadedFiles.Count ; i++)   
 {   
 HttpPostedFile F = uploadedFiles   ;   
 if(uploadedFiles   != null && F.ContentLength > 0)   
 {   
 string newName = F.FileName.Substring(F.FileName.LastIndexOf("\\") + 1);   
 F.SaveAs(Server.MapPath("upload") + "/" + newName);   
 }   
 }   
   
 }  