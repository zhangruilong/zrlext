package com.system.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.system.pojo.System_roleuserview;
import com.system.poco.System_roleuserviewPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * system_roleuserview 逻辑层
 *@author ZhangRuiLong
 */
public class System_roleuserviewAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<System_roleuserview> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<System_roleuserview>>() {}.getType();

	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request, System_roleuserview.class, System_roleuserviewPoco.QUERYFIELDNAME, System_roleuserviewPoco.ORDER, TYPE);
		cuss = (ArrayList<System_roleuserview>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,System_roleuserviewPoco.CHINESENAME,System_roleuserviewPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, System_roleuserview.class, System_roleuserviewPoco.QUERYFIELDNAME, System_roleuserviewPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, System_roleuserview.class, System_roleuserviewPoco.QUERYFIELDNAME, System_roleuserviewPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
}
