/*****************************************地图公用************************************/

var bdMapObj;
var BdMapObj = function() {
	this.map;//地图对象
	this.moduleId;//某个模块
	this.selectModules;//选择模块(可以多选)
	this.navConfig;//导航参数
	this.markerLayers;//marker的图层
	this.infoBoxs;//点击marker的时候的弹出框
	this.resetConfig;//重置(按钮)的参数
	this.kindConfig;//类型的配置
	this.startNav;//开始导航所需要传的参数
	this.mapBounds;//获取地图的可视区域防止marker加载过多卡的问题
	this.markerDatas;//从后台获取数据
}
/**
 * 地图初始化数据
 * @return {[type]} [description]
 */
BdMapObj.prototype.init = function() {
	//this.moduleId = moduleId;//某个模块
	//this.selectModules = [moduleId];//选择多个模块
	this.navConfig = {
		"walk":null,//步行
		"drive":null,//驾车
	}
	this.markerLayers = {//marker的图层
		"greensNearby":[],//菜市场的marker
		"seeDoctor":[],//看病的marker
		"buyThings":[],//逛超市的marker
		"buyDrugs":[],//买药的marker
	};
	this.infoBoxs = {//点击marker的时候的弹出框
		"greensNearby":[],//菜市场的marker
		"seeDoctor":[],//看病的marker
		"buyThings":[],//逛超市的marker
		"buyDrugs":[],//买药的marker
	};
	this.resetConfig = {//重置(按钮)的参数
		"distance":null,
		"type":null
	}
	this.kindConfig = {//类型的配置
		"02":{//医院
			"noOverUrl":"../images/marker/b",//这个前10个的图标
			"overUrl":"../images/marker/bb.png",//超过10个后的图标地址
			"oneType":"seeDoctor",//这个是类型标识
			},
		"01":{//买菜 //先改成01最后要改成03(就只修改这个地方)(要改两处地方)
			"noOverUrl":"../images/marker/g",
			"overUrl":"../images/marker/gg.png",
			"oneType":"greensNearby"
			},
		"04":{//药店
			"noOverUrl":"../images/marker/y",
			"overUrl":"../images/marker/yy.png",
			"oneType":"buyDrugs"
			},
		"05":{//超市
			"noOverUrl":"../images/marker/o",
			"overUrl":"../images/marker/oo.png",
			"oneType":"buyThings"
			},
	}
	this.startNav = {//开始导航所需要传的参数
		"lng":null,
		"lat":null,
		"title":""
	}
	this.mapBounds = null;//获取地图的可视区域防止marker加载过多卡的问题
	this.markerDatas = null;//从后台获取数据
	bdMapObj.initMap();//初始化地图
	bdMapObj.regesterMap();//地图的监听事件
}
/**
 * 初始化地图
 * @return {[type]} [description]
 */
BdMapObj.prototype.initMap = function() {
	this.map = new BMap.Map("map");          
	this.map.centerAndZoom(new BMap.Point(104.067192,30.665534), 12);
	this.map.enableScrollWheelZoom(true);
	this.map.enableDragging();
}
/**
 * 地图的监听事件
 * @return {[type]} [description]
 */
BdMapObj.prototype.regesterMap = function() {
	this.map.addEventListener("click", function(e){  //map的点击事件                 
        if(!e.overlay) {
        	//这两个的个数
        	for(var i = 0; i < bdMapObj.selectModules.length;i++) {
        		var onedata = bdMapObj.selectModules[i];
        		var markers = bdMapObj.markerLayers[onedata];
	            var infoBoxs = bdMapObj.infoBoxs[onedata];
	            bdMapObj.hideInfo(markers,infoBoxs); 
        	}
                 
        }                  
    }); 
    /*this.map.addEventListener("dragend", function(e){  //map的拖拽事件
	    if(bdMapObj.markerDatas != null) {
	    	bdMapObj.map.clearOverlays();//清除所有的覆盖物
            bdMapObj.map.addOverlay(userMarker);
            var point = userMarker.getPosition();
	    	bdMapObj.queryDatas(point.lng,point.lat,distancenear);
	    }                                   
    }); */
}
/**
 * 从后台查询获取坐标点位
 * @param  {[type]} lon      [description] 经度
 * @param  {[type]} lat      [description] 纬度
 * @param  {[type]} distance [description] 距离
 * @return {[type]}          [description]
 */
