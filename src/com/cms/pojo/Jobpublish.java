package com.cms.pojo;

import java.sql.Date;
/**
 * 职位 实体类
 *@author ZhangRuiLong
 */
public class Jobpublish
{
   /**
    * ID,主键
    */
   private String jobpublishid; 
   /**
    * 编码
    */
   private String jobpublishcode;   
   /**
    * 名称
    */
   private String jobpublishname;   
   /**
    * 职位描述
    */
   private String jobpublishdetail;   
   /**
    * 岗位要求
    */
   private String jobpublishmust;   
   /**
    * 人数
    */
   private String jobpublishnum;   
    //属性方法	    
     /**
	 *设置主键"ID"属性
	 *@param jobpublishid 实体的Jobpublishid属性
	 */
	public void setJobpublishid(String jobpublishid)
	{
		this.jobpublishid = jobpublishid;
	}
	
	/**
	 *获取主键"ID"属性
	 */
	public String getJobpublishid()
	{
		return this.jobpublishid;
	}

	/**
	 *设置"编码"属性
	 *@param jobpublishcode 实体的Jobpublishcode属性
	 */
	public void setJobpublishcode(String jobpublishcode)
	{
		this.jobpublishcode = jobpublishcode;
	}
	
	/**
	 *获取"编码"属性
	 */
	public String getJobpublishcode()
	{
		return this.jobpublishcode;
	}	   

	/**
	 *设置"名称"属性
	 *@param jobpublishname 实体的Jobpublishname属性
	 */
	public void setJobpublishname(String jobpublishname)
	{
		this.jobpublishname = jobpublishname;
	}
	
	/**
	 *获取"名称"属性
	 */
	public String getJobpublishname()
	{
		return this.jobpublishname;
	}	   

	/**
	 *设置"职位描述"属性
	 *@param jobpublishdetail 实体的Jobpublishdetail属性
	 */
	public void setJobpublishdetail(String jobpublishdetail)
	{
		this.jobpublishdetail = jobpublishdetail;
	}
	
	/**
	 *获取"职位描述"属性
	 */
	public String getJobpublishdetail()
	{
		return this.jobpublishdetail;
	}	   

	/**
	 *设置"岗位要求"属性
	 *@param jobpublishmust 实体的Jobpublishmust属性
	 */
	public void setJobpublishmust(String jobpublishmust)
	{
		this.jobpublishmust = jobpublishmust;
	}
	
	/**
	 *获取"岗位要求"属性
	 */
	public String getJobpublishmust()
	{
		return this.jobpublishmust;
	}	   

	/**
	 *设置"人数"属性
	 *@param jobpublishnum 实体的Jobpublishnum属性
	 */
	public void setJobpublishnum(String jobpublishnum)
	{
		this.jobpublishnum = jobpublishnum;
	}
	
	/**
	 *获取"人数"属性
	 */
	public String getJobpublishnum()
	{
		return this.jobpublishnum;
	}	   
	public Jobpublish() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Jobpublish(
		String jobpublishid
	 	,String jobpublishcode
	 	,String jobpublishname
	 	,String jobpublishdetail
	 	,String jobpublishmust
	 	,String jobpublishnum
		 ){
		super();
		this.jobpublishid = jobpublishid;
	 	this.jobpublishcode = jobpublishcode;
	 	this.jobpublishname = jobpublishname;
	 	this.jobpublishdetail = jobpublishdetail;
	 	this.jobpublishmust = jobpublishmust;
	 	this.jobpublishnum = jobpublishnum;
	}
}

