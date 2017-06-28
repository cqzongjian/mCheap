	    /*var resultInfo;*/
		var epsbht01006;//当前用户经度
		var epsbht01007;//当前用户纬度
		var numcc=0;
		var ii=0;      //解决一个bug
		var lngsave;   //搜索框搜索后红色标注得经度
		var latsave;   //搜索框搜索后红色标注得纬度
		if($.getStorage('nearjl')==null){//用户第一次进来,如何设置得内存是空，则默认设置为0
		$.setStorage("nearjl",0);
		}
		var distancenear= $.getStorage('nearjl');
		/*var tokenString=$.getStorage('access_token');*/
         /* var serverPath=$.serverSettings.serverPath;*/
		$.uexWindowReady(function(){   //模拟点击事件
			if(distancenear==0){
				$("#trigger0").trigger("click"); 
			}else if(distancenear==1){
				$("#trigger1").trigger("click");
			}else if(distancenear==2){
				$("#trigger2").trigger("click");
			}else if(distancenear==3){
				$("#trigger3").trigger("click");
			}else if(distancenear==4){
				$("#trigger4").trigger("click");
			}else{
				$("#trigger5").trigger("click");
			}
			openLocation();   //获取当前经纬度方法
			uexLocation.onChange = function(lat, log) { //获取当前经纬度回调方法
			epsbht01006=log;
			epsbht01007=lat;
			lngsave=log;
			latsave=lat;
			var point = new BMap.Point(epsbht01006,epsbht01007);
			var myIcon = new BMap.Icon("../images/icondwbz-31.png", new BMap.Size(30, 45), //红色标注
	                {
	              anchor : new BMap.Size(13, 46),   //调整图片在地图上得位置
	               imageOffset: new BMap.Size(0, 0)  
	             });
	      	 map.addOverlay(new BMap.Marker(point,{icon: myIcon}));    //添加标注
	      	  /* 进入页面用户周边查询 */
	      	if(distancenear==5){  //刚刚进入页面默认值
		    
				distancenear="";				
			}	      	 
	      	
            
	      	httpusernear(epsbht01006,epsbht01007,distancenear);//显示麻点得方法
	      	 
			};					
		});
          
          function initInfo(){
        	  distancenear= $.getStorage('nearjl');
        	  //0最准确，1十米以内 ，2百米以内，3千米内，4三千米以内
              var locLevel = 0;
              //distanceFilter 更新距离，如果设置为 100m,则100m以内不回调定位
              var distanceFilter = 10;
              //以上两参数仅ios支持
              uexLocation.openLocation(locLevel, distanceFilter);
        	  uexLocation.onChange = function(lat, log) {
	 			epsbht01006=log;
	 			epsbht01007=lat;
	 			lngsave=log;
	 			latsave=lat;
        	  }
        	  
  		    $(".info").children("div").remove();  //删除info下得div
  		    $(".info>div").remove();
  		    map.clearOverlays();
  		  var point = new BMap.Point(epsbht01006,epsbht01007);
  		  var myIcon = new BMap.Icon("../images/icondwbz-31.png", new BMap.Size(30, 45), 
	                {
	              anchor : new BMap.Size(13, 46), 
	               imageOffset: new BMap.Size(0, 0)
	             });
	      	 map.addOverlay(new BMap.Marker(point,{icon: myIcon}));    //添加标注
				/* 发送请求开始 */
	      	if(distancenear==5){
		    
				distancenear="";				
			}
				 
	      	httpusernear(epsbht01006,epsbht01007,distancenear);
			
			/* 发送请求结束 */	
			
          }
          
		function openLocation() {
			//以下两参数仅ios支持
			var locLevel = 0;//0最准确，1十米以内 ，2百米以内，3千米内，4三千米以内
			var distanceFilter = 10;//distanceFilter 更新距离，如果设置为 100m,则100m以内不回调定位
			uexLocation.openLocation(locLevel, distanceFilter);
		}
	    var map = new BMap.Map("allmap");          
		map.centerAndZoom(new BMap.Point(104.067192,30.665534), 15);
		map.enableScrollWheelZoom(true);
		map.enableDragging();
	//控制页面字体不被复制
     window.onload = function() {
        with(document.body) {
/*         	document.body.onselectstart=document.body.oncontextmenu=function(){ return false;}
 */        }
    };
    
    var nearnu=1;
    //附近选择距离事件
    $(".nearly").on("click",function(){
    	if(nearnu%2==1){
    		$(".nearim").css("display","none");
    		$(".nearlv").css("display","inline");	
    		$(".nearlbs").css("display","inline");
    		$(".mengc").css("display","inline");
    		nearnu++;
    	}else{
    		$(".nearim").css("display","inline");
    		$(".nearlv").css("display","none");
    		$(".nearlbs").css("display","none");
    		$(".mengc").css("display","none");
    		nearnu++;
    	}   	
    });
    $(".nearlb").on("click",function(){
    	$(this).parent().parent().find('img').css("display","none");
		$(".nearlv").css("display","none");
		$(".jlstyle").css("color","#000");
    	$(this).children().css("color","#008b45");
    	 /* alert($(this).children().eq(1).html());  */	 
    	$.setStorage("nearjl", $(this).children().eq(1).html())
    	/*alert($(this).children().eq(1).html());*/
    	var near=$(this).children().eq(1).html();
    	/*alert(near)*/
    	/* alert($(this).children().eq(1).html()) */
    	if($(this).children().eq(1).html()=="5"){  		
    		near="";
    	}
    	$(".info").children("div").remove(); 
  		    $(".info>div").remove();
  		    map.clearOverlays(); 		  
  		   if(ii != 0){    	
  			 httpusernear(lngsave,latsave,near);    
  		   }
  		  ii++;
    	$(this).children().eq(0).css("display","inline");
    	$(".nearlbs").css("display","none");
    	$(".mengc").css("display","none");
    	nearnu++;
    })
    $(".mengc").on("click",function(){
    	$(".nearim").css("display","inline");
		$(".nearlv").css("display","none");
		$(".nearlbs").css("display","none");
		$(".mengc").css("display","none");
		nearnu++;
    })
    
	//注册市场点击事件
    var dianji=1; //控制一共查询多少个市场这个div
	var numall;   //这个是查询出来的总体市场得变量
	//给市场数样式注册监听方法
    $(".marketStyle").on("click",function(){
	    if(dianji%2==1){
		 $(".a1").css({"top":'-6.3rem'});
		 $(".dhimg").css({"bottom":'7.9rem'});
         $(".info").css("height","6rem");
         $(".marketStyle").css("position","relative");
		 dianji +=1;
		 }else{
			 $(".dhimg").css({"bottom":'1.5rem'});
		  $(".a1").css({"top":'0em'});
		   $(".info").css("height","0em");
		   $(".marketStyle").css("position","fixed");
		   dianji +=1;
		 }
			});
	
    $("#dhimg").on("click",function(){
		 $(".infoBox>img").css("display","none");
		
		 for ( var qq = 1; qq <= numall; qq++) {	
			
			  if($("#"+qq+1+"dh").attr("dataclass")=="true"){		
				var lng=$("#"+qq+1+"dh").parent().children().eq(3).html();
				var lat=$("#"+qq+1+"dh").parent().children().eq(4).html();
				var title=$("#"+qq+1+"dh").parent().children().eq(5).html()
				  var main = "android.intent.action.VIEW";
			       var add = '{"data":{"scheme":"bdapp://map/direction?destination=latlng:'+""+lat+','+""+lng+'|name:'+title+'&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end"}}';
			       uexWidget.startApp(1, main, add); 
			 } 
			 
		 }
		 
		 
	 });
    
 	function dataInfo(json,epsbht01006,epsbht01007){		
 	$("#numberMarket").text(json.length);
 	numall=json.length;
      var points=[];
      var k=0;
      var hh=21;
      //遍历数据
      var poi = new BMap.Point(epsbht01006,epsbht01007);
      points.push(poi)
 	 for(var i=0;i<json.length;i++){
 	     k=k+1;
 	     hh=hh-21;
 	     var title=json[i].cltpit01001;//菜市场标题
 		var poi=new BMap.Point(json[i].cltpit01007,json[i].cltpit01008);//经纬度实例化
 		var lng=json[i].cltpit01007;//获取精度
 		var lat=json[i].cltpit01008;//获取纬度
 		var vagetableIndex=json[i].zhishu;//蔬菜指数
 		var minpriceNumber=json[i].cheapercount;//最少品种数
 		var address=json[i].cltpit01004;//菜市场地址
 		var distance=json[i].distance;//距离    
 		var cltpit01005=json[i].cltpit01005;//营业开始时间
 		var cltpit01006=json[i].cltpit01006;//营业结束时间
 		var cltpit01id=json[i].cltpit01id;//采集点流水号
 		var isfocus=json[i].isfocus;
 		var epsflw02001="";//关注类型	          
 		points.push(poi);
       /* infoBox.open(marker);*/
         addMarker(title,lng,lat,poi,address,distance,vagetableIndex,minpriceNumber,cltpit01005,cltpit01006,cltpit01id,epsflw02001,isfocus,k);   
 	} 
      
	
 	//点击事件，触发样式
 	$(".shiyan").on("click", function() {
 	      $(".shiyan").css("background-color","white");
           $(this).css("background-color","#f2f2f2");
   });
   
 	
   var i=0;
 	function addMarker(title,lng,lat,poi,address,distance,vagetableIndex,minpriceNumber,cltpit01005,cltpit01006,cltpit01id,epsflw02001,isfocus,k){
 		
 		if(vagetableIndex==null){
 	    	vagetableIndex="空"
 	    }
 	   if(minpriceNumber==null){
 		  minpriceNumber="空"
	    }
 	  var html;
 	   if(i < 10){ //如果麻点小于等于10个和大于10个用不同图片
 		html=[" <div class='qipao'><div class='title'>"+title+"</div><div class='priceIndex'> <div>价格指数   :</div><span>"+vagetableIndex+"</span></div><div class='varietNum'><div>最低价格品种数   :</div><span>"+minpriceNumber+"</span></div><img src='../images/jian.png' class='arrow'/></div>"];
 	   }else{
 		   
 	 		html=[" <div class='qipaonew'><div class='title'>"+title+"</div><div class='priceIndex'> <div>价格指数   :</div><span>"+vagetableIndex+"</span></div><div class='varietNum'><div>最低价格品种数   :</div><span>"+minpriceNumber+"</span></div><img src='../images/jian.png' class='arrow'/></div>"];
 	   }
 		//创建气泡
 	   var infoBox = new BMapLib.InfoBox(map,html.join(""),{   
            boxStyle:{ 
            	    width: "15rem"
                    ,height: "0.6rem"
                }
 	       ,closeIconMargin: "1px 1px 0 0"
 	       ,enableAutoPan: true
 	       ,align: INFOBOX_AT_TOP
            
        });
 	  var myIcon = new BMap.Icon("../images/icondwbz-31.png", new BMap.Size(30, 45), 
              {
            anchor : new BMap.Size(13, 46), 
             imageOffset: new BMap.Size(0, 0)
           });
 	  var myIconTwo;
        //自定义麻点样式
        if(i<10){
         myIconTwo = new BMap.Icon("../images/markers_new2_4ab0bc5.png", new BMap.Size(21.2, 33), 
                 {
                anchor: new BMap.Size(10, 30),
                imageOffset: new BMap.Size(hh, 1) 
              });
        }else{	
            myIconTwo = new BMap.Icon("../images/markers_new2_4ab0bc5.png", new BMap.Size(18, 11.5), 
                            {
                           anchor: new BMap.Size(10, 5),
                           imageOffset: new BMap.Size(-100, -231) 
                         });
        }
         var marker=new BMap.Marker(poi,{icon: myIconTwo});       
          //点击麻点,气泡弹出
        marker.addEventListener("click", function(e){  //给marker注册一个监听事件
                   infoBox.open(marker);    
        });
          
        
        //点击地图，删除气泡
        map.addEventListener("click", function(e){  //给map注册一个监听事件                 
                            if(!e.overlay){  
                                 infoBox.close(marker); 
                            }
                        }); 
                
          map.addOverlay(marker);
          //拼字符串
           var html="<div id='"+i+"sc' onclick='center("+lng+","+lat+")' class='backcolor'><div class='shiyan'>"+
                        "<div class='titleplace'>"+                  
                      "<div>"+k+".</div><div onclick='caishiOpen(\""+cltpit01id	+"\")'>"+title+"</div>"+       
                 " <img id="+i+0+" src='../images/dislike.png' onclick='precervation()'/>"+
                 " <img id="+i+1+" style='display:none' src='../images/like.png' onclick='clprecervation("+lng+","+lat+")'/>"+
              "</div>"+            
             " <div class='specificplace'>"+         
                          "<img id='"+k+1+"dh' src='../images/dingwei.png' class='precervation' name='plan'/>"+
                          "<div >"+address+"</div>"+
                          "<div>"+distance+"km</div>"+
                          "<div style='display:none'>"+lng+"</div>"+
                          "<div style='display:none'>"+lat+"</div>"+
                          "<div style='display:none'>"+title+"</div>"+
                 "</div>"+
           /*  " <div class='vegeprice'>"+
                 "<div>蔬菜指数</div>"+
                 "<div>"+vagetableIndex+"</div>"+
             "</div>"+ */
             "<div class='mintype'>"+
                 "<div>最低价格品种数</div>"+
                 "<div>"+minpriceNumber+"</div>"+
             "</div>"+
             
     "</div>"   	
     //添加页面信息
     $(".info").append(html);
     //保存和删除样式
     /* if(isfocus=="1"){
    	 
     } */
     
     //步行点击事件
		
     
     if(k==1){
    	 $("#"+k+1+"dh").attr("dataclass","true");
     }
     //点击出现路线规划
     $("#"+k+1+"dh").on("click", function(e) {
     	 $(".precervation").attr("dataclass","false");      
		  $("#"+k+1+"dh").attr("dataclass","true"); 
    	       e.stopPropagation();//阻止冒泡
    	       map.clearOverlays(); 
    	       var points=[];  
    	       var point1 = new BMap.Point(epsbht01006,epsbht01007);
    	       var point2 = new BMap.Point(lng,lat);
    	       map.centerAndZoom(point1, 18);
      	    
      	       
    	      var myIconTwo;
   	        //自定义麻点样式
   	        if(i<10){
   	        	myIconTwo = new BMap.Icon("../images/markers_new2_4ab0bc5.png", new BMap.Size(30, 48), 
                        {
                       anchor: new BMap.Size(12, 37),
                       imageOffset: new BMap.Size(-225, -139) 
                     });
            
   	        }else{	
   	            myIconTwo = new BMap.Icon("../images/markers_new2_4ab0bc5.png", new BMap.Size(18, 11.5), 
   	                            {
   	                           anchor: new BMap.Size(10, 5),
   	                           imageOffset: new BMap.Size(-100, -231) 
   	                         });
   	        }
   	    
    	      
    	       var myIcon = new BMap.Icon("../images/markers_new2_4ab0bc5.png", new BMap.Size(30, 45), 
		                {
		              anchor : new BMap.Size(13, 46), 
		               imageOffset: new BMap.Size(1000, 0)
		             });
    	       var myIcon3 = new BMap.Icon("../images/markers_new2_4ab0bc5.png", new BMap.Size(30, 45), 
		                {
		              anchor : new BMap.Size(13, 46), 
		               imageOffset: new BMap.Size(1000, 0)
		             });
			 map.addOverlay(new BMap.Marker(point1,{icon: myIcon}));    //添加标注
			 var p1 = new BMap.Point(epsbht01006,epsbht01007);
			 var p2 =new BMap.Point(lng,lat);
			 var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});	 			
			 walking.search(p1,p2);
			
    	 
    	  var html;
   		html=[" <div class='qipao'><div class='title'>"+title+"</div><div class='priceIndex'> <div>价格指数   :</div><span>"+vagetableIndex+"</span></div><div class='varietNum'><div>最低价格品种数   :</div><span>"+minpriceNumber+"</span></div><img src='../images/jian.png' class='arrow'/></div>"];
   	          //创建气泡
  	   var infoBox = new BMapLib.InfoBox(map,html.join(""),{   
             boxStyle:{ 
             	    width: "15rem"
                     ,height: "0.6rem"
                 }
  	       ,closeIconMargin: "1px 1px 0 0"
  	       ,enableAutoPan: true
  	       ,align: INFOBOX_AT_TOP
         });
     	 infoBox.open(marker); 
		  
     });
     
     if(i==0){
    	 var p1 = new BMap.Point(lngsave,latsave);
		 var p2 = new BMap.Point(lng,lat);
		 var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: false}});	 			
		 walking.search(p1,p2);
		 walking.setMarkersSetCallback(function(result){
				result[1].marker.setIcon(myIconTwo);
				result[0].marker.setIcon(myIcon);
			}) 
			 map.centerAndZoom(p1,14);	 //控制地图缩放比例
     }
     if(isfocus==1){
    	 $("#"+i+1+"").css("display","none"); 
         $("#"+i+0+"").next().css("display","inline");
     }
     
      $("#"+i+0+"").on("click", function() {  
           $(this).css("display","none"); 
             $(this).next().css("display","inline"); 
             
             var obj={ 
 					     epsrtu01id:"",// 注册用户流水号
 						 cltpit01id:cltpit01id,// 采集点流水号
 						 cltpit01001:""+title,// 采集点名称
 						 epsflw03id:null,// 购买点流水号
 						 epsflw02001:"",// 关注类型
 					     create_time:"",// 创建时间
 					     cltpit01004:""+address,// 采集点地址
 					     cltpit01005:""+cltpit01005,// 营业开始时间
 					     cltpit01006:""+cltpit01006,// 营业结束时间
 					     cltpit01007:lng,// 采集点经度
 					     cltpit01008:lat// 采集点纬度
             }
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
                         
                    }
                    else {
                        //$.toast('网络错误')
                    }

                });
             
           
             
             
        });
        $("#"+i+1+"").on("click", function() {
            $(this).css("display","none");
            $(this).prev().css("display","inline");  
            
         
        /* 取消关注市场 */
        
                    $.request({
                    urlType: 'deleteFocusStation',
                    data: {
                        "access_token": $.getStorage('access_token'),
                        cltpit01id:cltpit01id// 采集点流水号
                    }
                }, function (json) {
                    if(json.success) {
                     
                    	$.toast("取消成功")
                         
                    }
                    else {
                        //$.toast('网络错误')
                    }

                });
       
            
        });
        
       //注册点击事件  
      
      $("#"+i+"sc").on("click", function() {   
    	  map.clearOverlays();    //清除地图上所有覆盖物
    	  var html;
    	   if(k<11){
    		html=[" <div class='qipao'><div class='title'>"+title+"</div><div class='priceIndex'> <div>价格指数   :</div><span>"+vagetableIndex+"</span></div><div class='varietNum'><div>最低价格品种数   :</div><span>"+minpriceNumber+"</span></div><img src='../images/jian.png' class='arrow'/></div>"];
    	   }else{
    	 		html=[" <div class='qipaonew'><div class='title'>"+title+"</div><div class='priceIndex'> <div>价格指数   :</div><span>"+vagetableIndex+"</span></div><div class='varietNum'><div>最低价格品种数   :</div><span>"+minpriceNumber+"</span></div><img src='../images/jian.png' class='arrow'/></div>"];
    	   }          //创建气泡
   	   var infoBox = new BMapLib.InfoBox(map,html.join(""),{   
              boxStyle:{ 
              	    width: "15rem"
                      ,height: "0.6rem"
                  }
   	       ,closeIconMargin: "1px 1px 0 0"
   	       ,enableAutoPan: true
   	       ,align: INFOBOX_AT_TOP
              
          });
        infoBox.open(marker);   
        map.addOverlay(marker);
    });
      
       
 	}  
 	/*  map.setViewport(points); */
	};//结束符号
 	//点击后自动调节地图位置
        function center(lng,lat){
            map.centerAndZoom(new BMap.Point(lng+0.0015,lat-0.001), 17);
        }  
	

	function caishiOpen(cltpit01id){ //打开菜市气泡
        $.request({
            urlType: 'stationPrice',
            data: {
                "access_token": $.getStorage('access_token'),
                 cltpit01id:cltpit01id
            }
        }, function (json) {
            if(json.success) {

     	       if(json.data.collectStationDetail.cltpit01001==null){
     	    	   $.toast("市场价格还没有采集")
     	    	   return;
     	       }else{
     	    	   $.openFrameByEle('', {
     		            name: 'nearbyquery',
     		            winName: 'caishi',
     		            url:'wgtroot://mCheap/market/ui/market.html',
     		            pageParam: {
     		            	cltpit01id : cltpit01id
     		            }
     		        });
     	       }
            }
            else {
                //$.toast('网络错误')
            }

        });
		

		
	}
    
	//导航方法
	   function navigation(lng,lat,title){
		   var main = "android.intent.action.VIEW";
	       var add = '{"data":{"scheme":"bdapp://map/direction?destination=latlng:'+""+lat+','+""+lng+'|name:'+title+'&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end"}}';
	       uexWidget.startApp(1, main, add);  
	       
	       
		   /*   var param1 = {
		                appData:'com.nuomi'//判断手机上是否安装百度地图应用
		            };
		            var data1 = JSON.stringify(param1);
		            uexWidget.isAppInstalled(data1);
		            uexWidget.cbIsAppInstalled = function(data1){
		        var result = JSON.parse(data1);
		        if(result.installed == 0){  
		            $.confirm({
		                    title:"导航提示",
		                    msg:"你将进行导航？",
		                    buttons:"确定,退出"
		                }, function(opId, dataType, data) {
		                    if (data == 0) {
		                       var main = "android.intent.action.VIEW";
		                      var add = '{"data":{"scheme":"bdapp://map/direction?destination=latlng:'+""+lat+','+""+lng+'|name:'+title+'&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end"}}';
		                      uexWidget.startApp(1, main, add);
		                    } else {
		                        return;
		                    }
		                })
		        }else{
		        	 $.toast("你没有安装百度地图，请下载!");
		        }
		    }      */  
	      //百度
	     /*     var url2=encodeURIComponent(title);  
	         uexWidget.loadApp("baidumap://map/geocoder?location="+lat+","+lng+"&coord_type=gcj02&src=yourCompanyName%7CyourAppName",null,null);
	    */
	   }
	
	
	 //关键词提示搜索
		// 百度地图API功能
		/* function G(id) {
			return document.getElementById(id);
		} */

		// 百度地图API功能
		function G(id) {
			return document.getElementById(id);
		}

	
		var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			{"input" : "suggestId"
			,"location" : map
		});

		ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
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
			G("searchResultPanel").innerHTML = str;
		});

		var myValue;
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			
			setPlace();
		});

		function setPlace(){
			map.clearOverlays();    //清除地图上所有覆盖物
			distancenear= $.getStorage('nearjl');
			function myFun(){
				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 18);
				/* 开始查询 */
			/* 	alert(pp.lng+"点击") */
			/* alert(lngsave)
			alert(latsave) */
				lngsave=pp.lng;
				latsave=pp.lat;
				 $(".info").children("div").remove();
				    $(".info>div").remove();
				 map.clearOverlays();
				 var myIcon = new BMap.Icon("../images/icondwbz-31.png", new BMap.Size(30, 45), 
			                {
			              anchor : new BMap.Size(13, 46), 
			               imageOffset: new BMap.Size(0, 0)
			             });
				 map.addOverlay(new BMap.Marker(pp,{icon: myIcon}));    //添加标注
				 var epsbht01006=pp.lng;
				var epsbht01007=pp.lat;
				if(distancenear==5){
			    
					distancenear="";				
				}
				
				httpusernear(epsbht01006,epsbht01007,distancenear);
				
				
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
			  onSearchComplete: myFun
			});
			local.search(myValue);
		};
		 /* 关键词提示搜索结束 */
		 
		 /* 点击搜索 */
		 function searchInfo(){
			
			 distancenear= $.getStorage('nearjl');
		    // 创建地址解析器实例
			 var addressInfo=document.getElementById("suggestId").value;
			    if(addressInfo==""){
			    	return;
			    }
		    $(".info").children("div").remove();
		    $(".info>div").remove();
		    map.clearOverlays();
		    var myGeo = new BMap.Geocoder();		 		    
			 // 创建地址解析器实例
				var myGeo = new BMap.Geocoder();
				// 将地址解析结果显示在地图上,并调整地图视野
				myGeo.getPoint(""+addressInfo, function(point){
					if (point) {
						map.centerAndZoom(point, 16);
						/* map.addOverlay(new BMap.Marker(point)); */
						 var myIcon = new BMap.Icon("../images/icondwbz-31.png", new BMap.Size(30, 45), 
			                {
			              anchor : new BMap.Size(13, 46), 
			               imageOffset: new BMap.Size(0, 0)
			             });
			      	 map.addOverlay(new BMap.Marker(point,{icon: myIcon}));    //添加标注
			      	/*  alert(point.lng) */
			      	    lngsave=point.lng;
						latsave=point.lat;
						var epsbht01006=point.lng;
						var epsbht01007=point.lat;
						if(distancenear==5){
					    
							distancenear="";				
						}
						/* 发送请求开始 */
				
						httpusernear(epsbht01006,epsbht01007,distancenear);
						
					}else{
						 $.toast("您选择地址没有解析到结果!");
					}
				}, "成都市");
		 }
		
	   
	   
	   function httpusernear(lngw,latw,near){
		 /*  alert(distancenear)*/
		   $.request({
               urlType: 'userNearMarkets',
               data: {
                   "access_token": $.getStorage('access_token'),
                 	log:lngw,
					lat:latw,
                   distance:near
               }
           }, function (json) {
               if(json.success) {
              
               	var array =json.data;
               	  function compare(propertyName) { 
               	   		return function (object1, object2) { 
               	   		var value1 = object1[propertyName]; 
               	   		   value1=parseFloat(value1);
               	   		var value2 = object2[propertyName]; 
               	   		value2=parseFloat(value2)
               	   		if (value2 > value1) { 
               	   		return -1; 
               	   		} 
               	   		else if (value2 < value1) { 
               	   		return 1; 
               	   		} 
               	   		else { 
               	   		return 0; 
               	   		} 
               	   		} 
               	   		} 
               	  
              
               	   		array.sort(compare("distance"));            
          	        /* alert(JSON.stringify(json)) */
          	           
                       dataInfo(array,epsbht01006,epsbht01007);
                      
               }
               else {
                   //$.toast('网络错误')
               }

           });
		   
	   }
	   
	