BdMapObj.prototype.queryDatas = function(lon,lat,distance) {
	bdMapObj.map.clearOverlays();//清除地图上的所有东西
	bdMapObj.map.addOverlay(userMarker);//添加标注
	bdMapObj.mapBounds = bdMapObj.map.getBounds();//获取地图的可视区域范围
	var markerTypes = bdMapObj.selectModules;
	var userSelect = "";
	for(var i = 0;i < markerTypes.length; i++) {
		var onedata = markerTypes[i];
		userSelect += queryMarkers[onedata]["flag"];
		if(i != markerTypes.length-1)userSelect += ",";
	}
	 $.request({
               urlType: 'nearQuery',
               data: {
                   "access_token": $.getStorage('access_token'),//代表用户的标识必须传
                 	log:lon,
					lat:lat,
                   distance:distance,
                   markType:userSelect
               }
           }, function (json) {
               if(json.success) {
               	var array = json.data;
               	bdMapObj.markerDatas = array;//把查询出来的数据放入到缓存中
                // alert(JSON.stringify(json)) 
          	    userMarker.show();//显示用户的marker
                       bdMapObj.addMarker(array);
                       bdMapObj.createMarkerHtml(array);//创建对应的marker信息 
               }
               else {
                   //$.toast('网络错误')
               }

           });
}
/**
 * 向地图中加入(多个)点位
 * @param {[type]} data     [description] 后台传入的数据
 */
BdMapObj.prototype.addMarker = function(data) {
	var markerTypes = bdMapObj.selectModules;//获取选中的元素
	for(var i = 0;i < markerTypes.length;i++) {
		var onedata = markerTypes[i];
		this.markerLayers[onedata] = [];
		this.infoBoxs[onedata] = [];
	}
	var count = {
		"greensNearby":0,//菜市场的marker
		"seeDoctor":0,//看病的marker
		"buyThings":0,//逛超市的marker
		"buyDrugs":0,//买药的marker	
	}
	for(var i = 0;i < data.length;i++) {
		var onedata = data[i];
		var flagType = onedata.cltpit01003;//这个是功能的标识
		var icon;
		var typeOne = bdMapObj.kindConfig[flagType]; 
		icon = createIcon(typeOne,icon);//动态生成图标
		var point = new BMap.Point(onedata.cltpit01007,onedata.cltpit01008);//实例化经纬度
		var marker = new BMap.Marker(point,{icon:icon});  // 创建标注
		marker.attributes = onedata;
		this.regesterMarker(marker,onedata,count[typeOne.oneType]);//监听marker
		if(bdMapObj.mapBounds.containsPoint(point) == true) {
			this.map.addOverlay(marker);//把点位添加到地图上
		}
      	this.markerLayers[typeOne.oneType].push(marker);
      }
  	function createIcon(typeOne,icon) {//动态生成图标的方法
			count[typeOne.oneType]++;
			if(count[typeOne.oneType] <= 10) {
				var imgUrl = typeOne.noOverUrl+count[typeOne.oneType]+".png";
					icon = new BMap.Icon(imgUrl, new BMap.Size(18, 26),{
						anchor: new BMap.Size(10, 30),
					});
			}else{
				var imgUrl = typeOne.overUrl;
				    icon = new BMap.Icon(imgUrl, new BMap.Size(16, 16),{
				    	anchor: new BMap.Size(10, 5),
				    });
			}
			return icon ;	
  	}
}
/**
 * 创建marker市场信息
 * @param  {[type]} data [description] 从后台返回的数据
 * @return {[type]}            [description]
 */
