var PAGESIZE = 20;
var statueStore = new Ext.data.ArrayStore({//状态下拉
    	fields:["name"],
    	data:[["启用"],["禁用"]]
    });
//定义store
function dataStore(fields,url) {
	var store = Ext.create('Ext.data.Store', {
		pageSize : PAGESIZE,
		 fields: fields,
	     proxy: {
	         type: 'ajax',
	         url: url,
	         reader: {
	             type: 'json',
	             rootProperty: 'root',
	             totalProperty : 'total',
	         }
	     }
	 });
	return store;
}

function pagesizebar(store) {
	/** *********************分页工具条 开始**************************** */
	var PAGESIZEStore = new Ext.data.SimpleStore({
		fields : [ 'value', 'text' ],
		data : [ [ 20, '20/页' ], [ 40, '40/页' ], [ 80, '80/页' ] , [ 0, '全部' ] ]
	});
	
	var pagesize_combo = new Ext.form.ComboBox({
		name : 'pagesize',
		hiddenName : 'pagesize',
		triggerAction : 'all',
		lazyRender : true,
		mode : 'local',
		store : PAGESIZEStore,
		valueField : 'value',
		displayField : 'text',
		value : '20',
		editable : false,
		width : 65
	});
	
	var number = parseInt(pagesize_combo.getValue());
	pagesize_combo.on("select", function(comboBox) {
		bbar.pageSize = parseInt(comboBox.getValue());
		number = parseInt(comboBox.getValue());
		store.reload({
			params : {
				start : 0,
				limit : bbar.pageSize
			}
		});
	});
	
	var bbar = new Ext.PagingToolbar({
		pageSize : number,
		store : store,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		// plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
		emptyMsg : "没有符合条件的记录",
		items : [ '-', pagesize_combo ]
	})
	/** *********************分页工具条 结束**************************** */
	return bbar;
}
/**
 * 创建window
 * 
 * @param {}
 *            url
 * @param {}
 *            title
 * @param {}
 *            _form
 * @param {}
 *            store
 */
function createBigWindow(url,title,_form,store) {
	var dataWindow = new Ext.Window({
		title : title, // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : 880, // 窗口宽度
		height : document.body.clientHeight / 1, // 窗口高度
		modal : true,
		closeAction: 'hide',
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		constrain : true, // 设置窗口是否可以溢出父容器
		animateTarget : Ext.getBody(),
		pageY : 50, // 页面定位Y坐标
		pageX : document.body.clientWidth / 2 - 880 / 2, // 页面定位X坐标
		items : _form, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						if (_form.form.isValid()) {
							var json = "[" + Ext.encode(_form.form.getFieldValues(false)) + "]";
							_form.form.submit({
								url : url,
								waitTitle : '提示',
								params : {//改
									json : json
								},
								success : function(form, action) {
									Ext.Msg.alert('提示', action.result.msg,function(){
										dataWindow.hide();
										store.reload();
									});
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
								},
								waitMsg : '正在处理数据,请稍候...'
							});
						} else {
					        Ext.Msg.alert('提示', '请正确填写表单!');
					    }
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						dataWindow.hide();
					}
				}]
	});
	dataWindow.removeAll(false);
	dataWindow.items.add(_form);
	dataWindow.show();
}
function createWindow(url,title,_form,store) {
	var dataWindow = new Ext.Window({
		title : title, // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : Ext.os.deviceType === 'Phone' ? '100%' : 650, // 窗口宽度
		height : document.body.clientHeight / 1, // 窗口高度
		modal : true,
		closeAction: 'hide',
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		constrain : true, // 设置窗口是否可以溢出父容器
		animateTarget : Ext.getBody(),
		pageY : 50, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 620 / 2, // 页面定位X坐标
		items : _form, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						if (_form.form.isValid()) {
							var json = "[" + Ext.encode(_form.form.getFieldValues(false)) + "]";
							_form.form.submit({
								url : url,
								waitTitle : '提示',
								params : {//改
									json : json
								},
								success : function(form, action) {
									Ext.Msg.alert('提示', action.result.msg,function(){
										dataWindow.hide();
										store.reload();
									});
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
								},
								waitMsg : '正在处理数据,请稍候...'
							});
						} else {
					        Ext.Msg.alert('提示', '请正确填写表单!');
					    }
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						dataWindow.hide();
					}
				}]
	});
	dataWindow.removeAll(false);
	dataWindow.items.add(_form);
	dataWindow.show();
}
function createTextWindow(url,title,_form,store) {
	_form.form.isValid();
	var dataWindow = new Ext.Window({
		title : title, // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : Ext.os.deviceType === 'Phone' ? '100%' : 750, // 窗口宽度
		modal : true,
		closeAction: 'hide',
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		animateTarget : Ext.getBody(),
		pageY : 0, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 720 / 2, // 页面定位X坐标
		items : _form, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						if (_form.form.isValid()) {
							var json = "[" + Ext.encode(_form.form.getValues(false)) + "]";
							_form.form.submit({
								url : url,
								waitTitle : '提示',
								params : {//改
									json : json
								},
								success : function(form, action) {
									Ext.Msg.alert('提示', action.result.msg,function(){
										dataWindow.hide();
										store.reload();
									});
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
								},
								waitMsg : '正在处理数据,请稍候...'
							});
						} else {
					        Ext.Msg.alert('提示', '请正确填写表单!');
					    }
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						dataWindow.hide();
					}
				}]
	});
	dataWindow.removeAll(false);
	dataWindow.items.add(_form);
	dataWindow.show();
}
function createQueryWindow(title,_form,store,queryvalue) {
	var dataWindow = new Ext.Window({
		title : title, // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : Ext.os.deviceType === 'Phone' ? '100%' : 650, // 窗口宽度
		modal : true,
		closeAction: 'hide',
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		animateTarget : Ext.getBody(),
		pageY : 0, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 620 / 2, // 页面定位X坐标
		items : _form, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						queryjson = "[" + Ext.encode(_form.form.getValues(false)) + "]";
						queryjson = queryjson.replace("'", "''");
						if ("" == queryvalue){
							store.load({
								params : {
									json : queryjson
								}
							});
						}else{
							store.load({
								params : {
									json : queryjson,
									query : queryvalue
								}
							});
						}
						dataWindow.hide();
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						dataWindow.hide();
					}
				}]
	});
	dataWindow.show();
}
/**
 * 列表弹窗
 * 
 * @param {}
 *            title
 * @param {}
 *            grid
 */
