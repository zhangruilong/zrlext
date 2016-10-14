package com.cms.pojo;

import java.sql.Date;
/**
 * 职位申请 实体类
 *@author ZhangRuiLong
 */
public class Cms_applyc
{
   /**
    * ID,主键
    */
   private String applycid; 
   /**
    * 姓名
    */
   private String applycname;   
   /**
    * 性别
    */
   private String applycsex;   
   /**
    * 学历
    */
   private String applycedu;   
   /**
    * 经验
    */
   private String applycexp;   
   /**
    * 电话
    */
   private String applycphone;   
   /**
    * 现住址
    */
   private String applycaddress;   
   /**
    * 自我描述
    */
   private String applycdetail;   
   /**
    * 意向职位
    */
   private String applycjob;   
    //属性方法	    
     /**
	 *设置主键"ID"属性
	 *@param applycid 实体的Applycid属性
	 */
	public void setApplycid(String applycid)
	{
		this.applycid = applycid;
	}
	
	/**
	 *获取主键"ID"属性
	 */
	public String getApplycid()
	{
		return this.applycid;
	}

	/**
	 *设置"姓名"属性
	 *@param applycname 实体的Applycname属性
	 */
	public void setApplycname(String applycname)
	{
		this.applycname = applycname;
	}
	
	/**
	 *获取"姓名"属性
	 */
	public String getApplycname()
	{
		return this.applycname;
	}	   

	/**
	 *设置"性别"属性
	 *@param applycsex 实体的Applycsex属性
	 */
	public void setApplycsex(String applycsex)
	{
		this.applycsex = applycsex;
	}
	
	/**
	 *获取"性别"属性
	 */
	public String getApplycsex()
	{
		return this.applycsex;
	}	   

	/**
	 *设置"学历"属性
	 *@param applycedu 实体的Applycedu属性
	 */
	public void setApplycedu(String applycedu)
	{
		this.applycedu = applycedu;
	}
	
	/**
	 *获取"学历"属性
	 */
	public String getApplycedu()
	{
		return this.applycedu;
	}	   

	/**
	 *设置"经验"属性
	 *@param applycexp 实体的Applycexp属性
	 */
	public void setApplycexp(String applycexp)
	{
		this.applycexp = applycexp;
	}
	
	/**
	 *获取"经验"属性
	 */
	public String getApplycexp()
	{
		return this.applycexp;
	}	   

	/**
	 *设置"电话"属性
	 *@param applycphone 实体的Applycphone属性
	 */
	public void setApplycphone(String applycphone)
	{
		this.applycphone = applycphone;
	}
	
	/**
	 *获取"电话"属性
	 */
	public String getApplycphone()
	{
		return this.applycphone;
	}	   

	/**
	 *设置"现住址"属性
	 *@param applycaddress 实体的Applycaddress属性
	 */
	public void setApplycaddress(String applycaddress)
	{
		this.applycaddress = applycaddress;
	}
	
	/**
	 *获取"现住址"属性
	 */
	public String getApplycaddress()
	{
		return this.applycaddress;
	}	   

	/**
	 *设置"自我描述"属性
	 *@param applycdetail 实体的Applycdetail属性
	 */
	public void setApplycdetail(String applycdetail)
	{
		this.applycdetail = applycdetail;
	}
	
	/**
	 *获取"自我描述"属性
	 */
	public String getApplycdetail()
	{
		return this.applycdetail;
	}	   

	/**
	 *设置"意向职位"属性
	 *@param applycjob 实体的Applycjob属性
	 */
	public void setApplycjob(String applycjob)
	{
		this.applycjob = applycjob;
	}
	
	/**
	 *获取"意向职位"属性
	 */
	public String getApplycjob()
	{
		return this.applycjob;
	}	   
	public Cms_applyc() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cms_applyc(
		String applycid
	 	,String applycname
	 	,String applycsex
	 	,String applycedu
	 	,String applycexp
	 	,String applycphone
	 	,String applycaddress
	 	,String applycdetail
	 	,String applycjob
		 ){
		super();
		this.applycid = applycid;
	 	this.applycname = applycname;
	 	this.applycsex = applycsex;
	 	this.applycedu = applycedu;
	 	this.applycexp = applycexp;
	 	this.applycphone = applycphone;
	 	this.applycaddress = applycaddress;
	 	this.applycdetail = applycdetail;
	 	this.applycjob = applycjob;
	}
}

