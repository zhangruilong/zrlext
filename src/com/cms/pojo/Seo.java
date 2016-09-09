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
   /**
    * LOGO
    */
   private String logo;   
   /**
    * 公司
    */
   private String seocompany;   
   /**
    * 地址
    */
   private String seoaddress;   
   /**
    * 电话
    */
   private String seotel;   
   /**
    * 邮编
    */
   private String seoposcode;   
   /**
    * 邮箱
    */
   private String seoemail;   
   /**
    * COPYRIGHT
    */
   private String seocopyright;   
   /**
    * 备案
    */
   private String seoicp;   
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

	/**
	 *设置"LOGO"属性
	 *@param logo 实体的Logo属性
	 */
	public void setLogo(String logo)
	{
		this.logo = logo;
	}
	
	/**
	 *获取"LOGO"属性
	 */
	public String getLogo()
	{
		return this.logo;
	}	   

	/**
	 *设置"公司"属性
	 *@param seocompany 实体的Seocompany属性
	 */
	public void setSeocompany(String seocompany)
	{
		this.seocompany = seocompany;
	}
	
	/**
	 *获取"公司"属性
	 */
	public String getSeocompany()
	{
		return this.seocompany;
	}	   

	/**
	 *设置"地址"属性
	 *@param seoaddress 实体的Seoaddress属性
	 */
	public void setSeoaddress(String seoaddress)
	{
		this.seoaddress = seoaddress;
	}
	
	/**
	 *获取"地址"属性
	 */
	public String getSeoaddress()
	{
		return this.seoaddress;
	}	   

	/**
	 *设置"电话"属性
	 *@param seotel 实体的Seotel属性
	 */
	public void setSeotel(String seotel)
	{
		this.seotel = seotel;
	}
	
	/**
	 *获取"电话"属性
	 */
	public String getSeotel()
	{
		return this.seotel;
	}	   

	/**
	 *设置"邮编"属性
	 *@param seoposcode 实体的Seoposcode属性
	 */
	public void setSeoposcode(String seoposcode)
	{
		this.seoposcode = seoposcode;
	}
	
	/**
	 *获取"邮编"属性
	 */
	public String getSeoposcode()
	{
		return this.seoposcode;
	}	   

	/**
	 *设置"邮箱"属性
	 *@param seoemail 实体的Seoemail属性
	 */
	public void setSeoemail(String seoemail)
	{
		this.seoemail = seoemail;
	}
	
	/**
	 *获取"邮箱"属性
	 */
	public String getSeoemail()
	{
		return this.seoemail;
	}	   

	/**
	 *设置"COPYRIGHT"属性
	 *@param seocopyright 实体的Seocopyright属性
	 */
	public void setSeocopyright(String seocopyright)
	{
		this.seocopyright = seocopyright;
	}
	
	/**
	 *获取"COPYRIGHT"属性
	 */
	public String getSeocopyright()
	{
		return this.seocopyright;
	}	   

	/**
	 *设置"备案"属性
	 *@param seoicp 实体的Seoicp属性
	 */
	public void setSeoicp(String seoicp)
	{
		this.seoicp = seoicp;
	}
	
	/**
	 *获取"备案"属性
	 */
	public String getSeoicp()
	{
		return this.seoicp;
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
	 	,String logo
	 	,String seocompany
	 	,String seoaddress
	 	,String seotel
	 	,String seoposcode
	 	,String seoemail
	 	,String seocopyright
	 	,String seoicp
		 ){
		super();
		this.seoid = seoid;
	 	this.seokeword = seokeword;
	 	this.seodetail = seodetail;
	 	this.seomodel = seomodel;
	 	this.logo = logo;
	 	this.seocompany = seocompany;
	 	this.seoaddress = seoaddress;
	 	this.seotel = seotel;
	 	this.seoposcode = seoposcode;
	 	this.seoemail = seoemail;
	 	this.seocopyright = seocopyright;
	 	this.seoicp = seoicp;
	}
}