function selectWindow(title,selectgrid) {
	var selectgridWindow = new Ext.Window({
		title : title, // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : 420, // 窗口宽度
		height : document.body.clientHeight / 1.5, // 窗口高度
		modal : true,
		closeAction: 'hide',
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		constrain : true, // 设置窗口是否可以溢出父容器
		animateTarget : Ext.getBody(),
		pageY : 50, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 420 / 2, // 页面定位X坐标
		items : selectgrid, // 嵌入的表单面板
		buttons : [
					{
						text : '确定',
						iconCls : 'ok',
						handler : function() {
							var selectRows = selectgrid.getSelectionModel()
									.getSelections();
							if (selectRows.length != 1) {
								Ext.Msg.alert('提示', '请选择一条！', function() {
								});
								return;
							}
							Ext.getCmp('System_powerparentname').setValue(selectRows[0].get("name"));
							Ext.getCmp('System_powerparentid').setValue(selectRows[0].get("id"));
							win.close();
						}
					}, '-', {
						text : '关闭',
						iconCls : 'close',
						handler : function() {
							win.close();
						}
					}]
	});
	dataWindow.show();
}
/**
 * 公用保存
 * 
 * @param {}
 *            url
 * @param {}
 *            grid
 */
function commonSave(url, selections) {
	Ext.Msg.confirm('请确认', '<b>提示:</b>请确认当前选择的条目？', function(btn, text) {
		if (btn == 'yes') {
			var json = '[';
			for (var i = 0; i < selections.length; i++) {
				json += Ext.encode(selections[i].getData())+",";
			};
			Ext.Ajax.request({
				url : url,
				method : 'POST',
				params : {
					json : json.substr(0, json.length - 1) + "]"
				},
				success : function(response) {
					var resp = Ext.decode(response.responseText); 
					Ext.Msg.alert('提示', resp.msg, function(){
					});
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
				}
			});
		}
	});
}
/**
 * 公用批量选择
 * 
 * @param {}
 *            url
 * @param {}
 *            grid
 * @param {}
 *            store
 */
