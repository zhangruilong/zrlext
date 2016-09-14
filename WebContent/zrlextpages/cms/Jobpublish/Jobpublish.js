Ext.onReady(function() {
	var Jobpublishclassify = "职位";
	var Jobpublishtitle = "当前位置:业务管理》" + Jobpublishclassify;
	var Jobpublishaction = "JobpublishAction.do";
	var Jobpublishfields = ['jobpublishid'
	        			    ,'jobpublishcode' 
	        			    ,'jobpublishname' 
	        			    ,'jobpublishdetail' 
	        			    ,'jobpublishmust' 
	        			    ,'jobpublishnum' 
	        			      ];// 全部字段
	var Jobpublishkeycolumn = [ 'jobpublishid' ];// 主键
	var Jobpublishstore = dataStore(Jobpublishfields, basePath + Jobpublishaction + "?method=selAll");// 定义Jobpublishstore
	var JobpublishdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'JobpublishdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Jobpublishjobpublishid',
				name : 'jobpublishid',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '编码',
				id : 'Jobpublishjobpublishcode',
				name : 'jobpublishcode',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '名称',
				id : 'Jobpublishjobpublishname',
				name : 'jobpublishname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '职位描述',
				id : 'Jobpublishjobpublishdetail',
				name : 'jobpublishdetail'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '岗位要求',
				id : 'Jobpublishjobpublishmust',
				name : 'jobpublishmust'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '人数',
				id : 'Jobpublishjobpublishnum',
				name : 'jobpublishnum',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Jobpublishbbar = pagesizebar(Jobpublishstore);//定义分页
	var Jobpublishgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Jobpublishtitle,
		store : Jobpublishstore,
		//bbar : Jobpublishbbar,
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
			dataIndex : 'jobpublishid',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '编码',
			dataIndex : 'jobpublishcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '名称',
			dataIndex : 'jobpublishname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '职位描述',
			dataIndex : 'jobpublishdetail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '岗位要求',
			dataIndex : 'jobpublishmust',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '人数',
			dataIndex : 'jobpublishnum',
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
					JobpublishdataForm.form.reset();
					Ext.getCmp("Jobpublishjobpublishid").setEditable (true);
					createTextWindow(basePath + Jobpublishaction + "?method=insAll", "新增", JobpublishdataForm, Jobpublishstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Jobpublishgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Jobpublishaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Jobpublishgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					JobpublishdataForm.form.reset();
					Ext.getCmp("Jobpublishjobpublishid").setEditable (false);
					createTextWindow(basePath + Jobpublishaction + "?method=updAll", "修改", JobpublishdataForm, Jobpublishstore);
					JobpublishdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Jobpublishgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Jobpublishaction + "?method=delAll",selections,Jobpublishstore,Jobpublishkeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Jobpublishaction + "?method=impAll","导入",Jobpublishstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Jobpublishaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryJobpublishaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Jobpublishgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Jobpublishkeycolumn.length;i++){
	        						fid += selections[0].data[Jobpublishkeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Jobpublishclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Jobpublishjobpublishid").setEditable (true);
    							createQueryWindow("筛选", JobpublishdataForm, Jobpublishstore,Ext.getCmp("queryJobpublishaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryJobpublishaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryJobpublishaction").getValue()) {
								Jobpublishstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Jobpublishstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryJobpublishaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Jobpublishgrid.region = 'center';
	Jobpublishstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Jobpublishgrid ]
	});
})
