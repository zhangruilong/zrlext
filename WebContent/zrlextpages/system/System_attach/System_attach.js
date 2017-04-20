Ext.onReady(function() {
	var System_attachclassify = "附件";
	var System_attachtitle = "当前位置:业务管理》" + System_attachclassify;
	var System_attachaction = "System_attachAction.do";
	var System_attachfields = ['id'
	        			    ,'code' 
	        			    ,'name' 
	        			    ,'detail' 
	        			    ,'classify' 
	        			    ,'type' 
	        			    ,'attachsize' 
	        			    ,'fid' 
	        			    ,'creator' 
	        			    ,'createtime' 
	        			      ];// 全部字段
	var System_attachkeycolumn = [ 'id' ];// 主键
	var System_attachstore = dataStore(System_attachfields, basePath + System_attachaction + "?method=selAll");// 定义System_attachstore
	var System_attachdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'System_attachdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'System_attachid',
				name : 'id',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '编码',
				id : 'System_attachcode',
				name : 'code',
				allowBlank : false,
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '名称',
				id : 'System_attachname',
				name : 'name',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '描述',
				id : 'System_attachdetail',
				name : 'detail',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '分类',
				id : 'System_attachclassify',
				name : 'classify',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '类型',
				id : 'System_attachtype',
				name : 'type',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '大小',
				id : 'System_attachattachsize',
				name : 'attachsize',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '外键',
				id : 'System_attachfid',
				name : 'fid',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '创建人员',
				id : 'System_attachcreator',
				name : 'creator',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '创建时间',
				id : 'System_attachcreatetime',
				name : 'createtime',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var System_attachbbar = pagesizebar(System_attachstore);//定义分页
	var System_attachgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : System_attachtitle,
		store : System_attachstore,
		//bbar : System_attachbbar,
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
		, {
			header : '分类',
			dataIndex : 'classify',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '类型',
			dataIndex : 'type',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '大小',
			dataIndex : 'attachsize',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '外键',
			dataIndex : 'fid',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '创建人员',
			dataIndex : 'creator',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '创建时间',
			dataIndex : 'createtime',
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
					System_attachdataForm.form.reset();
					Ext.getCmp("System_attachid").setEditable (true);
					createTextWindow(basePath + System_attachaction + "?method=insAll", "新增", System_attachdataForm, System_attachstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = System_attachgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + System_attachaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = System_attachgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					System_attachdataForm.form.reset();
					Ext.getCmp("System_attachid").setEditable (false);
					createTextWindow(basePath + System_attachaction + "?method=updAll", "修改", System_attachdataForm, System_attachstore);
					System_attachdataForm.form.loadRecord(selections[0]);
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
	        					var selections = System_attachgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + System_attachaction + "?method=delAll",selections,System_attachstore,System_attachkeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + System_attachaction + "?method=impAll","导入",System_attachstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + System_attachaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("querySystem_attachaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = System_attachgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<System_attachkeycolumn.length;i++){
	        						fid += selections[0].data[System_attachkeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, System_attachclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("System_attachid").setEditable (true);
    							createQueryWindow("筛选", System_attachdataForm, System_attachstore,Ext.getCmp("querySystem_attachaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'querySystem_attachaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("querySystem_attachaction").getValue()) {
								System_attachstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								System_attachstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("querySystem_attachaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	System_attachgrid.region = 'center';
	System_attachstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ System_attachgrid ]
	});
})
