Ext.onReady(function() {
	var System_tempruleclassify = "模板样式";
	var System_tempruletitle = "当前位置:业务管理》" + System_tempruleclassify;
	var System_tempruleaction = "System_tempruleAction.do";
	var System_temprulefields = ['id'
	        			    ,'tempcode' 
	        			    ,'tempname' 
	        			    ,'sheetno' 
	        			    ,'sheetname' 
	        			    ,'tablecode' 
	        			    ,'headno' 
	        			    ,'headcode' 
	        			    ,'headname' 
	        			    ,'headnameas' 
	        			    ,'fieldname' 
	        			    ,'headlevel' 
	        			    ,'startrow' 
	        			    ,'endrow' 
	        			    ,'startcol' 
	        			    ,'endcol' 
	        			    ,'detail' 
	        			      ];// 全部字段
	var System_temprulekeycolumn = [ 'id' ];// 主键
	var System_temprulestore = dataStore(System_temprulefields, basePath + System_tempruleaction + "?method=selAll");// 定义System_temprulestore
	var System_tempruledataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'System_tempruledataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'System_tempruleid',
				name : 'id',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '模板代码',
				id : 'System_tempruletempcode',
				name : 'tempcode',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '模板名称',
				id : 'System_tempruletempname',
				name : 'tempname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '页签序号',
				id : 'System_temprulesheetno',
				name : 'sheetno',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '页签名称',
				id : 'System_temprulesheetname',
				name : 'sheetname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '录入表代码',
				id : 'System_tempruletablecode',
				name : 'tablecode',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头序号',
				id : 'System_tempruleheadno',
				name : 'headno',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头代码',
				id : 'System_tempruleheadcode',
				name : 'headcode',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头名称',
				id : 'System_tempruleheadname',
				name : 'headname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头别名',
				id : 'System_tempruleheadnameas',
				name : 'headnameas',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头对应录入表字段名',
				id : 'System_temprulefieldname',
				name : 'fieldname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头级次',
				id : 'System_tempruleheadlevel',
				name : 'headlevel',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头开始行',
				id : 'System_temprulestartrow',
				name : 'startrow',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头结束行',
				id : 'System_tempruleendrow',
				name : 'endrow',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头开始列',
				id : 'System_temprulestartcol',
				name : 'startcol',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表头结束列',
				id : 'System_tempruleendcol',
				name : 'endcol',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '备注',
				id : 'System_tempruledetail',
				name : 'detail',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var System_temprulebbar = pagesizebar(System_temprulestore);//定义分页
	var System_temprulegrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : System_tempruletitle,
		store : System_temprulestore,
		//bbar : System_temprulebbar,
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
			header : '模板代码',
			dataIndex : 'tempcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '模板名称',
			dataIndex : 'tempname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '页签序号',
			dataIndex : 'sheetno',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '页签名称',
			dataIndex : 'sheetname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '录入表代码',
			dataIndex : 'tablecode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头序号',
			dataIndex : 'headno',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头代码',
			dataIndex : 'headcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头名称',
			dataIndex : 'headname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头别名',
			dataIndex : 'headnameas',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头对应录入表字段名',
			dataIndex : 'fieldname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头级次',
			dataIndex : 'headlevel',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头开始行',
			dataIndex : 'startrow',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头结束行',
			dataIndex : 'endrow',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头开始列',
			dataIndex : 'startcol',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '表头结束列',
			dataIndex : 'endcol',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '备注',
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
					System_tempruledataForm.form.reset();
					Ext.getCmp("System_tempruleid").setEditable (true);
					createTextWindow(basePath + System_tempruleaction + "?method=insAll", "新增", System_tempruledataForm, System_temprulestore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = System_temprulegrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + System_tempruleaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = System_temprulegrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					System_tempruledataForm.form.reset();
					Ext.getCmp("System_tempruleid").setEditable (false);
					createTextWindow(basePath + System_tempruleaction + "?method=updAll", "修改", System_tempruledataForm, System_temprulestore);
					System_tempruledataForm.form.loadRecord(selections[0]);
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
	        					var selections = System_temprulegrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + System_tempruleaction + "?method=delAll",selections,System_temprulestore,System_temprulekeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + System_tempruleaction + "?method=impAll","导入",System_temprulestore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + System_tempruleaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("querySystem_tempruleaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = System_temprulegrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<System_temprulekeycolumn.length;i++){
	        						fid += selections[0].data[System_temprulekeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, System_tempruleclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("System_tempruleid").setEditable (true);
    							createQueryWindow("筛选", System_tempruledataForm, System_temprulestore,Ext.getCmp("querySystem_tempruleaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'querySystem_tempruleaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("querySystem_tempruleaction").getValue()) {
								System_temprulestore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								System_temprulestore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("querySystem_tempruleaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	System_temprulegrid.region = 'center';
	System_temprulestore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ System_temprulegrid ]
	});
})
