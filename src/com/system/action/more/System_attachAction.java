package com.system.action.more;

import java.io.File;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.system.pojo.System_attach;
import com.system.pojo.System_user;
import com.system.poco.System_attachPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.DateUtils;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * 附件 逻辑层
 *@author ZhangRuiLong
 */
public class System_attachAction extends com.system.action.System_attachAction {
	//根据fid分页查询
	public void selQueryByFid(HttpServletRequest request, HttpServletResponse response) {
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(System_attach.class);
		queryinfo.setOrder(System_attachPoco.ORDER);
		String wheresql = queryinfo.getWheresql();
		String fid = request.getParameter("fid");
		if(CommonUtil.isNotEmpty(wheresql)){
			if(CommonUtil.isNotEmpty(fid)){
				queryinfo.setWheresql(wheresql + " and fid='" + fid + "' ");
			}
		}else{
			queryinfo.setWheresql(" fid='" + fid + "' ");
		}
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//上传文件
	public void upload(HttpServletRequest request, HttpServletResponse response) {
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) {
			cuss = CommonConst.GSON.fromJson(json, TYPE);
		}
		Fileinfo fileinfo = FileUtil.upload(request,0,null,null,"upload");
		System_attach temp = cuss.get(0);
		temp.setId(CommonUtil.getNewId());
        temp.setName(fileinfo.getFullname());
        temp.setAttachsize(String.valueOf(fileinfo.getSize()/1024)+"KB");
        temp.setType(fileinfo.getType());
        temp.setCreatetime(DateUtils.getDateTime());
		result = insSingle(temp);
		responsePW(response, result);
	}
	//上传照片
	public void uploadimage(HttpServletRequest request, HttpServletResponse response) {
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) {
			cuss = CommonConst.GSON.fromJson(json, TYPE);
		}
		Fileinfo fileinfo = FileUtil.upload(request,0,null,null,"upload");
		System_attach temp = cuss.get(0);
        String sql = "update "+temp.getClassify()+" set "+temp.getCode()+"='"+fileinfo.getFullname()
        	+"' where "+temp.getDetail()+"='"+temp.getFid()+"'";
		result = doSingle(sql);
		responsePW(response, result);
	}
	//cms图文上传文件
	public void uploadCms(HttpServletRequest request, HttpServletResponse response) {
		Fileinfo fileinfo = FileUtil.upload(request,0,null,null,"upload");
		responsePW(response, "{success:true,code:202,msg:'操作成功',aUrl:'"+fileinfo.getFullname()+"'}");
	}
}
