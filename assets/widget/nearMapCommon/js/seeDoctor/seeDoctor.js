/*******************************************看病模块**************************************************/
var seeDoctorObj;
var SeeDoctorObj = function() {
	
}
/**
 * 看病始化数据
 * @return {[type]} [description]
 */
SeeDoctorObj.prototype.init = function() {
	
}
/**
 * 动态生成看病市场的信息
 */
SeeDoctorObj.prototype.createMarkerInfos = function(onedata,index) {
		var html = '';
		var cltpit01id = onedata.cltpit01id;//采集点流水号
		var title = onedata.cltpit01001;//看病名称
		var isfocus = onedata.isfocus;//0表示没有关注,1表示关注
		var markerAddress = (onedata.cltpit01004 == null?"空":onedata.cltpit01004);//看病地址
		var markerDistance = onedata.distance;//距离  
		var minpriceNumber = (onedata.cheapercount == null?"空":onedata.cheapercount);//最低价格药品数
 		var lng = onedata.cltpit01007;//获取经度
 		var lat = onedata.cltpit01008;//获取纬度
 		var cltpit01005 = onedata.cltpit01005;//营业开始时间
 		var cltpit01006 = onedata.cltpit01006;//营业结束时间
 		var startEnd = cltpit01005+"~"+cltpit01006;
 		var storeStar = onedata.star;//打星数
 		var clthtp01013 = onedata.level;//医院等级编码
 		var levelName = yyLevel[clthtp01013];//医院等级编码对应的名称
 		var tiaoshu = onedata.tiaoshu;//评论条数
 		var epsflw02001 = "";//关注类型
		html += '<div class="items" data-title="'+title+'" data-id="'+cltpit01id+'" data-lng="'+lng+'" data-lat="'+lat+'" data-type="seeDoctor">';
		html += '<div class="item">'; 
		html += '<div class="item-left">'+ (index+1) +'.</div>'; 
		html += '<div class="item-middle"  data-lng="'+lng+'" data-lat="'+lat+'" data-startend="'+startEnd+'" data-tiaoshu="'+tiaoshu+'" data-yydj="'+clthtp01013+'" data-distance="'+markerDistance+'" data-title="'+title+'" data-address="'+markerAddress+'" data-id="'+cltpit01id+'" data-type="seeDoctor">'+ title +'(进入)</div>';
		if(isfocus == 0){
			html += '<img class="item-right dislike" src="../images/dislike.png"  data-type="seeDoctor" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}else{
			html += '<img class="item-right like" src="../images/like.png"  data-type="seeDoctor" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}
		html += '</div>'; 
		html += '<div class="item">'; 
		html += '<div class="item-left2" data-id="'+cltpit01id+'" data-type="buyDrugs" data-lat="'+lat+'" data-lng="'+lng+'"></div>';
		html += '<div class="item-middle2">'+ markerAddress +'</div>';
		html += '<div class="item-right2">'+ markerDistance +'km</div>'; 
		html += '</div>'; 
		html += '<div class="item">';  
		html += '<div class="item-left3">医院等级</div>'; 
		html += '<div class="item-right3">'+ levelName +'</div>'; 
		html += '</div>';
		html += '</div>';
		return html;
}
/**
 * 看病打开市场
 * @param  {[type]} $element   [description] 当前点击的元素
 * @return {[type]} [description]
 */
SeeDoctorObj.prototype.openMarker = function($element) {
	var cltpit01id = $element.data('id');
	var title = $element.data('title');
	var address = $element.data('address');
	var distance = $element.data('distance');
	var yydj = $element.data('yydj');
	var time = $element.data('startend');
	var tiaoshu = $element.data('tiaoshu');
	$.openWin({
		name:'hos_main',
		animId : 2,
		url:'wgtroot://hospital/hos_main/ui/hos_main.html',
		pageParam:{
			cltpit01id:cltpit01id,
			title:title,
			address:address,
			distance:distance,
			clthtp01013:yydj,
			time:time,
			comment:tiaoshu,
			log:$element.data("lng"),
			lat:$element.data("lat"),
		}
	});

}
/**
 * 看病地图关注市场信息
 * @param  {[type]} $element      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
SeeDoctorObj.prototype.isfocus = function($element) {
	var cltpit01id = $element.data("cltpit01id");// 采集点流水号
    var title = $element.data("title");// 采集点名称
	var obj = { 
 						 "cltpit01id":cltpit01id,// 采集点流水号
 						 "cltpit01001":title,// 采集点名称
             }
	seeDoctorObj.likeMarker($element,obj);
}
/**
 * 看病地图添加关注市场
 * @param  {[type]} $element      [description] 点击当前元素
 * @param  {[type]} obj      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
SeeDoctorObj.prototype.likeMarker = function($element,obj) {
	 /* 添加关注市场 */
	$.request({
	    urlType: 'hos_addFocusHosiptal',
	    data: {
				"access_token": $.getStorage('access_token'),               
				"clthtp01id" :obj.cltpit01id,
				"clthtp01001" :obj.cltpit01001
	    }
	}, function (json) {
	    if(json.success) {  
	   	 $.toast("关注成功");     
	     $element.removeClass("dislike");
		 $element.addClass("like");
		 $element.attr("src","../images/like.png");
	    }
	    else {
	        //$.toast('网络错误')
	    }

	});
}
/**
 *	看病地图取消关注市场
 * @param  {[type]} $element      [description] 当前点击的类型
 * @return {[type]} [description]
 */
SeeDoctorObj.prototype.dislikeMarker = function($element) {
	var id = $element.data("cltpit01id");
	$.request({
	    urlType: 'hos_delFocusHosiptal',
	    data: {
	        "access_token": $.getStorage('access_token'),
	        "clthtp01id" :id// 采集点流水号
	    }
	}, function (json) {
	    if(json.success) {
	     
	    	$.toast("取消成功")
	        $element.addClass("dislike");
			$element.removeClass("like");
			$element.attr("src","../images/dislike.png");
	    }
	    else {
	        //$.toast('网络错误')
	    }

	});
}

