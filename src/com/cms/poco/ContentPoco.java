package com.cms.poco;

/**
 * 图文 实体类的常量
 *@author ZhangRuiLong
 */
public class ContentPoco
{
   /**
    * 实体中文名
    */
   public static String NAME = "图文";
   /**
    * 实体表名
    */
   public static String TABLE = "Content";
   /**
    * 实体主键
    */
   public static String[] KEYCOLUMN = {"contentid"};
   /**
    * 实体中文字段
    */
   public static String[] CHINESENAME = {
   		"ID",
	 	"编码",
	 	"名称",
	 	"详细",
	 	"背景",
	 	"父节点",
	 	"模板",
	};
	/**
	 * 实体英文字段
	 */
   public static final String[] FIELDNAME = {
   		"contentid",
	 	"contentcode",
	 	"contentname",
	 	"contentdetail",
	 	"contentback",
	 	"contentparent",
	 	"contentmodel",
   };
   /**
    * 实体排序
    */
   public static final String ORDER = " contentid desc ";
   /**
	 * 要模糊查询字段
	 */
   public static final String[] QUERYFIELDNAME = {
   		"contentid",
	 	"contentcode",
	 	"contentname",
	 	"contentdetail",
	 	"contentback",
	 	"contentparent",
	 	"contentmodel",
   };
}

