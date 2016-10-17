package com.system.action.more;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.system.poco.System_powerPoco;
import com.system.pojo.System_power;
import com.system.pojo.System_powerview;
import com.system.pojo.System_rolepowerview;
import com.system.pojo.System_user;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseAction;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.pojo.Treeinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;

/**
 * 快捷菜单 逻辑层
 *@author ZhangRuiLong
 */
public class System_powerAction extends com.system.action.System_powerAction {
	//获取权限树
	public void selPowertree(HttpServletRequest request, HttpServletResponse response){
		String node = request.getParameter("node");
		if(node.equals("root")){
			String wheresql = " menulevel='顶级菜单'";
			result = CommonConst.GSON.toJson(selPowertree(wheresql));
		}else{
			String wheresql = " parentid='" + node + "'";
			result = CommonConst.GSON.toJson(selPowertree(wheresql));		
		}
		responsePW(response, result);
	}
	//根据roleid查询所有的power
	public void selRolepowertree(HttpServletRequest request, HttpServletResponse response){
		String roleid = request.getParameter("roleid");
		Queryinfo queryinfo = new Queryinfo();
		queryinfo.setType(System_rolepowerview.class);
		queryinfo.setWheresql(" roleid='" + roleid + "'");
		ArrayList<System_rolepowerview> roleidcuss = (ArrayList<System_rolepowerview>) selAll(queryinfo);
		String powerwheresql = " menulevel='顶级菜单'";
		ArrayList<Treeinfo> parentTreeinfo = selPowertree(powerwheresql);
		parentTreeinfo = addchild(parentTreeinfo,roleidcuss);
		result = CommonConst.GSON.toJson(parentTreeinfo);	
		responsePW(response, result);
	}
	//寻找子节点
	private ArrayList<Treeinfo> addchild(ArrayList<Treeinfo> parentTreeinfo,ArrayList<System_rolepowerview> roleidcuss) {
		for(int i=0;i<parentTreeinfo.size();i++){
			String powerid = parentTreeinfo.get(i).getId();
			Boolean havepower = checkrolepower(powerid,roleidcuss);
			parentTreeinfo.get(i).setChecked(havepower);
			String powerwheresql = " parentid='" + powerid + "'";
			ArrayList<Treeinfo> childTreeinfo = selPowertree(powerwheresql);
			if(CommonUtil.isNotEmpty(childTreeinfo)){
				childTreeinfo = addchild(childTreeinfo,roleidcuss);
			}
			parentTreeinfo.get(i).setChildren(childTreeinfo);
		}
		return parentTreeinfo;
	}
	//判断是否有该权限
	private Boolean checkrolepower(String powerid,ArrayList<System_rolepowerview> roleidcuss) {
		for(System_rolepowerview temp:roleidcuss){
			if(powerid.equals(temp.getPowerid())){
				return true;
			}
		}
		return false;
	}
	@SuppressWarnings("finally")
	public ArrayList<Treeinfo> selPowertree(String wheresql) {
		String sql = null;
		Treeinfo temp = null;
		ArrayList<Treeinfo> temps = new ArrayList<Treeinfo>();
		Connection  conn=connectionMan.getConnection(null); 
		Statement stmt = null;
		ResultSet rs = null;
		try {
			sql = "select * from "+System_powerPoco.TABLE+" where 1=1 ";
			if(CommonUtil.isNotEmpty(wheresql)){
				sql = sql + " and (" + wheresql + ") ";
			}
			sql += " order by " + System_powerPoco.ORDER; 
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				String leaf = "true";
				if(rs.getString("menulevel").endsWith("菜单")){
					String selchildwheresql = "parentid='" + rs.getString("id") + "'";
					if(selPowertree(selchildwheresql).size()!=0){
						leaf = null;
					}
				}
				temp = new Treeinfo(rs.getString("id"), rs.getString("code"), rs.getString("name"), rs.getString("detail"),
						null, null, null,leaf, rs.getString("parentid"));
				temps.add(temp);
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(null,conn,stmt,rs);
			return temps;
		}
	};
	//查询菜单
	public void selMenuChildren(HttpServletRequest request, HttpServletResponse response){
		System_user user = getCurrentUser(request);
		if(CommonUtil.isNotEmpty(user)){
			String node = request.getParameter("node");
//				String json = request.getParameter("json");
//				if(null != json && !json.equals("")){
//					cuss = CommonConst.GSON.fromJson(json, TYPE);
//				}
			String userid = user.getId();
			//if(userid.equals("1")) userid = null;
			if(node.equals("root"))
				result = CommonConst.GSON.toJson(selMenu("顶级菜单",null,userid));
			else
				result = CommonConst.GSON.toJson(selMenu("%菜单",node,userid));
		}
		responsePW(response, result);
	}
	//查询菜单
	public void selAllMenu(HttpServletRequest request, HttpServletResponse response){
		System_user user = getCurrentUser(request);
		if(CommonUtil.isNotEmpty(user)){
			String userid = user.getId();
			ArrayList<Treeinfo> menus = selMenu("顶级菜单",null,userid);
			for(int i=0;i<menus.size();i++){
				if(null==menus.get(i).getLeaf()){
					menus.get(i).setChildren(selMenu("%菜单",menus.get(i).getId(),userid));
				}
			}
			result = CommonConst.GSON.toJson(menus);
		}
		responsePW(response, result);
	}
	//未被设为快捷菜单的菜单
	public void selMenuRemoveQuick(HttpServletRequest request, HttpServletResponse response){
		System_user user = getCurrentUser(request);
		if(CommonUtil.isNotEmpty(user)){
			String userid = user.getId();
			String query = request.getParameter("query");
			result = CommonConst.GSON.toJson(selMenuRemoveQuick(query, userid));
			result = "{total:0,root:"+result+"}";	
		}
		responsePW(response, result);
	}
	@SuppressWarnings("finally")
	public ArrayList<System_powerview> selMenuRemoveQuick(String query,String userid) {
		String sql = null;
		System_powerview temp = null;
		ArrayList<System_powerview> temps = new ArrayList<System_powerview>();
		Connection  conn=connectionMan.getConnection(null); 
		Statement stmt = null;
		ResultSet rs = null;
		try {
			sql = "select * from system_powerview t where menulevel like '%菜单' ";
			if(CommonUtil.isNotEmpty(query)){
				sql =sql+" and (code like '"+query+"' or name like '"+query+"' or parentname like '"+query+"'";
			}		
			sql += " and t.id not in (select powerid from system_power_quick where userid = '" + userid + "') order by code";
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				temp = new System_powerview(rs.getString("id")
 				,rs.getString("code")
 				,rs.getString("name")
 				,rs.getString("detail")
 				,rs.getString("parentid")
 				,rs.getString("menulevel")
 				,rs.getString("entrance")
 				,rs.getString("menuorder")
 				,rs.getString("parentname")
 				,rs.getString("iconcls")
 				,rs.getString("hreftarget")
				);
				temps.add(temp);
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(null,conn,stmt,rs);
			return temps;
		}
	}
	@SuppressWarnings("finally")
	public ArrayList<Treeinfo> selMenu(String menulevel,String parentid,String userid) {
		String sql = null;
		Treeinfo temp = null;
		ArrayList<Treeinfo> temps = new ArrayList<Treeinfo>();
		Connection  conn=connectionMan.getConnection(null); 
		Statement stmt = null;
		ResultSet rs = null;
		try {
			sql = "select * from System_MenuView where 1=1 ";
			if(CommonUtil.isNotEmpty(menulevel)){
				sql =sql+" and menulevel like '"+menulevel+"' ";
			}
			if(CommonUtil.isNotEmpty(parentid)){
				sql =sql+" and parentid = '"+parentid+"' ";
			}
			if(CommonUtil.isNotEmpty(userid)){
				sql =sql+" and userid = '"+userid+"' ";
			}
			sql += " order by menuorder desc"; 
			System.out.println(sql);
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				String leaf = null;
				if(CommonUtil.isNotEmpty(rs.getString("menulevel"))&&(rs.getString("menulevel")).equals("叶子菜单")){
					leaf="true";
				}
				temp = new Treeinfo(rs.getString("id"), rs.getString("code"), rs.getString("name"), rs.getString("detail"),
						rs.getString("iconcls"), rs.getString("entrance"), rs.getString("hreftarget"),leaf, rs.getString("parentid"));
				temps.add(temp);
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(null,conn,stmt,rs);
			return temps;
		}
	}
}
