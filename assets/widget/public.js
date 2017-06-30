/**
 * Created by dell on 2016/7/29.
 * baidu_map Navigation
 */

/*
 *当消息记录页面删除一条消息时调用
 * */
function setMsgNum(num){
	if(num<=0|| isNaN(num)){
		$('.message-num').html('0');
	}else if(0<num&&num<99){
		$('.message-num').html(num);
	}else{
		$('.message-num').html('99+');
	}
}

/*
 *刷新消息条数
 * */
function refreshMsgNum(num){
	$.execScript({
		winName:'caishi',
		frameName:'wode',
		script:'setMsgNum('+num+');'
	});
	$.execScript({
		winName:'caishi',
		frameName:'index_content',
		script:'setMsgNum('+num+');'
	});
	/*$.execScript({
		winName:'root',
		frameName:'index',
		script:'setMsgNum('+num+');'
	});*/
	/*新首页上的未读消息数*/
    $.execScript({
        winName:'index',
        frameName:'index_content',
        script:'setMsgNum('+num+');'
    });
}

/*
 *获取消息条数（现在是设置的未读消息条数）
 * */
function getNotReadNum(refreshMsgNum){
	$.request({
		urlType:'getNotReadNum',
		data:{
			"access_token": $.getStorage('access_token'),
			log:$.getStorage('log')||'',
			lat:$.getStorage('lat')||''
		}
	},function(json){
		if(json.success) {
		    var num=json.data;
			if(typeof refreshMsgNum == 'function'){
				refreshMsgNum(num);
			}
		}
	});
}

//触发短信方法
function sendMsg(cltpit01001,ProName,price,module){
	$.request({
		urlType:'sendMsg',
		data:{
			"access_token": $.getStorage('access_token'),
			cltpit01001:cltpit01001,//市场名称
			ProName:ProName,//产品名称
			price:price,//报价
			module: module//所属模块
		}
	},function(json){

	});
}


/* 图片上传的前处理
 * @param obj
 * @param callback
 */
function handleUploadFile(bz){
	$('.upload-mc').show();//打开上传图片的蒙层
	pNum=1;//将上传的图片数量重置
	//上传图片中 打开一个蒙层
	var picture = $(".picture-box>img");
	//var uploadUrl =$.serverSettings.serverPath+""+$.serverSettings.urlPath.onloadImg+"?access_token="+$.getStorage('access_token')+"&epsprice01id="+bz+"";//上传地址


	var uploadUrl =$.serverSettings.serverPath+$.serverSettings.urlPath.onloadImg;//上传地址

	var pic_01 = picture.eq(0).attr("src")||null;
	var pic_02 = picture.eq(1).attr("src")||null;
	var pic_03 = picture.eq(2).attr("src")||null;
	var pic_04 = picture.eq(3).attr("src")||null;
	//文件名处理
	var pic_01_name = getPicName(pic_01);
	var pic_02_name = getPicName(pic_02);
	var pic_03_name = getPicName(pic_03);
	var pic_04_name = getPicName(pic_04);
	var param = {};
	if(pic_01){
		param[pic_01_name]=pic_01;
	}
	if(pic_02){
		param[pic_02_name]=pic_02;
	}
	if(pic_03){
		param[pic_03_name]=pic_03;
	}
	if(pic_04){
		param[pic_04_name]=pic_04;
	}

	var obj = {
		uploadId:"01",
		uploadUrl:uploadUrl,
		data:{
			dataParam:{
				access_token:$.getStorage('access_token'),
				epsprice01id:bz
			},
			fileParam:param
		}
	};
	filesUpload(obj,baojiaUploadSuccess);
}
//文件名进行处理
function getPicName(str){
	var picName;
	if(str != null && str != ""){
		var arr = str.split("/");
		var arr_last_str_all = arr[arr.length-1];
		//picName = arr_last_str_all.substring(0,arr_last_str_all.indexOf("."));
		picName = arr_last_str_all.substring(0);
	}else{
		picName = null;
	}
	return  picName;
}

/* 多个文件上传
 * @param obj
 * @param callback
 */
function filesUpload(obj,callback){
	//创建上传对象


	uexUploaderMgr.createUploader(obj.uploadId,obj.uploadUrl);
	uexUploaderMgr.cbCreateUploader = function(opCode,dataType,data){
		if(data == 0){
			uexUploaderMgr.uploadMuiltFiles(obj.uploadId,JSON.stringify(obj.data));
			uexUploaderMgr.onStatus = function(opCode,fileSize,percent,serverPath,status){
				//alert(status);
				switch(status){
					case 0://上传中
						$(".progress_bar").css("width",percent+"%");
						break;
					case 1://上传完成
						if(typeof callback == 'function'){
							callback(serverPath);
						}
						uexUploaderMgr.closeUploader(obj.uploadId);
						break;
					case 2://上传失败
						$('.upload-mc').hide();
						uexUploaderMgr.closeUploader(obj.uploadId);
						$.toast("文件上传失败,请稍后再试！");
						break;
				}
			}
		}else{
			alert("创建失败");
		}

	}
}


////报价完成后的成功回调
//function baojiaUploadSuccess(){
//	$('.upload-mc').hide();
//	$('.picture-box').html('');
//    $.toast('图片上传完成');
//}

//图片点击后放大事件
$(document).on("tap", ".pictures-box>img", function(){
	var src=$(this).attr("src");
	uexImageBrowser.previewImamges(src, 0);
});


/* 单个文件上传
 * @param obj
 * @param callback
 */
function fileUpload(obj,callback){
	uexUploaderMgr.createUploader(obj.uploadId,obj.uploadUrl);
	uexUploaderMgr.cbCreateUploader = function(opCode,dataType,data){
		if(data == 0){
			uexUploaderMgr.uploadFile(obj.uploadId,obj.data,"inputName",2);
			uexUploaderMgr.onStatus = function(opCode,fileSize,percent,serverPath,status){
				switch(status){
					case 0://上传中
						$(".progress_bar").css("width",percent+"%");
						break;
					case 1://上传完成
						console.log(serverPath);
						if(typeof callback == 'function'){
							callback(serverPath);
						}
						uexUploaderMgr.closeUploader(obj.uploadId);
						break;
					case 2://上传失败
						uexUploaderMgr.closeUploader(obj.uploadId);
						$.toast("文件上传失败,请稍后再试！");
						break;
				}
			}
		}else{
			alert("创建失败");
		}
	}
}


/*拍照完后关闭蒙层*/
function closeMask(){
	$('body').on('tap', '.mdui-popover-action li>a', function() {
		var a = this,
			parent;
		//根据点击按钮，反推当前是哪个actionsheet
		for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
			if (parent.classList.contains('mdui-popover-action')) {
				break;
			}
		}
		//关闭actionsheet
		$('#' + parent.id).popover('toggle');
	});
}
/*
 拍照上传图片
 */

/**
 * 显示载入提示文字 id是外部id url是页面相对于图片的路径
 * @param id
 * @param url
 */
function showLoading(id,url){
	var $target = id?$("#"+id):$("body");
	var offset = $target.offset();
	url = url || "../../../static/mCheap/images/loading.gif";
	var $loading = $('<div id="common_loading_'+id+'" style="position: absolute"></div>');
	$loading.append($('<img src="'+url+'" style="width:1rem"/>'));
	$loading.append($('<span class="font-color-gray font-text-mid">加载中...</span>'));
	$target.append($loading);
	$loading.css("top",offset.height/2+$loading.height()/2);
	$loading.css("left",offset.width/2-$loading.width()/2);
}

function hideLoading(id){
	$("#common_loading_"+id).remove();
}