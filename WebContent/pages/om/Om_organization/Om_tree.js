var treepanel;
Ext.onReady(function() {
	var treestore = Ext.create('Ext.data.TreeStore', {
	    proxy: {
	         type: 'ajax',
	         url: basePath + Om_organizationaction + "?method=selOmtree"
	     }
	});
	treepanel = new Ext.tree.TreePanel({
		store: treestore,
		root: {
			text : '机构人员树',
			icon : '../../../common/sysimages/home.gif',
			expanded : true,
			id : 'root'
		},
		lines : true,
		title : '机构管理',
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
		var queryValue = record.data['code'];
		var activeItem = record.data['qtip'];
		if(record.data['id']=='root'){
			Om_organizationstore.load();
			Om_employeestore.load();
			panel.getLayout().setActiveItem(0);  
		}else if(activeItem=='org'){
			Om_organizationstore.load({
        		params : {
        			query : queryValue
        		}
        	});
			panel.getLayout().setActiveItem(1);  
		}else if(activeItem=='position'){
			Om_positionstore.load({
        		params : {
        			query : queryValue
        		}
        	});
			panel.getLayout().setActiveItem(2);  
		}else{
			Om_employeestore.load({
        		params : {
        			query : queryValue
        		}
        	});
			Om_emppositionstore.load({
        		params : {
        			query : queryValue
        		}
        	});
			panel.getLayout().setActiveItem(3);  
		}
	});
	// 拖拽后
	treepanel.on('beforeitemmove',function(node, oldParent, newParent, index) {
		if(node.attributes['qtip']=='org'&&newParent.attributes['qtip']=='org')
			return true;
		else if(node.attributes['qtip']=='position'&&newParent.attributes['qtip']=='org')
			return true;
		else if(node.attributes['qtip']!='org'&&node.attributes['qtip']!='position'&&newParent.attributes['qtip']=='position')
			return true;
		else
			return false;
	
	});
	// 在拖动的时候，主要通过发送ajax请求，到后台，进行数据的同步修改．
	treepanel.on('itemmove',function(node,oldParent,newParent,index){  
		var url = basePath;
		var json = "[{";
		if(node.attributes['qtip']=='org'){
			url += Om_organizationaction + "?method=updAll";
			json += "orgid:" + node.id + ",parentorgid:" + newParent.id + "}]";
		}else if(node.attributes['qtip']=='position'){
			url += Om_positionaction + "?method=updAll";
			json += "positionid:" + node.id + ",orgid:" + newParent.id + "}]";
		}else {
			url += Om_emppositionaction + "?method=updAll";
			json += "posempid:" + node.attributes['leaf'] + ",positionid:" + newParent.id + "}]";
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
		var activeItem = record.data['qtip'];
		e.preventDefault(); 
		// 定义右键菜单
		var contextMenu;
		if(activeItem=='org'){
			contextMenu = new Ext.menu.Menu( {  
				items : [ {  
					text : '增加下级机构',  
					handler : function() {
						Om_organizationdataForm.form.reset();
						createWindow(basePath + Om_organizationaction + "?method=insAll", "新增", Om_organizationdataForm, treestore);
						Om_organizationdataForm.getForm().setValues({Om_organizationparentorgid:record.data['id']});
					}  
				}, {  
					text : '增加下级岗位',  
					handler : function() {
						Om_positiondataForm.form.reset();
						createWindow(basePath + Om_positionaction + "?method=insAll", "新增", Om_positiondataForm,treestore);
						Om_positiondataForm.getForm().setValues({Om_positionorgid:record.data['id']});
					}   
				}, {  
					text : '删除本机构',  
					handler : function() {
						Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要删除当前选择的条目？', function(btn, text) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : basePath + Om_organizationaction + "?method=delAll",
									method : 'POST',
									params : {
										json : '[{orgid:' + record.data['id'] + '}]'
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
		}else if(activeItem=='position'){
			contextMenu = new Ext.menu.Menu( {  
				items : [{  
					text : '增加新进人员',  
					handler : function() {
						Om_employeedataForm.form.reset();
						createTextWindow(basePath + Om_employeeaction + "?method=insAll", "新增", Om_employeedataForm,treestore);
						Om_employeedataForm.getForm().setValues({Om_employeeposition:record.data['id']});
					}   
				}, {  
					text : '增加已有人员',  
					handler : function() {
						Om_emppositiondataForm.form.reset();
						createWindow(basePath + Om_emppositionaction + "?method=insAll", "新增", Om_emppositiondataForm,treestore);
						Om_emppositiondataForm.getForm().setValues({Om_emppositionpositionid:record.data['id'],Om_emppositionpositionname:record.data['text']});
					}   
				}, {  
					text : '删除本岗位',  
					handler : function() {
						Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要删除当前选择的条目？', function(btn, text) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : basePath + Om_positionaction + "?method=delAll",
									method : 'POST',
									params : {
										json : '[{positionid:' + record.data['id'] + '}]'
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
		}else if(record.data['id']=='root'){
			contextMenu = new Ext.menu.Menu( {  
				items : [{  
					text : '增加下级机构',  
					handler : function() {
						Om_organizationdataForm.form.reset();
						createWindow(basePath + Om_organizationaction + "?method=insAll", "新增", Om_organizationdataForm,treestore);
						Om_organizationdataForm.getForm().setValues({Om_organizationparentorgid:record.data['id']});
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
	var panel = new Ext.Panel({ 
		layout: 'card', 
		activeItem: 0, //默认显示第一个子面板 
		layoutConfig: { 
			animate: true 
		}, 
		items: [orgemp,Om_organizationgrid,Om_positiongrid,empposition]
	});
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
	    	items : panel
	    } ]
	});
})
