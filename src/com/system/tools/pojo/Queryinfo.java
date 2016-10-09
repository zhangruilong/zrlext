package com.system.tools.pojo;


public class Queryinfo {
	 private Class type;
	 private String start;
	 private String limit;
	 private String end;
	 private String wheresql;
	 private String query;
	 private String order;
	 private Object json;
	 private String dsname;
	 
	 public Queryinfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public String getWheresql() {
		return wheresql;
	}
	public void setWheresql(String wheresql) {
		this.wheresql = wheresql;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public Class getType() {
		return type;
	}
	public void setType(Class type) {
		this.type = type;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public Object getJson() {
		return json;
	}
	public void setJson(Object json) {
		this.json = json;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public Queryinfo(Class type, String start, String limit, String end, String wheresql, String query, String order,
			Object json) {
		super();
		this.type = type;
		this.start = start;
		this.limit = limit;
		this.end = end;
		this.wheresql = wheresql;
		this.query = query;
		this.order = order;
		this.json = json;
	}
	public Queryinfo(Class type, String start, String end, String wheresql,
			String query, String order) {
		super();
		this.type = type;
		this.start = start;
		this.end = end;
		this.wheresql = wheresql;
		this.query = query;
		this.order = order;
	}
	public String getDsname() {
		return dsname;
	}
	public void setDsname(String dsname) {
		this.dsname = dsname;
	}


}
	