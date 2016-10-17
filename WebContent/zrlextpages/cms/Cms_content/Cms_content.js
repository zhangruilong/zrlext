Ext.onReady(function() {
	var Cms_contentclassify = "cms_content";
	var Cms_contenttitle = "当前位置:业务管理》" + Cms_contentclassify;
	var Cms_contentaction = "Cms_contentAction.do";
	var Cms_contentfields = ['contentid'
	        			    ,'contentcode' 
	        			    ,'contentname' 
	        			    ,'contentdetail' 
	        			    ,'contentback' 
	        			    ,'contentparent' 
	        			    ,'contentmodel' 
	        			      ];// 全部字段
	var Cms_contentkeycolumn = [ 'contentid' ];// 主键
	var Cms_contentstore = dataStore(Cms_contentfields, basePath + Cms_contentaction + "?method=selAll");// 定义Cms_contentstore
	var Cms_contentdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'Cms_contentdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Cms_contentcontentid',
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
				id : 'Cms_contentcontentcode',
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
				id : 'Cms_contentcontentname',
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
				id : 'Cms_contentcontentdetail',
				name : 'contentdetail',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '背景',
				id : 'Cms_contentcontentback',
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
				id : 'Cms_contentcontentparent',
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
				id : 'Cms_contentcontentmodel',
				name : 'contentmodel',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Cms_contentbbar = pagesizebar(Cms_contentstore);//定义分页
	var Cms_contentgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Cms_contenttitle,
		store : Cms_contentstore,
		//bbar : Cms_contentbbar,
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
//		, {
//			header : '详细',
//			dataIndex : 'contentdetail',
//			sortable : true,  
//			editor: {
//                xtype: 'textfield'
//            }
//		}
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
					Cms_contentdataForm.form.reset();
					Ext.getCmp("Cms_contentcontentid").setEditable (true);
					createTextWindow(basePath + Cms_contentaction + "?method=insAll", "新增", Cms_contentdataForm, Cms_contentstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Cms_contentgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Cms_contentaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Cms_contentgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					Cms_contentdataForm.form.reset();
					Ext.getCmp("Cms_contentcontentid").setEditable (false);
					createTextWindow(basePath + Cms_contentaction + "?method=updAll", "修改", Cms_contentdataForm, Cms_contentstore);
					Cms_contentdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Cms_contentgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Cms_contentaction + "?method=delAll",selections,Cms_contentstore,Cms_contentkeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Cms_contentaction + "?method=impAll","导入",Cms_contentstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Cms_contentaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryCms_contentaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Cms_contentgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Cms_contentkeycolumn.length;i++){
	        						fid += selections[0].data[Cms_contentkeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Cms_contentclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Cms_contentcontentid").setEditable (true);
    							createQueryWindow("筛选", Cms_contentdataForm, Cms_contentstore,Ext.getCmp("queryCms_contentaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryCms_contentaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryCms_contentaction").getValue()) {
								Cms_contentstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Cms_contentstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryCms_contentaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Cms_contentgrid.region = 'center';
	Cms_contentstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Cms_contentgrid ]
	});
})
