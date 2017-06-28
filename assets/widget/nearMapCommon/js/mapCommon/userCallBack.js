/********************************************得到坐标后的回调方法(一切方法都是在这个方法后执行的)******************************************/
/**
 * 判断用户是安卓用户还是苹果用户
 */
	function judgePhone() {
		var u = navigator.userAgent, app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		userPhone["android"] = isAndroid;
		userPhone["ios"] = isiOS;
	}
/**
	* 获取用户所在的经纬度
	* @return {[type]} [description]
 */
	function getUserPosition() {
			//以下两参数仅ios支持
	var locLevel = 0;//0最准确，1十米以内 ，2百米以内，3千米内，4三千米以内
	var distanceFilter = 100000000;//distanceFilter 更新距离，如果设置为 100m,则100m以内不回调定位
    uexJinlinTrace.openLocation(locLevel, distanceFilter);//开启定位
	//上面三步必须有才会调下面
    uexJinlinTrace.onChange = function(lat, log) {
        uexJinlinTrace.closeLocation();//关闭定位(安卓只会定位一次,苹果ios要反复定位,所以必须要把苹果的定位关闭了)
		bdMapObj.resetConfig["distance"] = distancenear;//记录用户的选择的距离//获取当前经纬度回调方法
		$("#leixing").text(queryMarkers[bdMapObj.moduleId]["type"]);
		bdMapObj.resetConfig["type"] = [bdMapObj.moduleId];
		userLon = log;
		userLat = lat;
		var point = new BMap.Point(userLon,userLat);
			var myIcon = new BMap.Icon("../images/icondwbz-31.png", new BMap.Size(30, 45), //红色标注
	                {
	              anchor : new BMap.Size(13, 46),   //调整图片在地图上得位置
	               imageOffset: new BMap.Size(0, 0)  
	             });
			userMarker = new BMap.Marker(point,{icon: myIcon});
			bdMapObj.map.addOverlay(userMarker);    //添加标注 	
			bdMapObj.map.centerAndZoom(point, 12);
			userMarker.enableDragging(); //可拖拽
        	userMarker.addEventListener("dragend", function (e) {
				log = e.point.lng;
				lat = e.point.lat;
                bdMapObj.startNav["orLng"] = log;//获取经度
                bdMapObj.startNav["orLat"] = lat;//获取纬度
                bdMapObj.queryDatas(log,lat,distancenear);//地图上生成点位
			});
			$("#popUp .popUp-top .item[data-distance='"+distancenear+"']").trigger("click");
			$("#popUp .popUp-middle .item[data-type='"+bdMapObj.moduleId+"']").trigger("click");
        bdMapObj.startNav["orLng"] = log;//获取经度
        bdMapObj.startNav["orLat"] = lat;//获取纬度
			bdMapObj.queryDatas(log,lat,distancenear);//地图上生成点位
		};   	 
	}