function commonUpdAll(url, selections, store, keycolumn, params) {
	Ext.Msg.confirm('请确认', '<b>提示:</b>请确认当前选择的条目？', function(btn, text) {
		if (btn == 'yes') {
			var ids = '[';
			for (var i = 0; i < selections.length; i++) {
				ids += "{";
				for (var j = 0; j < keycolumn.length; j++){
					ids += "'"+keycolumn[j]+"':'" + selections[i].data[keycolumn[j]] + "',"
				}
				ids = ids.substr(0, ids.length - 1) + "},";
			};
			Ext.Ajax.request({
				url : url,
				method : 'POST',
				params : {
					params : params,
					json : ids.substr(0, ids.length - 1) + "]"
				},
				success : function(response) {
					var resp = Ext.decode(response.responseText); 
					Ext.Msg.alert('提示', resp.msg, function(){
						store.reload();
					});
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
				}
			});
		}
	});
}
/**
 * 公用删除，联合主键
 * 
 * @param {}
 *            url
 * @param {}
 *            grid
 * @param {}
 *            store
 */
function commonDelete(url, selections, store, keycolumn) {
	if("system"!=currentuser.rolecode){
		Ext.Msg.alert('提示', '不具备删除权限，请联系系统管理员。');
		return;
	}
	Ext.Msg.confirm('请确认', '<b>提示:</b>请确认当前选择的条目？', function(btn, text) {
		if (btn == 'yes') {
			var ids = '[';
			for (var i = 0; i < selections.length; i++) {
				ids += "{";
				for (var j = 0; j < keycolumn.length; j++){
					ids += "'"+keycolumn[j]+"':'" + selections[i].data[keycolumn[j]] + "',"
				}
				ids = ids.substr(0, ids.length - 1) + "},";
			};
			Ext.Ajax.request({
				url : url,
				method : 'POST',
				params : {
					json : ids.substr(0, ids.length - 1) + "]"
				},
				success : function(response) {
					var resp = Ext.decode(response.responseText); 
					Ext.Msg.alert('提示', resp.msg, function(){
//						store.reload();
						store.remove(selections);
					});
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
				}
			});
		}
	});
}
/**
 * 公用导入
 * 
 * @param {}
 *            url
 * @param {}
 *            title
 * @param {}
 *            store
 */
