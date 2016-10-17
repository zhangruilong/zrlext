Ext.onReady(function() {
	var Cms_jobpublishclassify = "cms_jobpublish";
	var Cms_jobpublishtitle = "当前位置:业务管理》" + Cms_jobpublishclassify;
	var Cms_jobpublishaction = "Cms_jobpublishAction.do";
	var Cms_jobpublishfields = ['jobpublishid'
	        			    ,'jobpublishcode' 
	        			    ,'jobpublishname' 
	        			    ,'jobpublishdetail' 
	        			    ,'jobpublishmust' 
	        			    ,'jobpublishnum' 
	        			      ];// 全部字段
	var Cms_jobpublishkeycolumn = [ 'jobpublishid' ];// 主键
	var Cms_jobpublishstore = dataStore(Cms_jobpublishfields, basePath + Cms_jobpublishaction + "?method=selAll");// 定义Cms_jobpublishstore
	var Cms_jobpublishdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'Cms_jobpublishdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Cms_jobpublishjobpublishid',
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
				id : 'Cms_jobpublishjobpublishcode',
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
				id : 'Cms_jobpublishjobpublishname',
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
				id : 'Cms_jobpublishjobpublishdetail',
				name : 'jobpublishdetail',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '岗位要求',
				id : 'Cms_jobpublishjobpublishmust',
				name : 'jobpublishmust',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '人数',
				id : 'Cms_jobpublishjobpublishnum',
				name : 'jobpublishnum',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Cms_jobpublishbbar = pagesizebar(Cms_jobpublishstore);//定义分页
	var Cms_jobpublishgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Cms_jobpublishtitle,
		store : Cms_jobpublishstore,
		//bbar : Cms_jobpublishbbar,
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
					Cms_jobpublishdataForm.form.reset();
					Ext.getCmp("Cms_jobpublishjobpublishid").setEditable (true);
					createTextWindow(basePath + Cms_jobpublishaction + "?method=insAll", "新增", Cms_jobpublishdataForm, Cms_jobpublishstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Cms_jobpublishgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Cms_jobpublishaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Cms_jobpublishgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					Cms_jobpublishdataForm.form.reset();
					Ext.getCmp("Cms_jobpublishjobpublishid").setEditable (false);
					createTextWindow(basePath + Cms_jobpublishaction + "?method=updAll", "修改", Cms_jobpublishdataForm, Cms_jobpublishstore);
					Cms_jobpublishdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Cms_jobpublishgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Cms_jobpublishaction + "?method=delAll",selections,Cms_jobpublishstore,Cms_jobpublishkeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Cms_jobpublishaction + "?method=impAll","导入",Cms_jobpublishstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Cms_jobpublishaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryCms_jobpublishaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Cms_jobpublishgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Cms_jobpublishkeycolumn.length;i++){
	        						fid += selections[0].data[Cms_jobpublishkeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Cms_jobpublishclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Cms_jobpublishjobpublishid").setEditable (true);
    							createQueryWindow("筛选", Cms_jobpublishdataForm, Cms_jobpublishstore,Ext.getCmp("queryCms_jobpublishaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryCms_jobpublishaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryCms_jobpublishaction").getValue()) {
								Cms_jobpublishstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Cms_jobpublishstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryCms_jobpublishaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Cms_jobpublishgrid.region = 'center';
	Cms_jobpublishstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Cms_jobpublishgrid ]
	});
})
