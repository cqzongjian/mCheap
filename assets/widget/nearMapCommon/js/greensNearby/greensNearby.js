/*******************************************买菜附近的点位展示*****************************/
var greensObj;
var GreensObj = function() {
	
}
/**
 * 蔬菜地图初始化数据
 * @return {[type]} [description]
 */
GreensObj.prototype.init = function() {
	
}
/**
 * 动态生成买菜市场的信息
 */
GreensObj.prototype.createMarkerInfos = function(onedata,index) {	
		var title = onedata.cltpit01001;//菜市场标题
 		var point = new BMap.Point(onedata.cltpit01007,onedata.cltpit01008);//经纬度实例化
 		var lng = onedata.cltpit01007;//获取经度
 		var lat = onedata.cltpit01008;//获取纬度
 		var minpriceNumber = (onedata.cheapercount == null?"空":onedata.cheapercount);//最少品种数
 		var markerAddress = onedata.cltpit01004;//菜市场地址
 		var markerDistance = onedata.distance;//距离    
 		var cltpit01005 = onedata.cltpit01005;//营业开始时间
 		var cltpit01006 = onedata.cltpit01006;//营业结束时间
 		var cltpit01id = onedata.cltpit01id;//采集点流水号
 		var isfocus = onedata.isfocus;//0表示没有关注,1表示关注
 		var epsflw02001 = "";//关注类型
 		var html = '';
		html += '<div class="items" data-title="'+title+'" data-id="'+cltpit01id+'" data-lng="'+lng+'" data-lat="'+lat+'" data-type="greensNearby">';
		html += '<div class="item">'; 
		html += '<div class="item-left">'+ (index+1) +'.</div>'; 
		html += '<div class="item-middle" data-lng="'+lng+'" data-lat="'+lat+'" data-id="'+cltpit01id+'" data-type="greensNearby">'+ title +'(进入)</div>';
		if(isfocus == 0){
			html += '<img class="item-right dislike" src="../images/dislike.png" data-type="greensNearby" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}else{
			html += '<img class="item-right like" src="../images/like.png" data-type="greensNearby" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}
		html += '</div>'; 
		html += '<div class="item">'; 
		html += '<div class="item-left2" data-type="greensNearby" data-id="'+cltpit01id+'" data-lat="'+lat+'" data-lng="'+lng+'"></div>';
		html += '<div class="item-middle2">'+ markerAddress +'</div>';
		html += '<div class="item-right2">'+ markerDistance +'km</div>'; 
		html += '</div>'; 
//		html += '<div class="item">';  
//		html += '<div class="item-left3">最低价格品种数</div>'; 
//		html += '<div class="item-right3">'+ minpriceNumber +'</div>'; 
//		html += '</div>';
		html += '</div>';
		return html;	
}
/**
 * 蔬菜地图打开菜市场
 * @param  {[type]} markerId   [description] marker对应的id
 * @return {[type]} [description]
 */
GreensObj.prototype.openMarker = function($element) {
				$.openWin({
			        name:"nearbyquery",
			        animId : 2,
			        url:'wgtroot://mCheap/market/ui/market.html',
			        pageParam: {
			        	cltpit01id : $element.data("id"),
			        	log:$element.data("lng"),
			        	lat:$element.data("lat"),
			        }
			    });
}
/**
 * 蔬菜地图关注市场信息
 * @param  {[type]} $element      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
GreensObj.prototype.isfocus = function($element) {
	var cltpit01id = $element.data("cltpit01id");// 采集点流水号
    var title = $element.data("title");// 采集点名称
    var address = $element.data("address");// 采集点地址
    var startTime = $element.data("start");// 营业开始时间
    var endTime = $element.data("end");// 营业结束时间
    var lng = parseFloat($element.data("lng"));// 采集点经度
    var lat = parseFloat($element.data("lat"));// 采集点纬度
	var obj = { 
 					     epsrtu01id:"",// 注册用户流水号
 						 cltpit01id:cltpit01id,// 采集点流水号
 						 cltpit01001:title,// 采集点名称
 						 epsflw03id:null,// 购买点流水号
 						 epsflw02001:"",// 关注类型
 					     create_time:"",// 创建时间
 					     cltpit01004:""+address,// 采集点地址
 					     cltpit01005:startTime,// 营业开始时间
 					     cltpit01006:endTime,// 营业结束时间
 					     cltpit01007:lng,// 采集点经度
 					     cltpit01008:lat// 采集点纬度
             }
    greensObj.likeMarker($element,obj);
}
/**
 * 蔬菜地图添加关注市场
 * @param  {[type]} $element      [description] 当前点击的类型
 * @param  {[type]} obj      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
GreensObj.prototype.likeMarker = function($element,obj) {
	 /* 添加关注市场 */
	$.request({
	    urlType: 'addFocusStation',
	    data: {
				"access_token": $.getStorage('access_token'),               
				focusCollectStation:JSON.stringify(obj)
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
 * 蔬菜地图取消关注市场
 * @param  {[type]} $element      [description] 当前点击的类型
 * @param  {[type]} cltpit01id      [description] 当前marker的流水号
 * @return {[type]} [description]
 */
GreensObj.prototype.dislikeMarker = function($element,cltpit01id) {
	$.request({
	    urlType: 'deleteFocusStation',
	    data: {
	        "access_token": $.getStorage('access_token'),
	        cltpit01id:cltpit01id// 采集点流水号
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