BdMapObj.prototype.createMarkerHtml = function(data) {
	var html = '';//总体的html
	for(var i = 0;i < data.length;i++) {
		var onedata = data[i];
		var flagType = onedata.cltpit01003;//这个是功能的标识
		if(flagType == "02") {//表示医院
			html += seeDoctorObj.createMarkerInfos(onedata,i);
		}else if(flagType == "01") {//表示菜市场  //先改成01最后要改成03
			html += greensObj.createMarkerInfos(onedata,i);
		}else if(flagType == "04") {//表示药店
			html += buyDrugsObj.createMarkerInfos(onedata,i);
		}else if(flagType == "05") {//表示超市
			html += buyThingsObj.createMarkerInfos(onedata,i);
		}
      }
      $("#markersPanel .title").html("一共为你找到"+ data.length +"个服务点");
      $("#markersInfo").empty().append(html);
	//绑定面板信息里面的节点
	$("#markersInfo .items").bind({//点击一行列表
		click:function() {
			var $this = $(this);
			var type = $this.data("type");
			var gisId = $this.data("id");
			var title = $this.data("title");
			$this.siblings().css("background-color","white");
           	$this.css("background-color","#f2f2f2");
			var lng = parseFloat($this.data("lng"));
			var lat = parseFloat($this.data("lat"));
			bdMapObj.startNav["lng"] = lng;
			bdMapObj.startNav["lat"] = lat;
			bdMapObj.startNav["title"] = title;
			bdMapObj.positionMarker(gisId,lng,lat,type);
		}
	})
	$("#markersInfo .item-middle").bind({//点击标题
			click:function() {
				var cltpit01id = $(this).data("id");
				var type = $(this).data("type");//获取的类型
				if(type == "greensNearby") {//买菜
					greensObj.openMarker($(this));//打开买菜市场
				}else if(type == "seeDoctor") {//看病
					seeDoctorObj.openMarker($(this));//打开看病市场
				}else if(type == "buyThings") {//逛超市
					buyThingsObj.openMarker($(this));//打开逛超市市场
				}else if(type == "buyDrugs") {//买药
					buyDrugsObj.openMarker($(this));//打开买药市场
				}
						
			}
	})
	$("#markersInfo .item-right").bind({//点击关注
		click:function() {
			var $this = $(this);//绑定当前节点
			var markerId = $this.data("cltpit01id");
			var type = $(this).data("type");//获取当前点击的类型
			if($this.hasClass("dislike")) {
				if(type == "greensNearby") {//买菜
					greensObj.isfocus($this);
				}else if(type == "seeDoctor") {//看病
					seeDoctorObj.isfocus($(this));
				}else if(type == "buyThings") {//逛超市
					buyThingsObj.isfocus($(this));
				}else if(type == "buyDrugs") {//买药
					buyDrugsObj.isfocus($this);
				}
			}else{
				if(type == "greensNearby") {//买菜
					greensObj.dislikeMarker($this,markerId);
				}else if(type == "seeDoctor") {//看病
					seeDoctorObj.dislikeMarker($(this));
				}else if(type == "buyThings") {//逛超市
					buyThingsObj.dislikeMarker($this,markerId);
				}else if(type == "buyDrugs") {//买药
					buyDrugsObj.dislikeMarker($this,markerId);
				}	
			}
		}
	})
	$("#markersInfo .item-left2").bind({//点击marker里面的定位(进行导航)
		click:function(e) {
			e.stopPropagation();//阻止冒泡(不在定位并打开窗口)
			var $this = $(this);
			var type = $this.data("type");
			var id = $this.data("id");
			var lng = parseFloat($this.data("lng"));// 采集点经度
            var lat = parseFloat($this.data("lat"));// 采集点纬度
            bdMapObj.startNav["lng"] = lng;
			bdMapObj.startNav["lat"] = lat;
			bdMapObj.startNav["title"] = $this.parent().parent().find("div[class='item-middle']").html();
            if(inputLon != null) {
            	var startPoint = new BMap.Point(inputLon,inputLat);
            }else{
            	var startPoint = new BMap.Point(userLon,userLat);
            }
            var endPoint = new BMap.Point(lng,lat);
            bdMapObj.map.clearOverlays();//解决界面很卡问题
            bdMapObj.map.addOverlay(userMarker);
            bdMapObj.pointNav(startPoint,endPoint,"walk");
		}
	})
}
/**
 * 蔬菜地图定位你所选择的marker
 * @param  {[type]} id      [description] 选中那一行市场所对应的流水号
 * @param  {[type]} lng      [description] 选中那一行市场所对应的经度
 * @param  {[type]} lat      [description] 选中那一行市场所对应的纬度
 * @param  {[type]} type      [description] 选中那一行市场所对应的类型
 */
