package com.cms.pojo;

import java.sql.Date;
/**
 * 图文 实体类
 *@author ZhangRuiLong
 */
public class Content
{
   /**
    * ID,主键
    */
   private String contentid; 
   /**
    * 编码
    */
   private String contentcode;   
   /**
    * 名称
    */
   private String contentname;   
   /**
    * 详细
    */
   private String contentdetail;   
   /**
    * 背景
    */
   private String contentback;   
   /**
    * 父节点
    */
   private String contentparent;   
   /**
    * 模板
    */
   private String contentmodel;   
    //属性方法	    
     /**
	 *设置主键"ID"属性
	 *@param contentid 实体的Contentid属性
	 */
	public void setContentid(String contentid)
	{
		this.contentid = contentid;
	}
	
	/**
	 *获取主键"ID"属性
	 */
	public String getContentid()
	{
		return this.contentid;
	}

	/**
	 *设置"编码"属性
	 *@param contentcode 实体的Contentcode属性
	 */
	public void setContentcode(String contentcode)
	{
		this.contentcode = contentcode;
	}
	
	/**
	 *获取"编码"属性
	 */
	public String getContentcode()
	{
		return this.contentcode;
	}	   

	/**
	 *设置"名称"属性
	 *@param contentname 实体的Contentname属性
	 */
	public void setContentname(String contentname)
	{
		this.contentname = contentname;
	}
	
	/**
	 *获取"名称"属性
	 */
	public String getContentname()
	{
		return this.contentname;
	}	   

	/**
	 *设置"详细"属性
	 *@param contentdetail 实体的Contentdetail属性
	 */
	public void setContentdetail(String contentdetail)
	{
		this.contentdetail = contentdetail;
	}
	
	/**
	 *获取"详细"属性
	 */
	public String getContentdetail()
	{
		return this.contentdetail;
	}	   

	/**
	 *设置"背景"属性
	 *@param contentback 实体的Contentback属性
	 */
	public void setContentback(String contentback)
	{
		this.contentback = contentback;
	}
	
	/**
	 *获取"背景"属性
	 */
	public String getContentback()
	{
		return this.contentback;
	}	   

	/**
	 *设置"父节点"属性
	 *@param contentparent 实体的Contentparent属性
	 */
	public void setContentparent(String contentparent)
	{
		this.contentparent = contentparent;
	}
	
	/**
	 *获取"父节点"属性
	 */
	public String getContentparent()
	{
		return this.contentparent;
	}	   

	/**
	 *设置"模板"属性
	 *@param contentmodel 实体的Contentmodel属性
	 */
	public void setContentmodel(String contentmodel)
	{
		this.contentmodel = contentmodel;
	}
	
	/**
	 *获取"模板"属性
	 */
	public String getContentmodel()
	{
		return this.contentmodel;
	}	   
	public Content() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Content(
		String contentid
	 	,String contentcode
	 	,String contentname
	 	,String contentdetail
	 	,String contentback
	 	,String contentparent
	 	,String contentmodel
		 ){
		super();
		this.contentid = contentid;
	 	this.contentcode = contentcode;
	 	this.contentname = contentname;
	 	this.contentdetail = contentdetail;
	 	this.contentback = contentback;
	 	this.contentparent = contentparent;
	 	this.contentmodel = contentmodel;
	}
}

