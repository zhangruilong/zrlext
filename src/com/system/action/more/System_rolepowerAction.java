package com.system.action.more;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.system.poco.System_rolepowerPoco;
import com.system.pojo.System_rolepower;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseAction;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;

/**
 * 角色权限 逻辑层
 *@author ZhangRuiLong
 */
public class System_rolepowerAction extends com.system.action.System_rolepowerAction {
	//从角色模块右侧权限树中分配
	public void insRolepowertree(HttpServletRequest request, HttpServletResponse response){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		ArrayList<System_rolepower> commonrolepowercuss = new ArrayList<System_rolepower>();
		ArrayList<System_rolepower> commonidrolepowercuss = new ArrayList<System_rolepower>();
		Queryinfo queryinfo = new Queryinfo();
		queryinfo.setType(System_rolepower.class);
		queryinfo.setWheresql(" roleid='" + cuss.get(0).getRoleid() + "'");
		ArrayList<System_rolepower> oldcuss = (ArrayList<System_rolepower>) selAll(queryinfo);
		for(System_rolepower temp:cuss){
			for(System_rolepower oldtemp:oldcuss){
				if(temp.getPowerid().equals(oldtemp.getPowerid())){
					commonrolepowercuss.add(temp);
					commonidrolepowercuss.add(oldtemp);
				}
			}
		}
		cuss.removeAll(commonrolepowercuss);//等到要新增的rolepower
		for(System_rolepower temp:cuss){
			temp.setId(CommonUtil.getNewId());
			result = insSingle(temp);
		}
		oldcuss.removeAll(commonidrolepowercuss);//等到要删除的rolepower
		for(System_rolepower temp:oldcuss){
			result = delSingle(temp);
		}
		responsePW(response, result);
	}
}
