var weChat = {
    regist : false,
    install : false,
    init : function(){
        var that = this;
        uexWeiXin.registerApp('wx36fc4de024ecaaba');

        uexWeiXin.cbRegisterApp=function(opCode,dataType,data){
            that.regist = (data == 0);
        };

        //检查微信是否安装
        uexWeiXin.isWXAppInstalled();

        uexWeiXin.cbIsWXAppInstalled = function (opCode,dataType,data) {
            that.install = (data == 0);
        }
    },

    /**
     * 发送消息
     * @param text 消息文本
     * @param friend 是否发送到朋友圈
     */
    sendText : function(text,friend){
        var that = this;
        if(!text){
            $.toast("分享内容不能为空");
            return;
        }

        if(that.regist){
            if(that.install){
                friend?uexWeiXin.shareTextContent('{"text":"'+text+'","scene":1}'): uexWeiXin.shareTextContent('{"text":"'+text+'","scene":0}');
            }else{
                $.toast("未检测到安装微信");
            }
        }else{
            $.log("微信注册失败");
        }
    },
    /**
     *  thumbImg:,//(必选)(大小必须小于32k)
    	wedpageUrl:,//(必选)链接的地址
    	scene:,//(必选)发送的目标场景 0-会话场景 1-朋友圈场景
    	title:,//(必选)链接的标题
    	description://(必选)描述
     */
    shareLink : function(option){
    	uexWeiXin.shareLinkContent($.jsonToStr(option));
    }
    ,
    shareFriend : function(text){
        this.sendText(text,true);
    }
};
