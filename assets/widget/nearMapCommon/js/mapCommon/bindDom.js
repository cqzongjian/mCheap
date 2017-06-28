/**************************************************body中的节点绑定***********************************************/
/**
 * 绑定body里面的所有节点
 * @return {[type]} [description]
 */
function bindBodyDom() {
	bindHead();//绑定页面头部
	bindBottom();//绑定底部
	bindNavTool();//绑定导航img
}
/**
 * 绑定页面头部
 * @return {[type]} [description]
 */
function bindHead() {
	//点击附近地图头部
    $("#header .header-near").bind({//点击地图最上面附近按钮
    	click:function() {
    		var $this = $(this);
            $("#nav").hide();//隐藏显示栏
    		$("#popUp").show();//弹出附近的框体
            $("#mengceng").show();//显示蒙层
    	}
    })
    $("#mengceng").bind({//点击蒙城
    	click:function() {
    		var $this = $(this);
    		hideNearDistance();//隐藏附近的弹出框体
            $("#popUp .popUp-top .item[data-distance='"+bdMapObj.resetConfig['distance']+"']").trigger("click");
            var markerTypes = bdMapObj.resetConfig["type"];
            var html = '';
            $("#popUp .popUp-middle .item").removeClass("typeSelected");
            for(var i = 0;i < markerTypes.length;i++) {
                var onedata = markerTypes[i];
                $("#popUp .popUp-middle .item[data-type='"+onedata+"']").addClass("typeSelected");
                html += '<div class="nav-item" data-type="'+onedata+'">';
                html += '<span>'+queryMarkers[onedata]["type"]+'</span>';
                html += '<div class="sanjiao">';
                html += '<span class="sanjiao-close">x</span>';
                html += '</div>';
                html += '</div>';
            }
            $("#navTypes").empty().append(html);
            eventClose();
    	}
    })
    $("#popUp .popUp-top .item").bind({//弹出框距离绑定
    	click:function() {
    		var $this = $(this);
            if(!$this.hasClass("typeSelected")) {
                $this.addClass("typeSelected");
            }
            $this.siblings().removeClass("typeSelected");
    		distancenear = $this.data("distance");
    		$.setStorage("distance",distancenear);//并且记录当前的距离
            $("#juli").text(distancenear == ""? "全城":distancenear+"km");
    	}
    })
    $("#popUp .popUp-middle .item").bind({//弹出框场所绑定
        click:function() {
            var $this = $(this);
            var type = $this.data("type");
            if(!$this.hasClass("typeSelected")) {
                $this.addClass("typeSelected");
            }else{
                $this.removeClass("typeSelected");
            }
                createNavList(type);//创建场所列表
        }
    })
    //弹出框按钮绑定
    $("#popUp .popUp-bottom .reset").bind({//重置按钮
        click:function() {
            var $this = $(this);
            $("#popUp .popUp-top .item").removeClass("typeSelected");
            $("#popUp .popUp-middle .item").removeClass("typeSelected");
        }
    })
    $("#popUp .popUp-bottom .finish").bind({//完成按钮
        click:function() {
            var $this = $(this);
            if($("#popUp .popUp-top .item.typeSelected").length == 0){
                $.toast('请选择距离');
                return;
            }
            if($("#popUp .popUp-middle .item.typeSelected").length == 0){
                bdMapObj.selectModules = ["greensNearby","seeDoctor","buyThings","buyDrugs"];
            }
            bdMapObj.resetConfig["distance"] = distancenear;//记录用户的选择的距离//获取当前经纬度回调方法
            var $markerTypes = $("#popUp .popUp-middle .item.typeSelected");
            bdMapObj.selectModules = [];
            bdMapObj.resetConfig["type"] = [];
            for(var i = 0;i < $markerTypes.length;i++) {
                var onedataType = $markerTypes.eq(i).data("type");  
                bdMapObj.resetConfig["type"].push(onedataType);
                bdMapObj.selectModules.push(onedataType);    
            }
            hideNearDistance();//框体要隐藏
            bdMapObj.map.clearOverlays();//清除所有的覆盖物
            bdMapObj.map.addOverlay(userMarker);
            var nowPoint = userMarker.getPosition();//当前用户的所在位置的marker(也是用户输入地址时候的marker)
            bdMapObj.map.centerAndZoom(new BMap.Point(nowPoint.lng,nowPoint.lat), 12);
            bdMapObj.queryDatas(nowPoint.lng,nowPoint.lat,distancenear);//地图上生成点位
        }
    })

    $("#header .header-content .nav-content-search").bind({//地图上面的搜索图标绑定事件
    	click:function() {
    		var myAddress = $("#autoSearch").val();
    		bdMapObj.addressPoint(myAddress);
    	}
    })
    $("#header .header-content .nav-nowUser").bind({//地图定位到自己当前的位置
    	click:function() {
    		inputLon = null;//用户输入位置的经度
			inputLat = null;//用户输入位置的纬度
            bdMapObj.map.clearOverlays();//清除所有的覆盖物
    		var userPoint = new BMap.Point(userLon,userLat);
    		userMarker.setPosition(userPoint);
            bdMapObj.map.addOverlay(userMarker);
    		bdMapObj.map.centerAndZoom(userPoint, 12);
			bdMapObj.queryDatas(userPoint.lng,userPoint.lat,distancenear);//地图上生成点位
    	}
    })
}
function bindBottom() { 
	$("#markersPanel .title").bind({//绑定市场面板的标题
		click:function() {
			if($("#markersInfo").hasClass("active")) {
	            $("#markersPanel .title").css({"bottom":"0px",});
	            $("#markersInfo").removeClass("active");
	            $("#dhImg").css({"bottom":"65px",});
                if($('#popUp').css('display') == 'none')$("#nav").show();
	        }else {
	            $("#markersPanel .title").css({"bottom":"270px",});
	            $("#markersInfo").addClass("active");
	            $("#dhImg").css({"bottom":"335px",});
                $("#nav").hide();
	        }	
		}
	})
}
function bindNavTool() {
	$("#dhImg").bind({//绑定导航(打开第三方应用)
    	click:function() {
    		if(bdMapObj.startNav["lng"] || bdMapObj.startNav["lat"]){
    			bdMapObj.judgeMap(); //判断是否安装百度地图并进行导航
    		}else{
    			alert("请选中某个市场,才可以进行导航哦!!!");
    			return;
    		}
    	}
    });
}   

