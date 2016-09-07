Ext.onReady(function() {
	var Seoclassify = "SEO";
	var Seotitle = "当前位置:业务管理》" + Seoclassify;
	var Seoaction = "SeoAction.do";
	var Seofields = ['seoid'
	        			    ,'seokeword' 
	        			    ,'seodetail' 
	        			    ,'seomodel' 
	        			      ];// 全部字段
	var Seokeycolumn = [ 'seoid' ];// 主键
	var Seostore = dataStore(Seofields, basePath + Seoaction + "?method=selAll");// 定义Seostore
	var SeodataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'SeodataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Seoseoid',
				name : 'seoid',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '关键字',
				id : 'Seoseokeword',
				name : 'seokeword',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '详细',
				id : 'Seoseodetail',
				name : 'seodetail',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '模板',
				id : 'Seoseomodel',
				name : 'seomodel',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Seobbar = pagesizebar(Seostore);//定义分页
	var Seogrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Seotitle,
		store : Seostore,
		//bbar : Seobbar,
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
			dataIndex : 'seoid',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '关键字',
			dataIndex : 'seokeword',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '详细',
			dataIndex : 'seodetail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '模板',
			dataIndex : 'seomodel',
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
					SeodataForm.reset();
					Ext.getCmp("Seoseoid").setEditable (true);
					createTextWindow(basePath + Seoaction + "?method=insAll", "新增", SeodataForm, Seostore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Seogrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Seoaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Seogrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					SeodataForm.form.reset();
					Ext.getCmp("Seoseoid").setEditable (false);
					createTextWindow(basePath + Seoaction + "?method=updAll", "修改", SeodataForm, Seostore);
					SeodataForm.form.loadRecord(selections[0]);
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
	        					var selections = Seogrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Seoaction + "?method=delAll",selections,Seostore,Seokeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Seoaction + "?method=impAll","导入",Seostore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Seoaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("querySeoaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Seogrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Seokeycolumn.length;i++){
	        						fid += selections[0].data[Seokeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Seoclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Seoseoid").setEditable (true);
    							createQueryWindow("筛选", SeodataForm, Seostore,Ext.getCmp("querySeoaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'querySeoaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("querySeoaction").getValue()) {
								Seostore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Seostore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("querySeoaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Seogrid.region = 'center';
	Seostore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Seogrid ]
	});
})
