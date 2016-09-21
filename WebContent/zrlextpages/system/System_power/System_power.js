var System_powerclassify = "权限";
var System_powertitle = "当前位置:系统管理》" + System_powerclassify;
var System_poweraction = "System_powerAction.do";
var System_powerviewaction = "System_powerviewAction.do";
var System_powerfields = ['id'
        			    ,'code' 
        			    ,'name' 
        			    ,'detail' 
        			    ,'parentid' 
        			    ,'menulevel' 
        			    ,'entrance' 
        			    ,'menuorder' 
        			    ,'parentname'
        			    ,'iconcls'
        			 	,'hreftarget'
        			      ];// 全部字段
var System_powerkeycolumn = [ 'id' ];// 主键
var System_powerstore = dataStore(System_powerfields, basePath + System_powerviewaction + "?method=selAll");// 定义System_powerstore
var System_powerdataForm = new Ext.form.FormPanel({// 定义新增和修改的FormPanel
	id:'System_powerdataForm',
	frame : true,
	layout : 'column',
	items : [ {
		xtype : 'textfield',
		id : 'System_powerid',
		name : 'id',
		hidden : true
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '编码',
			id : 'System_powercode',
			name : 'code',
			maxLength : 100,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '名称',
			id : 'System_powername',
			name : 'name',
			maxLength : 100,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '描述',
			id : 'System_powerdetail',
			name : 'detail',
			maxLength : 100,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : .9,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '父节点',
			id : 'System_powerparentname',
			name : 'parentname',
			readOnly:true,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : .1,
		layout : 'form',
		items : [ {
			xtype : 'button',
			iconCls : 'select',
			handler : function() {
				selectSystem_power();
			}
		} ]
	}
	, {
		xtype : 'hidden',
		fieldLabel : '父节点',
		id : 'System_powerparentid',
		name : 'parentid',
		anchor : '95%'
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'combo',
			fieldLabel : '类型',
			id : 'System_powermenulevel',
			name : 'menulevel',
			emptyText : '请选择',
			store : menulevelStore,
			mode : 'local',
			displayField : 'name',
			valueField : 'name',
			hiddenName : 'menulevel',
			triggerAction : 'all',
			editable : false,
			maxLength : 100,
			allowBlank : false,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '入口',
			id : 'System_powerentrance',
			name : 'entrance',
			maxLength : 200,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '菜单顺序',
			id : 'System_powermenuorder',
			name : 'menuorder',
			maxLength : 100,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '图片',
			id : 'System_powericoncls',
			name : 'iconcls',
			maxLength : 100,
			anchor : '95%'
		} ]
	}
	, {
		columnWidth : 1,
		layout : 'form',
		items : [ {
			xtype : 'combo',
			fieldLabel : '打开方式',
			id : 'System_powerhreftarget',
			name : 'hreftarget',
			emptyText : '请选择',
			store : hreftargetStore,
			mode : 'local',
			displayField : 'name',
			valueField : 'name',
			hiddenName : 'hreftarget',
			triggerAction : 'all',
			editable : false,
			maxLength : 100,
			allowBlank : false,
			anchor : '95%'
		} ]
	}
	]
});

