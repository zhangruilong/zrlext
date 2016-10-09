package com.system.poco;

/**
 * system_rolepowerview 实体类的常量
 *@author ZhangRuiLong
 */
public class System_rolepowerviewPoco
{
   /**
    * 实体中文名
    */
   public static String NAME = "system_rolepowerview";
   /**
    * 实体表名
    */
   public static String TABLE = "System_rolepowerview";
   /**
    * 实体主键
    */
   public static String[] KEYCOLUMN = {"id"};
   /**
    * 实体中文字段
    */
   public static String[] CHINESENAME = {
			"id",
	 	"roleid",
	 	"powerid",
	 	"rolecode",
	 	"rolename",
	 	"roledetail",
	 	"powercode",
	 	"powername",
	 	"powerdetail",
	 	"powerparentname",
	 	"powermenulevel",
	};
	/**
	 * 实体英文字段
	 */
   public static final String[] FIELDNAME = {
			"id",
	 	"roleid",
	 	"powerid",
	 	"rolecode",
	 	"rolename",
	 	"roledetail",
	 	"powercode",
	 	"powername",
	 	"powerdetail",
	 	"powerparentname",
	 	"powermenulevel",
   };
   /**
    * 实体排序
    */
   public static final String ORDER = " id desc ";
   /**
	 * 要模糊查询字段
	 */
   public static final String[] QUERYFIELDNAME = {
			"id",
	 	"roleid",
	 	"powerid",
	 	"rolecode",
	 	"rolename",
	 	"roledetail",
	 	"powercode",
	 	"powername",
	 	"powerdetail",
	 	"powerparentname",
	 	"powermenulevel",
   };
}