BdMapObj.prototype.positionMarker = function(id,lng,lat,type) {
	var markers = bdMapObj.markerLayers[type];
	this.map.clearOverlays();//解决界面有很多marker的时候很卡
	for(var i = 0; i < markers.length; i++) {
		var onedata = markers[i]; 
		var gisId = onedata.attributes.cltpit01id;
		if(gisId == id) {
			this.map.addOverlay(onedata);
			//让经纬度有点偏移并且打开标题面板的时候在手机上可以看到这个点位
			bdMapObj.map.centerAndZoom(new BMap.Point(lng,lat-0.0008),17);
            onedata.enableDragging();
			bdMapObj.showInfo(onedata,onedata.attributes,i);
			break;
		}
	}
}
/**
 * 删除某类型的markers
 * @param  {[type]} markerType [description] 某类型的marker
 * @return {[type]}            [description]
 */
BdMapObj.prototype.removeMarkers = function(markerType) {
	var markers = this.markerLayers[markerType];
	if (markers == null)return;
	for(var i = 0; i < markers.length; i++) {
		this.map.removeOverlay(markers[i]);
	}
}
/**
 * 监听对应的marker
 * @param {[type]} marker     [description] 点击的marker
 * @param {[type]} onedata     [description] 当前这个marker里面的信息
 * @param {[type]} index     [description] 第几个marker
 */
BdMapObj.prototype.regesterMarker = function(marker,onedata,index) {
    marker.addEventListener("click", function(e){  //给marker注册一个监听事件
        bdMapObj.showInfo(marker,onedata,index);//显示marker的信息
    });
}
/**
 * 显示marker的信息
 * @param {[type]} marker     [description] 点击的marker
 * @param {[type]} onedata     [description] 当前这个marker里面的信息
 * @param {[type]} index     [description] 第几个marker 
 */
BdMapObj.prototype.showInfo = function(marker,onedata,index) {
	/*关闭infobox窗口*/
    var priceInfoContainer = $('#greensInfoBox');
    if(priceInfoContainer){
        priceInfoContainer.remove();
    }
		var showArry=[];//infoBox这个插件必须要放入
		var oneType = bdMapObj.kindConfig[onedata.cltpit01003]["oneType"];
		var showInfos = showMarkerInfos[oneType];//从某个模块中获取相应的字段
		/*在生成的点上绑定经纬度*/
    	bdMapObj.startNav["title"] = onedata.cltpit01001;//菜市场标题
		bdMapObj.startNav["lng"] = onedata.cltpit01007;//获取经度
		bdMapObj.startNav["lat"] = onedata.cltpit01008;//获取纬度
		var html = "";
			if(index <= 10){//判断如果不是麻点的图标的弹出框的位置
				html +="<div id='greensInfoBox'>";
			}else{
				html +="<div id='greensInfoBox' style='bottom:20px;'>";
			}
   			html +="<div class='infoBox-title'>"+onedata.cltpit01001+"</div>";
   				for(var key in showInfos) {
   					html += "<div class='items'>";
   					html += "<div class='item-left'>"+showInfos[key]+"</div>";
   					if(onedata.cltpit01003 == "02" && key == "level"){
   						html += "<div class='item-right'>"+yyLevel[onedata.level]+"</div>";
   					}else{
   						html += "<div class='item-right'>"+(onedata[key] == null?'空':onedata[key])+"</div>";
   					}
   					html += "</div>";
   				}
                                html+="<div class='jiantou'></div></div>"; 
                                showArry.push(html) ;//必须是数组形式的
 		//创建气泡
 	   var infoBox = new BMapLib.InfoBox(bdMapObj.map,showArry.join(""),{   
 	  		closeIconMargin: "",
 	       	enableAutoPan: true,
 	       	align: INFOBOX_AT_TOP, 
        });
 	   bdMapObj.infoBoxs[oneType].push(infoBox);
 	   infoBox.open(marker);
 	   $(".infoBox>img").css("display","none");//关闭自身自带的关闭按钮的图片

		/*关闭infobox窗口*/
		$('#greensInfoBox').on('click', function () {
            infoBox.close(marker);
		});
}
/**
 * 点击地图关闭所有marker的infobox
 * @param {[type]} markers     [description] 地图上显示的所有markers
 * @param {[type]} infoBoxs     [description] markers所对应的infoboxs
 */
