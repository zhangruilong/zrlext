package com.cms.poco;

/**
 * 意向客户 实体类的常量
 *@author ZhangRuiLong
 */
public class Cms_intentioncPoco
{
   /**
    * 实体中文名
    */
   public static String NAME = "意向客户";
   /**
    * 实体表名
    */
   public static String TABLE = "Intentionc";
   /**
    * 实体主键
    */
   public static String[] KEYCOLUMN = {"intentioncid"};
   /**
    * 实体中文字段
    */
   public static String[] CHINESENAME = {
   		"ID",
	 	"申请人",
	 	"联系电话",
	 	"单位名称",
	 	"经营品类",
	 	"单位地址",
	};
	/**
	 * 实体英文字段
	 */
   public static final String[] FIELDNAME = {
   		"intentioncid",
	 	"intentioncname",
	 	"intentioncphone",
	 	"intentionccompany",
	 	"intentioncbusiness",
	 	"intentioncaddress",
   };
   /**
    * 实体排序
    */
   public static final String ORDER = " intentioncid desc ";
   /**
	 * 要模糊查询字段
	 */
   public static final String[] QUERYFIELDNAME = {
   		"intentioncid",
	 	"intentioncname",
	 	"intentioncphone",
	 	"intentionccompany",
	 	"intentioncbusiness",
	 	"intentioncaddress",
   };
}

