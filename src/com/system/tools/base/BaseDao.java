package com.system.tools.base;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.formula.functions.T;
//import org.apache.solr.client.solrj.SolrClient;
//import org.apache.solr.client.solrj.SolrQuery;
//import org.apache.solr.client.solrj.SolrServerException;
//import org.apache.solr.client.solrj.impl.HttpSolrClient;
//import org.apache.solr.client.solrj.response.QueryResponse;
//import org.apache.solr.common.SolrDocument;
//import org.apache.solr.common.SolrDocumentList;
//import org.apache.solr.common.SolrInputDocument;

import com.system.poco.System_attachPoco;
import com.system.pojo.System_attach;
import com.system.tools.CommonConst;
import com.system.tools.dba.DBConnectionManager;
import com.system.tools.pojo.BeanToArray;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.TypeUtil;

public class BaseDao {
	public static DBConnectionManager connectionMan = DBConnectionManager.getInstance();
	
	@SuppressWarnings("finally")
	public int getTotal(Queryinfo queryinfo) {
		String mDSNAME = queryinfo.getDsname();
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection conn = connectionMan.getConnection(mDSNAME);
		Statement stmt = null;
		ResultSet rs = null;
		int total = 0;
		try {
			String sql = "SELECT count(*) AS rowcount FROM " + queryinfo.getType().getSimpleName() + " where 1=1 ";
			if(!CommonUtil.isNull(queryinfo.getJson())){
				String jsonsql = TypeUtil.beanToSql(queryinfo.getJson());
				if(!CommonUtil.isNull(jsonsql))
				sql += " and (" + TypeUtil.beanToSql(queryinfo.getJson()) + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getWheresql())){
				sql += " and (" + queryinfo.getWheresql() + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getQuery())){
				sql += " and (" + queryinfo.getQuery() + ") ";
			}
			stmt = conn.createStatement();
			System.out.println(sql);
			rs = stmt.executeQuery(sql);
			rs.next();
			total = rs.getInt(1);
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally {
			connectionMan.freeConnection(mDSNAME, conn, stmt, rs);
			return total;
		}
	}
	@SuppressWarnings("finally")
	public int getTotal(String sql, String... DSNAME) {
		String mDSNAME = null;
		if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection conn = connectionMan.getConnection(mDSNAME);
		Statement stmt = null;
		ResultSet rs = null;
		int total = 0;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			total = rs.getInt(1);
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally {
			connectionMan.freeConnection(mDSNAME, conn, stmt, rs);
			return total;
		}
	}
	@SuppressWarnings("finally")
	public List selQuery(Queryinfo queryinfo) {
		String mDSNAME = queryinfo.getDsname();
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection  conn=connectionMan.getConnection(mDSNAME); 
		Statement stmt = null;
		ResultSet rs = null;
		List objs = new ArrayList();
		try {
			String sql = "";
			if(mDSNAME.equals("oracle")){
				sql += "select * from (select A.*, ROWNUM RN from (";
			}
			sql += "select * from " + queryinfo.getType().getSimpleName() + " where 1=1 ";
			if(!CommonUtil.isNull(queryinfo.getJson())){
				String jsonsql = TypeUtil.beanToSql(queryinfo.getJson());
				if(!CommonUtil.isNull(jsonsql))
				sql += " and (" + TypeUtil.beanToSql(queryinfo.getJson()) + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getWheresql())){
				sql += " and (" + queryinfo.getWheresql() + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getQuery())){
				sql += " and (" + queryinfo.getQuery() + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getOrder())){
				sql += " order by " + queryinfo.getOrder();
			}
			if(mDSNAME.equals("oracle")){
				if(queryinfo.getEnd().equals("0"))
					sql += ") A where ROWNUM  > "+queryinfo.getEnd()+" ) ";
				else
					sql += ") A where ROWNUM  <= "+queryinfo.getEnd()+" ) where RN > "+queryinfo.getStart();
			}else if(!queryinfo.getEnd().equals("0")){
				sql += " limit " + queryinfo.getStart() + "," + queryinfo.getLimit();
			}
			stmt = conn.createStatement();
			System.out.println(sql);
			rs = stmt.executeQuery(sql);
			//所有的属性  
	        Field[] field = queryinfo.getType().getDeclaredFields(); 
			while (rs.next()) {
				objs.add(TypeUtil.rsToObj(queryinfo.getType(), field, rs));
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(mDSNAME,conn,stmt,rs);
			return objs;
		}
	}
	
	@SuppressWarnings("finally")
	public List selQuery(String selectsql,Queryinfo queryinfo) {
		String mDSNAME = queryinfo.getDsname();
		if(CommonUtil.isNull(mDSNAME)) 
			mDSNAME = connectionMan.getDsname();
		Connection  conn=connectionMan.getConnection(mDSNAME); 
		Statement stmt = null;
		ResultSet rs = null;
		List objs = new ArrayList();
		try {
			String sql = "";
			if(mDSNAME.equals("oracle")){
				sql += "select * from (select A.*, ROWNUM RN from (";
			}
			sql += selectsql;
			if(mDSNAME.equals("oracle")){
				if(queryinfo.getEnd().equals("0"))
					sql += ") A where ROWNUM  > "+queryinfo.getEnd()+" ) ";
				else
					sql += ") A where ROWNUM  <= "+queryinfo.getEnd()+" ) where RN > "+queryinfo.getStart();
			}else if(!queryinfo.getEnd().equals("0")){
				sql += " limit " + queryinfo.getStart() + "," + queryinfo.getLimit();
			}
			stmt = conn.createStatement();
			System.out.println(sql);
			rs = stmt.executeQuery(sql);
			//所有的属性  
	        Field[] field = queryinfo.getType().getDeclaredFields(); 
			while (rs.next()) {
				objs.add(TypeUtil.rsToObj(queryinfo.getType(), field, rs));
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(mDSNAME,conn,stmt,rs);
			return objs;
		}
	}
	
	@SuppressWarnings("finally")
	public List selAll(Queryinfo queryinfo) {
		String mDSNAME = queryinfo.getDsname();
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection  conn=connectionMan.getConnection(mDSNAME); 
		Statement stmt = null;
		ResultSet rs = null;
		List objs = new ArrayList();
		try {
			String sql = "select * from " + queryinfo.getType().getSimpleName() + " where 1=1 ";
			if(!CommonUtil.isNull(queryinfo.getJson())){
				String jsonsql = TypeUtil.beanToSql(queryinfo.getJson());
				if(!CommonUtil.isNull(jsonsql))
				sql += " and (" + TypeUtil.beanToSql(queryinfo.getJson()) + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getWheresql())){
				sql += " and (" + queryinfo.getWheresql() + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getQuery())){
				sql += " and (" + queryinfo.getQuery() + ") ";
			}
			if(!CommonUtil.isNull(queryinfo.getOrder())){
				sql += " order by " + queryinfo.getOrder();
			}
			stmt = conn.createStatement();
			System.out.println(sql);
			rs = stmt.executeQuery(sql);
			//所有的属性  
	        Field[] field = queryinfo.getType().getDeclaredFields(); 
			while (rs.next()) {
				objs.add(TypeUtil.rsToObj(queryinfo.getType(), field, rs));
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(mDSNAME,conn,stmt,rs);
	        return objs;
		}
	}
	
	@SuppressWarnings("finally")
	public List selAll(Class type, String selectsql, String... DSNAME) {
		String mDSNAME = null;
		if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection  conn=connectionMan.getConnection(mDSNAME); 
		Statement stmt = null;
		ResultSet rs = null;
		List objs = new ArrayList();
		try {
			stmt = conn.createStatement();
			System.out.println(selectsql);
			rs = stmt.executeQuery(selectsql);
			//所有的属性  
	        Field[] field = type.getDeclaredFields(); 
			while (rs.next()) {
				objs.add(TypeUtil.rsToObj(type, field, rs));
			}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());
		} finally{
			connectionMan.freeConnection(mDSNAME,conn,stmt,rs);
	        return objs;
		}
	}

	/**
	 * 将dataobj插入TABLE表
	 * @param dataobj 要新增的实体对象
	 * @return 成功CommonConst.SUCCESS,失败CommonConst.FAILURE
	 */
	public String insSingle(Object dataobj, String... DSNAME) {
		String table = dataobj.getClass().getSimpleName();
		BeanToArray beanToArray = TypeUtil.beanToList(dataobj);
		String sql = "insert into " + table + " (";
		String names = "";
		String values = "";
		for (int i = 0; i < beanToArray.getBeanNames().size(); i++) {
			names += beanToArray.getBeanNames().get(i) + ",";
			values += "?,";
		}
		sql = sql + names.substring(0, names.length() - 1) + ") values ("
				+ values.substring(0, values.length() - 1) + ")";
		String result = doSingle(sql, beanToArray.getValues(), DSNAME);
		return result;
	}

	/**
	 * 获取将dataobj插入TABLE表的sql
	 * @param dataobj 要新增的实体对象
	 * @return sql语句
	 */
	public String getInsSingleSql(Object dataobj) {
		String table = dataobj.getClass().getSimpleName();
		BeanToArray beanToArray = TypeUtil.beanToList(dataobj);
		String sql = "insert into " + table + " (";
		String names = "";
		String values = "'";
		for (int i = 0; i < beanToArray.getBeanNames().size(); i++) {
			names += beanToArray.getBeanNames().get(i) + ",";
			values += beanToArray.getValues().get(i) + "','";
		}
		sql += names.substring(0, names.length() - 1) 
			   + ") values ("
			   + values.substring(0, values.length() - 2) 
			   + ")";
		return sql;
	}

	/**
	 * 删除whereobj数据
	 * @param whereobj pojo中有联合主键,whereobj有where属性,where条件后面实体对象
	 * @param primaryKeys 主键
	 * @return 成功CommonConst.SUCCESS,失败CommonConst.FAILURE
	 */
	public String delSingle(Object whereobj, String[] primaryKeys, String... DSNAME) {
		if(null!=primaryKeys&&primaryKeys.length>0){
			String table = whereobj.getClass().getSimpleName();
			String sql = "delete from " + table + " where 1=1 ";
			BeanToArray wherebeanToArray = TypeUtil.beanToList(whereobj);
			List values = new ArrayList();
			for (int i = 0; i < wherebeanToArray.getBeanNames().size(); i++) {
				String beanName = (String) wherebeanToArray.getBeanNames().get(i);
				for (int j = 0; j < primaryKeys.length; j++) {
					if (primaryKeys[j].equals(beanName)) {
						values.add(wherebeanToArray.getValues().get(i));
						sql += " and " + primaryKeys[j] + "=? ";
						break;
					}
				}
			}
			return doSingle(sql, values, DSNAME);
		}else{
			String table = whereobj.getClass().getSimpleName();
			String sql = "delete from " + table;
			BeanToArray wherebeanToArray = TypeUtil.beanToList(whereobj);
			String where = " where 1=1 ";
			for (int i = 0; i < wherebeanToArray.getBeanNames().size(); i++) {
				where = where + " and " + wherebeanToArray.getBeanNames().get(i)
						+ "=? ";
			}
			sql = sql + where;
			return doSingle(sql, wherebeanToArray.getValues(), DSNAME);
		}
	}
	/**
	 * 获取删除whereobj数据的sql
	 * @param whereobj pojo中有联合主键,whereobj有where属性,where条件后面实体对象
	 * @param primaryKeys 主键
	 * @return sql语句
	 */
	public String getDelSingleSql(Object whereobj, String[] primaryKeys) {
		String table = whereobj.getClass().getSimpleName();
		String sql = "delete from " + table + " where 1=1 ";
		BeanToArray wherebeanToArray = TypeUtil.beanToList(whereobj);
		for (int i = 0; i < wherebeanToArray.getBeanNames().size(); i++) {
			String beanName = (String) wherebeanToArray.getBeanNames().get(i);
			for (int j = 0; j < primaryKeys.length; j++) {
				if (primaryKeys[j].equals(beanName)) {
					sql += " and " + primaryKeys[j] + "='" + wherebeanToArray.getValues().get(i) + "'";
					break;
				}
			}
		}
		return sql;
	}

	/**
	 * 修改obj数据
	 * @param obj pojo中有联合主键,obj有全部属性
	 * @param primaryKeys 主键
	 * @return 成功CommonConst.SUCCESS,失败CommonConst.FAILURE
	 */
	public String updSingle(Object obj, String[] primaryKeys, String... DSNAME) {
		if(null!=primaryKeys&&primaryKeys.length>0){
			String table = obj.getClass().getSimpleName();
			String sql = "update " + table;
			String set = " set ";
			String where = " where 1=1 ";
			BeanToArray beanToArray = TypeUtil.beanToArray(obj);
			for (int i = 0; i < beanToArray.getBeanNames().size(); i++) {
				String beanName = (String) beanToArray.getBeanNames().get(i);
				for (int j = 0; j < primaryKeys.length; j++) {
					if (primaryKeys[j].equals(beanName)) {
						where += " and " + beanToArray.getValues().get(i);
						break;
					} else if (j == (primaryKeys.length - 1)) {
						set += beanToArray.getValues().get(i) + ",";
					}
				}
			}
			sql += set.substring(0, set.length() - 1) + where;
			return doSingle(sql, null, DSNAME);
		}else{
			String table = obj.getClass().getSimpleName();
			BeanToArray beanToArray = TypeUtil.beanToList(obj);
			String sql = "update " + table + " set ";
			String where = beanToArray.getBeanNames().get(0) + "=? ";
			String set = "";
			for (int i = 1; i < beanToArray.getBeanNames().size(); i++) {// 从i=1开始
				set = set + beanToArray.getBeanNames().get(i) + "=?,";
			}
			sql = sql + set.substring(0, set.length() - 1) + " where " + where;
			List values = beanToArray.getValues();
			Object id = values.get(0);
			values.remove(0);
			values.add(id);
			return doSingle(sql, values, DSNAME);
		}
	}
	/**
	 * 获取修改obj数据的sql
	 * @param obj pojo中有联合主键,obj有全部属性
	 * @param primaryKeys 主键
	 * @return sql语句
	 */
	public String getUpdSingleSql(Object obj, String[] primaryKeys) {
		String table = obj.getClass().getSimpleName();
		String sql = "update " + table;
		String set = " set ";
		String where = " where 1=1 ";
		BeanToArray beanToArray = TypeUtil.beanToList(obj);
		for (int i = 0; i < beanToArray.getBeanNames().size(); i++) {
			String beanName = (String) beanToArray.getBeanNames().get(i);
			for (int j = 0; j < primaryKeys.length; j++) {
				if (primaryKeys[j].equals(beanName)) {
					where += " and " + primaryKeys[j] + "='" + beanToArray.getValues().get(i) + "'";
					break;
				} else if (j == (primaryKeys.length - 1)) {
					set += beanToArray.getBeanNames().get(i) + "='" + beanToArray.getValues().get(i) + "' ,";
				}
			}
		}
		sql += set.substring(0, set.length() - 1) + where;
		return sql;
	}

	/**
	 * 执行一条sql语句
	 * @param DSNAME 数据源
	 * @param sql sql语句
	 * @param param 参数集合
	 * @return 成功CommonConst.SUCCESS,失败CommonConst.FAILURE
	 */
	@SuppressWarnings("finally")
	public String doSingle(String sql, List param, String... DSNAME) {
		String result = CommonConst.FAILURE;
		String mDSNAME = null;
		if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection conn = connectionMan.getConnection(mDSNAME);
		PreparedStatement pstmt = null;
		try {
			System.out.println(sql);
			pstmt = conn.prepareStatement(sql);
			if (null != param) {
				for (int i = 0; i < param.size(); i++) {
					pstmt.setObject(i + 1, param.get(i));
				}
			}
			int num = pstmt.executeUpdate();
			System.out.println("executeUpdate: " + num + " records！");
			if (num > 0) {
				result = CommonConst.SUCCESS;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			connectionMan.freeConnection(mDSNAME, conn, pstmt, null);
			return result;
		}
	}
	/**
	 * 执行一条sql语句
	 * @param DSNAME 数据源
	 * @param sql sql语句
	 * @return 成功CommonConst.SUCCESS,失败CommonConst.FAILURE
	 */
	@SuppressWarnings("finally")
	public String doSingle(String sql, String... DSNAME) {
		String result = CommonConst.FAILURE;
		String mDSNAME = null;
		if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection conn = connectionMan.getConnection(mDSNAME);
		PreparedStatement pstmt = null;
		try {
			System.out.println(sql);
			pstmt = conn.prepareStatement(sql);
			int num = pstmt.executeUpdate();
			System.out.println("executeUpdate: " + num + " records！");
			if (num > 0) {
				result = CommonConst.SUCCESS;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			connectionMan.freeConnection(mDSNAME, conn, pstmt, null);
			return result;
		}
	}
	/**
	 * 执行多条语句
	 * @param sql sql语句集合 异常时事物回滚
	 * @return 成功CommonConst.SUCCESS,失败CommonConst.FAILURE
	 */
	@SuppressWarnings("finally")
	public String doAll(List<String> sqls, String... DSNAME) {
		String result = CommonConst.FAILURE;
		String mDSNAME = null;
		if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
		if(CommonUtil.isNull(mDSNAME))
			mDSNAME = connectionMan.getDsname();
		Connection conn = connectionMan.getConnection(mDSNAME);
		PreparedStatement pstmt = null;
		try {
			conn.setAutoCommit(false);
			if (sqls != null) {
				for (int i=0; i<sqls.size(); i++) {
					System.out.println(sqls.get(i));
					pstmt = conn.prepareStatement((String) sqls.get(i));
					int num = pstmt.executeUpdate();
					System.out.println("executeUpdate: " + num + " records！");
				}
			}
			conn.commit();
			conn.setAutoCommit(true);// 恢复默认
			result = CommonConst.SUCCESS;
		} catch (Exception e) {
			conn.rollback();//回滚   
			conn.setAutoCommit(true);// 恢复默认
			e.printStackTrace();
        } finally {
			connectionMan.freeConnection(mDSNAME, conn, pstmt, null);
			return result;
		}
	}
//	public String updSolr(Object dataobj, String... DSNAME){
//		try {
//			String mDSNAME = null;
//			if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
//			else mDSNAME = dataobj.getClass().getSimpleName();
//			BeanToArray beanToArray = TypeUtil.beanToList(dataobj);
//	        SolrClient solr = new HttpSolrClient.Builder(CommonConst.SOLR_URL+mDSNAME).build();
//	        //构造一篇solr文档  
//	      	SolrInputDocument document = new SolrInputDocument(); 
//			for (int i = 0; i < beanToArray.getBeanNames().size(); i++) {
//				//往doc中添加字段,在客户端这边添加的字段必须在服务端中有过定义  
//				document.addField(beanToArray.getBeanNames().get(i).toString(), beanToArray.getValues().get(i));  
//			}
//			System.out.println("solr.add(document): " + mDSNAME);
//			solr.add(document);
//			solr.commit();
//	        solr.close();
//		} catch (SolrServerException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return CommonConst.FAILURE;
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return CommonConst.FAILURE;
//		}  
//		return CommonConst.SUCCESS;
//	}
//	public String delSolr(Object whereobj, String[] primaryKeys, String... DSNAME){  
//        try {
//        	String mDSNAME = null;
//			if(null!=DSNAME&&DSNAME.length>0) mDSNAME = DSNAME[0];
//			else mDSNAME = whereobj.getClass().getSimpleName();
//	        SolrClient solr = new HttpSolrClient.Builder(CommonConst.SOLR_URL+mDSNAME).build();
//	        BeanToArray wherebeanToArray = TypeUtil.beanToList(whereobj);
//	        String where = "";
//	        if(null!=primaryKeys&&primaryKeys.length>0){
//	        	for (int i = 0; i < wherebeanToArray.getBeanNames().size(); i++) {
//					String beanName = (String) wherebeanToArray.getBeanNames().get(i);
//					for (int j = 0; j < primaryKeys.length; j++) {
//						if (primaryKeys[j].equals(beanName)) {
//							where += "," + wherebeanToArray.getValues().get(i);
//							break;
//						}
//					}
//				}
//	        	where = where.substring(1);
//	        }else{
//	        	where = wherebeanToArray.getValues().get(0).toString();
//	        }
//	        System.out.println("solr.deleteById(where): " + where);
//        	//删除所有的索引
//            //solr.deleteByQuery("*:*");
//			solr.deleteById(where);
//			solr.commit();  
//		    solr.close();
//		} catch (SolrServerException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return CommonConst.FAILURE;
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return CommonConst.FAILURE;
//		}  
//        return CommonConst.SUCCESS;
//    }
//	
//	@SuppressWarnings("finally")
//	public SolrDocumentList selSolr(Queryinfo queryinfo){  
//		SolrDocumentList solrDocumentList = new SolrDocumentList();
//        try {
//	        SolrClient solr = new HttpSolrClient.Builder(CommonConst.SOLR_URL+queryinfo.getDsname()).build();
//			QueryResponse mQueryResponse = solr.query(queryinfo.getSolrquery());
//	        solrDocumentList = mQueryResponse.getResults(); 
//		} catch (SolrServerException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//			return solrDocumentList;
//		}
//    }
}
