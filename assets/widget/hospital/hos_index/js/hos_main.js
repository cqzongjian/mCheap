
function clickLevelHos(){
    $(document).on("tap",".hoslevel",function(){
        var cltpit01id=$(this).find('.hoslevelimg').data('clthtp01id');
        var title = $(this).find('.hoslevelimg').data('clthtp01001');
        var address = $(this).find('.hoslevelimg').data('clthtp01006');
        var distance = $(this).find('.hoslevelimg').data('distance');
        var clthtp01013 = $(this).find('.hoslevelimg').data('clthtp01013');
        var time = $(this).find('.hoslevelimg').data('clthtp01011');
        var comment = $(this).find('.hoslevelimg').data('tiaoshu');
        var isFocus = $(this).find('.hoslevelimg').data('isfocus');
        var log = $(this).find('.hoslevelimg').data('log');
        var lat = $(this).find('.hoslevelimg').data('lat');
        if(comment == null || typeof(comment) == "undefined"||comment == 'null' ){
            comment= 0;
        }
        $.openWin({
            name:'hos_main',
            animId : 2,
            url:'wgtroot://hospital/hos_main/ui/hos_main.html',
            pageParam:{
                cltpit01id:cltpit01id,
                title:title,
                address:address,
                distance:distance,
                clthtp01013:clthtp01013,
                time:time,
                comment:comment,
                isfocus:isFocus,
                lat:lat,
                log:log
            }
        });
    })
}
/*
* 设置医院等级
* */
function setYouLike(data,boole){
    var html='';
    for(var i=0;i<data.length;i++){
        var m=0;
        var j=0;
        var url;
        image.setCount(data.length);
        html+='<div class="tj-list-item mdui-box hoslevel">';
        html+='<div>';
        html+='<img class="hoslevelimg" src="'+$.serverSettings.serverPath+'/mobile/mcheap/hosiptalAction!getHosiptalPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].clthtp01010+'"' +
            'data-clthtp01001="' +data[i].clthtp01001+'"'+ //医院名称
            'data-clthtp01006="' +data[i].clthtp01006+'"'+//地址
            'data-clthtp01013="' +data[i].clthtp01013+'"'+//等级
            'data-clthtp01011="' +data[i].clthtp01011+'"'+//营业时间
            'data-clthtp01id="' +data[i].clthtp01id+'"'+//医院id
            'data-isfocus="' +data[i].isfocus+'"'+//评论条数
            'data-distance="' +data[i].distance+'"'+//评论条数
            'data-log="' +data[i].clthtp01004+'"'+//经度
            'data-lat="' +data[i].clthtp01005+'"'+//纬度
            '/>';
        html+='</div>';
        html+='<div class="mdui-box-flex-1" >';
        html+='<div class="list-item-title">'+data[i].clthtp01001+'</div>';
        html+='<div class="star">';
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
        }
        else{
            for (j=0;j<5;j++){
                html+='<img src="../image/star_02.png" />'
            }
        }
        html+='</div>';
        html+='<div class="market-address">'+data[i].clthtp01006+'</div>';
        html += '<div class="market-yysj">营业时间：' + data[i].clthtp01011  + '</div>';
        html+='</div>';
        html+='<div class="market-dis">'+data[i].distance+'km</div>';
        html+='</div>';
    }
    if(boole) {
        $('.tj-caipu>.tj-list').html(html);
    }
    else {
        html+='</div></div>';
        $('.focusMarket').html(html);
    }
    clickLevelHos();
}

