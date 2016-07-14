var treepanel;
Ext.onReady(function() {
	var treestore = Ext.create('Ext.data.TreeStore', {
	    proxy: {
	         type: 'ajax',
	         url: basePath + Om_dutyaction + "?method=selTree"
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
		title : '职务层级',
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
		Om_dutystore.load({
    		params : {
    			query : record.data['code']
    		}
    	});
	});
	// 在拖动的时候，主要通过发送ajax请求，到后台，进行数据的同步修改．
	treepanel.on('itemmove',function(node,oldParent,newParent,index){  
		var url = basePath + Om_dutyaction + "?method=updAll";
		var json = "[{" + "id:" + node.id + ",parentid:" + newParent.id + "}]";
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
		event.preventDefault(); 
		// 定义右键菜单
		var contextMenu = new Ext.menu.Menu({  
			items : [{  
				text : '增加子节点',  
				handler : function() {
					Om_dutydataForm.form.reset();
					createWindow(basePath + Om_dutyaction + "?method=insAll", "新增", Om_dutydataForm, treestore);
					Om_dutydataForm.getForm().setValues({Om_dutyparentduty:record.data['id']});
				}  
			}, {  
				text : '删除本节点',  
				handler : function() {
					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要删除当前选择的条目？', function(btn, text) {
						if (btn == 'yes') {
							Ext.Ajax.request({
								url : basePath + Om_dutyaction + "?method=delAll",
								method : 'POST',
								params : {
									json : '[{dutyid:' + record.data['id'] + '}]'
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
		contextMenu.showAt(e.getPoint());  
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
	    }, Om_dutygrid]
	});
})
