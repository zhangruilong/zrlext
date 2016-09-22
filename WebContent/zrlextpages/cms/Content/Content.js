Ext.onReady(function() {
	var Contentclassify = "图文";
	var Contenttitle = "当前位置:业务管理》" + Contentclassify;
	var Contentaction = "ContentAction.do";
	var Contentfields = ['contentid'
	        			    ,'contentcode' 
	        			    ,'contentname' 
	        			    ,'contentdetail' 
	        			    ,'contentback' 
	        			    ,'contentparent' 
	        			    ,'contentmodel' 
	        			      ];// 全部字段
	var Contentkeycolumn = [ 'contentid' ];// 主键
	var Contentstore = dataStore(Contentfields, basePath + Contentaction + "?method=selAll");// 定义Contentstore
	var ContentdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'ContentdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Contentcontentid',
				name : 'contentid',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '编码',
				id : 'Contentcontentcode',
				name : 'contentcode',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '名称',
				id : 'Contentcontentname',
				name : 'contentname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'htmleditor',
				fieldLabel : '详细',
				id : 'Contentcontentdetail',
				name : 'contentdetail',
				height : 200
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '背景',
				id : 'Contentcontentback',
				name : 'contentback',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '父节点',
				id : 'Contentcontentparent',
				name : 'contentparent',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '模板',
				id : 'Contentcontentmodel',
				name : 'contentmodel',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Contentbbar = pagesizebar(Contentstore);//定义分页
	var Contentgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Contenttitle,
		store : Contentstore,
		//bbar : Contentbbar,
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
			dataIndex : 'contentid',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '编码',
			dataIndex : 'contentcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '名称',
			dataIndex : 'contentname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '详细',
			dataIndex : 'contentdetail',
			hidden : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '背景',
			dataIndex : 'contentback',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '父节点',
			dataIndex : 'contentparent',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '模板',
			dataIndex : 'contentmodel',
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
					ContentdataForm.form.reset();
					Ext.getCmp("Contentcontentid").setEditable (true);
					createTextWindow(basePath + Contentaction + "?method=insAll", "新增", ContentdataForm, Contentstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Contentgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Contentaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Contentgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					ContentdataForm.form.reset();
					Ext.getCmp("Contentcontentid").setEditable (false);
					createTextWindow(basePath + Contentaction + "?method=updAll", "修改", ContentdataForm, Contentstore);
					ContentdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Contentgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Contentaction + "?method=delAll",selections,Contentstore,Contentkeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Contentaction + "?method=impAll","导入",Contentstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Contentaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryContentaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Contentgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Contentkeycolumn.length;i++){
	        						fid += selections[0].data[Contentkeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Contentclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Contentcontentid").setEditable (true);
    							createQueryWindow("筛选", ContentdataForm, Contentstore,Ext.getCmp("queryContentaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryContentaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryContentaction").getValue()) {
								Contentstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Contentstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryContentaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Contentgrid.region = 'center';
	Contentstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Contentgrid ]
	});
})