/*
* 生成医院html
* */
function creatHtml(data){
    var html='',len=data.length;
    for(var i=0;i<len;i++){
        var m=0;
        var j=0;
        html+='<div class="tj-list-item mdui-box" data-cltpit01id="'+data[i].clthtp01id +'"';
        html += 'data-src ="'+data[i].clthtp01010+'"';
        html += 'data-title = "'+data[i].clthtp01001+'"';
        html += 'data-address ="'+data[i].clthtp01006+'"';
        html += 'data-time = "'+data[i].clthtp01011+'"';
        html += 'data-distance="'+data[i].distance+'"';
        html += 'data-clthtp01013="'+data[i].clthtp01013+'"';
        html +='data-log="' +data[i].clthtp01004+'"';//经度
        html +='data-lat="' +data[i].clthtp01005+'"';//纬度
        html += 'data-focus="'+data[i].isfocus;
        html +='">';
        html+='<div>';
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/hosiptalAction!getHosiptalPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].clthtp01010+'">';
        html+='</div>';
        html+='<div class="mdui-box-flex-1" >';
        html+='<div class="list-item-title">'+data[i].clthtp01001+'</div>';
        html+='<div class="star">';
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
        }
        else{
            for (j=0;j<5;j++){
                html+='<img src="../image/star_02.png" />'
            }
        }
        html+='</div>';
        html+='<div class="market-address">'+data[i].clthtp01006+'</div>';
        html += '<div class="market-yysj">营业时间：' + data[i].clthtp01011  + '</div>';
        html+='</div>';
        html+='<div class="market-dis">'+data[i].distance+'km</div>';
        html+='</div>';
    }
    return html;
}
function sortDataByKey(data,key,desc){
    return data.sort(function(a,b){
        return desc?b[key]-a[key]:a[key]-b[key];
    })
}
function setBanner(data){
    var html='';
    var len=data.length;
    var last=len-1;
    if(len==2){

    }else{
        html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[last].clthtp01id+'" data-title = "'+data[last].clthtp01001+'" data-address ="'+data[last].clthtp01006+'" data-time = "'+data[last].clthtp01011+'" data-distance="'+data[last].distance+'" data-clthtp01013="'+data[last].clthtp01013+'" data-focus="'+data[last].isfocus+'" data-log="' +data[last].clthtp01004+'" data-lat="' +data[last].clthtp01005+'">';
        html+='<a href="#">';
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/hosiptalAction!getHosiptalPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].clthtp01010+'"/>';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[last].clthtp01001+'</div>';
        html+='<div class="mask-sub">'+data[last].clthtp01006+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }


    for(var i=1;i<len;i++){
        html+='<div class="mdui-slider-item" data-cltpit01id="'+data[i].clthtp01id+'" data-title = "'+data[i].clthtp01001+'" data-address ="'+data[i].clthtp01006+'" data-time = "'+data[i].clthtp01011+'" data-distance="'+data[i].distance+'" data-clthtp01013="'+data[i].clthtp01013+'" data-focus="'+data[i].isfocus+'" data-log="' +data[i].clthtp01004+'" data-lat="' +data[i].clthtp01005+'">';
        html+=' <a href="#">';
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/hosiptalAction!getHosiptalPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].clthtp01010+'"/>';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[i].clthtp01001+'</div>';
        html+='<div class="mask-sub">'+data[i].clthtp01006+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[0].clthtp01id+'" data-title = "'+data[0].clthtp01001+'" data-address ="'+data[0].clthtp01006+'" data-time = "'+data[0].clthtp01011+'" data-distance="'+data[0].distance+'" data-clthtp01013="'+data[0].clthtp01013+'" data-focus="'+data[0].isfocus+'" data-log="' +data[0].clthtp01004+'" data-lat="' +data[0].clthtp01005+'">';
    html+='<a href="#">';
    html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/hosiptalAction!getHosiptalPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[0].clthtp01010+'"/>';

    html+='<div class="mask">';
    html+='<div class="mask-title">'+data[0].clthtp01001+'</div>';
    html+='<div class="mask-sub">'+data[0].clthtp01006+'</div>';
    html+='</div>';
    html+='</a>';
    html+='</div>';
    $('.mdui-slider-loop').html(html);

    // var serverPath =
    // $($(".tj-market>.tj-list").find(".nearmarket-img")).each(function(index,each){
    //     var $img = $(each);
    //     image.setImage($img.attr("imgid"),$img.attr("imgsrc"),ImageType.product,$img);
    // });

    $('#slider').slider({
        interval:3000
    });
}