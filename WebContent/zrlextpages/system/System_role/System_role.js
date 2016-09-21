Ext.onReady(function() {
	var System_roleclassify = "角色";
	var System_roletitle = "当前位置:系统管理》" + System_roleclassify;
	var System_roleaction = "System_roleAction.do";
	var System_rolefields = ['id'
	        			    ,'code' 
	        			    ,'name' 
	        			    ,'detail' 
	        			      ];// 全部字段
	var System_rolekeycolumn = [ 'id' ];// 主键
	var System_rolestore = dataStore(System_rolefields, basePath + System_roleaction + "?method=selAll");// 定义System_rolestore
	var System_roledataForm = new Ext.form.FormPanel({// 定义新增和修改的FormPanel
		id:'System_roledataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			xtype : 'textfield',
			id : 'System_roleid',
			name : 'id',
			hidden : true
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '编码',
				id : 'System_rolecode',
				name : 'code',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '名称',
				id : 'System_rolename',
				name : 'name',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '描述',
				id : 'System_roledetail',
				name : 'detail',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		]
	});
//	var System_rolebbar = pagesizebar(System_rolestore);//定义分页
	var System_rolegrid = new Ext.grid.GridPanel({
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : System_roletitle,
		store : System_rolestore,
		//bbar : System_rolebbar,
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
			header : '编码',
			dataIndex : 'code',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '名称',
			dataIndex : 'name',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '描述',
			dataIndex : 'detail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		],
		tbar : [{
				text : Ext.os.deviceType === 'Phone' ? null : "新增",
				iconCls : 'add',
				handler : function() {
					System_roledataForm.form.reset();
					Ext.getCmp("System_roleid").setEditable (true);
					createTextWindow(basePath + System_roleaction + "?method=insAll", "新增", System_roledataForm, System_rolestore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = System_rolegrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + System_roleaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = System_rolegrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					System_roledataForm.form.reset();
					Ext.getCmp("System_roleid").setEditable (false);
					createTextWindow(basePath + System_roleaction + "?method=updAll", "修改", System_roledataForm, System_rolestore);
					System_roledataForm.form.loadRecord(selections[0]);
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
	        					var selections = System_rolegrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + System_roleaction + "?method=delAll",selections,System_rolestore,System_rolekeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + System_roleaction + "?method=impAll","导入",System_rolestore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + System_roleaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("querySystem_roleaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = System_rolegrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<System_rolekeycolumn.length;i++){
	        						fid += selections[0].data[System_rolekeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, System_roleclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("System_roleid").setEditable (true);
    							createQueryWindow("筛选", System_roledataForm, System_rolestore,Ext.getCmp("querySystem_roleaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'querySystem_roleaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("querySystem_roleaction").getValue()) {
								System_rolestore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								System_rolestore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("querySystem_roleaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	System_rolegrid.addListener('rowclick',function( grid, record , tr , rowIndex , e , eOpts ){  
		editeInfo(record.get('id'));
	});
	System_rolegrid.region = 'center';
	System_rolestore.load();//加载数据
	var editPanel = new Ext.Panel({
        id:"editPanel",
        bodyStyle : 'padding:0px;',
        width: 400
    });
	editPanel.region = 'east';
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ System_rolegrid,editPanel ]
	});
})