//var System_powerbbar = pagesizebar(System_powerstore);//定义分页
var System_powergrid = new Ext.grid.GridPanel({
	height : document.documentElement.clientHeight - 4,
	width : '100%',
//	title : System_powertitle,
	store : System_powerstore,
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
		dataIndex : 'id',
		sortable : true, 
		editor: {
            xtype: 'textfield',
            editable: false
        }
	}
	, {
		header : '编码',
		dataIndex : 'code',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '名称',
		dataIndex : 'name',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '描述',
		dataIndex : 'detail',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '父节点',
		dataIndex : 'parentname',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '父节点',
		dataIndex : 'parentid',
		hidden : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '类型',
		dataIndex : 'menulevel',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '入口',
		dataIndex : 'entrance',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '菜单顺序',
		dataIndex : 'menuorder',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '图片',
		dataIndex : 'iconcls',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	, {
		header : '打开方式',
		dataIndex : 'hreftarget',
		sortable : true,  
		editor: {
            xtype: 'textfield'
        }
	}
	],
//	bbar : System_powerbbar,
	tbar : [{
		text : Ext.os.deviceType === 'Phone' ? null : "新增",
		iconCls : 'add',
		handler : function() {
			System_powerdataForm.form.reset();
			Ext.getCmp("System_powerid").setEditable (true);
			createTextWindow(basePath + System_poweraction + "?method=insAll", "新增", System_powerdataForm, System_powerstore);
		}
	},'-',{
		text : Ext.os.deviceType === 'Phone' ? null : "保存",
		iconCls : 'ok',
		handler : function() {
			var selections = System_powergrid.getSelection();
			if (Ext.isEmpty(selections)) {
				Ext.Msg.alert('提示', '请至少选择一条数据！');
				return;
			}
			commonSave(basePath + System_poweraction + "?method=updAll",selections);
		}
	},'-',{
		text : Ext.os.deviceType === 'Phone' ? null : "修改",
		iconCls : 'edit',
		handler : function() {
			var selections = System_powergrid.getSelection();
			if (selections.length != 1) {
				Ext.Msg.alert('提示', '请选择一条数据！', function() {
				});
				return;
			}
			System_powerdataForm.form.reset();
			Ext.getCmp("System_powerid").setEditable (false);
			createTextWindow(basePath + System_poweraction + "?method=updAll", "修改", System_powerdataForm, System_powerstore);
			System_powerdataForm.form.loadRecord(selections[0]);
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
    					var selections = System_powergrid.getSelection();
    					if (Ext.isEmpty(selections)) {
    						Ext.Msg.alert('提示', '请至少选择一条数据！');
    						return;
    					}
    					commonDelete(basePath + System_poweraction + "?method=delAll",selections,System_powerstore,System_powerkeycolumn);
    				}
                },{
                	text : "导入",
    				iconCls : 'imp',
    				handler : function() {
    					commonImp(basePath + System_poweraction + "?method=impAll","导入",System_powerstore);
    				}
                },{
                	text : "导出",
    				iconCls : 'exp',
    				handler : function() {
    					Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
    						if (btn == 'yes') {
    							window.location.href = basePath + System_poweraction + "?method=expAll&json="+queryjson+"&query="+Ext.getCmp("querySystem_poweraction").getValue(); 
    						}
    					});
    				}
                },{
                	text : "附件",
    				iconCls : 'attach',
    				handler : function() {
    					var selections = System_powergrid.getSelection();
    					if (selections.length != 1) {
    						Ext.Msg.alert('提示', '请选择一条数据！', function() {
    						});
    						return;
    					}
    					var fid = '';
    					for (var i=0;i<System_powerkeycolumn.length;i++){
    						fid += selections[0].data[System_powerkeycolumn[i]] + ","
    					}
    					commonAttach(fid, System_powerclassify);
    				}
                },{
    				text : "筛选",
					iconCls : 'select',
					handler : function() {
						Ext.getCmp("System_powerid").setEditable (true);
						createQueryWindow("筛选", System_powerdataForm, System_powerstore,Ext.getCmp("querySystem_poweraction").getValue());
					}
				}]
            }
        }
	},'->',{
		xtype : 'textfield',
		id : 'querySystem_poweraction',
		name : 'query',
		emptyText : '模糊匹配',
		width : 100,
		enableKeyEvents : true,
		listeners : {
			specialkey : function(field, e) {
				if (e.getKey() == Ext.EventObject.ENTER) {
					if ("" == Ext.getCmp("querySystem_poweraction").getValue()) {
						System_powerstore.load({
							params : {
								json : queryjson
							}
						});
					} else {
						System_powerstore.load({
							params : {
								json : queryjson,
								query : Ext.getCmp("querySystem_poweraction").getValue()
							}
						});
					}
				}
			}
		}
	}
]
});
System_powergrid.region = 'center';