package com.cms.poco;

/**
 * 职位 实体类的常量
 *@author ZhangRuiLong
 */
public class JobpublishPoco
{
   /**
    * 实体中文名
    */
   public static String NAME = "职位";
   /**
    * 实体表名
    */
   public static String TABLE = "Jobpublish";
   /**
    * 实体主键
    */
   public static String[] KEYCOLUMN = {"jobpublishid"};
   /**
    * 实体中文字段
    */
   public static String[] CHINESENAME = {
   		"ID",
	 	"编码",
	 	"名称",
	 	"职位描述",
	 	"岗位要求",
	 	"人数",
	};
	/**
	 * 实体英文字段
	 */
   public static final String[] FIELDNAME = {
   		"jobpublishid",
	 	"jobpublishcode",
	 	"jobpublishname",
	 	"jobpublishdetail",
	 	"jobpublishmust",
	 	"jobpublishnum",
   };
   /**
    * 实体排序
    */
   public static final String ORDER = " jobpublishid desc ";
   /**
	 * 要模糊查询字段
	 */
   public static final String[] QUERYFIELDNAME = {
   		"jobpublishid",
	 	"jobpublishcode",
	 	"jobpublishname",
	 	"jobpublishdetail",
	 	"jobpublishmust",
	 	"jobpublishnum",
   };
}

