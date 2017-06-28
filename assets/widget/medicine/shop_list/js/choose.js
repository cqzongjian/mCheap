/*------------------------筛选的js---------------------------------------*/
//显示出筛选选项
$('.top-choose').on('tap',function(){
    if($(this).hasClass('top-choose-on')){
        $('.mc').hide();
        $(this).removeClass('top-choose-on');
    }else{
        $('.mc').show();
        $(this).addClass('top-choose-on');
    }
});

//点击距离筛选
$('.sx-box').on('tap','.sx-l',function(){
    $('.my').hide();
    $('.sx-r').removeClass('sx-right-on').addClass('sx-right');
    if($(this).hasClass('sx-left-on')){
        $(this).removeClass('sx-left-on').addClass('sx-left');
        $('.distance').hide();
    }else{
        $(this).removeClass('sx-left').addClass('sx-left-on');
        $('.distance').show();
    }

});
//距离点击事件
$('.distance>div').on('tap',function(){
    $('.distance>div').each(function(){
        $(this).removeClass('distance-item-on').addClass('distance-item');
    });
    $('.sx-l').html($(this).html());
    $(this).addClass('distance-item-on');
    $('.sx-r').trigger('tap');
});



//点击选项筛选项目
$('.sx-box').on('tap','.sx-r',function(){
    $('.distance').hide();
    $('.sx-l').removeClass('sx-left-on').addClass('sx-left');
    if($(this).hasClass('sx-right-on')){
        $(this).removeClass('sx-right-on').addClass('sx-right');
        $('.my').hide();
    }else{
        $(this).removeClass('sx-right').addClass('sx-right-on');
        $('.my').show();
    }
});

//设置我的关注等选项的选择
$('.my-choose>div').on('tap',function(){
    if($(this).hasClass('my-item-on')){
        $(this).removeClass('my-item-on').addClass('my-item');
    }else{
        $(this).removeClass('my-item').addClass('my-item-on');
    }
});

$('.reset').on('tap',function(){
    $('.my-choose>div').each(function(){
        if($(this).hasClass('my-item-on')){
            $(this).removeClass('my-item-on').addClass('my-item');
        }
    });
    $('.px>div').each(function(){
        if($(this).hasClass('px-my-item-on')){
            $(this).removeClass('px-my-item-on').addClass('px-my-item');
        }
    })
});
/*------------------------筛选的js---------------------------------------*/
/*------------------------筛选时候调用的js---------------------------------------*/
function getDistance(far){
    switch(far){
        case '附近':return '0';
            break;
        case '1km':return '1';
            break;
        case '2km':return '2';
            break;
        case '3km':return '3';
            break;
        case '4km':return '4';
            break;
        case '全城':return '';
            break;
    }
}


//设置数据
function setData(data){
    var html='',len=data.length;
    if(len){
        for(var i=0;i<len;i++){
            var m=0,j=0;
            html+='<div class="mdui-box list-box" data-range="'+data[i].cltpit01011+'" data-lsh="'+data[i].cltpit01id+'" data-star="'+data[i].star+'" data-tiaoshu="'+data[i].tiaoshu+'" data-focus="'+data[i].isfocus+'" data-picture="'+data[i].cltpit02002+'" data-log="'+data[i].cltpit01007+'" data-lat="'+data[i].cltpit01008+'">';
            html+='<div class="far">'+data[i].distance+'km</div>';
            html+='<div class="img-box">';
            html+='<img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+ $.getStorage('access_token')+'&url='+data[i].cltpit02002+'" class="market-img-box"/>';
            html+='</div>';
            html+='<div class="market-detail">';
            html+='<div class="market-list-name">'+data[i].cltpit01001+'</div>';
            html+='<div class="start-box">';
            if(data[i].star) {
                for(j;j<parseInt(data[i].star);j++){
                    html+='<img src="../image/star_01.png" />';
                    m++;
                }
                if (parseInt(data[i].star.split('.')[1])>0){
                    html+='<img src="../image/star_03.png"/>';
                    m++;
                }
                if(m<5){
                    for (j=m;j<5;j++){
                        html+='<img src="../image/star_02.png"/>';
                    }
                }
            } else{
                for (j=0;j<5;j++){
                    html+='<img src="../image/star_02.png" />'
                }
            }
            html+='</div>';
            html+='<div class="address">地址:'+data[i].cltpit01004+'</div>';
            html+='<div class="time">营业时间:'+data[i].cltpit01005+'~'+data[i].cltpit01006+'</div>';
            html+='</div>';
            //var focus = parseInt(data[i].isfocus);
            //if(focus){
            //    html+='<div class="set-like">';
            //    html+='<img src="../image/like.png"/>';
            //    html+='</div>';
            //}else{
            //    html+='<div class="set-like">';
            //    html+='<img src="../image/dislike.png"/>';
            //    html+='</div>';
            //}
            html+='</div>';
        }
        $('.product-show').append(html);
    }else{
        html='<div class="no-data">暂无数据</div>';
        $('.product-show').html(html);
    }
}


//设置数据
function setThisData(data){
    var html='',len=data.length;
    if(len){
        for(var i=0;i<len;i++){
            var m=0,j=0;
            html+='<div class="mdui-box list-box" data-range="'+data[i].ranges+'" data-lsh="'+data[i].cltpit01id+'" data-star="'+data[i].star+'" data-tiaoshu="'+data[i].tiaoshu+'" data-focus="'+data[i].isfocus+'" data-picture="'+data[i].cltpit02002+'" data-log="'+data[i].cltpit01007+'" data-lat="'+data[i].cltpit01008+'">';
            html+='<div class="far">'+data[i].distance+'km</div>';
            html+='<div class="img-box">';
            html+='<img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+ $.getStorage('access_token')+'&url='+data[i].cltpit02002+'" class="market-img-box"/>';
            html+='</div>';
            html+='<div class="market-detail">';
            html+='<div class="market-list-name">'+data[i].cltpit01001+'</div>';
            html+='<div class="start-box">';
            if(data[i].star) {
                for(j;j<parseInt(data[i].star);j++){
                    html+='<img src="../image/star_01.png" />';
                    m++;
                }
                if (parseInt(data[i].star.split('.')[1])>0){
                    html+='<img src="../image/star_03.png"/>';
                    m++;
                }
                if(m<5){
                    for (j=m;j<5;j++){
                        html+='<img src="../image/star_02.png"/>';
                    }
                }
            } else{
                for (j=0;j<5;j++){
                    html+='<img src="../image/star_02.png" />'
                }
            }
            html+='</div>';
            html+='<div class="address">地址:'+data[i].cltpit01004+'</div>';
            html+='<div class="time">营业时间:'+data[i].cltpit01005+'~'+data[i].cltpit01006+'</div>';
            html+='</div>';
            html+='<div class="store-price">￥'+data[i].price+'</div>';
            //var focus = parseInt(data[i].isfocus);
            //if(focus){
            //    html+='<div class="list-set-like">';
            //    html+='<img src="../image/like.png"/>';
            //    html+='</div>';
            //}else{
            //    html+='<div class="list-set-like">';
            //    html+='<img src="../image/dislike.png"/>';
            //    html+='</div>';
            //}
            html+='</div>';
            html+='</div>';
        }
        $('.product-show').append(html);
    }else{
        html='<div class="no-data">暂无数据</div>';
        $('.product-show').html(html);
    }
}