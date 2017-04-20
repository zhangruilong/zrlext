package com.system.tools.base;

import java.lang.reflect.Type;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.apache.solr.client.solrj.SolrQuery;

import com.system.pojo.System_user;
import com.system.tools.CommonConst;
import com.system.tools.pojo.BeanToArray;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.pojo.Treeinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.TypeUtil;

public class BaseActionDao extends BaseDao {
	public String result = CommonConst.FAILURE;
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public static String getQuerysql(String query,String queryfieldname[]) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	for(int i=0;i<queryfieldname.length;i++){
    		querysql += queryfieldname[i] + " like '%" + query + "%' or ";
    	}
		return querysql.substring(0, querysql.length() - 4);
	};
	/**
	 * 跳转后浏览器地址栏变化。这种方式要传值出去的话，只能在url中带parameter或者放在session中，无法使用request.setAttribute来传递。
	 * 
	 */
	public static void nextpage(HttpServletResponse response,String url) {
		try {
			response.sendRedirect(url);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 跳转后浏览器地址栏不会变化。使用这种方式跳转，传值可以使用三种方法：url中带parameter，session，request.setAttribute
	 * 
	 */
	public static void nextpage(HttpServletRequest request, HttpServletResponse response,String url) {
		try {
			request.getRequestDispatcher(url).forward(request, response);
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 获取当前登陆用户信息
	 * 
	 * @return
	 */
//	public static Customer getCurrentCustomer(HttpServletRequest request) {
//		Customer user = null;
//		Object userSession = request.getSession().getAttribute("user");
//		if(!userSession.equals(null)){
//			user = (Customer) (userSession);
//		}
//		return user;
//	}
	/**
	 * 获取当前登陆用户信息
	 * 
	 * @return
	 */
	public static System_user getCurrentUser(HttpServletRequest request) {
		System_user user = null;
		Object userSession = request.getSession().getAttribute("user");
		if(!userSession.equals(null)){
			user = (System_user) (userSession);
		}
		return user;
	}
	/**
	 * 获取当前登入用户id
	 * 
	 * @return
	 */
	public static String getCurrentUserid(HttpServletRequest request) {
		String userid = null;
		Object useridSession = request.getSession().getAttribute("userid");
		if(!useridSession.equals(null)){
			userid = (String) (useridSession);
		}
		return userid;
	}
	/**
	 * 获取当前登入用户名
	 * 
	 * @return
	 */
	public static String getCurrentUsername(HttpServletRequest request) {
		String username = null;
		Object usernameSession = request.getSession().getAttribute("username");
		if(!usernameSession.equals(null)){
			username = (String) (usernameSession);
		}
		return username;
	}
	/**
	 * 获取当前登入用户菜单及按钮权限信息
	 * 
	 * @return
	 */
	public static Boolean checkButtonPower(HttpServletRequest request) {
		String powername = request.getParameter("powername");
		String menuname = request.getParameter("menuname");
		Object buttonpowerSession = request.getSession().getAttribute("buttonpower");
		if(CommonUtil.isNotEmpty(buttonpowerSession)){
			ArrayList<Treeinfo> buttonpower = (ArrayList<Treeinfo>) (buttonpowerSession);
			for(Treeinfo temp:buttonpower){
				if(temp.getParent().equals(menuname)&&temp.getText().equals(powername)){
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 
	 * @param request
	 * @param menuname 菜单名
	 * @param powername 按钮名
	 * @return
	 */
	public static Boolean checkButtonPower(HttpServletRequest request,String menuname,String powername) {
		Object buttonpowerSession = request.getSession().getAttribute("buttonpower");
		if(CommonUtil.isNotEmpty(buttonpowerSession)){
			ArrayList<Treeinfo> buttonpower = (ArrayList<Treeinfo>) (buttonpowerSession);
			for(Treeinfo temp:buttonpower){
				if(temp.getParent().equals(menuname)&&temp.getText().equals(powername)){
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 获取当前登入用户数据权限信息
	 * 
	 * @return
	 */
	public static ArrayList<Treeinfo> getDataPower(HttpServletRequest request) {
		ArrayList<Treeinfo> buttonpower = null;
		Object datapowerSession = request.getSession().getAttribute("datapower");
		if(CommonUtil.isNotEmpty(datapowerSession)){
			buttonpower = (ArrayList<Treeinfo>) (datapowerSession);
		}
		return buttonpower;
	}
	/**
	 * 获得sql即从datapower中获取当前登入用户数据权限的拼接（sqlpower.getCode() != power.getText()）
	 * @param parentname 菜单名,Treeinfo格式的datapower中的parent
	 * @return
	 */
	public static String getDataPowerNotequalSql(HttpServletRequest request,String parentname) {
		String sql = "";
		ArrayList<Treeinfo> datapower = null;
		Object datapowerSession = request.getSession().getAttribute("datapower");
		if(CommonUtil.isNotEmpty(datapowerSession)){
			datapower = (ArrayList<Treeinfo>) (datapowerSession);
			if(datapower != null&&datapower.size()!=0){
				for(Treeinfo power:datapower){
					if(power.getParent().equals(parentname)){
						sql += " and " + power.getCode() + "!='" + power.getText() + "'";
					}
				}
			}
		}
		sql = sql.substring(4);
		System.out.println("数据权限：" + sql);
		return sql;
	}
	/**
	 * 获得sql即从datapower中获取当前登入用户数据权限的拼接（sqlpower.getCode() != power.getText()）
	 * @param parentname 菜单名,Treeinfo格式的datapower中的parent 
	 * @return
	 */
	public static String getDataPowerEqualSql(HttpServletRequest request,String parentname) {
		String sql = "";
		if(getCurrentUsername(request).equals("管理员")){
			return sql;
		}
		ArrayList<Treeinfo> datapower = null;
		Object datapowerSession = request.getSession().getAttribute("datapower");
		if(CommonUtil.isNotEmpty(datapowerSession)){
			datapower = (ArrayList<Treeinfo>) (datapowerSession);
			if(datapower != null&&datapower.size()!=0){
				for(Treeinfo power:datapower){
					if(power.getParent().equals(parentname)){
						sql += " or " + power.getCode() + "='" + power.getText() + "'";
					}
				}
			}
		}
		sql = sql.substring(3);
		System.out.println("数据权限：" + sql);
		return sql;
	}
	/**
	 * 获得sql即从datapower中获取当前登入用户数据权限的拼接（sqlpower.getCode() = power.getText()）
	 * 
	 * @return
	 */
	/*public static String getDataPowerSql(HttpServletRequest request,String parentname) {
		String sql = " (1=1 ";
		ArrayList<Treeinfo> datapower = null;
		Object datapowerSession = request.getSession().getAttribute("datapower");
		if(CommonUtil.isNotEmpty(datapowerSession)){
			datapower = (ArrayList<Treeinfo>) (datapowerSession);
			if(datapower != null&&datapower.size()!=0){
				for(Treeinfo power:datapower){
					if(power.getParent().equals(parentname)){
						sql = sql+" and "+power.getCode()+" != '"+power.getText()+"'";
					}
				}
			}
		}
		sql = sql+" ) ";
		return sql;
	}*/
	/**
	 * 注销，清除session内用户信息
	 * @param request
	 */
	public static void logout(HttpServletRequest request, HttpServletResponse response){
		request.getSession().removeAttribute("user");
		request.getSession().removeAttribute("userid");
		request.getSession().removeAttribute("username");
		request.getSession().invalidate();
		try {
			response.sendRedirect("login.jsp");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 将结果返回给页面
	 * @param response
	 * @param result 
	 */
	public static void responsePW(HttpServletResponse response, String result) {
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		if(CommonUtil.isEmpty(result)) result = CommonConst.FAILURE;
		PrintWriter pw = null;
		try {
			pw = response.getWriter();
			pw.print(result);
			pw.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(pw != null){
				pw.close();
			}
		}
	}
	/**
	 * 将结果跨域返回给页面
	 * @param response
	 * @param result 
	 */
	public static void mresponsePW(HttpServletRequest request, HttpServletResponse response, String result) {
		if(result.equals(CommonConst.FAILURE)){
			result = CommonConst.MFAILURE;
		}
		boolean jsonP = false;
		String cb = request.getParameter("callback");
		if (cb != null) {
		    jsonP = true;
		    response.setContentType("text/javascript");
		} else {
		    response.setContentType("application/x-json");
		}
		PrintWriter pw = null;
		try {
			pw = response.getWriter();
			if (jsonP) {
				pw.write(cb + "(");
			}
			pw.print(result);
			if (jsonP) {
				pw.write(");");
			}
			pw.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if(pw != null){
				pw.close();
			}
		}
	}
	/**
	 * 使用request.getParameter()获取Queryinfo信息
	 * @param request
	 * @return
	 */
	public static Queryinfo getQueryinfo(HttpServletRequest request) {
		String start = request.getParameter("start");
		if(CommonUtil.isEmpty(start)) start = "0";
		String limit = request.getParameter("limit");
		if(CommonUtil.isEmpty(limit)) limit = CommonConst.LIMIT;
		int endtemp = TypeUtil.stringToInt(start) + TypeUtil.stringToInt(limit);
		String end = TypeUtil.intToString(endtemp);
		String wheresql = request.getParameter("wheresql");
		String query = request.getParameter("query");
		String order = request.getParameter("order");
		Queryinfo queryinfo = new Queryinfo(null, start,limit, end, wheresql, query, order,null);
		return queryinfo;
	}
	/**
	 * 
	 * @param request
	 * @param type
	 * @param queryfieldname POCO要模糊查询字段
	 * @param pocoorder POCO实体排序
	 * @param TYPE
	 * @return
	 */
	public static Queryinfo getQueryinfo(HttpServletRequest request, Class type, 
			String[] queryfieldname, String pocoorder, Type TYPE, String... LIMIT) {
		String start = request.getParameter("start");
		if(CommonUtil.isEmpty(start)) start = "0";
		String limit = request.getParameter("limit");
		if(null!=LIMIT&&LIMIT.length>0) limit = LIMIT[0];
		if(CommonUtil.isNull(limit)) limit = CommonConst.LIMIT;
		int endtemp = TypeUtil.stringToInt(start) + TypeUtil.stringToInt(limit);
		String end = TypeUtil.intToString(endtemp);
		String wheresql = request.getParameter("wheresql");
		String query = request.getParameter("query");
		String order = request.getParameter("order");
		if(CommonUtil.isNull(order)) order = pocoorder;
		Queryinfo queryinfo = new Queryinfo(type, start, limit, end, wheresql, 
				getQuerysql(query,queryfieldname), order, null);
		queryinfo.setDsname(type.getSimpleName());
		String json = request.getParameter("json");
		if(CommonUtil.isNotEmpty(json)){
			System.out.println("json : " + json);
			json = json.replace("\"\"", "null");
			if(CommonUtil.isNotEmpty(json)) {
				ArrayList<Object> cuss = CommonConst.GSON.fromJson(json, TYPE);
				queryinfo.setJson(cuss.get(0));
			}
		}
		return queryinfo;
	}
	/**
	 * 设置了默认值的Queryinfo，start = 0,end = CommonConst.LIMIT
	 * @param request
	 * @return
	 */
	public static Queryinfo getQueryinfo(Class type, String wheresql, String querysql, String order) {
		Queryinfo queryinfo = new Queryinfo(type, "0", CommonConst.LIMIT, CommonConst.LIMIT, wheresql, querysql, order,null);
		return queryinfo;
	}
	/**
	 * 使用request.getParameter()获取Queryinfo信息
	 * new String(wheresql.getBytes("iso8859-1"),"utf-8");
	 * new String(query.getBytes("iso8859-1"),"utf-8");
	 * @param request
	 * @return
	 */
//	public static Queryinfo mgetQueryinfo(HttpServletRequest request) {
//		String start = request.getParameter("start");
//		if(CommonUtil.isEmpty(start)) start = "0";
//		String limit = request.getParameter("limit");
//		if(CommonUtil.isEmpty(limit)) limit = "20";
//		int endtemp = TypeUtil.stringToInt(start) + TypeUtil.stringToInt(limit);
//		String end = TypeUtil.intToString(endtemp);
//		String wheresql = request.getParameter("wheresql");
//		if(CommonUtil.isNotEmpty(wheresql)){
//			try {
//				wheresql = new String(wheresql.getBytes("iso8859-1"),"utf-8");
//			} catch (UnsupportedEncodingException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		String query = request.getParameter("query");
//		if(CommonUtil.isNotEmpty(query)){
//			try {
//				query = new String(query.getBytes("iso8859-1"),"utf-8");
//			} catch (UnsupportedEncodingException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		Queryinfo queryinfo = new Queryinfo(null, start, end, wheresql, query, null);
//		return queryinfo;
//	}
	/**
	 * 将queryinfo转为solrquery
	 * @param queryinfo
	 * @return
	 */
//	public static Queryinfo getSolrquery(HttpServletRequest request, Class type, 
//			String[] queryfieldname, String pocoorder, Type TYPE, String... LIMIT) {
//		SolrQuery mSolrQuery = new SolrQuery();
//		String start = request.getParameter("start");
//		if(CommonUtil.isNull(start)) mSolrQuery.setStart(0);
//		else mSolrQuery.setStart(TypeUtil.stringToInt(start));
//		String limit = request.getParameter("limit");
//		if(null!=LIMIT&&LIMIT.length>0) limit = LIMIT[0];
//		if(CommonUtil.isNull(limit)) mSolrQuery.setRows(TypeUtil.stringToInt(CommonConst.LIMIT));
//		else mSolrQuery.setRows(TypeUtil.stringToInt(limit));
//		String wheresql = request.getParameter("wheresql");
//		String query = request.getParameter("query");
//		String order = request.getParameter("order");
//		if(CommonUtil.isNull(order)) order = pocoorder;
//		//参数sort,设置返回结果的排序规则  
//		String [] orderbys = order.toLowerCase().split(",");
//		for(String morderby : orderbys){
//			if(morderby.indexOf("desc")>0){
//				morderby = morderby.replaceFirst("desc", "");
//				mSolrQuery.setSort(morderby,SolrQuery.ORDER.desc);
//			}else if(morderby.indexOf("desc")>0){
//				morderby = morderby.replaceFirst("asc", "");
//				mSolrQuery.setSort(morderby,SolrQuery.ORDER.asc);
//			}else mSolrQuery.setSort(morderby,SolrQuery.ORDER.asc);
//		}
//		String json = request.getParameter("json");
//		String wherejson = "";
//		if(!CommonUtil.isEmpty(json)){
//			System.out.println("json : " + json);
//			json = json.replace("\"\"", "null");
//			if(!CommonUtil.isEmpty(json)) {
//				ArrayList<Object> cuss = CommonConst.GSON.fromJson(json, TYPE);
//				BeanToArray beanToArray = TypeUtil.beanToList(cuss.get(0));
//				for (int i = 0; i < beanToArray.getBeanNames().size(); i++) {
//					wherejson += " AND " + beanToArray.getBeanNames().get(i) + ":*" + beanToArray.getValues().get(i) + "*";
//				}
//			}
//		}
//		if(CommonUtil.isNull(query)) {
//			mSolrQuery.set("q", "*:*");
//		} else {
//			String querysql = "";
//	    	for(int i=0;i<queryfieldname.length;i++){
//	    		querysql += " OR " + queryfieldname[i] + ":*" + query + "*";
//	    	}
//	    	//querysql += ";" + order;
//			mSolrQuery.set("q", querysql.substring(4));
//		}
//		if(!CommonUtil.isNull(wheresql)) {
//			mSolrQuery.addFilterQuery(wheresql);
//		}
//		if(!CommonUtil.isNull(wherejson)) {
//			mSolrQuery.addFilterQuery(wherejson.substring(5));
//		}
//         //参数hl,设置高亮  
//		mSolrQuery.setHighlight(true);  
//         //设置高亮的字段  
////         query.addHighlightField("name");  
//         //设置高亮的样式  
//		mSolrQuery.setHighlightSimplePre("<font color='red'>");  
//		mSolrQuery.setHighlightSimplePost("</font>"); 
//		Queryinfo queryinfo = new Queryinfo();
//		queryinfo.setDsname(type.getSimpleName());
//		queryinfo.setSolrquery(mSolrQuery);
//        return queryinfo;
//	}
}
