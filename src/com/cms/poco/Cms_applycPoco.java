package com.cms.poco;

/**
 * 职位申请 实体类的常量
 *@author ZhangRuiLong
 */
public class Cms_applycPoco
{
   /**
    * 实体中文名
    */
   public static String NAME = "职位申请";
   /**
    * 实体表名
    */
   public static String TABLE = "Applyc";
   /**
    * 实体主键
    */
   public static String[] KEYCOLUMN = {"applycid"};
   /**
    * 实体中文字段
    */
   public static String[] CHINESENAME = {
   		"ID",
	 	"姓名",
	 	"性别",
	 	"学历",
	 	"经验",
	 	"电话",
	 	"现住址",
	 	"自我描述",
	 	"意向职位",
	};
	/**
	 * 实体英文字段
	 */
   public static final String[] FIELDNAME = {
   		"applycid",
	 	"applycname",
	 	"applycsex",
	 	"applycedu",
	 	"applycexp",
	 	"applycphone",
	 	"applycaddress",
	 	"applycdetail",
	 	"applycjob",
   };
   /**
    * 实体排序
    */
   public static final String ORDER = " applycid desc ";
   /**
	 * 要模糊查询字段
	 */
   public static final String[] QUERYFIELDNAME = {
   		"applycid",
	 	"applycname",
	 	"applycsex",
	 	"applycedu",
	 	"applycexp",
	 	"applycphone",
	 	"applycaddress",
	 	"applycdetail",
	 	"applycjob",
   };
}