BdMapObj.prototype.hideInfo = function(markers,infoBoxs) {
	for(var i = 0;i < infoBoxs.length;i++) {
		infoBoxs[i].close(markers[i]);
	}
}

/**
 * 在input里面输入字时弹出下拉框
 */
BdMapObj.prototype.showTips = function() {
	var ac = new BMap.Autocomplete( //建立一个自动完成的对象
		{
			"input" : "autoSearch",
			"location" : bdMapObj.map
		}
	);
	ac.addEventListener("onhighlight", function(e) {//鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		$("#searchResultPanel").html(str);
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {//鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		$("#searchResultPanel").html("onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue);
		setPlace();
	});
	function setPlace(){
		function myFun(){
			bdMapObj.map.clearOverlays();//清除所有的覆盖物
            bdMapObj.map.addOverlay(userMarker);
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			bdMapObj.map.centerAndZoom(pp, 12);
            userMarker.enableDragging();
			userMarker.setPosition(pp);
			inputLon = pp.lng;
			inputLat = pp.lat;
			hideNearDistance();//隐藏(附近的弹出框)
			bdMapObj.queryDatas(pp.lng,pp.lat,distancenear);//地图上生成点位
		}
		var local = new BMap.LocalSearch(bdMapObj.map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
	}
	 ac.dispose();
};
/**
 * 解析地址生成对应的坐标以及定位
 * @param {[type]} address     [description] 你输入的地址
 */
BdMapObj.prototype.addressPoint = function(address) {
	var myGeo = new BMap.Geocoder();// 创建地址解析器实例
	myGeo.getPoint(address, function(point){// 将地址解析结果显示在地图上,并调整地图视野
		if (point) {
			bdMapObj.map.clearOverlays();//清除所有的覆盖物
            bdMapObj.map.addOverlay(userMarker);
			bdMapObj.map.centerAndZoom(point, 12);
            userMarker.enableDragging();
			userMarker.setPosition(point);
			inputLon = point.lng;
			inputLat = point.lat;
			hideNearDistance();//隐藏(附近的弹出框)
			bdMapObj.queryDatas(point.lng,point.lat,distancenear);//地图上生成点位
		}else{
			alert("您选择地址没有解析到结果!");
		}
	}, "成都市");
}
/**
 * 根据起始点和目的点来规划路线
 * @param {[type]} startPoint     [description] 起点坐标
 * @param {[type]} endPoint     [description] 终点坐标
 * @param {[type]} navType     [description] 导航类型
 */
BdMapObj.prototype.pointNav = function(startPoint,endPoint,navType) {
	if(navType == "walk") {//步行路线
		if(bdMapObj.navConfig.walk != null)this.navConfig.walk.clearResults();//清除上一次的路径
		this.navConfig.walk = new BMap.WalkingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}}); 
		this.navConfig.walk.search(startPoint,endPoint);
		this.navConfig.walk.setMarkersSetCallback(function(result){
				bdMapObj.map.removeOverlay(result[0].marker); //删除起点
            	//bdMapObj.map.removeOverlay(result[1].marker);//删除终点
			})
	}else if(navType == "bus") {//公交路线

	}else if(navType == "drive") {//驾车路线
		if(this.navConfig.drive != null)this.navConfig.drive.clearResults();//清除上一次的路径
		this.navConfig.drive = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});
		this.navConfig.drive.search(startPoint, endPoint);
		this.navConfig.drive.setMarkersSetCallback(function(result){
				bdMapObj.map.removeOverlay(result[0].marker); //删除起点
            	//bdMapObj.map.removeOverlay(result[1].marker);//删除终点
			})
	}
}
/**
 * 在地图上清空相应的图层
 * @param {[type]} layer     [description] 对应的图层
 */
