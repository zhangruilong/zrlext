Ext.onReady(function() {
	var System_statusclassify = "状态";
	var System_statustitle = "当前位置:系统管理》" + System_statusclassify;
	var System_statusaction = "System_statusAction.do";
	var System_statusfields = ['id'
	        			    ,'code' 
	        			    ,'name' 
	        			    ,'detail' 
	        			      ];// 全部字段
	var System_statuskeycolumn = [ 'id' ];// 主键
	var System_statusstore = dataStore(System_statusfields, basePath + System_statusaction + "?method=selQuery");// 定义System_statusstore
	var System_statusdataForm = Ext.create('Ext.form.Panel', {// 定义新增和修改的FormPanel
		id:'System_statusdataForm',
		labelAlign : 'right',
		frame : true,
		layout : 'column',
		items : [ {
			xtype : 'textfield',
			id : 'System_statusid',
			name : 'id',
			hidden : true
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '编码',
				id : 'System_statuscode',
				name : 'code',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '名称',
				id : 'System_statusname',
				name : 'name',
				maxLength : 100
			} ]
		}
		, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '描述',
				id : 'System_statusdetail',
				name : 'detail',
				maxLength : 100
			} ]
		}
		]
	});
	
	var System_statusbbar = pagesizebar(System_statusstore);//定义分页
	var System_statusgrid = Ext.create('Ext.grid.Panel', {
		height : document.documentElement.clientHeight - 4,
		width : '100%',
	    title: System_statustitle,
	    store: System_statusstore,
	    selModel: {
	        type: 'spreadsheet',
	        checkboxSelect: true
	     },
	    bbar : System_statusbbar,
	    columns: [
			{// 改
				header : 'ID',
				dataIndex : 'id',
				hidden : true
			}
			, {
				header : '编码',
				dataIndex : 'code',
				flex: 1,
				sortable : true
			}
			, {
				header : '名称',
				dataIndex : 'name',
				flex: 1,
				sortable : true
			}
			, {
				header : '描述',
				dataIndex : 'detail',
				flex: 1,
				sortable : true
			}
	    ],
		tbar : [{
			text : "新增",
			iconCls : 'add',
			handler : function() {
				System_statusdataForm.form.reset();
				createWindow(basePath + System_statusaction + "?method=insAll", "新增", System_statusdataForm, System_statusstore);
			}
		},'-',{
			text : "修改",
			iconCls : 'edit',
			handler : function() {
				var selections = System_statusgrid.getSelection();
				if (selections.length != 1) {
					Ext.Msg.alert('提示', '请选择一条要修改的记录！', function() {
					});
					return;
				}
				createWindow(basePath + System_statusaction + "?method=updAll", "修改", System_statusdataForm, System_statusstore);
				System_statusdataForm.form.loadRecord(selections[0]);
			}
		},'-',{
			text : "删除",
			iconCls : 'delete',
			handler : function() {
				var selections = System_statusgrid.getSelection();
				if (Ext.isEmpty(selections)) {
					Ext.Msg.alert('提示', '请选择您要删除的数据！');
					return;
				}
				commonDelete(basePath + System_statusaction + "?method=delAll",selections,System_statusstore,System_statuskeycolumn);
			}
		},'-',{
			text : "导入",
			iconCls : 'imp',
			handler : function() {
				commonImp(basePath + System_statusaction + "?method=impAll","导入",System_statusstore);
			}
		},'-',{
			text : "后台导出",
			iconCls : 'exp',
			handler : function() {
				Ext.Msg.confirm('请确认', '<b>提示:</b>请确认要导出当前数据？', function(btn, text) {
					if (btn == 'yes') {
						window.location.href = basePath + System_statusaction + "?method=expAll"; 
					}
				});
			}
		},'-',{
			text : "前台导出",
			iconCls : 'exp',
			handler : function() {
				commonExp(System_statusgrid);
			}
		},'-',{
			text : "附件",
			iconCls : 'attach',
			handler : function() {
				var selections = System_statusgrid.getSelection();
				if (1 != selections.length ) {
					Ext.Msg.alert('提示', '请选择一条您要上传附件的数据！', function() {
					});
					return;
				}
				var fid = '';
				for (var i=0;i<System_statuskeycolumn.length;i++){
					fid += selections[0].data[System_statuskeycolumn[i]] + ","
				}
				commonAttach(fid, System_statusclassify);
			}
		},'->',{
			xtype : 'textfield',
			id : 'querySystem_status',
			name : 'query',
			emptyText : '模糊匹配',
			width : 100,
			enableKeyEvents : true,
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == Ext.EventObject.ENTER) {
						if ("" == Ext.getCmp("querySystem_status").getValue()) {
							System_statusstore.load();
						} else {
							System_statusstore.load({
								params : {
									query : Ext.getCmp("querySystem_status").getValue()
								}
							});
						}
					}
				}
			}
		}]
	});
	System_statusgrid.region = 'center';
	System_statusstore.load();//加载数据
	System_statusstore.on("beforeload",function(){ 
		System_statusstore.baseParams = {
				query : Ext.getCmp("querySystem_status").getValue()
		}; 
	});
	var win = new Ext.Viewport({//只能有一个viewport
		resizable : true,
		layout : 'border',
		bodyStyle : 'padding:0px;',
		items : [ System_statusgrid ]
	});
})
