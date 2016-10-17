Ext.onReady(function() {
	var Cms_intentioncclassify = "cms_intentionc";
	var Cms_intentionctitle = "当前位置:业务管理》" + Cms_intentioncclassify;
	var Cms_intentioncaction = "Cms_intentioncAction.do";
	var Cms_intentioncfields = ['intentioncid'
	        			    ,'intentioncname' 
	        			    ,'intentioncphone' 
	        			    ,'intentionccompany' 
	        			    ,'intentioncbusiness' 
	        			    ,'intentioncaddress' 
	        			      ];// 全部字段
	var Cms_intentionckeycolumn = [ 'intentioncid' ];// 主键
	var Cms_intentioncstore = dataStore(Cms_intentioncfields, basePath + Cms_intentioncaction + "?method=selAll");// 定义Cms_intentioncstore
	var Cms_intentioncdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'Cms_intentioncdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'ID',
				id : 'Cms_intentioncintentioncid',
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
				id : 'Cms_intentioncintentioncname',
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
				id : 'Cms_intentioncintentioncphone',
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
				id : 'Cms_intentioncintentionccompany',
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
				id : 'Cms_intentioncintentioncbusiness',
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
				id : 'Cms_intentioncintentioncaddress',
				name : 'intentioncaddress',
				maxLength : 100
			} ]
		}
		]
	});
	
	//var Cms_intentioncbbar = pagesizebar(Cms_intentioncstore);//定义分页
	var Cms_intentioncgrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Cms_intentionctitle,
		store : Cms_intentioncstore,
		//bbar : Cms_intentioncbbar,
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
					Cms_intentioncdataForm.form.reset();
					Ext.getCmp("Cms_intentioncintentioncid").setEditable (true);
					createTextWindow(basePath + Cms_intentioncaction + "?method=insAll", "新增", Cms_intentioncdataForm, Cms_intentioncstore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Cms_intentioncgrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Cms_intentioncaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Cms_intentioncgrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					Cms_intentioncdataForm.form.reset();
					Ext.getCmp("Cms_intentioncintentioncid").setEditable (false);
					createTextWindow(basePath + Cms_intentioncaction + "?method=updAll", "修改", Cms_intentioncdataForm, Cms_intentioncstore);
					Cms_intentioncdataForm.form.loadRecord(selections[0]);
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
	        					var selections = Cms_intentioncgrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Cms_intentioncaction + "?method=delAll",selections,Cms_intentioncstore,Cms_intentionckeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Cms_intentioncaction + "?method=impAll","导入",Cms_intentioncstore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Cms_intentioncaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryCms_intentioncaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Cms_intentioncgrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Cms_intentionckeycolumn.length;i++){
	        						fid += selections[0].data[Cms_intentionckeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Cms_intentioncclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Cms_intentioncintentioncid").setEditable (true);
    							createQueryWindow("筛选", Cms_intentioncdataForm, Cms_intentioncstore,Ext.getCmp("queryCms_intentioncaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryCms_intentioncaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryCms_intentioncaction").getValue()) {
								Cms_intentioncstore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Cms_intentioncstore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryCms_intentioncaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Cms_intentioncgrid.region = 'center';
	Cms_intentioncstore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Cms_intentioncgrid ]
	});
})
