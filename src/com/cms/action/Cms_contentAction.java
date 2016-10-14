package com.cms.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cms.pojo.Cms_content;
import com.cms.pojo.Cms_seo;
import com.cms.poco.Cms_contentPoco;
import com.system.pojo.System_attach;
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
public class Cms_contentAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<Cms_content> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<Cms_content>>() {}.getType();

	//新增
	public void insAll(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		json = json.replace("\"\"", "null");
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Cms_content temp:cuss){
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
		for(Cms_content temp:cuss){
			result = delSingle(temp,Cms_contentPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//修改
	public void updAll(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Cms_content temp:cuss){
			result = updSingle(temp,Cms_contentPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//导入
	public void impAll(HttpServletRequest request, HttpServletResponse response){
		Fileinfo fileinfo = FileUtil.upload(request,0,null,Cms_contentPoco.NAME,"impAll");
		String json = FileUtil.impExcel(fileinfo.getPath(),Cms_contentPoco.FIELDNAME); 
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Cms_content temp:cuss){
			if(CommonUtil.isNull(temp.getContentid()))
				temp.setContentid(CommonUtil.getNewId());
			result = insSingle(temp);
		}
		responsePW(response, result);
	}
	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request, Cms_content.class, Cms_contentPoco.QUERYFIELDNAME, Cms_contentPoco.ORDER, TYPE);
		cuss = (ArrayList<Cms_content>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,Cms_contentPoco.CHINESENAME,Cms_contentPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, Cms_content.class, Cms_contentPoco.QUERYFIELDNAME, Cms_contentPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request, Cms_content.class, Cms_contentPoco.QUERYFIELDNAME, Cms_contentPoco.ORDER, TYPE);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//首页信息
	@SuppressWarnings("unchecked")
	public void homePageInfo(HttpServletRequest request, HttpServletResponse response){
		List<Cms_content> homeConLi = selAll(Cms_content.class,											//"首页"内容
				"select * from content c where c.contentparent='1' order by c.contentcode");
		List<Cms_content> gyConLi = selAll(Cms_content.class, 											//"关于"内容
				"select * from content c where c.contentparent='2' order by c.contentcode");
		List<Cms_content> newsLi = selAll(Cms_content.class, 											//"关于"的 "动态" 内容
				"select * from (select A.*, ROWNUM RN from (select * from content c where c.contentparent='5' order by c.contentcode )"
				+ " A where ROWNUM  <= 2 ) where RN > 0");
		List<Cms_content> servConLi = selAll(Cms_content.class, 										//"服务"内容
				"select * from content c where c.contentparent='3' order by c.contentcode");
		List<Cms_content> productConLi = selAll(Cms_content.class, 										//"方案"内容
				"select * from content c where c.contentparent='4' order by c.contentcode");
		List<Cms_content> contectConLi = selAll(Cms_content.class, 										//"联系"内容
				"select * from content c where c.contentparent='6' order by c.contentcode");
		List<Cms_seo> seoLi = selAll(Cms_seo.class, 												//首页"SEO"内容
				"select * from seo s where s.seomodel='首页'");
		
		List<System_attach> saList = selAll(System_attach.class,"select * from system_attach sa where sa.classify='图文'");		//全部图片
		
		for (Cms_content con : homeConLi) {
			for (System_attach sa : saList) {
				if(sa.getFid().indexOf(con.getContentid()) != -1){
					con.setContentback(sa.getName());					//"首页"背景图片路径
				}
			}
		}
		
		for (System_attach sa : saList) {
			if(sa.getFid().indexOf("2,") == 0){
				gyConLi.get(0).setContentback(sa.getName());			//"关于"的背景图片
			}
		}
		
		for (System_attach sa : saList) {
			if(sa.getFid().indexOf("3,") == 0){
				servConLi.get(0).setContentback(sa.getName());			//"服务"的背景图片
			}
		}
		
		for (Cms_content con : productConLi) {
			for (System_attach sa : saList) {
				if(sa.getFid().indexOf(con.getContentid()) != -1){
					con.setContentback(sa.getName() );					//"方案"背景图片路径
				}
			}
		}
		
		for (System_attach sa : saList) {
			if(sa.getFid().indexOf("6,") == 0){
				contectConLi.get(0).setContentback(sa.getName());			//"联系"的背景图片
			}
		}
		
		List<Object> objLi = new ArrayList<Object>();
		objLi.add(homeConLi);							//首页
		objLi.add(gyConLi);								//关于
		objLi.add(newsLi);								//动态
		objLi.add(servConLi);							//服务
		objLi.add(productConLi);						//方案
		objLi.add(contectConLi);						//联系
		objLi.add(seoLi);								//首页SEO
		Pageinfo pageinfo = new Pageinfo(0, objLi);
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
}










