<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>zrlextpages/common/buttonstyle.css" />
<link rel="stylesheet" href="<%=basePath%>zrlextpages/common/sencha/build/classic/theme-crisp/resources/theme-crisp-all.css"/>
<script src="<%=basePath%>zrlextpages/common/sencha/ext-bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/sencha/build/ext-all.js"></script>  
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/sencha/build/classic/locale/locale-zh_CN.js"></script>  
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/comfun.js"></script>
<script type="text/javascript" src="<%=basePath%>zrlextpages/common/common.js"></script>
<script>
var basePath = '<%=basePath%>';
var queryjson = '';
</script>
</head>
</html>
