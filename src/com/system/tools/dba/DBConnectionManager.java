package com.system.tools.dba;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Set;
import java.util.Vector;

import com.system.tools.CommonConst;
import com.system.tools.util.CommonUtil;


/**
 * @author zhangruilong
 * 
 */
public class DBConnectionManager {
	static private DBConnectionManager instance;// 唯一数据库连接池管理实例类
	static private int clients; // 客户连接数
	private Vector drivers = new Vector();// 驱动信息
	private Hashtable pools = new Hashtable();// 连接池

	/**
	 * 实例化管理类
	 */
	public DBConnectionManager() {
		// TODO Auto-generated constructor stub
		this.init();
	}

	/**
	 * 得到唯一实例管理类
	 * 
	 * @return
	 */
	static synchronized public DBConnectionManager getInstance() {
		if (instance == null) {
			instance = new DBConnectionManager();
		}
		return instance;

	}

	/**
	 * 释放连接
	 * 
	 * @param name
	 * @param con
	 */
	public void freeConnection(String name, Connection con, Statement st, ResultSet rs) {
		Iterator<String> keys = pools.keySet().iterator();
		String keyname = null;
		while(keys.hasNext()){
			keyname = keys.next();
			if(null==name){
				break;
			}else if(name.equals(keyname)){
				break;
			}
		}
		DBConnectionPool pool = (DBConnectionPool) pools.get(keyname);// 根据关键名字得到连接池
		if (pool != null) {
			try {
				if (rs != null) {
					rs.close();
					rs = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					if (st != null) {
						st.close();
						st = null;
					}
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					try {
						if (con != null) {
							pool.freeConnection(con);// 释放连接
						}
					} catch (Exception e) {
						e.printStackTrace();
					} finally {
					}
				}
			}

		}
	}

	/**
	 * 释放连接
	 * 
	 * @param name
	 * @param con
	 */
	public void freeConnection(String name, Connection con, PreparedStatement st, ResultSet rs) {
		Iterator<String> keys = pools.keySet().iterator();
		String keyname = null;
		while(keys.hasNext()){
			keyname = keys.next();
			if(null==name){
				break;
			}else if(name.equals(keyname)){
				break;
			}
		}
		DBConnectionPool pool = (DBConnectionPool) pools.get(keyname);// 根据关键名字得到连接池
		if (pool != null) {
			try {
				if (rs != null) {
					rs.close();
					rs = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					if (st != null) {
						st.close();
						st = null;
					}
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					try {
						if (con != null) {
							pool.freeConnection(con);// 释放连接
						}
					} catch (Exception e) {
						e.printStackTrace();
					} finally {
					}
				}
			}
		}
	}

	/**
	 * 根据连接池的名字name得到一个连接
	 * 
	 * @param name
	 * @return
	 */
	public Connection getConnection(String name) {
		DBConnectionPool pool = null;
		Connection con = null;
		Iterator<String> keys = pools.keySet().iterator();
		String keyname = null;
		while(keys.hasNext()){
			keyname = keys.next();
			if(null==name){
				break;
			}else if(name.equals(keyname)){
				break;
			}
		}
		pool = (DBConnectionPool) pools.get(keyname);// 从名字中获取连接池
		con = pool.getConnection();// 从选定的连接池中获得连接
		if (con != null)
			System.out.println("得"+keyname+"连接。。。");
		return con;
	}

	/**
	 * 得到一个连接的名字Dsname
	 * 
	 * @return
	 */
	public String getDsname() {
		Iterator<String> keys = pools.keySet().iterator();
		String keyname = null;
		while(keys.hasNext()){
			keyname = keys.next();
			break;
		}
		return keyname;
	}
	/**
	 * 得到一个连接，根据连接池的名字和等待时间
	 * 
	 * @param name
	 * @param time
	 * @return
	 */
	public Connection getConnection(String name, long timeout) {
		DBConnectionPool pool = null;
		Connection con = null;
		pool = (DBConnectionPool) pools.get(name);// 从名字中获取连接池
		con = pool.getConnection(timeout);// 从选定的连接池中获得连接
		System.out.println("得到连接。。。");
		return con;
	}

	/**
	 * 释放所有连接
	 */
	public synchronized void release() {
		Enumeration allpools = pools.elements();
		while (allpools.hasMoreElements()) {
			DBConnectionPool pool = (DBConnectionPool) allpools.nextElement();
			if (pool != null)
				pool.release();
		}
		pools.clear();
	}

	/**
	 * 创建连接池
	 * 
	 * @param props
	 */
	private void createPools(DSConfigBean dsb) {
		DBConnectionPool dbpool = new DBConnectionPool();
		dbpool.setName(dsb.getName());
		dbpool.setDriver(dsb.getDriver());
		dbpool.setUrl(dsb.getUrl());
		dbpool.setUser(dsb.getUsername());
		dbpool.setPassword(dsb.getPassword());
		dbpool.setMaxConn(dsb.getMaxconn());
		System.out.println("ioio:" + dsb.getMaxconn());
		pools.put(dsb.getName(), dbpool);
	}

	/**
	 * 初始化连接池的参数
	 */
	private void init() {
		// 加载驱动程序
		this.loadDrivers();
		// 创建连接池
		Iterator alldriver = drivers.iterator();
		while (alldriver.hasNext()) {
			this.createPools((DSConfigBean) alldriver.next());
			System.out.println("创建连接池。。。");

		}
		System.out.println("创建连接池完毕。。。");
	}

	/**
	 * 加载驱动程序
	 * 
	 * @param props
	 */
	private void loadDrivers() {
		ParseDSConfig pd = new ParseDSConfig();
		// 读取数据库配置文件
		drivers = pd.readConfigInfo("ds.config.xml");
		System.out.println("加载驱动程序。。。");
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}
