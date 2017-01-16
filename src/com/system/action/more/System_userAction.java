package com.system.action.more;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.system.pojo.System_power_quickview;
import com.system.poco.System_power_quickviewPoco;
import com.system.poco.System_userPoco;
import com.system.pojo.System_roleuserview;
import com.system.pojo.System_user;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseAction;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.pojo.Treeinfo;
import com.system.tools.util.CipherUtil;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.util.TypeUtil;

/**
 * 用户 逻辑层
 *@author ZhangRuiLong
 */
public class System_userAction extends com.system.action.System_userAction {
	//新增
	public void insAll(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		json = json.replace("\"\"", "null");
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(System_user temp:cuss){
			if(CommonUtil.isNull(temp.getId()))
				temp.setId(CommonUtil.getNewId());
			temp.setPassword(CipherUtil.generatePassword("1"));
			result = insSingle(temp);
		}
		responsePW(response, result);
	}
	//初始化密码
	public void resetpassword(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		String  pwd = CipherUtil.generatePassword("1");
		for(System_user temp : cuss){
			temp.setPassword(pwd);
			result = updSingle(temp,System_userPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//用户自己修改密码
	public void setpassword(HttpServletRequest request, HttpServletResponse response){
		System_user user = getCurrentUser(request);
		if(CommonUtil.isNotEmpty(user)){
			String password = request.getParameter("password"); 
			String oldpassword = request.getParameter("oldpassword");
			String userid = user.getId();
			String  oldpwd = CipherUtil.generatePassword(oldpassword);
			if(oldpwd.equals(user.getPassword())){
				System_user temp = new System_user();
		        String  pwd = CipherUtil.generatePassword(password);
		        temp.setPassword(pwd);
		        temp.setId(userid);
		        result = updSingle(temp,null);
			}else{
				result = "原密码错误！";
			}
		}
		responsePW(response, result);
	}
	//该角色不包含的用户
	public void selQueryRemoveRoleuser(HttpServletRequest request, HttpServletResponse response){
		//查询所有改角色包含的用户
		String roleid = request.getParameter("roleid");
		Queryinfo roleusercussqueryinfo = getQueryinfo(System_roleuserview.class, 
				" roleid='" + roleid + "'", null, null);
		ArrayList<System_roleuserview> roleusercuss = (ArrayList<System_roleuserview>) selAll(roleusercussqueryinfo);
		//查询用户表
		Queryinfo usercussqueryinfo = getQueryinfo(request, System_user.class, System_userPoco.QUERYFIELDNAME, System_userPoco.ORDER, TYPE);
		ArrayList<System_user> usercuss = (ArrayList<System_user>) selAll(usercussqueryinfo);
		//遍历出该角色不包含的用户
		ArrayList<System_user> removeusercuss = new ArrayList<System_user>();
		int removenum = 0;//总条数
		for(System_user temp:usercuss){
			for(System_roleuserview roleusertemp:roleusercuss){
				if(temp.getId().equals(roleusertemp.getUserid())){
					removeusercuss.add(temp);
					removenum++;
				}
			}
		}
		usercuss.removeAll(removeusercuss);//得到该角色不包含的用户
		Pageinfo pageinfo = new Pageinfo(getTotal(usercussqueryinfo)-removenum, usercuss);
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//登入控制
	public void login(HttpServletRequest request, HttpServletResponse response){
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
			//查询验证用户
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			String  pwd = CipherUtil.generatePassword(password);
			String wheresql = "statue = '启用' and loginname = '" + username
					+ "' and password = '" + pwd + "'";
			Queryinfo queryinfo = getQueryinfo(request, System_user.class, System_userPoco.QUERYFIELDNAME, System_userPoco.ORDER, TYPE);
			queryinfo.setWheresql(wheresql);
			cuss = (ArrayList<System_user>) selAll(queryinfo);
			if(cuss.size()==0){
				responsePW(response, CommonConst.PASSWORDERRO);
			}else{
				System_user temp = cuss.get(0);
				String userid = temp.getId();
				ArrayList<Treeinfo> buttonpower = new System_powerAction().selMenu("按钮权限",null,userid);
				ArrayList<Treeinfo> datapower = new System_powerAction().selMenu("数据权限",null,userid);
				HttpSession session = request.getSession();
				session.setAttribute("buttonpower", buttonpower); //存
				session.setAttribute("datapower", datapower); //存
				session.setAttribute("user", temp); //存
				session.setAttribute("userid", temp.getId()); //存
				session.setAttribute("username", temp.getUsername()); //存
				responsePW(response, CommonConst.SUCCESS);
			}
	}
	//登入控制
	public void mlogin(HttpServletRequest request, HttpServletResponse response){
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		//查询验证用户
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String  pwd = CipherUtil.generatePassword(password);
		String wheresql = "statue = '启用' and loginname = '" + username
				+ "' and password = '" + pwd + "'";
		Queryinfo queryinfo = getQueryinfo(request, System_user.class, System_userPoco.QUERYFIELDNAME, System_userPoco.ORDER, TYPE);
		queryinfo.setWheresql(wheresql);
		cuss = (ArrayList<System_user>) selAll(queryinfo);
		if(cuss.size()==0){
			mresponsePW(request, response, CommonConst.PASSWORDERRO);
		}else{
			Pageinfo pageinfo = new Pageinfo(0,cuss);
			result = CommonConst.GSON.toJson(pageinfo);
			mresponsePW(request, response, result);
		}
	}
	//验证密码
	public void unlock(HttpServletRequest request, HttpServletResponse response){
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		System_user user = getCurrentUser(request);
		if(CommonUtil.isNotEmpty(user)){
			//查询验证用户
			String password = request.getParameter("password");
			String  pwd = CipherUtil.generatePassword(password);
			if(user.getPassword().equals(pwd)){
				responsePW(response, CommonConst.SUCCESS);
			}else{
				responsePW(response, CommonConst.PASSWORDERRO);
			}
		}else{
			String basepath = request.getContextPath();
			nextpage(response, basepath+"/zrlextpages/admin/login.html");
		}
	}
}