/**
 * 隐藏(附近的弹出框)
 */
function hideNearDistance() {
    $("#popUp").hide();//隐藏附近的框体
    $("#mengceng").hide();//隐藏蒙层
    if(!$("#markersInfo").hasClass("active")) {
        $("#nav").show();//显示栏的显示
    }
}
/**
 * 创建场所列表
 * @param {[type]} type [description] 点击的类型
 * @return {[type]} [description]
 */
function createNavList(type) {
    var $markerTypes = $("#popUp .popUp-middle .item.typeSelected")
    var html = '';
    bdMapObj.selectModules = []; 
    for(var i = 0;i < $markerTypes.length;i++) {
        var onedataType = $markerTypes.eq(i).data("type");      
        html += '<div class="nav-item" data-type="'+onedataType+'">';
        html += '<span>'+queryMarkers[onedataType]["type"]+'</span>';
        html += '<div class="sanjiao">';
        html += '<span class="sanjiao-close">x</span>';
        html += '</div>';
        html += '</div>';
        bdMapObj.selectModules.push(onedataType);
    }
    $("#navTypes").empty().append(html);
    eventClose();
}
/**
 * 监听显示栏的关闭按钮
 * @return {[type]} [description]
 */
function eventClose(){
     $("#navTypes .nav-item .sanjiao").bind({//绑定显示栏关闭按钮
        click:function() {
            var $this = $(this);
            var $parent = $this.parent();
            var type = $parent.data("type");
            $("#popUp .popUp-middle .item[data-type='"+type+"']").removeClass("typeSelected");
            bdMapObj.selectModules = [];
            bdMapObj.resetConfig["type"] = [];
            var $markerTypes = $("#popUp .popUp-middle .item.typeSelected"); 
            if($markerTypes.length == 0)bdMapObj.selectModules = ["greensNearby","seeDoctor","buyThings","buyDrugs"];
            for(var i = 0;i < $markerTypes.length;i++) {
                var onedataType = $markerTypes.eq(i).data("type");      
                bdMapObj.selectModules.push(onedataType);
                bdMapObj.resetConfig["type"].push(onedataType);
            }
            $parent.remove();//删除当前元素
            var nowPoint = userMarker.getPosition();//当前用户的所在位置的marker(也是用户输入地址时候的marker)
            bdMapObj.map.centerAndZoom(new BMap.Point(nowPoint.lng,nowPoint.lat), 12);
            bdMapObj.queryDatas(nowPoint.lng,nowPoint.lat,distancenear);//地图上生成点位
        }
    })
}
