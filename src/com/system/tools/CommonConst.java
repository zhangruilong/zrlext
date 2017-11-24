package com.system.tools;

import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class CommonConst {
	//GSON
	public static final Gson GSON = new GsonBuilder().registerTypeAdapter(Date.class,new UtilDateSerializer()).setDateFormat("yyyy-MM-dd").create();
	//public static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	//public static final Gson GSON = new Gson();
	//SUCCESS
	public static final String SUCCESS = "{success:true,code:202,msg:'操作成功'}";
	//FAILURE
	public static final String FAILURE = "{success:true,code:400,msg:'操作失败'}";
	//MFAILURE
	public static final String MFAILURE = "{success:false,code:400,msg:'操作失败'}";
	//LIMIT
	public static final String LIMIT = "1000";
	//SOLR_URL
	public static final String SOLR_URL = "http://localhost:8983/solr/";  
	//REDIS_URL
	public static final String REDIS_IP = "127.0.0.1"; 
	public static final int REDIS_PORT = 6379; 
}
