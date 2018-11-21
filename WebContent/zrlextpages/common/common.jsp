<%@ page import="com.system.pojo.System_user, com.system.pojo.System_roleuserview"%>
<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
System_user currentuser = new System_user();
Object userSession = session.getAttribute("user");
if(userSession!=null) currentuser = (System_user) (userSession);
ArrayList<System_roleuserview> roleusercuss = new ArrayList();
Object roleusercussSession = session.getAttribute("roleusercuss");
if(roleusercussSession!=null) roleusercuss = (ArrayList<System_roleuserview>) (roleusercussSession);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>zrlextpages/common/buttonstyle.css" />
<link rel="stylesheet" href="<%=basePath%>zrlextpages/common/sencha/build/classic/theme-crisp/resources/theme-crisp-all.css"/>
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/sencha/build/ext-all.js"></script>
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/sencha/build/exporter-all.css"></script>
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/sencha/build/exporter.js"></script> 
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/sencha/build/classic/locale/locale-zh_CN.js"></script>  
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/jsutil.js"></script>
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>common/common.js"></script>
<script>
basePath = '<%=basePath%>';
currentuser = new Object();
currentuser.id = '<%=currentuser.getId()%>';
currentuser.loginname = '<%=currentuser.getLoginname()%>';
currentuser.password = '<%=currentuser.getPassword()%>';
currentuser.statue = '<%=currentuser.getStatue()%>';
currentuser.username = '<%=currentuser.getUsername()%>';
currentuser.rolecode = '<%=roleusercuss.get(0).getRolecode()%>';
currentuser.rolename = '<%=roleusercuss.get(0).getRolename()%>';
currentuser.roledetail = '<%=roleusercuss.get(0).getRoledetail()%>';
queryjson = '';
</script>
</head>
</html>
