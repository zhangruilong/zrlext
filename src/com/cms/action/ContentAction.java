package com.cms.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cms.pojo.Content;
import com.cms.pojo.HomePageInfo;
import com.cms.poco.ContentPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * 图文 逻辑层
 *@author ZhangRuiLong
 */
public class ContentAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<Content> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<Content>>() {}.getType();

	//新增
	public void insAll(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		json = json.replace("\"\"", "null");
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Content temp:cuss){
			if(CommonUtil.isNull(temp.getContentid()))
				temp.setContentid(CommonUtil.getNewId());
			result = insSingle(temp);
		}
		responsePW(response, result);
	}
	//删除
	public void delAll(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Content temp:cuss){
			result = delSingle(temp,ContentPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//修改
	public void updAll(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Content temp:cuss){
			result = updSingle(temp,ContentPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//导入
	public void impAll(HttpServletRequest request, HttpServletResponse response){
		Fileinfo fileinfo = FileUtil.upload(request,0,null,ContentPoco.NAME,"impAll");
		String json = FileUtil.impExcel(fileinfo.getPath(),ContentPoco.FIELDNAME); 
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Content temp:cuss){
			if(CommonUtil.isNull(temp.getContentid()))
				temp.setContentid(CommonUtil.getNewId());
			result = insSingle(temp);
		}
		responsePW(response, result);
	}
	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request, Content.class, ContentPoco.QUERYFIELDNAME, ContentPoco.ORDER, TYPE);
		cuss = (ArrayList<Content>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,ContentPoco.CHINESENAME,ContentPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, Content.class, ContentPoco.QUERYFIELDNAME, ContentPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, Content.class, ContentPoco.QUERYFIELDNAME, ContentPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//首页信息
	@SuppressWarnings("unchecked")
	public void homePageInfo(HttpServletRequest request, HttpServletResponse response){
		List<HomePageInfo> hpiLi = new ArrayList<HomePageInfo>();		//首页信息
		cuss = (ArrayList<Content>) selAll(Content.class,"select * from content c where c.contentparent='1' order by c.contentcode");
		Pageinfo pageinfo = new Pageinfo(0, cuss);
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
}










