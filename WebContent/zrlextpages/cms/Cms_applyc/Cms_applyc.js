Ext.onReady(function() {
	var Cms_applycclassify = "cms_applyc";
	var Cms_applyctitle = "当前位置:业务管理》" + Cms_applycclassify;
	var Cms_applycaction = "Cms_applycAction.do";
	var Cms_applycfields = ['applycid'
	        			    ,'applycname' 
	        			    ,'applycsex' 
	        			    ,'applycedu' 
	        			    ,'applycexp' 
	        			    ,'applycphone' 
	        			    ,'applycaddress' 
	        			    ,'applycdetail' 
	        			    ,'applycjob' 
	        			      ];// 全部字段
	var Cms_applyckeycolumn = [ 'applycid' ];// 主键
	var Cms_applycstore = dataStore(Cms_applycfields, basePath + Cms_applycaction + "?method=selAll");// 定义Cms_applycstore
	var Cms_applycdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'Cms_applycdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Cms_applycapplycid',
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
				id : 'Cms_applycapplycname',
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
				id : 'Cms_applycapplycsex',
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
				id : 'Cms_applycapplycedu',
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
				id : 'Cms_applycapplycexp',
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
				id : 'Cms_applycapplycphone',
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
				id : 'Cms_applycapplycaddress',
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
				id : 'Cms_applycapplycdetail',
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
				id : 'Cms_applycapplycjob',
				name : 'applycjob',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Cms_applycbbar = pagesizebar(Cms_applycstore);//定义分页
	var Cms_applycgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Cms_applyctitle,
		store : Cms_applycstore,
		//bbar : Cms_applycbbar,
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
					Cms_applycdataForm.form.reset();
					Ext.getCmp("Cms_applycapplycid").setEditable (true);
					createTextWindow(basePath + Cms_applycaction + "?method=insAll", "新增", Cms_applycdataForm, Cms_applycstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Cms_applycgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Cms_applycaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Cms_applycgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					Cms_applycdataForm.form.reset();
					Ext.getCmp("Cms_applycapplycid").setEditable (false);
					createTextWindow(basePath + Cms_applycaction + "?method=updAll", "修改", Cms_applycdataForm, Cms_applycstore);
					Cms_applycdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Cms_applycgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Cms_applycaction + "?method=delAll",selections,Cms_applycstore,Cms_applyckeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Cms_applycaction + "?method=impAll","导入",Cms_applycstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Cms_applycaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryCms_applycaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Cms_applycgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Cms_applyckeycolumn.length;i++){
	        						fid += selections[0].data[Cms_applyckeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Cms_applycclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Cms_applycapplycid").setEditable (true);
    							createQueryWindow("筛选", Cms_applycdataForm, Cms_applycstore,Ext.getCmp("queryCms_applycaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryCms_applycaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryCms_applycaction").getValue()) {
								Cms_applycstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Cms_applycstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryCms_applycaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Cms_applycgrid.region = 'center';
	Cms_applycstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Cms_applycgrid ]
	});
})
