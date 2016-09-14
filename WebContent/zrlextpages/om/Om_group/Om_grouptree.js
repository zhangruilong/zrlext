var treepanel;
Ext.onReady(function() {
	var treestore = Ext.create('Ext.data.TreeStore', {
	    proxy: {
	         type: 'ajax',
	         url: basePath + Om_groupaction + "?method=selTree"
	     }
	});
	treepanel = new Ext.tree.TreePanel({
		store: treestore,
		root: {
			text : '职务层级树',
			icon : '../../../common/sysimages/home.gif',
			expanded : true,
			id : 'root'
		},
		lines : true,
		title : '工作组管理',
		autoScroll : true,
		height : document.documentElement.clientHeight - 4,
		width : 180,
		viewConfig: {
		    plugins: { ptype: 'treeviewdragdrop' }
		}
	});
	treepanel.expandAll();
	//点击事件
	treepanel.on('itemclick',function( node , record , item , index , e , eOpts ) {  
    	Om_groupstore.load({
    		params : {
    			query : record.data['code']
    		}
    	});
    	Om_empgroupstore.load({
    		params : {
    			query : record.data['code']
    		}
    	});
	});
	// 拖拽后
	treepanel.on('beforeitemmove',function(node, oldParent, newParent, index) {
		if(newParent.attributes['qtip']=='org')
			return true;
		else
			return false;
	});
	// 在拖动的时候，主要通过发送ajax请求，到后台，进行数据的同步修改．
	treepanel.on('itemmove',function(node,oldParent,newParent,index){  
		var url = basePath;
		var json = "[{";
		if(node.attributes['qtip']=='org'){
			url += Om_groupaction + "?method=updAll";
			json += "groupid:" + node.id + ",parentgroupid:" + newParent.id + "}]";
		}else {
			url += Om_empgroupaction + "?method=updAll";
			json += "groempid:" + node.attributes['leaf'] + ",groupid:" + newParent.id + "}]";
		}
		Ext.Ajax.request({  
			url : url,
			waitMsg : '正在处理数据,请稍候...',
			params:{ 
				json : json
			}  
		});  
	}); 
	// 点击右键出现tree菜单
	treepanel.on('itemcontextmenu', function( node , record , item , index , e , eOpts ) {
		e.preventDefault(); 
		// 定义右键菜单
		var contextMenu;
		if(record.data['id']=='root'){
			contextMenu = new Ext.menu.Menu( {  
				items : [{  
					text : '增加下级工作组',  
					handler : function() {
						Om_groupdataForm.form.reset();
						createWindow(basePath + Om_groupaction + "?method=insAll", "新增", Om_groupdataForm, treestore);
						Om_groupdataForm.getForm().setValues({Om_groupparentgroupid:record.data['id']});
					}  
				}, {
					 text : "刷新",
					 handler : function()
					 { 
						treestore.load();
					 }
				}]  
			});
		}else if(record.data['qtip']=='org'){
			contextMenu = new Ext.menu.Menu( {  
				items : [ {  
					text : '增加下级工作组',  
					handler : function() {
						Om_groupdataForm.form.reset();
						createWindow(basePath + Om_groupaction + "?method=insAll", "新增", Om_groupdataForm, treestore);
						Om_groupdataForm.getForm().setValues({Om_groupparentgroupid:record.data['id']});
					}  
				}, {  
					text : '增加工作组人员',  
					handler : function() {
						Om_empgroupdataForm.form.reset();
						createWindow(basePath + Om_empgroupaction + "?method=insAll", "新增", Om_empgroupdataForm, treestore);
						Om_empgroupdataForm.getForm().setValues({Om_empgroupgroupid:record.data['id']});
					} 
				}, {  
					text : '删除本工作组',  
					handler : function() {
						Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要删除当前选择的条目？', function(btn, text) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : basePath + Om_groupaction + "?method=delAll",
									method : 'POST',
									params : {
										json : '[{groupid:' + record.data['id'] + '}]'
									},
									success : function(response) {
										var resp = Ext.decode(response.responseText); 
										Ext.Msg.alert('提示', resp.msg, function(){
											treestore.load();
										});
									},
									failure : function(response) {
										Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
									}
								});
							}
						});
					}   
				}, {
					 text : "刷新",
					 handler : function()
					 { 
						treestore.load();
					 }
				}]  
			});
		} 
		contextMenu.showAt(e.getPoint());  
	});
	var groupemp = new Ext.TabPanel({
		activeTab : 0,
		items : [ {
			title : '工作组查询',
			items : Om_groupgrid
		}, {
			title : '人员查询',
			items : Om_empgroupgrid
		} ]
	})
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ {
	        region: 'west',
	        floatable: false,
	        width: 180,
	        items: treepanel
	    },{
	    	id : 'rightviewport',
	    	region : 'center',
	    	items : groupemp
	    } ]
	});
})
