Ext.onReady(function() {
	var System_userclassify = "用户";
	var System_usertitle = "当前位置:系统管理》" + System_userclassify;
	var System_useraction = "System_userAction.do";
	var System_userfields = ['id'
	        			    ,'loginname' 
	        			    ,'password' 
	        			    ,'username' 
	        			    ,'statue' 
	        			      ];// 全部字段
	var System_userkeycolumn = [ 'id' ];// 主键
	var System_userstore = dataStore(System_userfields, basePath + System_useraction + "?method=selAll");// 定义System_userstore
	var System_userdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'System_userdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'System_userid',
				name : 'id',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '登录名',
				id : 'System_userloginname',
				name : 'loginname',
				allowBlank : false,
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '用户名',
				id : 'System_userusername',
				name : 'username',
				allowBlank : false,
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'combo',
				emptyText : '请选择',
				store : statueStore,
				mode : 'local',
				displayField : 'name',
				valueField : 'name',
				hiddenName : 'statue',
				triggerAction : 'all',
				editable: false,
				fieldLabel : '状态',
				id : 'System_userstatue',
				name : 'statue',
				allowBlank : false,
				maxLength : 100
			} ]
		}
		]
	});
	
	//var System_userbbar = pagesizebar(System_userstore);//定义分页
	var System_usergrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : System_usertitle,
		store : System_userstore,
		//bbar : System_userbbar,
	    selModel: {
	        type: 'checkboxmodel'
	    },
	    plugins: {
	         ptype: 'cellediting',
	         clicksToEdit: 1
	    },
		columns : [{xtype: 'rownumberer',width:50}, 
		{// 改
			header : 'ID',
			dataIndex : 'id',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '登录名',
			dataIndex : 'loginname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '密码',
			dataIndex : 'password',
			hidden : true,  
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '用户名',
			dataIndex : 'username',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '状态',
			dataIndex : 'statue',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		],
		tbar : [{
			text : Ext.os.deviceType === 'Phone' ? null : "初始化密码为1",
			iconCls : 'reset',
			handler : function() {
				var selections = System_usergrid.getSelection();
				if (Ext.isEmpty(selections)) {
					Ext.Msg.alert('提示', '请至少选择一条数据！');
					return;
				}
				Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要初始化密码？', function(btn, text) {
					if (btn == 'yes') {
						var ids = '[';
						for (var i = 0; i < selections.length; i++) {
							ids += "{'id':'" + selections[i].data['id'] + "'},"
						};
						Ext.Ajax.request({
							url : basePath + System_useraction + "?method=resetpassword",
							method : 'POST',
							params : {
								json : ids.substr(0, ids.length - 1) + "]"
							},
							success : function(response) {
								Ext.Msg.alert('提示', '操作成功',function(){
									System_userstore.reload();
								});
							},
							failure : function(response) {
								Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
							}
						});
					}
				});
			}
		},'-',{
			text : Ext.os.deviceType === 'Phone' ? null : "新增",
			iconCls : 'add',
			handler : function() {
				System_userdataForm.form.reset();
				Ext.getCmp("System_userid").setEditable (false);
				createTextWindow(basePath + System_useraction + "?method=insAll", "新增", System_userdataForm, System_userstore);
			}
		},'-',{
			text : Ext.os.deviceType === 'Phone' ? null : "保存",
			iconCls : 'ok',
			handler : function() {
				var selections = System_usergrid.getSelection();
				if (Ext.isEmpty(selections)) {
					Ext.Msg.alert('提示', '请至少选择一条数据！');
					return;
				}
				commonSave(basePath + System_useraction + "?method=updAll",selections);
			}
		},'-',{
			text : Ext.os.deviceType === 'Phone' ? null : "修改",
			iconCls : 'edit',
			handler : function() {
				var selections = System_usergrid.getSelection();
				if (selections.length != 1) {
					Ext.Msg.alert('提示', '请选择一条数据！', function() {
					});
					return;
				}
				System_userdataForm.form.reset();
				Ext.getCmp("System_userid").setEditable (false);
				createTextWindow(basePath + System_useraction + "?method=updAll", "修改", System_userdataForm, System_userstore);
				System_userdataForm.form.loadRecord(selections[0]);
			}
		},'-',{
            text: '操作',
            menu: {
                xtype: 'menu',
                items: {
                    xtype: 'buttongroup',
                    columns: 3,
                    items: [{
                    	text : "删除",
        				iconCls : 'delete',
        				handler : function() {
        					var selections = System_usergrid.getSelection();
        					if (Ext.isEmpty(selections)) {
        						Ext.Msg.alert('提示', '请至少选择一条数据！');
        						return;
        					}
        					commonDelete(basePath + System_useraction + "?method=delAll",selections,System_userstore,System_userkeycolumn);
        				}
                    },{
                    	text : "导入",
        				iconCls : 'imp',
        				handler : function() {
        					commonImp(basePath + System_useraction + "?method=impAll","导入",System_userstore);
        				}
                    },{
                    	text : "导出",
        				iconCls : 'exp',
        				handler : function() {
        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
        						if (btn == 'yes') {
        							window.location.href = basePath + System_useraction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("querySystem_useraction").getValue(); 
        						}
        					});
        				}
                    },{
                    	text : "附件",
        				iconCls : 'attach',
        				handler : function() {
        					var selections = System_usergrid.getSelection();
        					if (selections.length != 1) {
        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
        						});
        						return;
        					}
        					var fid = '';
        					for (var i=0;i<System_userkeycolumn.length;i++){
        						fid += selections[0].data[System_userkeycolumn[i]] + ","
        					}
        					commonAttach(fid, System_userclassify);
        				}
                    },{
        				text : "筛选",
						iconCls : 'select',
						handler : function() {
							Ext.getCmp("System_userid").setEditable (true);
							createQueryWindow("筛选", System_userdataForm, System_userstore,Ext.getCmp("querySystem_useraction").getValue());
						}
					}]
                }
            }
		},'->',{
			xtype : 'textfield',
			id : 'querySystem_useraction',
			name : 'query',
			emptyText : '模糊匹配',
			width : 100,
			enableKeyEvents : true,
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == Ext.EventObject.ENTER) {
						if ("" == Ext.getCmp("querySystem_useraction").getValue()) {
							System_userstore.load({
								params : {
									json : queryjson
								}
							});
						} else {
							System_userstore.load({
								params : {
									json : queryjson,
									query : Ext.getCmp("querySystem_useraction").getValue()
								}
							});
						}
					}
				}
			}
		}
	]
});
	System_usergrid.region = 'center';
	System_userstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ System_usergrid ]
	});
})
