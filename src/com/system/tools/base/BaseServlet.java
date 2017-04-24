package com.system.tools.base;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BaseServlet extends HttpServlet implements WebApplicationContextAware {

	private static final long serialVersionUID = 1L;
	private WebApplicationContext mWebApplicationContext;
	private Map<String, String> handlerMap = new ConcurrentHashMap<String, String>();
	private AtomicBoolean initialize = new AtomicBoolean(false);
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		this.mWebApplicationContext = initWebApplicationContext();
	}
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
		response.setContentType("text/html; charset=UTF-8");
		request.setCharacterEncoding("UTF-8"); 
		
		try {
			 String classname = getClassname(request);
			 String methodname = request.getParameter("method"); 
			 System.out.println("进入method: " + methodname);
			 Class<?> currentclass = Class.forName(classname);
			 Method method = currentclass.getMethod(methodname, HttpServletRequest.class, HttpServletResponse.class);
			 method.invoke(currentclass.newInstance(), request, response);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	@Override
	public void setWebApplicationContext(WebApplicationContext wac) {
		// TODO Auto-generated method stub
		this.mWebApplicationContext = wac;				
	}

	public String getClassname(HttpServletRequest request) {
		// TODO Auto-generated method stub
		if(initialize.compareAndSet(false, true)){
			handlerMap = mWebApplicationContext.beansOfClassname();
		}		
		String classname = handlerMap.get(getHandlerName(request));
		if(classname == null){
			classname = handlerMap.get("404");
		}
		return classname;
	}
	
	protected String getHandlerName(HttpServletRequest request){
		String path = request.getServletPath();
		int index = path.lastIndexOf('/');
		String handleName =	path.substring(index+1, path.length()-3);
		System.out.println("进入handle: " + handleName);
		return handleName;
	}
	
	private WebApplicationContext initWebApplicationContext() {		
		WebApplicationContext wac = new WebApplicationContext(getServletContext());
		wac.init();	
		return wac;		
	}

}