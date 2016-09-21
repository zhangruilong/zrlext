package com.system.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.system.pojo.System_menuview;
import com.system.poco.System_menuviewPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * system_menuview 逻辑层
 *@author ZhangRuiLong
 */
public class System_menuviewAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<System_menuview> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<System_menuview>>() {}.getType();

	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request, System_menuview.class, System_menuviewPoco.QUERYFIELDNAME, System_menuviewPoco.ORDER, TYPE);
		cuss = (ArrayList<System_menuview>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,System_menuviewPoco.CHINESENAME,System_menuviewPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, System_menuview.class, System_menuviewPoco.QUERYFIELDNAME, System_menuviewPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, System_menuview.class, System_menuviewPoco.QUERYFIELDNAME, System_menuviewPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
}
