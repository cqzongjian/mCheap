/************************************************************逛超市模块*******************************************/
var buyThingsObj;
var BuyThingsObj = function() {
	
}
/**
 * 买东西始化数据
 * @return {[type]} [description]
 */
BuyThingsObj.prototype.init = function() {
	
}
/**
 * 动态生成买东西市场的信息
 */
BuyThingsObj.prototype.createMarkerInfos = function(onedata,index) {
		var html = '';
		var cltpit01id = onedata.cltpit01id;//采集点流水号
		var title = onedata.cltpit01001;//超市名称
		var isfocus = onedata.isfocus;//0表示没有关注,1表示关注
		var markerAddress = onedata.cltpit01004;//超市地址
		var markerDistance = onedata.distance;//距离  
		var minpriceNumber = (onedata.cheapercount == null?"空":onedata.cheapercount);//最低价格药品数
 		var lng = onedata.cltpit01007;//获取经度
 		var lat = onedata.cltpit01008;//获取纬度
 		var cltpit01005 = onedata.cltpit01005;//营业开始时间
 		var cltpit01006 = onedata.cltpit01006;//营业结束时间
 		var startEnd = "营业时间:"+cltpit01005+"~"+cltpit01006;
 		var storeStar = onedata.star;//打星数
 		var tiaoshu = onedata.tiaoshu;//评论条数
 		var range = onedata.cltpit01011;//区域代码
 		var picture =  onedata.cltpit02002;
 		var epsflw02001 = "";//关注类型
		html += '<div class="items" data-title="'+title+'" data-id="'+cltpit01id+'" data-lng="'+lng+'" data-lat="'+lat+'" data-type="buyThings">';
		html += '<div class="item">'; 
		html += '<div class="item-left">'+ (index+1) +'.</div>'; 
		html += '<div class="item-middle"  data-lng="'+lng+'" data-lat="'+lat+'" data-img="'+picture+'" data-isfocus="'+isfocus+'" data-range="'+range+'" data-tiaoshu="'+tiaoshu+'" data-distance="'+markerDistance+'" data-startend="'+startEnd+'" data-title="'+title+'" data-address="'+markerAddress+'" data-star="'+storeStar+'" data-id="'+cltpit01id+'" data-type="buyThings">'+ title +'(进入)</div>';
		if(isfocus == 0){
			html += '<img class="item-right dislike" src="../images/dislike.png"  data-type="buyThings" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}else{
			html += '<img class="item-right like" src="../images/like.png"  data-type="buyThings" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}
		html += '</div>'; 
		html += '<div class="item">'; 
		html += '<div class="item-left2" data-id="'+cltpit01id+'" data-type="buyThings" data-lat="'+lat+'" data-lng="'+lng+'"></div>';
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
 * 买东西打开市场
 * @param  {[type]} $element   [description] 当前点击的元素
 * @return {[type]} [description]
 */
BuyThingsObj.prototype.openMarker = function($element) {
			var cltpit01id = $element.data("id");
			var buyThingsStar = $element.data("star");
			var buyThingsName = $element.data("title");
			var buyThingsAddress = $element.data("address");
			var buyThingsYysj = $element.data("startend");
			var buyThingsDistance = $element.data("distance");
			var tiaoshu =	$element.data("tiaoshu");
			var isfocus =	$element.data("isfocus");
			var range =	$element.data("range");
			var picture = $element.data("img");
	$.openWin({
            name:"product_show",
            animId : 2,
            url:'wgtroot://supermarket/market_product_show/ui/product_show.html',
            pageParam: {
                lsh:cltpit01id,
                star:buyThingsStar,
                marketName:buyThingsName,
                address:buyThingsAddress,
                yytime:buyThingsYysj,
                distance:buyThingsDistance,
                tiaoshu:tiaoshu,
                focus:isfocus,
                range:range,
                picture:picture,
				log:$element.data("lng"),
				lat:$element.data("lat"),
            }
        });
	
}
/**
 * 买东西地图关注市场信息
 * @param  {[type]} $element      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
BuyThingsObj.prototype.isfocus = function($element) {
	var cltpit01id = $element.data("id");// 采集点流水号
    var title = $element.data("title");// 采集点名称
	var obj = { 
 						 "cltpit01id":cltpit01id,// 采集点流水号
 						 "cltpit01001":title,// 采集点名称
             }        
    buyThingsObj.likeMarker($element,obj);
}
/**
 * 买东西地图添加关注市场
 * @param  {[type]} $element      [description] 点击当前元素
 * @param  {[type]} obj      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
BuyThingsObj.prototype.likeMarker = function($element,obj) {
	$.request({
	    urlType: 'addFocusShop',
	    data: {
				"access_token": $.getStorage('access_token'),               
				"cltpit01id":obj.cltpit01id,
				"cltpit01001":obj.cltpit01001,
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
 * 买东西地图取消关注市场
 * @param  {[type]} $element      [description] 当前点击的类型
 * @param  {[type]} cltpit01id      [description] 当前marker的流水号
 * @return {[type]} [description]
 */
BuyThingsObj.prototype.dislikeMarker = function($element,cltpit01id) {
	$.request({
	    urlType: 'delFocusShop',
	    data: {
	        "access_token": $.getStorage('access_token'),
	        cltpit01id :cltpit01id// 采集点流水号
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

