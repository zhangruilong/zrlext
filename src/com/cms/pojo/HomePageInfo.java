package com.cms.pojo;
/**
 * 首页信息
 * @author taolichao
 */
public class HomePageInfo {

	private String title;				//标题
	
	private String content;				//内容
	
	private String imgPuth;				//背景图路径
	/**
	 * 标题
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * 标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * 内容
	 */
	public String getContent() {
		return content;
	}
	/**
	 * 内容
	 */
	public void setContent(String content) {
		this.content = content;
	}
	/**
	 * 背景图路径
	 */
	public String getImgPuth() {
		return imgPuth;
	}
	/**
	 * 背景图路径
	 */
	public void setImgPuth(String imgPuth) {
		this.imgPuth = imgPuth;
	}
	
	
}