function commonImp(url,title,store) {
	var commonImpForm = new Ext.form.FormPanel({
		labelWidth : 100, // 标签宽度
		labelAlign : 'right', // 标签对齐方式
		bodyStyle : 'padding:5px', // 表单元素和表单面板的边距
		layout : 'form',
		frame : true,
		items : [ {
			xtype : 'filefield',
			fieldLabel : '上传文件名',
			name : 'inputfile',
			id : 'inputfile',
			allowBlank : false,
			anchor : '95%'
		} ]
	});
	var commonImpWindow = new Ext.Window({
		title : title, // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : Ext.os.deviceType === 'Phone' ? '100%' : 650, // 窗口宽度
		height : 120, // 窗口高度
		modal : true,
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		constrain : true, // 设置窗口是否可以溢出父容器
		pageY : 50, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 420 / 2, // 页面定位X坐标
		items : commonImpForm, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						if (!commonImpForm.form.isValid()) {
							Ext.Msg.alert('提示', '请正确填写表单!');
							return;
						}
						commonImpForm.form.submit({
							url : url,
							waitTitle : '提示',
							method : 'GET',
							waitMsg : '正在处理数据,请稍候...',
							params : {
								inputfile : Ext.getCmp("inputfile").getValue()
							},
							success : function(form, action) {
								store.reload();
								Ext.Msg.alert('提示', '操作成功');
								commonImpWindow.close();
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
							}
						});
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						commonImpWindow.close();
					}
				}]
	});
	commonImpWindow.show(); // 显示窗口
}
//grid是所要导出的grid表格
function commonExp(grid) {
	try {
		var xls = new ActiveXObject("Excel.Application");
	} catch (e) {
		alert("要打印该表，您必须安装Excel电子表格软件，同时浏览器须使用“ActiveX 控件”，您的浏览器须允许执行控件。 请点击【帮助】了解浏览器设置方法！");
		return "";
	}
	var cm = grid.getColumnModel();
	var colCount = cm.getColumnCount();
	//alert('总列数：'+colCount);
	xls.visible = true; // 设置excel为可见
	var xlBook = xls.Workbooks.Add;
	var xlSheet = xlBook.Worksheets(1);
	var temp_obj = [];
	// 只下载没有隐藏的列(isHidden()为true表示隐藏,其他都为显示)    
	for (i = 2; i < colCount; i++) {//筛选要导出的列
		if (cm.isHidden(i) == true) {
		} else {
			temp_obj.push(i);
		}
	}
	for (l = 1; l <= temp_obj.length; l++) {
		xlSheet.Cells(1, l).Value = cm.getColumnHeader(temp_obj[l - 1]);
	}
	var store = grid.getStore();
	var recordCount = store.getCount();
	//alert("记录总数："+recordCount);
	//alert('总列数：'+temp_obj.length);
	var view = grid.getView();
	for (k = 1; k <= recordCount; k++) {
		//alert('k-'+k);
		for (j = 1; j <= temp_obj.length; j++) {
			// EXCEL数据从第二行开始,故row = k + 1;
			//alert(view.getCell(k - 1, temp_obj[j- 1]).innerText);
			xlSheet.Cells(k + 1, j).Value = view
					.getCell(k - 1, temp_obj[j - 1]).innerText;
		}

	}
	xlSheet.Columns.AutoFit;
	xls.ActiveWindow.Zoom = 75;
	xls.UserControl = true; // 很重要,不能省略,不然会出问题 意思是excel交由用户控制
	xls = null;
	xlBook = null;
	xlSheet = null;
}
//附件管理
function commonAttach(fid, classify) {
	var loadurl = basePath + "System_attachAction.do?method=selQueryByFid"; 
	var saveurl = basePath + "System_attachAction.do?other=getch&method=upload";
	var delurl = basePath + "System_attachAction.do?method=delAll";
	var selectfields = [ "id", "code", "name", "detail", "classify", "type",
			"attachsize", "fid", "creator", "createtime" ];// 改
	var selectstore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		 fields: selectfields,
	     proxy: {
	         type: 'ajax',
	         url: loadurl + "&fid=" + fid,
	         reader: {
	             type: 'json',
	             rootProperty: 'root',
	             totalProperty : 'total',
	         }
	     }
	 });
	var selectgrid = new Ext.grid.GridPanel({
			width : Ext.os.deviceType === 'Phone' ? '100%' : 650, // 窗口宽度
			height : 333,
			store : selectstore,
		    selModel: {
		    	type: 'checkboxmodel'
		     },
		     columns : [{
				header : "编码",
				dataIndex : "code",
				sortable : true
			}, {
				header : "文件",
				dataIndex : "name",
				width : 200,
				sortable : true,
				renderer : domUrl
			}, {
				header : "描述",
				dataIndex : "detail",
				width : 200,
				sortable : true
			}, {
				header : "分类",
				dataIndex : "classify",
				sortable : true
			}, {
				header : "类型",
				dataIndex : "type",
				sortable : true
			}, {
				header : "大小",
				dataIndex : "attachsize",
				sortable : true
			}, {
				header : "外键",
				dataIndex : "fid",
				hidden : true
			}, {
				header : "创建人",
				dataIndex : "creator",
				sortable : true
			}, {
				header : "创建时间",
				dataIndex : "createtime",
				sortable : true
			}, {
				header : "ID",
				dataIndex : "id",
				hidden : true
			}],
			tbar : [{
					text : '新增',
					iconCls : 'add',
					handler : function() {
						commonAttachUpload(saveurl, fid, classify, selectstore);
					}
				},'-',{
					text : '删除',
					iconCls : 'delete',
					handler : function() {
						var selections = selectgrid.getSelection();
						if (Ext.isEmpty(selections)) {
							Ext.Msg.alert('提示', '请选择您要删除的数据！');
							return;
						}
						var keycolumn = [ 'id' ];// 主键
						commonDelete(delurl,selections,selectstore,keycolumn);
					}
				},'->',{
					xtype : 'textfield',
					id : 'query',
					name : 'query',
					emptyText : '模糊匹配',
					enableKeyEvents : true,
					width : 100,
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == Ext.EventObject.ENTER) {
								if ("" == Ext.getCmp("query").getValue()) {
									selectstore.load();
								} else {
									selectstore.load({
										params : {
											query : Ext.getCmp("query").getValue()
										}
									});
								}
							}
						}
					}
				}, '->' ]
		});
	var commonAttachWindow = new Ext.Window({
		title : '附件管理',
		width : Ext.os.deviceType === 'Phone' ? '100%' : 650, // 窗口宽度
		height : 370,
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		modal : true,//背景失效
		items : selectgrid
	});
	commonAttachWindow.show();
}
//附件上传
function commonAttachUpload(saveurl,fid, classify, store) {
	var commonAttachUploadForm = new Ext.form.FormPanel({
		id : 'commonAttachUpload-form',
		labelAlign : 'right', // 标签对齐方式
		layout : 'column',
		frame : true,
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '编码',
				id : 'attachcode',
				name : 'code',
				maxLength : 100,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '描述',
				id : 'attachdetail',
				name : 'detail',
				maxLength : 100,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '分类',
				id : 'attachclassify',
				name : 'classify',
				maxLength : 100,
				value : classify,
				readOnly : true,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'hidden',
				fieldLabel : '外键',
				id : 'attachfid',
				name : 'fid',
				maxLength : 100,
				value : fid,
				readOnly : true,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'filefield',
				fieldLabel : '文件',
				id : 'upload',
				name : 'upload',
				allowBlank : false,
				anchor : '95%'
			} ]
		} ]
	});
	var commonAttachUploadWindow = new Ext.Window({
		title : '上传附件', // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : Ext.os.deviceType === 'Phone' ? '100%' : 420, // 窗口宽度
		height :300, // 窗口高度
		modal : true,//背景失效
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		pageY : 50, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 320 / 2, // 页面定位X坐标
		items : commonAttachUploadForm, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						if (commonAttachUploadForm.form.isValid()) {
							var json = "[" + Ext.encode(commonAttachUploadForm.form.getValues(false)) + "]";
							commonAttachUploadForm.form.submit({
								url : saveurl+"&json="+json,
								waitTitle : '提示',
								method : 'GET',
								waitMsg : '正在处理数据,请稍候...',
								success : function(form, action) {
									Ext.Msg.alert('提示', '操作成功');
									store.reload();
									commonAttachUploadWindow.close();
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
								}
							});
						} else {
					        Ext.Msg.alert('提示', '请正确填写表单!');
					    }
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						commonAttachUploadWindow.close();
					}
				} ]
	});
	commonAttachUploadWindow.show(); // 显示窗口
}
//上传照片
function commonImageUpload(imagetable,imagecol,fidcol,fid) {
	var saveurl = basePath + "System_attachAction.do?other=getch&method=uploadimage";
	var commonImageUploadForm = new Ext.form.FormPanel({
		id : 'commonImageUpload-form',
		labelAlign : 'right', // 标签对齐方式
		layout : 'column',
		frame : true,
		items : [ {
			columnWidth : 1,
			hidden : true,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '表名',
				id : 'classify',
				name : 'classify',
				value : imagetable,
				maxLength : 100,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			hidden : true,
			items : [ {
				xtype : 'textfield',
				fieldLabel : '字段名',
				id : 'code',
				name : 'code',
				value : imagecol,
				maxLength : 100,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			hidden : true,
			items : [ {
				xtype : 'textfield',
				fieldLabel : '外健名',
				id : 'detail',
				name : 'detail',
				value : fidcol,
				maxLength : 100,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			hidden : true,
			items : [ {
				xtype : 'textfield',
				fieldLabel : '外键',
				id : 'fid',
				name : 'fid',
				maxLength : 100,
				value : fid,
				readOnly : true,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'filefield',
				fieldLabel : '文件',
				id : 'upload',
				name : 'upload',
				allowBlank : false,
				anchor : '95%'
			} ]
		} ]
	});
	var commonImageUploadWindow = new Ext.Window({
		title : '上传附件', // 窗口标题
		layout : 'fit', // 设置窗口布局模式
		width : Ext.os.deviceType === 'Phone' ? '100%' : 420, // 窗口宽度
		modal : true,//背景失效
		closable : true, // 是否可关闭
		collapsible : true, // 是否可收缩
		maximizable : true, // 设置是否可以最大化
		border : false, // 边框线设置
		pageY : 50, // 页面定位Y坐标
		pageX : Ext.os.deviceType === 'Phone' ? 0 : document.body.clientWidth / 2 - 320 / 2, // 页面定位X坐标
		items : commonImageUploadForm, // 嵌入的表单面板
		buttons : [
				{
					text : '提交',
					iconCls : 'ok',
					handler : function() {
						if (commonImageUploadForm.form.isValid()) {
							var json = "[" + Ext.encode(commonImageUploadForm.form.getValues(false)) + "]";
							commonImageUploadForm.form.submit({
								url : saveurl+"&json="+json,
								waitTitle : '提示',
								method : 'GET',
								waitMsg : '正在处理数据,请稍候...',
								success : function(form, action) {
									Ext.Msg.alert('提示', '操作成功');
									commonImageUploadWindow.close();
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', '网络出现问题，请稍后再试');
								}
							});
						} else {
					        Ext.Msg.alert('提示', '请正确填写表单!');
					    }
					}
				}, {
					text : '关闭',
					iconCls : 'close',
					handler : function() {
						commonImageUploadWindow.close();
					}
				} ]
	});
	commonImageUploadWindow.show(); // 显示窗口
}