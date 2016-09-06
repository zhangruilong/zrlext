Ext.onReady(function() {
	var Applycclassify = "职位申请";
	var Applyctitle = "当前位置:业务管理》" + Applycclassify;
	var Applycaction = "ApplycAction.do";
	var Applycfields = ['applycid'
	        			    ,'applycname' 
	        			    ,'applycsex' 
	        			    ,'applycedu' 
	        			    ,'applycexp' 
	        			    ,'applycphone' 
	        			    ,'applycaddress' 
	        			    ,'applycdetail' 
	        			    ,'applycjob' 
	        			      ];// 全部字段
	var Applyckeycolumn = [ 'applycid' ];// 主键
	var Applycstore = dataStore(Applycfields, basePath + Applycaction + "?method=selAll");// 定义Applycstore
	var ApplycdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'ApplycdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Applycapplycid',
				name : 'applycid',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '姓名',
				id : 'Applycapplycname',
				name : 'applycname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '性别',
				id : 'Applycapplycsex',
				name : 'applycsex',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '学历',
				id : 'Applycapplycedu',
				name : 'applycedu',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '经验',
				id : 'Applycapplycexp',
				name : 'applycexp',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '电话',
				id : 'Applycapplycphone',
				name : 'applycphone',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '现住址',
				id : 'Applycapplycaddress',
				name : 'applycaddress',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '自我描述',
				id : 'Applycapplycdetail',
				name : 'applycdetail',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '意向职位',
				id : 'Applycapplycjob',
				name : 'applycjob',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Applycbbar = pagesizebar(Applycstore);//定义分页
	var Applycgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Applyctitle,
		store : Applycstore,
		//bbar : Applycbbar,
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
			dataIndex : 'applycid',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '姓名',
			dataIndex : 'applycname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '性别',
			dataIndex : 'applycsex',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '学历',
			dataIndex : 'applycedu',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '经验',
			dataIndex : 'applycexp',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '电话',
			dataIndex : 'applycphone',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '现住址',
			dataIndex : 'applycaddress',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '自我描述',
			dataIndex : 'applycdetail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '意向职位',
			dataIndex : 'applycjob',
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
					ApplycdataForm.form.reset();
					Ext.getCmp("Applycapplycid").setEditable (true);
					createTextWindow(basePath + Applycaction + "?method=insAll", "新增", ApplycdataForm, Applycstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Applycgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Applycaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Applycgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					ApplycdataForm.form.reset();
					Ext.getCmp("Applycapplycid").setEditable (false);
					createTextWindow(basePath + Applycaction + "?method=updAll", "修改", ApplycdataForm, Applycstore);
					ApplycdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Applycgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Applycaction + "?method=delAll",selections,Applycstore,Applyckeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Applycaction + "?method=impAll","导入",Applycstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Applycaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryApplycaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Applycgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Applyckeycolumn.length;i++){
	        						fid += selections[0].data[Applyckeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Applycclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Applycapplycid").setEditable (true);
    							createQueryWindow("筛选", ApplycdataForm, Applycstore,Ext.getCmp("queryApplycaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryApplycaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryApplycaction").getValue()) {
								Applycstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Applycstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryApplycaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Applycgrid.region = 'center';
	Applycstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Applycgrid ]
	});
})
