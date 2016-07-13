<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>common/buttonstyle.css" />
	<script src="<%=basePath%>sencha/ext-bootstrap.js"></script>
	<link rel="stylesheet" href="<%=basePath%>sencha/build/classic/theme-crisp/resources/theme-crisp-all.css"/>
	<script type="text/javascript" src="<%=basePath%>common/comfun.js"></script>
	<script type="text/javascript" src="<%=basePath%>common/common.js"></script>
<script>
var basePath = '<%=basePath%>';
</script>
</head>
</html>
