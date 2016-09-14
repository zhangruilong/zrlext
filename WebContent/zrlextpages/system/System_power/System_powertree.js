var treepanel;
Ext.onReady(function() {
	var treestore = Ext.create('Ext.data.TreeStore', {
	    proxy: {
	         type: 'ajax',
	         url: basePath + System_poweraction + "?method=selPowertree"
	     }
	});
	treepanel = new Ext.tree.TreePanel({
		store: treestore,
		rootVisible: false,
		lines : true,
		title : '应用菜单',
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
    	System_powerstore.load({
    		params : {
    			query : queryValue
    		}
    	});
	});
	// 在拖动的时候，主要通过发送ajax请求，到后台，进行数据的同步修改．
	treepanel.on('itemmove',function(node,oldParent,newParent,index){  
		var url = basePath + System_poweraction + "?method=updAll";
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
		e.preventDefault(); 
		// 定义右键菜单
		var contextMenu = new Ext.menu.Menu({  
			items : [{  
				text : '增加子节点',  
				handler : function() {
					System_powerdataForm.form.reset();
					createWindow(basePath + System_poweraction + "?method=insAll", "新增", System_powerdataForm, treestore);
					System_powerdataForm.getForm().setValues({System_powerparentid:record.data['id']
						,System_powerparentname:record.data['text'],System_powercode:'Server_'
						,System_powerentrance:'../pages//.jsp',System_powerhreftarget:'main'});
				}  
			}, {  
				text : '删除本节点',  
				handler : function() {
					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要删除当前选择的条目？', function(btn, text) {
						if (btn == 'yes') {
							Ext.Ajax.request({
								url : basePath + System_poweraction + "?method=delAll",
								method : 'POST',
								params : {
									json : '[{id:' + record.data['id'] + '}]'
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
	    }, System_powergrid]
	});
})
