/*
*
*      Author : zhy
*        Date : 2013年2月21日
* Description : 插入图片插件
*
*/
Ext.define('TKW.Editor.Plugin.Image', {
    extend: 'Ext.util.Observable',
    alias: 'widget.PluginImage',
    langTitle: '<span class="commoncss">插入图片</span>',
    urlSizeVars: ['width', 'height'],
    basePath: '',
    constructor: function (config) {
        var me = this;

        Ext.applyIf(me.config, config);
        this.config = config;//保存初始化设置
        //解析设置
        me.url = config.url;           //请求地址
        me.callParent(arguments);
    },
    init: function (cmp) {
        this.cmp = cmp; //保存传入的元件
        this.cmp.on('initialize', this.onInit, this);//绑定初始化事件
        this.cmp.on('afterrender', this.onAfterrender, this);//绑定渲染事件
    },
    //鼠标放开
    onEditorMouseUp: function (e) {
        Ext.get(e.getTarget()).select('img').each(function (el) {
            var w = el.getAttribute('width'), h = el.getAttribute('height'), src = el.getAttribute('src') + ' ';
            src = src.replace(new RegExp(this.urlSizeVars[0]
							+ '=[0-9]{1,5}([&| ])'), this.urlSizeVars[0] + '='
							+ w + '$1');
            src = src.replace(new RegExp(this.urlSizeVars[1]
							+ '=[0-9]{1,5}([&| ])'), this.urlSizeVars[1] + '='
							+ h + '$1');
            el.set({
                src: src.replace(/\s+$/, "")
            });
        }, this);

    },
    //初始化
    onInit: function (htmlEditor, eOpts) {
        Ext.EventManager.on(htmlEditor.getDoc(), {
            'mouseup': this.onEditorMouseUp,
            buffer: 100,
            scope: this
        });
    },
    //渲染
    onAfterrender: function (component, eOpts) {
        var editor = Ext.getCmp(component.id);
        var toolbar = Ext.getCmp(editor.getToolbar().id);
        //添加按钮
        toolbar.add({
            iconCls: 'attach',
            handler: this.selectImage,
            scope: this,
            tip: {
                title: this.langTitle
            },
            overflowText: this.langTitle
        });
    },
    //交验url
    isUrl: function (urlString) {
        regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
        if (urlString.match(regExp))
            return true;
        else
            return false;
    },
    //选择图片
    selectImage: function () {
        var me = this;
        if (!this.imgWindow) {
            this.imgWindow = new Ext.Window({
                title: this.langTitle,
                id: 'imgWindow',
                closeAction: 'hide',
                modal: true,
                width: 400,
                height: 260,
                layout: 'fit',
                items: [new Ext.TabPanel({
                    border: false,
                    enableTabScroll: true,
                    activeTab: 0,
                    height: 260,
                    items: [{
                        title: '<span class="commoncss">上传本地图片</span> ',
                        items: [{
                            xtype: 'form',
                            itemId: 'upload-img',
                            id: 'upload-img',
                            fileUpload: true,
                            border: false,
                            plain: true,
                            bodyStyle: 'padding: 10px;',
                            labelWidth: 60,
                            labelAlign: 'right',
                            items: [{
                                xtype: 'fileuploadfield',
                                fieldLabel: '选择文件',
                                name: 'imageFile',
                                anchor: '100%',
                                allowBlank: false,
                                emptyText: '请选择图片(大小不能超过100KB)'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '图片说明',
                                name: 'up_name',
                                maxLength: 100,
                                anchor: '100%',
                                emptyText: '简短的图片说明'
                            }]
                        }],
                        buttons: [{
                            text: '插入',
                            iconCls: 'acceptIcon',
                            id: 'btnUploadInset',
                            handler: function () {
                                var frm = Ext.getCmp('upload-img').getForm();
                                if (!frm.isValid()) {
                                    return;
                                }
                                if (frm.isValid()) {
                                    var imageFile = frm.findField('imageFile').getValue();
                                    var point = imageFile.lastIndexOf(".");
                                    var type = imageFile.substr(point);
                                    if (type == ".png" || type == ".jpg" || type == ".gif" || type == ".JPG" || type == ".GIF") {
                                    } else {
                                        Ext.MessageBox.alert('提示', '只支持上传jpg和gif格式的图片文件');
                                        return;
                                    }
                                    frm.submit({
                                        url: me.url,
                                        waitTitle: '提示',
                                        method: 'POST',
                                        waitMsg: '正在上传文件,请稍候...',
                                        success: function (form, action) {
                                            var aUrl = action.result.aUrl;
                                            if (action.result.code != 202) {
                                                Ext.MessageBox.alert('提示',action.result.msg);
                                                return;
                                            }
                                            var img = {
                                                Url: aUrl,
                                                Title: frm.findField('up_name').getValue()
                                            };
                                            this.insertImage(img);
                                        },
                                        failure: function (response) {
                                            Ext.MessageBox.alert('提示', '文件上传失败');
                                        },
                                        scope: this
                                    });
                                    Ext.getCmp('imgWindow').hide();
                                } else {
                                    if (!frm.findField('imageFile').isValid()) {
                                    }
                                }
                            },
                            scope: this
                        }, {
                            text: '取消',
                            id: 'btnUploadCancel',
                            iconCls: 'deleteIcon',
                            handler: function () {
                                Ext.getCmp('imgWindow').hide();
                            },
                            scope: this
                        }]
                    }, {
                        title: '<span class="commoncss">链接网络图片</span> ',
                        items: [{
                            xtype: 'form',
                            itemId: 'insert-img',
                            id: 'insert-img',
                            border: false,
                            plain: true,
                            bodyStyle: 'padding: 10px;',
                            labelWidth: 60,
                            labelAlign: 'right',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: '图片URL',
                                name: 'url',
                                anchor: '100%',
                                allowBlank: false,
                                emptyText: '请填入支持外链的长期有效的图片URL'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '图片说明',
                                name: 'name',
                                maxLength: 100,
                                anchor: '100%',
                                emptyText: '简短的图片说明'
                            }]
                        }],
                        buttons: [{
                            text: '插入',
                            iconCls: 'acceptIcon',
                            id: 'btnLinkInset',
                            handler: function () {
                                var frm = Ext.getCmp('insert-img').getForm();
                                if (frm.isValid()) {
                                    url = frm.findField('url').getValue();

                                    if (!this.isUrl(url)) {
                                        Ext.Msg.alert('提示','URL不合法.请重新输入.格式[http://****]');
                                        return;
                                    };

                                    var img = {
                                        // Width : 100,
                                        // Height : 100,
                                        Url: frm.findField('url').getValue(),
                                        ID: 'id_img_9999',
                                        Title: frm.findField('name').getValue()
                                    };
                                    this.insertImage(img);
                                    this.imgWindow.hide();
                                } else {
                                    if (!frm.findField('url').isValid()) {
                                    }
                                }
                            },
                            scope: this
                        }, {
                            text: '取消',
                            id: 'btnLinkCancel',
                            iconCls: 'deleteIcon',
                            handler: function () {
                                Ext.getCmp('imgWindow').hide();
                            },
                            scope: this
                        }]
                    }]
                })],
                listeners: {
                    show: {
                        fn: function () {
                            var frm = Ext.getCmp('insert-img').getForm();
                            frm.reset();
                            var frm1 = Ext.getCmp('upload-img').getForm();
                            frm1.reset();
                        },
                        scope: this,
                        defer: 350
                    }
                }
            });
            this.imgWindow.show();
        } else {
            this.imgWindow.show();
        }
    },
    //插入图片
    insertImage: function (img) {
    	var str = img.Url;
    	if(str.indexOf("http")==-1) str = basePath + str;
        this.cmp.insertAtCursor('<img src="' + str + '">');
    }
});