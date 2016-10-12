package com.cms.action.more;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cms.pojo.Content;
import com.cms.pojo.Seo;
import com.system.pojo.System_attach;
import com.system.tools.CommonConst;
import com.system.tools.pojo.Pageinfo;

public class ContentAction extends com.cms.action.ContentAction {

	//首页信息
	@SuppressWarnings("unchecked")
	public void homePageInfo(HttpServletRequest request, HttpServletResponse response){
		List<Content> homeConLi = selAll(Content.class,											//"首页"内容
				"select * from content c where c.contentparent='1' order by c.contentcode");
		List<Content> gyConLi = selAll(Content.class, 											//"关于"内容
				"select * from content c where c.contentparent='2' order by c.contentcode");
		List<Content> newsLi = selAll(Content.class, 											//"关于"的 "动态" 内容
				"select * from (select A.*, ROWNUM RN from (select * from content c where c.contentparent='5' order by c.contentcode )"
				+ " A where ROWNUM  <= 2 ) where RN > 0");
		List<Content> servConLi = selAll(Content.class, 										//"服务"内容
				"select * from content c where c.contentparent='3' order by c.contentcode");
		List<Content> productConLi = selAll(Content.class, 										//"方案"内容
				"select * from content c where c.contentparent='4' order by c.contentcode");
		List<Content> contectConLi = selAll(Content.class, 										//"联系"内容
				"select * from content c where c.contentparent='6' order by c.contentcode");
		List<Seo> seoLi = selAll(Seo.class, 												//首页"SEO"内容
				"select * from seo s where s.seomodel='首页'");
		
		List<System_attach> saList = selAll(System_attach.class,"select * from system_attach sa where sa.classify='图文'");		//全部图片
		
		for (Content con : homeConLi) {
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
		
		for (Content con : productConLi) {
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
