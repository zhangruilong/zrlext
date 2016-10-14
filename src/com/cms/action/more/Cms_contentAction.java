package com.cms.action.more;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cms.pojo.Cms_content;
import com.cms.pojo.Cms_seo;
import com.system.pojo.System_attach;
import com.system.tools.CommonConst;
import com.system.tools.pojo.Pageinfo;

public class Cms_contentAction extends com.cms.action.Cms_contentAction {

	//首页信息
	@SuppressWarnings("unchecked")
	public void homePageInfo(HttpServletRequest request, HttpServletResponse response){
		List<Cms_content> homeConLi = selAll(Cms_content.class,											//"首页"内容
				"select * from cms_content c where c.contentparent='1' order by c.contentcode");
		List<Cms_content> gyConLi = selAll(Cms_content.class, 											//"关于-简介"内容
				"select * from cms_content c where c.contentparent='2' order by c.contentcode");
		List<Cms_content> wenhuaConLi = selAll(Cms_content.class, 										//"关于-文化"内容
				"select * from cms_content c where c.contentparent='G14763279462272827' order by c.contentcode");
		List<Cms_content> newsLi = selAll(Cms_content.class, 											//"关于-动态" 内容
				"select * from cms_content c where c.contentparent='G14763280088554983' order by c.contentcode limit 0,2");
		List<Cms_content> servConLi = selAll(Cms_content.class, 										//"服务"内容
				"select * from cms_content c where c.contentparent='3' order by c.contentcode");
		List<Cms_content> productConLi = selAll(Cms_content.class, 										//"方案"内容
				"select * from cms_content c where c.contentparent='4' order by c.contentcode");
		List<Cms_content> contectConLi = selAll(Cms_content.class, 										//"联系"内容
				"select * from cms_content c where c.contentparent='5' order by c.contentcode");
		List<Cms_seo> seoLi = selAll(Cms_seo.class, 												//首页"SEO"内容
				"select * from cms_seo s where s.seomodel='首页'");
		
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
			if(sa.getFid().indexOf("5,") == 0){
				contectConLi.get(0).setContentback(sa.getName());			//"联系"的背景图片
			}
		}
		
		List<Object> objLi = new ArrayList<Object>();
		objLi.add(homeConLi);							//首页
		objLi.add(gyConLi);								//关于-简介
		objLi.add(wenhuaConLi);							//关于-文化
		objLi.add(newsLi);								//关于-动态
		objLi.add(servConLi);							//服务
		objLi.add(productConLi);						//方案
		objLi.add(contectConLi);						//联系
		objLi.add(seoLi);								//首页SEO
		Pageinfo pageinfo = new Pageinfo(0, objLi);
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
}
