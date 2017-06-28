/******************************************买药模块***************************************/
var buyDrugsObj;
var BuyDrugsObj = function() {
	
}
/**
 * 买药初始化数据
 * @return {[type]} [description]
 */
BuyDrugsObj.prototype.init = function() {
	
}
/**
 * 动态生成买药市场的信息
 */
BuyDrugsObj.prototype.createMarkerInfos = function(onedata,index) {
		var html = '';
		var cltpit01id = onedata.cltpit01id;//采集点流水号
		var title = onedata.cltpit01001;//药店名称
		var isfocus = onedata.isfocus;//0表示没有关注,1表示关注
		var markerAddress = onedata.cltpit01004;//药店地址
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
 		var picture= onedata.cltpit02002;//图片的url
 		var epsflw02001 = "";//关注类型
		html += '<div class="items"  data-title="'+title+'" data-lng="'+lng+'" data-lat="'+lat+'" data-id="'+cltpit01id+'" data-lng="'+lng+'" data-lat="'+lat+'" data-type="buyDrugs">';
		html += '<div class="item">'; 
		html += '<div class="item-left">'+ (index+1) +'.</div>'; 
		html += '<div class="item-middle" data-lng="'+lng+'" data-lat="'+lat+'" data-img="'+picture+'" data-range="'+range+'" data-isfocus="'+isfocus+'" data-tiaoshu="'+tiaoshu+'" data-startend="'+startEnd+'" data-title="'+title+'" data-address="'+markerAddress+'" data-star="'+storeStar+'" data-id="'+cltpit01id+'" data-type="buyDrugs">'+ title +'(进入)</div>';
		if(isfocus == 0){
			html += '<img class="item-right dislike" src="../images/dislike.png"  data-type="buyDrugs" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}else{
			html += '<img class="item-right like" src="../images/like.png"   data-type="buyDrugs" data-title="'+title+'" data-lat="'+lat+'" data-lng="'+lng+'" data-end="'+cltpit01006+'" data-start="'+cltpit01005+'" data-cltpit01id="'+cltpit01id+'" data-address="'+markerAddress+'">';
		}
		html += '</div>'; 
		html += '<div class="item">'; 
		html += '<div class="item-left2" data-type="buyDrugs" data-id="'+cltpit01id+'" data-lat="'+lat+'" data-lng="'+lng+'"></div>';
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
 * 买药打开市场
 * @param  {[type]} $element   [description] 当前点击的元素
 * @return {[type]} [description]
 */
BuyDrugsObj.prototype.openMarker = function($element) {
	var cltpit01id = $element.data("id");
	var storeStar = $element.data("star");
	var storeName = $element.data("title");
	var storeAddress = $element.data("address");
	var storeYysj = $element.data("startend");
	var tiaoshu =	$element.data("tiaoshu");
	var isfocus =	$element.data("isfocus");
	var range =	$element.data("range");
	var picture = $element.data("img");
	$.openWin({
            name:"shop_sort",
            animId : 2,
            url:'wgtroot://medicine/medicine_shop/ui/shop_sort.html',
            pageParam: {
                lsh:cltpit01id,
                storeStar:storeStar,
                storeName:storeName,
                storeAddress:storeAddress,
                storeYysj:storeYysj,
                tiaoshu:tiaoshu,
                focus:isfocus,
                range:range,
                picture:picture,
				log:$element.data("lng"),
				lat:$element.data("lat")
            }
        });
}
/**
 * 药店地图关注市场信息
 * @param  {[type]} $element      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
BuyDrugsObj.prototype.isfocus = function($element) {
	var cltpit01id = $element.data("cltpit01id");// 采集点流水号
    var title = $element.data("title");// 采集点名称
	var obj = { 
 						 "cltpit01id":cltpit01id,// 采集点流水号
 						 "cltpit01001":title,// 采集点名称
             }
    buyDrugsObj.likeMarker($element,obj);
}
/**
 * 药店地图添加关注市场
 * @param  {[type]} $element      [description] 点击当前元素
 * @param  {[type]} obj      [description] 传入marker市场的数据
 * @return {[type]} [description]
 */
BuyDrugsObj.prototype.likeMarker = function($element,obj) {
	 /* 添加关注市场 */
	$.request({
	    urlType: 'addFocusDrugstore',
	    data: {
				"access_token": $.getStorage('access_token'),               
				"drugstore" :JSON.stringify(obj),
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
 * 药店地图取消关注市场
 * @param  {[type]} $element      [description] 当前点击的类型
 * @param  {[type]} cltpit01id      [description] 当前marker的流水号
 * @return {[type]} [description]
 */
BuyDrugsObj.prototype.dislikeMarker = function($element,cltpit01id) {
	$.request({
	    urlType: 'delFocusDrugstore',
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

