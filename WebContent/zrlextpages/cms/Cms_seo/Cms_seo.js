Ext.onReady(function() {
	var Cms_seoclassify = "cms_seo";
	var Cms_seotitle = "当前位置:业务管理》" + Cms_seoclassify;
	var Cms_seoaction = "Cms_seoAction.do";
	var Cms_seofields = ['seoid'
	        			    ,'seokeyword' 
	        			    ,'seodetail' 
	        			    ,'seomodel' 
	        			    ,'logo' 
	        			    ,'seocompany' 
	        			    ,'seoaddress' 
	        			    ,'seotel' 
	        			    ,'seoposcode' 
	        			    ,'seoemail' 
	        			    ,'seocopyright' 
	        			    ,'seoicp' 
	        			      ];// 全部字段
	var Cms_seokeycolumn = [ 'seoid' ];// 主键
	var Cms_seostore = dataStore(Cms_seofields, basePath + Cms_seoaction + "?method=selAll");// 定义Cms_seostore
	var Cms_seodataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'Cms_seodataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Cms_seoseoid',
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
				id : 'Cms_seoseokeyword',
				name : 'seokeyword',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '详细',
				id : 'Cms_seoseodetail',
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
				id : 'Cms_seoseomodel',
				name : 'seomodel',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'LOGO',
				id : 'Cms_seologo',
				name : 'logo',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '公司',
				id : 'Cms_seoseocompany',
				name : 'seocompany',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '地址',
				id : 'Cms_seoseoaddress',
				name : 'seoaddress',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '电话',
				id : 'Cms_seoseotel',
				name : 'seotel',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '邮编',
				id : 'Cms_seoseoposcode',
				name : 'seoposcode',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '邮箱',
				id : 'Cms_seoseoemail',
				name : 'seoemail',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'COPYRIGHT',
				id : 'Cms_seoseocopyright',
				name : 'seocopyright',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '备案',
				id : 'Cms_seoseoicp',
				name : 'seoicp',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Cms_seobbar = pagesizebar(Cms_seostore);//定义分页
	var Cms_seogrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Cms_seotitle,
		store : Cms_seostore,
		//bbar : Cms_seobbar,
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
			dataIndex : 'seokeyword',
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
		, {
			header : 'LOGO',
			dataIndex : 'logo',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '公司',
			dataIndex : 'seocompany',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '地址',
			dataIndex : 'seoaddress',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '电话',
			dataIndex : 'seotel',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '邮编',
			dataIndex : 'seoposcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '邮箱',
			dataIndex : 'seoemail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : 'COPYRIGHT',
			dataIndex : 'seocopyright',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '备案',
			dataIndex : 'seoicp',
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
					Cms_seodataForm.form.reset();
					Ext.getCmp("Cms_seoseoid").setEditable (true);
					createTextWindow(basePath + Cms_seoaction + "?method=insAll", "新增", Cms_seodataForm, Cms_seostore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Cms_seogrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Cms_seoaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Cms_seogrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					Cms_seodataForm.form.reset();
					Ext.getCmp("Cms_seoseoid").setEditable (false);
					createTextWindow(basePath + Cms_seoaction + "?method=updAll", "修改", Cms_seodataForm, Cms_seostore);
					Cms_seodataForm.form.loadRecord(selections[0]);
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
	        					var selections = Cms_seogrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Cms_seoaction + "?method=delAll",selections,Cms_seostore,Cms_seokeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Cms_seoaction + "?method=impAll","导入",Cms_seostore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Cms_seoaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryCms_seoaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Cms_seogrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Cms_seokeycolumn.length;i++){
	        						fid += selections[0].data[Cms_seokeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Cms_seoclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Cms_seoseoid").setEditable (true);
    							createQueryWindow("筛选", Cms_seodataForm, Cms_seostore,Ext.getCmp("queryCms_seoaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryCms_seoaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryCms_seoaction").getValue()) {
								Cms_seostore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Cms_seostore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryCms_seoaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Cms_seogrid.region = 'center';
	Cms_seostore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Cms_seogrid ]
	});
})
