package com.cms.pojo;

import java.sql.Date;
/**
 * 意向客户 实体类
 *@author ZhangRuiLong
 */
public class Intentionc
{
   /**
    * ID,主键
    */
   private String intentioncid; 
   /**
    * 申请人
    */
   private String intentioncname;   
   /**
    * 联系电话
    */
   private String intentioncphone;   
   /**
    * 单位名称
    */
   private String intentionccompany;   
   /**
    * 经营品类
    */
   private String intentioncbusiness;   
   /**
    * 单位地址
    */
   private String intentioncaddress;   
    //属性方法	    
     /**
	 *设置主键"ID"属性
	 *@param intentioncid 实体的Intentioncid属性
	 */
	public void setIntentioncid(String intentioncid)
	{
		this.intentioncid = intentioncid;
	}
	
	/**
	 *获取主键"ID"属性
	 */
	public String getIntentioncid()
	{
		return this.intentioncid;
	}

	/**
	 *设置"申请人"属性
	 *@param intentioncname 实体的Intentioncname属性
	 */
	public void setIntentioncname(String intentioncname)
	{
		this.intentioncname = intentioncname;
	}
	
	/**
	 *获取"申请人"属性
	 */
	public String getIntentioncname()
	{
		return this.intentioncname;
	}	   

	/**
	 *设置"联系电话"属性
	 *@param intentioncphone 实体的Intentioncphone属性
	 */
	public void setIntentioncphone(String intentioncphone)
	{
		this.intentioncphone = intentioncphone;
	}
	
	/**
	 *获取"联系电话"属性
	 */
	public String getIntentioncphone()
	{
		return this.intentioncphone;
	}	   

	/**
	 *设置"单位名称"属性
	 *@param intentionccompany 实体的Intentionccompany属性
	 */
	public void setIntentionccompany(String intentionccompany)
	{
		this.intentionccompany = intentionccompany;
	}
	
	/**
	 *获取"单位名称"属性
	 */
	public String getIntentionccompany()
	{
		return this.intentionccompany;
	}	   

	/**
	 *设置"经营品类"属性
	 *@param intentioncbusiness 实体的Intentioncbusiness属性
	 */
	public void setIntentioncbusiness(String intentioncbusiness)
	{
		this.intentioncbusiness = intentioncbusiness;
	}
	
	/**
	 *获取"经营品类"属性
	 */
	public String getIntentioncbusiness()
	{
		return this.intentioncbusiness;
	}	   

	/**
	 *设置"单位地址"属性
	 *@param intentioncaddress 实体的Intentioncaddress属性
	 */
	public void setIntentioncaddress(String intentioncaddress)
	{
		this.intentioncaddress = intentioncaddress;
	}
	
	/**
	 *获取"单位地址"属性
	 */
	public String getIntentioncaddress()
	{
		return this.intentioncaddress;
	}	   
	public Intentionc() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Intentionc(
		String intentioncid
	 	,String intentioncname
	 	,String intentioncphone
	 	,String intentionccompany
	 	,String intentioncbusiness
	 	,String intentioncaddress
		 ){
		super();
		this.intentioncid = intentioncid;
	 	this.intentioncname = intentioncname;
	 	this.intentioncphone = intentioncphone;
	 	this.intentionccompany = intentionccompany;
	 	this.intentioncbusiness = intentioncbusiness;
	 	this.intentioncaddress = intentioncaddress;
	}
}

