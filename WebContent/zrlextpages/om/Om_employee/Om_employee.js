Ext.onReady(function() {
	var Om_employeeclassify = "人员";
	var Om_employeetitle = "当前位置:系统管理》" + Om_employeeclassify;
	var Om_employeeaction = "Om_employeeAction.do";
	var Om_employeefields = ['empid'
	        			    ,'empcode' 
	        			    ,'operatorid' 
	        			    ,'loginname' 
	        			    ,'empname' 
	        			    ,'realname' 
	        			    ,'gender' 
	        			    ,'birthdate' 
	        			    ,'position' 
	        			    ,'empstatus' 
	        			    ,'cardtype' 
	        			    ,'cardno' 
	        			    ,'indate' 
	        			    ,'outdate' 
	        			    ,'otel' 
	        			    ,'oaddress' 
	        			    ,'ozipcode' 
	        			    ,'oemail' 
	        			    ,'faxno' 
	        			    ,'mobileno' 
	        			    ,'msn' 
	        			    ,'htel' 
	        			    ,'haddress' 
	        			    ,'hzipcode' 
	        			    ,'pemail' 
	        			    ,'party' 
	        			    ,'degree' 
	        			    ,'major' 
	        			    ,'specialty' 
	        			    ,'workexp' 
	        			    ,'regdate' 
	        			    ,'createtime' 
	        			    ,'lastmodytime' 
	        			    ,'orgidlist' 
	        			    ,'orgid' 
	        			    ,'remark' 
	        			      ];// 全部字段
	var Om_employeekeycolumn = [ 'empid' ];// 主键
	var Om_employeestore = dataStore(Om_employeefields, basePath + Om_employeeaction + "?method=selAll");// 定义Om_employeestore
	
	var empstatusStore = new Ext.data.ArrayStore({//
    	fields:["empstatus"],
    	data:[["在岗"],["离职"],["待岗"],["退休"]]
    });
	var genderStore = new Ext.data.ArrayStore({//
    	fields:["gender"],
    	data:[["男"],["女"]]
    });
	var cardtypeStore = new Ext.data.ArrayStore({//
    	fields:["cardtype"],
    	data:[["身份证"],["护照"],["暂住证"],["军官证"],["学生证"]]
    });
	var partyStore = new Ext.data.ArrayStore({//
    	fields:["party"],
    	data:[["团员"],["党员"],["群众"]]
    });
	var Om_employeedataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'Om_employeedataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			items : [ {
				xtype : 'textfield',
				id : 'Om_employeeempid',
				name : 'empid',
				hidden : true
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '人员代码',
				id : 'Om_employeeempcode',
				name : 'empcode',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		/*, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '操作员登录号',
				id : 'Om_employeeloginname',
				name : 'loginname',
				maxLength : 100,
				anchor : '95%'
			} ]
		}*/
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '人员姓名',
				id : 'Om_employeeempname',
				name : 'empname',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '人员全名',
				id : 'Om_employeerealname',
				name : 'realname',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'combo',
				fieldLabel : '性别',
				id : 'Om_employeegender',
				name : 'gender',
				emptyText : '请选择',
				store : genderStore,
				mode : 'local',
				displayField : 'gender',
				valueField : 'gender',
				hiddenName : 'gender',
				triggerAction : 'all',
				editable : false,
				maxLength : 100,
				allowBlank : false,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'datefield',
				fieldLabel : '出生日期',
				id : 'Om_employeebirthdate',
				name : 'birthdate',
				maxLength : 100,
				format : 'Y-m-d',
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '基本岗位',
				id : 'Om_employeeposition',
				name : 'position',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'combo',
				fieldLabel : '状态',
				id : 'Om_employeeempstatus',
				name : 'empstatus',
				emptyText : '请选择',
				store : empstatusStore,
				mode : 'local',
				displayField : 'empstatus',
				valueField : 'empstatus',
				hiddenName : 'empstatus',
				triggerAction : 'all',
				editable : false,
				maxLength : 100,
				allowBlank : false,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'combo',
				fieldLabel : '证件类型',
				id : 'Om_employeecardtype',
				name : 'cardtype',
				emptyText : '请选择',
				store : cardtypeStore,
				mode : 'local',
				displayField : 'cardtype',
				valueField : 'cardtype',
				hiddenName : 'cardtype',
				triggerAction : 'all',
				editable : false,
				maxLength : 100,
				allowBlank : false,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '证件号码',
				id : 'Om_employeecardno',
				name : 'cardno',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'datefield',
				fieldLabel : '入职日期',
				id : 'Om_employeeindate',
				name : 'indate',
				maxLength : 100,
				format : 'Y-m-d',
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'datefield',
				fieldLabel : '离职日期',
				id : 'Om_employeeoutdate',
				name : 'outdate',
				maxLength : 100,
				format : 'Y-m-d',
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '办公电话',
				id : 'Om_employeeotel',
				name : 'otel',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '办公地址',
				id : 'Om_employeeoaddress',
				name : 'oaddress',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '办公邮编',
				id : 'Om_employeeozipcode',
				name : 'ozipcode',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '办公邮件',
				id : 'Om_employeeoemail',
				name : 'oemail',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '传真号码',
				id : 'Om_employeefaxno',
				name : 'faxno',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '手机号码',
				id : 'Om_employeemobileno',
				name : 'mobileno',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'MSN号码',
				id : 'Om_employeemsn',
				name : 'msn',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '家庭电话',
				id : 'Om_employeehtel',
				name : 'htel',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '家庭地址',
				id : 'Om_employeehaddress',
				name : 'haddress',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '家庭邮编',
				id : 'Om_employeehzipcode',
				name : 'hzipcode',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '私人电子邮箱',
				id : 'Om_employeepemail',
				name : 'pemail',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'combo',
				fieldLabel : '政治面貌',
				id : 'Om_employeeparty',
				name : 'party',
				emptyText : '请选择',
				store : partyStore,
				mode : 'local',
				displayField : 'party',
				valueField : 'party',
				hiddenName : 'party',
				triggerAction : 'all',
				editable : false,
				maxLength : 100,
				allowBlank : false,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'numberfield',
				fieldLabel : '职级',
				id : 'Om_employeedegree',
				name : 'degree',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		/*, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '直接主管',
				id : 'Om_employeemajor',
				name : 'major',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '可授权角色',
				id : 'Om_employeespecialty',
				name : 'specialty',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '工作描述',
				id : 'Om_employeeworkexp',
				name : 'workexp',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '可管理机构',
				id : 'Om_employeeorgidlist',
				name : 'orgidlist',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '主机构编号',
				id : 'Om_employeeorgid',
				name : 'orgid',
				maxLength : 100,
				anchor : '95%'
			} ]
		}*/
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '备注',
				id : 'Om_employeeremark',
				name : 'remark',
				maxLength : 100,
				anchor : '95%'
			} ]
		}
		]
	});
	
	//var Om_employeebbar = pagesizebar(Om_employeestore);//定义分页
	var Om_employeegrid =  Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
		//title : Om_employeetitle,
		store : Om_employeestore,
		//bbar : Om_employeebbar,
	    selModel: {
	        type: 'checkboxmodel'
	    },
	    plugins: {
	         ptype: 'cellediting',
	         clicksToEdit: 1
	    },
		columns : [{xtype: 'rownumberer',width:50}, 
		{// 改
			header : '人员编号',
			dataIndex : 'empid',
			sortable : true, 
			editor: {
                xtype: 'textfield',
                editable: false
            }
		}
		, {
			header : '人员代码',
			dataIndex : 'empcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '操作员编号',
			dataIndex : 'operatorid',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '操作员登录号',
			dataIndex : 'loginname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '人员姓名',
			dataIndex : 'empname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '人员全名',
			dataIndex : 'realname',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '性别',
			dataIndex : 'gender',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '出生日期',
			dataIndex : 'birthdate',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '基本岗位',
			dataIndex : 'position',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '状态',
			dataIndex : 'empstatus',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '证件类型',
			dataIndex : 'cardtype',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '证件号码',
			dataIndex : 'cardno',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '入职日期',
			dataIndex : 'indate',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '离职日期',
			dataIndex : 'outdate',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '办公电话',
			dataIndex : 'otel',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '办公地址',
			dataIndex : 'oaddress',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '办公邮编',
			dataIndex : 'ozipcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '办公邮件',
			dataIndex : 'oemail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '传真号码',
			dataIndex : 'faxno',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '手机号码',
			dataIndex : 'mobileno',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : 'MSN号码',
			dataIndex : 'msn',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '家庭电话',
			dataIndex : 'htel',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '家庭地址',
			dataIndex : 'haddress',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '家庭邮编',
			dataIndex : 'hzipcode',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '私人电子邮箱',
			dataIndex : 'pemail',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '政治面貌',
			dataIndex : 'party',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '职级',
			dataIndex : 'degree',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '直接主管',
			dataIndex : 'major',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '可授权角色',
			dataIndex : 'specialty',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '工作描述',
			dataIndex : 'workexp',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '注册日期',
			dataIndex : 'regdate',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '创建时间',
			dataIndex : 'createtime',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '最新更新时间',
			dataIndex : 'lastmodytime',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '可管理机构',
			dataIndex : 'orgidlist',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '主机构编号',
			dataIndex : 'orgid',
			sortable : true,  
			editor: {
                xtype: 'textfield'
            }
		}
		, {
			header : '备注',
			dataIndex : 'remark',
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
					Om_employeedataForm.form.reset();
					Ext.getCmp("Om_employeeempid").setEditable (true);
					createTextWindow(basePath + Om_employeeaction + "?method=insAll", "新增", Om_employeedataForm, Om_employeestore);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "保存",
				iconCls : 'ok',
				handler : function() {
					var selections = Om_employeegrid.getSelection();
					if (Ext.isEmpty(selections)) {
						Ext.Msg.alert('提示', '请至少选择一条数据！');
						return;
					}
					commonSave(basePath + Om_employeeaction + "?method=updAll",selections);
				}
			},'-',{
				text : Ext.os.deviceType === 'Phone' ? null : "修改",
				iconCls : 'edit',
				handler : function() {
					var selections = Om_employeegrid.getSelection();
					if (selections.length != 1) {
						Ext.Msg.alert('提示', '请选择一条数据！', function() {
						});
						return;
					}
					Om_employeedataForm.form.reset();
					Ext.getCmp("Om_employeeempid").setEditable (false);
					createTextWindow(basePath + Om_employeeaction + "?method=updAll", "修改", Om_employeedataForm, Om_employeestore);
					Om_employeedataForm.form.loadRecord(selections[0]);
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
	        					var selections = Om_employeegrid.getSelection();
	        					if (Ext.isEmpty(selections)) {
	        						Ext.Msg.alert('提示', '请至少选择一条数据！');
	        						return;
	        					}
	        					commonDelete(basePath + Om_employeeaction + "?method=delAll",selections,Om_employeestore,Om_employeekeycolumn);
	        				}
	                    },{
	                    	text : "导入",
	        				iconCls : 'imp',
	        				handler : function() {
	        					commonImp(basePath + Om_employeeaction + "?method=impAll","导入",Om_employeestore);
	        				}
	                    },{
	                    	text : "导出",
	        				iconCls : 'exp',
	        				handler : function() {
	        					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
	        						if (btn == 'yes') {
	        							window.location.href = basePath + Om_employeeaction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("queryOm_employeeaction").getValue(); 
	        						}
	        					});
	        				}
	                    },{
	                    	text : "附件",
	        				iconCls : 'attach',
	        				handler : function() {
	        					var selections = Om_employeegrid.getSelection();
	        					if (selections.length != 1) {
	        						Ext.Msg.alert('提示', '请选择一条数据！', function() {
	        						});
	        						return;
	        					}
	        					var fid = '';
	        					for (var i=0;i<Om_employeekeycolumn.length;i++){
	        						fid += selections[0].data[Om_employeekeycolumn[i]] + ","
	        					}
	        					commonAttach(fid, Om_employeeclassify);
	        				}
	                    },{
	        				text : "筛选",
    						iconCls : 'select',
    						handler : function() {
    							Ext.getCmp("Om_employeeempid").setEditable (true);
    							createQueryWindow("筛选", Om_employeedataForm, Om_employeestore,Ext.getCmp("queryOm_employeeaction").getValue());
    						}
    					}]
	                }
	            }
			},'->',{
				xtype : 'textfield',
				id : 'queryOm_employeeaction',
				name : 'query',
				emptyText : '模糊匹配',
				width : 100,
				enableKeyEvents : true,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							if ("" == Ext.getCmp("queryOm_employeeaction").getValue()) {
								Om_employeestore.load({
									params : {
										json : queryjson
									}
								});
							} else {
								Om_employeestore.load({
									params : {
										json : queryjson,
										query : Ext.getCmp("queryOm_employeeaction").getValue()
									}
								});
							}
						}
					}
				}
			}
		]
	});
	Om_employeegrid.region = 'center';
	Om_employeestore.load();//加载数据
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ Om_employeegrid ]
	});
})

