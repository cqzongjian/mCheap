/**
 * Created by dell on 2016/8/3.
 */


//获取RegistrationID
function getRegistration_ID(){
    uexJPush.getRegistrationID();
    uexJPush.cbGetRegistrationID=function (info){
        var json=$.parseJSON(info);
        var registerID=json.registrationID;
        $.setStorage('registerID',registerID);
    }
}

function push_message(){
    if(!$.getStorage("pushMesFlag")){
        $.setStorage('pushMesFlag',"1");
    }
    var pushMesFlag = $.getStorage('pushMesFlag');
    var registerID=$.getStorage('registerID');
    var epsbht01006 =$.getStorage('log');
    var epsbht01007 =$.getStorage('lat');
    if(pushMesFlag=="1"&&registerID&&epsbht01006&&epsbht01007){
        getRoundStationNames(registerID,epsbht01006,epsbht01007);//查询用户附近市场接口
        getStationCheapProducts(registerID,epsbht01006,epsbht01007);//推送用户附近的市场的便宜信息接口
        getFocusProductsInfo(registerID,epsbht01006,epsbht01007);//推送用户关注产品在附近市场最便宜价格接口
        getFocusStationInfo(registerID);//推送用户关注市场有哪些便宜产品接口
        getPushHistoryMessage(registerID);//查询推送过得消息接口
    }
}

function push_getRoundStationNames_message(){
    if(!$.getStorage("pushMesFlag")){
        $.setStorage('pushMesFlag',"1");
    }
    var pushMesFlag = $.getStorage('pushMesFlag');
    var registerID=$.getStorage('registerID');
    if(pushMesFlag=="1"&&registerID){
        var epsbht01006 =$.getStorage('log');
        var epsbht01007 =$.getStorage('lat');
        getRoundStationNames(registerID,epsbht01006,epsbht01007);//查询用户附近市场接口
    }
}

function push_getStationCheapProducts_message(){
    if(!$.getStorage("pushMesFlag")){
        $.setStorage('pushMesFlag',"1");
    }
    var pushMesFlag = $.getStorage('pushMesFlag');
    var registerID=$.getStorage('registerID');
    var epsbht01006 =$.getStorage('log');
    var epsbht01007 =$.getStorage('lat');
    if(pushMesFlag=="1"&&registerID&&epsbht01006&&epsbht01007){
        getStationCheapProducts(registerID,epsbht01006,epsbht01007);//推送用户附近的市场的便宜信息接口
    }
}

function push_getFocusProductsInfo_message(){
    if(!$.getStorage("pushMesFlag")){
        $.setStorage('pushMesFlag',"1");
    }
    var pushMesFlag = $.getStorage('pushMesFlag');
    var registerID=$.getStorage('registerID');
    var epsbht01006 =$.getStorage('log');
    var epsbht01007 =$.getStorage('lat');
    if(pushMesFlag=="1"&&registerID&&epsbht01006&&epsbht01007){
        getFocusProductsInfo(registerID,epsbht01006,epsbht01007);//推送用户关注产品在附近市场最便宜价格接口
    }
}

function push_getFocusStationInfo_message(){
    if(!$.getStorage("pushMesFlag")){
        $.setStorage('pushMesFlag',"1");
    }
    var pushMesFlag = $.getStorage('pushMesFlag');
    var registerID=$.getStorage('registerID');
    if(pushMesFlag=="1"&&registerID){
        getFocusStationInfo(registerID);//推送用户关注市场有哪些便宜产品接口
    }
}
/*=============================推送公用方法==================================================*/


//function notice_callback(){
//    getNotReadNum(messageCallback);
//}

//推送消息载入数据
function setData(json){
    var data = json.data;
    var len = json.data.length;
    var html='';
    var msg_html='';
    $('#mc-msg-num').html(len);
    for(var i=0;i<len;i++){
        var title=data[i].cltpush01001;
        var content=data[i].cltpush01002;
        var time=data[i].cltpush01003;
        msg_html+='<span>';
        msg_html+='<img class="push_img" src="static/mCheap/images/circle.png">';
        msg_html+='<span class="push_span">'+content+'</span>';
        msg_html+='</span>';
        html+="<div class='mdui-box mdui-box-ver mc-lineone'>";
        html+="<div class='mdui-box mdui-box-flex-1'>";
        html+="<div class='mdui-box mdui-box-flex-1 mdui-box-align-center mdui-box-pack-center'>";
        if(data[i].cltpush01004=='0'){
            html+="<img class='circle' src='static/mCheap/images/circle.png'>";
        }else{
            html+="<img class='circle-visibility' src='static/mCheap/images/circle.png'>";
        }
        html+="</div>";
        html+="<div class='mdui-box mdui-box-flex-9 mdui-box-align-center list-title'>"+title+"</div>";
        html+="<div class='mdui-box mdui-box-pack-end mdui-box-flex-1'>";
        if(data[i].cltpush01004=='0'){
            html+="<img class='pic-new' src='static/mCheap/images/new.png'>";
        }else{
            html+="<img class='pic-new-visibility' src='static/mCheap/images/new.png'>";
        }
        html+="</div>";
        html+="</div>";
        html+="<div class='mdui-box mdui-box-flex-1 list-content'>"+content+"</div>";
        html+="<div class='mdui-box mdui-box-flex-1 mdui-box-pack-end list-time'>"+time+"</div>";
        html+="</div>";
    }
    $('.box>div:first-child').css('margin-top','0');
    $('.push').show();
    $("#push_msg").html(msg_html);
    $('#new_msg').html(html);
    //document.querySelector('#new_msg').insertAdjacentHTML('afterbegin',html);
    $("#new_msg>div:last-child").addClass("mc-xby");
    $("#new_msg>div>div:last-child").addClass("mc-xby");
}