BdMapObj.prototype.removeLayers = function(layer) {
	for(var i = 0; i < layer.length; i++) {
		this.map.removeOverlay(layer[i]);
	}
}
/**
 * 在地图上隐藏相应的图层
 * @param {[type]} layer     [description] 对应的图层
 */
BdMapObj.prototype.hideLayers = function(layer) {
	for(var i = 0; i < layer.length; i++) {
		layer[i].hide();
	}
}
/**
 * 判断是否安装(百度地图)
 * @param {[type]} lng     [description] 目的地的经度
 * @param {[type]} lat     [description] 目的地的纬度
 * @param {[type]} title     [description] 目的地的标题
 */
BdMapObj.prototype.judgeMap = function() {
	bdMapObj.openBaiduApp(bdMapObj.startNav["orLng"],bdMapObj.startNav["orLat"],
		bdMapObj.startNav["lng"],bdMapObj.startNav["lat"],bdMapObj.startNav["title"]);
//	var param1 = {
//	        appData:'com.baidu.baidumap'//判断手机上是否安装qq应用
//	    };
//	    var data1 = JSON.stringify(param1);
//	    uexWidget.isAppInstalled(data1);
//    alert(uexWidget.isAppInstalled(data1));
//    uexWidget.cbIsAppInstalled = function(stringParam){
//        var result = JSON.parse(stringParam);
//        alert(result.installed);
//        if(result.installed == 0){  
//            $.confirm({
//                    title:"导航提示",
//                    msg:"你将进行导航？",
//                    buttons:"确定,退出"
//                }, function(opId, dataType, data) {
//                    if (data == 0) {
//                    	bdMapObj.openBaiduApp(bdMapObj.startNav["lng"],bdMapObj.startNav["lat"],bdMapObj.startNav["title"]);
//                    } else {
//                        return;
//                    }
//                })
//        }else{
//        	 $.toast("你没有安装百度地图，请下载!");
//        }
//    } 
}
/**
 * 打开第三方应用(百度地图)
 * @param {[type]} orLng     [description] 起点的经度
 * @param {[type]} orLat     [description] 起点的纬度
 * @param {[type]} lng     [description] 目的地的经度
 * @param {[type]} lat     [description] 目的地的纬度
 * @param {[type]} title     [description] 目的地的标题
 */
BdMapObj.prototype.openBaiduApp = function(orLng,orLat,lng,lat,title) {//这里用了事件的委托
	if(userPhone["android"]) {//安卓调用的方法
		var main = "android.intent.action.VIEW";
		var add = '{"data":{"scheme":"bdapp://map/direction?origin='+""+orLat+','+""+orLng+'&destination=latlng:'+""+lat+','+""+lng+'|name:'+title+'&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end"}}';
		uexWidget.startApp(1, main, add); 
	}
	if(userPhone["ios"]) {//苹果调用的方法
		//$('#dhImg .iosDh').attr("href","baidumap://map/marker?location="+lat+","+lng+"&title=成都市&content="+title+"&zoom=20f&src=yourCompanyName|yourAppName");
        $('#dhImg .iosDh').attr("href","baidumap://map/direction?origin="+orLat+","+orLng+"&destination=latlng:"+lat+","+lng+" |name:"+title+"&mode=driving&src=webapp.navi.yourCompanyName.yourAppName");

    }
};