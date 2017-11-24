package com.system.tools.util;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.time.DateUtils;

import com.system.tools.pojo.BeanToArray;
import com.system.tools.pojo.Queryinfo;

public class TypeUtil {
	
	/**
	 * 
	 * @param type 实体类，字段可以多
	 * @param field 要从rs中挑选出来的字段
	 * @param rs
	 * @return
	 */
	public static Object rsToObj(Class type, Field[] field, ResultSet rs) {
		try {
			Object obj = type.newInstance();
			for (int i = 0; i < field.length; i++) {
				// 得到属性名
				String fieldname = field[i].getName();
				// 包装成SetXXX方法
				String methodname = "set"
						+ fieldname.substring(0, 1).toUpperCase()
						+ fieldname.substring(1);
				// 得到类型
				Class c = field[i].getType();
				// 得到方法
				Method method = type.getMethod(methodname, c);
				if (c == String.class) {
					try {
						method.invoke(obj, rs.getString(fieldname));
					} catch (Exception e) {
					}
				} else if (c == Integer.class) {
					try {
						method.invoke(obj, rs.getInt(fieldname));
					} catch (Exception e) {
					}
				} else if (c == Float.class) {
					try {
						method.invoke(obj, rs.getFloat(fieldname));
					} catch (Exception e) {
					}
				} else if (c == Double.class) {
					try {
						method.invoke(obj, rs.getDouble(fieldname));
					} catch (Exception e) {
					}
				} else if (c == java.sql.Date.class) {
					try {
						method.invoke(obj, rs.getDate(fieldname));
					} catch (Exception e) {
					}
				} else if (c == int.class) {
					try {
						method.invoke(obj, rs.getInt(fieldname));
					} catch (Exception e) {
					}
				} else if (c == float.class) {
					try {
						method.invoke(obj, rs.getFloat(fieldname));
					} catch (Exception e) {
					}
				} else if (c == double.class) {
					try {
						method.invoke(obj, rs.getDouble(fieldname));
					} catch (Exception e) {
					}
				} else if (c == boolean.class) {
					try {
						method.invoke(obj, rs.getBoolean(fieldname));
					} catch (Exception e) {
					}
				} else {
					try {
						method.invoke(obj, rs.getObject(fieldname));
					} catch (Exception e) {
					}
				}
			}
			return obj;
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
			return null;
		}
	}
	
