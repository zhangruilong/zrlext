Ext.onReady(function() {
	var Intentioncclassify = "意向客户";
	var Intentionctitle = "当前位置:业务管理》" + Intentioncclassify;
	var Intentioncaction = "IntentioncAction.do";
	var Intentioncfields = ['intentioncid'
	        			    ,'intentioncname' 
	        			    ,'intentioncphone' 
	        			    ,'intentionccompany' 
	        			    ,'intentioncbusiness' 
	        			    ,'intentioncaddress' 
	        			      ];// 全部字段
	var Intentionckeycolumn = [ 'intentioncid' ];// 主键
	var Intentioncstore = dataStore(Intentioncfields, basePath + Intentioncaction + "?method=selAll");// 定义Intentioncstore
	var IntentioncdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'IntentioncdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Intentioncintentioncid',
				name : 'intentioncid',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '申请人',
				id : 'Intentioncintentioncname',
				name : 'intentioncname',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '联系电话',
				id : 'Intentioncintentioncphone',
				name : 'intentioncphone',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '单位名称',
				id : 'Intentioncintentionccompany',
				name : 'intentionccompany',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '经营品类',
				id : 'Intentioncintentioncbusiness',
				name : 'intentioncbusiness',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '单位地址',
				id : 'Intentioncintentioncaddress',
				name : 'intentioncaddress',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Intentioncbbar = pagesizebar(Intentioncstore);//定义分页
	var Intentioncgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Intentionctitle,
		store : Intentioncstore,
		//bbar : Intentioncbbar,
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
			dataIndex : 'intentioncid',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '申请人',
			dataIndex : 'intentioncname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '联系电话',
			dataIndex : 'intentioncphone',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '单位名称',
			dataIndex : 'intentionccompany',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '经营品类',
			dataIndex : 'intentioncbusiness',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '单位地址',
			dataIndex : 'intentioncaddress',
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
					IntentioncdataForm.form.reset();
					Ext.getCmp("Intentioncintentioncid").setEditable (true);
					createTextWindow(basePath + Intentioncaction + "?method=insAll", "新增", IntentioncdataForm, Intentioncstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Intentioncgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Intentioncaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Intentioncgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					IntentioncdataForm.form.reset();
					Ext.getCmp("Intentioncintentioncid").setEditable (false);
					createTextWindow(basePath + Intentioncaction + "?method=updAll", "修改", IntentioncdataForm, Intentioncstore);
					IntentioncdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Intentioncgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Intentioncaction + "?method=delAll",selections,Intentioncstore,Intentionckeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Intentioncaction + "?method=impAll","导入",Intentioncstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Intentioncaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryIntentioncaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Intentioncgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Intentionckeycolumn.length;i++){
	        						fid += selections[0].data[Intentionckeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Intentioncclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Intentioncintentioncid").setEditable (true);
    							createQueryWindow("筛选", IntentioncdataForm, Intentioncstore,Ext.getCmp("queryIntentioncaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryIntentioncaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryIntentioncaction").getValue()) {
								Intentioncstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Intentioncstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryIntentioncaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Intentioncgrid.region = 'center';
	Intentioncstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Intentioncgrid ]
	});
})