//给首页推送消息设置数据
function indexSetData(json){
    var ln = json.data.length;
    if(ln<=0){

    }else{

        $("#mc").css("display","block");
        $("#mc").addClass("mc");
        $("#push_msg").empty();
        $('#new_msg').html('');
        setData(json);
    }
}

//查询用户附近市场接口
function getRoundStationNames(registerID,epsbht01006,epsbht01007){
    $.request({
        urlType:'getRoundStationNames',
        data:{
            "access_token": $.getStorage('access_token'),
            epsbht01006:epsbht01006,
            epsbht01007:epsbht01007,
            epsbht01008:'01',
            registerId:""+registerID
        }
    },function(data){
            //alert("getRoundStationNames"+"*");
    });
}

//推送用户附近的市场的便宜信息接口
function getStationCheapProducts(registerID,epsbht01006,epsbht01007){
    $.request({
        urlType:'getStationCheapProducts',
        data:{
            "access_token": $.getStorage('access_token'),
            epsbht01006:epsbht01006,
            epsbht01007:epsbht01007,
            epsbht01008:'01',
            registerId:""+registerID
        }
    },function(data){
        //alert("getStationCheapProducts"+"*");

    });
}

//推送用户关注产品在附近市场最便宜价格接口
function getFocusProductsInfo(registerID,epsbht01006,epsbht01007){
    $.request({
        urlType:'getFocusProductsInfo',
        data:{
            "access_token": $.getStorage('access_token'),
            epsbht01006:epsbht01006,
            epsbht01007:epsbht01007,
            epsbht01008:'01',
            registerId:""+registerID
        }
    },function(data){
        //alert("getFocusProductsInfo"+"*");
    });
}

//推送用户关注市场有哪些便宜产品接口
function getFocusStationInfo(registerID){
    $.request({
        urlType:'getFocusStationInfo',
        data:{
            "access_token": $.getStorage('access_token'),
            registerId:""+registerID
        }
    },function(data){
        //alert("getFocusStationInfo"+"*");

    });
}

//查询推送过得消息接口
function getPushHistoryMessage(registerID){
    $.request({
        urlType:'getPushHistoryMessage',
        data:{
            "access_token": $.getStorage('access_token'),
            registerId:""+registerID
        }
    },function(data){
        if(data.success) {
            indexSetData(data);
        }
        else {
            $.alert('网络错误')
        }
    });
}


//点击推送消息的产品
$(document).on('tap','.a_product',function(){
    var cltpro01id = $(this).data('cltpro01id');
    var isfocus = $(this).data('isfocus');
    $.openWin({
        name:"market_list",
        winName: 'market_list',
        url:'wgtroot://mCheap/market_list/ui/market_list.html',
        pageParam:{
            cltpro01id :　cltpro01id ,
            isfocus : isfocus
        }
    });
});

//点击推送消息的市场
$(document).on('tap','.a_market',function(){
    $.openWin({
        name:"market",
        winName: 'market',
        url:'wgtroot://mCheap/market/ui/market.html',
        pageParam:{
            cltpit01id:$(this).data('cltpit01id'),
            log:$(this).data('log'),
            lat:$(this).data('lat')
        }
    });
});


//点击推送消息的产品（超市）
$(document).on('tap','.a_product_goods',function(){
    var cltpro01id = $(this).data('cltpro01id');
    var isfocus = $(this).data('isfocus');
    $.openWin({
        name:"product_list_market",
        winName: 'product_list_market',
        url:'wgtroot://supermarket/product_list/ui/product_list_market.html',
        pageParam:{
            cltpro01id :　cltpro01id ,
            isfocus : isfocus
        }
    });
});

//点击推送消息的市场（超市）
$(document).on('tap','.a_supermarket ',function(){
    $.openWin({
        name:"product_show",
        winName: 'product_show',
        url:'wgtroot://supermarket/market_product_show/ui/product_show.html',
        pageParam:{
            cltpit01id:$(this).data('cltpit01id'),
            log:$(this).data('log'),
            lat:$(this).data('lat')
        }
    });
});

//点击推送消息的产品（药店）
$(document).on('tap','.a_product_drug',function(){
    var cltpro01id = $(this).data('cltpro01id');
    var isfocus = $(this).data('isfocus');
    $.openWin({
        name:"shop_list",
        winName: 'shop_list',
        url:'wgtroot://medicine/shop_list/ui/shop_list.html',
        pageParam:{
            cltpro01id :　cltpro01id ,
            isfocus : isfocus
        }
    });
});

//点击推送消息的药店（药店）
$(document).on('tap','.a_medicine  ',function(){
    $.openWin({
        name:"shop_sort",
        winName: 'shop_sort',
        url:'wgtroot://medicine/medicine_shop/ui/shop_sort.html',
        pageParam:{
            cltpit01id:$(this).data('cltpit01id'),
            log:$(this).data('log'),
            lat:$(this).data('lat')
        }
    });
});

//点击推送消息的医院（医院）
$(document).on('tap','.a_hospital ',function(){
    $.openWin({
        name:"hos_main",
        winName: 'hos_main',
        url:'wgtroot://hospital/hos_main/ui/hos_main.html',
        pageParam:{
            cltpit01id:$(this).data('cltpit01id'),
            log:$(this).data('log'),
            lat:$(this).data('lat')
        }
    });
});





