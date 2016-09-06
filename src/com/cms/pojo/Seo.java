package com.cms.pojo;

import java.sql.Date;
/**
 * SEO 实体类
 *@author ZhangRuiLong
 */
public class Seo
{
   /**
    * ID,主键
    */
   private String seoid; 
   /**
    * 关键字
    */
   private String seokeword;   
   /**
    * 详细
    */
   private String seodetail;   
   /**
    * 模板
    */
   private String seomodel;   
    //属性方法	    
     /**
	 *设置主键"ID"属性
	 *@param seoid 实体的Seoid属性
	 */
	public void setSeoid(String seoid)
	{
		this.seoid = seoid;
	}
	
	/**
	 *获取主键"ID"属性
	 */
	public String getSeoid()
	{
		return this.seoid;
	}

	/**
	 *设置"关键字"属性
	 *@param seokeword 实体的Seokeword属性
	 */
	public void setSeokeword(String seokeword)
	{
		this.seokeword = seokeword;
	}
	
	/**
	 *获取"关键字"属性
	 */
	public String getSeokeword()
	{
		return this.seokeword;
	}	   

	/**
	 *设置"详细"属性
	 *@param seodetail 实体的Seodetail属性
	 */
	public void setSeodetail(String seodetail)
	{
		this.seodetail = seodetail;
	}
	
	/**
	 *获取"详细"属性
	 */
	public String getSeodetail()
	{
		return this.seodetail;
	}	   

	/**
	 *设置"模板"属性
	 *@param seomodel 实体的Seomodel属性
	 */
	public void setSeomodel(String seomodel)
	{
		this.seomodel = seomodel;
	}
	
	/**
	 *获取"模板"属性
	 */
	public String getSeomodel()
	{
		return this.seomodel;
	}	   
	public Seo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Seo(
		String seoid
	 	,String seokeword
	 	,String seodetail
	 	,String seomodel
		 ){
		super();
		this.seoid = seoid;
	 	this.seokeword = seokeword;
	 	this.seodetail = seodetail;
	 	this.seomodel = seomodel;
	}
}