	public static String beanToSql(Object bean) {
		String wheresql = "";
		Field[] fields = bean.getClass().getDeclaredFields();
		Field.setAccessible(fields, true);
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			try {
				if (field.get(bean) == null)
					continue;
				wheresql += field.getName() + " like '%" + field.get(bean)
						+ "%' and ";
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if(CommonUtil.isNotEmpty(wheresql)){
			wheresql = wheresql.substring(0, wheresql.length()-4);
		}
		return wheresql;
	}
	 /**
     * 为空的字段不加入,得到name='value'的集合
     * @param bean
     * @return
     */
	public static BeanToArray beanToArray(Object bean) {
		BeanToArray beanToArray=new BeanToArray();
		  Field[] fields = bean.getClass().getDeclaredFields();
		  List beanNames = new ArrayList();
		  List values = new ArrayList();
		  Field.setAccessible(fields, true);
		  for (int i = 0; i < fields.length;i++) {
		   Field field = fields[i];
		   try {
			   if(field.get(bean)==null)continue;
			   beanNames.add(field.getName());
			   String str = field.getName()+"=";
			// 得到类型
			   Class c = field.getType();
			   if (c == Integer.class||c == Float.class||c == Double.class) {
				   str += field.get(bean);
			   }else{
				   str += "'"+field.get(bean)+"'";
			   }
			   values.add(str);
		   } catch (Exception e) {
			   e.printStackTrace();
		   }
		  }
		  beanToArray.setBeanNames(beanNames);
		  beanToArray.setValues(values);
		  return beanToArray;
	 }
    /**
     * 为空的字段不加入
     * @param bean
     * @return
     */
	public static BeanToArray beanToList(Object bean) {
		  BeanToArray beanToArray=new BeanToArray();
		  Field[] fields = bean.getClass().getDeclaredFields();
		  List beanNames = new ArrayList();
		  List values = new ArrayList();
		  Field.setAccessible(fields, true);
		  for (int i = 0; i < fields.length;i++) {
		   Field field = fields[i];
		   try {
			   if(field.get(bean)==null)continue;
			   beanNames.add(field.getName());
			   values.add(field.get(bean));
		   } catch (Exception e) {
			   e.printStackTrace();
		   }
		  }
		  beanToArray.setBeanNames(beanNames);
		  beanToArray.setValues(values);
		  return beanToArray;
	 }
	/**
	 * 为空的字段加入
	 * @param bean
	 * @return
	 */
	public static BeanToArray nullFieldBeanToList(Object bean) {
		  BeanToArray beanToArray=new BeanToArray();
		  Field[] fields = bean.getClass().getDeclaredFields();
		  List beanNames = new ArrayList();
		  List values = new ArrayList();
		  Field.setAccessible(fields, true);
		  for (int i = 0; i < fields.length;i++) {
		   Field field = fields[i];
		   try {
			    beanNames.add(field.getName());
			    if(field.get(bean)==null){
				    values.add("");
			    }else{
				    values.add(field.get(bean));
			    }
		   } catch (Exception e) {
			   e.printStackTrace();
		   }
		  }
		  beanToArray.setBeanNames(beanNames);
		  beanToArray.setValues(values);
		  return beanToArray;
	 }
	
	public static String objToString(Object value) {
		return (value == null) ? "" : value.toString(); 
	}
		
	public static int stringToInt(String intstr) {
		Integer integer;
		integer = Integer.valueOf(intstr);
		return integer.intValue();
	}

	// change int type to the string type
	public static String intToString(int value) {
		Integer integer = new Integer(value);
		return integer.toString();
	}

	// change the string type to the float type
	public static float stringToFloat(String floatstr) {
		Float floatee;
		floatee = Float.valueOf(floatstr);
		return floatee.floatValue();
	}

	// change the float type to the string type
	public static String floatToString(float value) {
		Float floatee = new Float(value);
		return floatee.toString();
	}

	// change the string type to the sqlDate type
	public static java.sql.Date stringToSqlDate(String dateStr) {
		return java.sql.Date.valueOf(dateStr);
	}

	// change the sqlDate type to the string type
	public static String dateToString(java.sql.Date datee) {
		return datee.toString();
	}

	/**
	 * 解析字符串为日期，格式为年
	 * 
	 * @param str
	 * @return
	 */
	public static java.util.Date stringToYear(String str) {
		java.util.Date result = null;
		if (str != null && !"".equals(str)) {
			try {
				result = DateUtils.parseDate(str, new String[] { "yyyy" });
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 解析字符串为日期，格式为年月
	 * 
	 * @param str
	 * @return
	 */
	public static java.util.Date stringToYearMonth(String str) {
		java.util.Date result = null;
		if (str != null && !"".equals(str)) {
			try {
				result = DateUtils.parseDate(str, new String[] { "yyyy-MM" });
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 解析字符串为日期，格式为年月日
	 * 
	 * @param str
	 * @return
	 */
	public static java.util.Date stringToDate(String str) {
		java.util.Date result = null;
		if (str != null && !"".equals(str)) {
			try {
				result = DateUtils
						.parseDate(str, new String[] { "yyyy-MM-dd" });
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 解析字符串为日期，格式为年月日时分
	 * 
	 * @param str
	 * @return
	 */
	public static java.util.Date stringToDateTime(String str) {
		java.util.Date result = null;
		if (str != null && !"".equals(str)) {
			try {
				result = DateUtils.parseDate(str,
						new String[] { "yyyy-MM-dd HH:mm" });
			} catch (ParseException e) {
				// e.printStackTrace();
			}
		}
		return result;
	}
}
