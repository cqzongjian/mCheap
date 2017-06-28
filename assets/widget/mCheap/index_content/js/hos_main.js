/**
 * Created by Administrator on 2016/7/5.
 */
/*
 * 设置分类
 * */
function setSort(data){
    // /*
    // 测试数据datas
    //  */
    // var datas = [
    //     {categoryid:1121,
    //         categoryname:"外科" },
    //     {categoryid:1122,
    //         categoryname:"内科" },
    //     {categoryid:1123,
    //         categoryname:"皮肤病科" },
    //     {categoryid:1124,
    //         categoryname:"脑科" },
    //     {categoryid:1125,
    //         categoryname:"更多" },
    // ]
    // var html='';
    // var len=datas.length;
    // for(var i=0;i<len;i++){
    //     html+='<div class="mdui-box-flex-1">';
    //     html+='<a class="sort-item btn-com" data-id="'+datas[i].categoryid+'">';
    //     switch (datas[i].categoryname){
    //         case "外科":
    //             html+='<img src="../images/1.png"><br>';
    //             break;
    //         case "内科":
    //             html+='<img src="../images/2.png"><br>';
    //             break;
    //         case "皮肤病科":
    //             html+='<img src="../images/3.png"><br>';
    //             break;
    //         case "脑科":
    //             html+='<img src="../images/4.png"><br>';
    //             break;
    //         case "更多":
    //             html+='<img src="../images/5.png"><br>';
    //             break;
    //
    //     }
    //     html+='<span>'+datas[i].categoryname+'</span>';
    //     html+='</a></div>'
    // }
    // $('.sort').html(html);
    // $.setStorage('sortHtml',html)
}
/*
*设置首页推荐
* url待处理
* */
function setCaipu(data){
    // var html='';
    // var len=data.length;
    // if(len>=3){
    //     len=3;
    // }
    // for(var i=0;i<len;i++) {
    //     image.setCount(len);
    //     var url=data[i].epsrmm04002;
    //     html += '<div class="tj-list-item mdui-box btn-com" data-id="'+data[i].epsrmm01id+'">';
    //     // html += '<div><img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getPhoto.do?access_token='+ $.getStorage('access_token')+'&url='+url+'"/></div>';
    //    // html += '<div><img class="caipu-img" imgid="'+data[i].epsrmm01id+'" imgsrc="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getPhoto.do?url='+url+'&access_token='+$.getStorage('access_token')+'" src=""/></div>';
    //     html += '<div><img class="caipu-img" imgid="'+data[i].epsrmm01id+'" imgsrc="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getPhoto.do?url='+url+'&access_token='+$.getStorage('access_token')+'" src="../images/testdoctor.jpg"/></div>';
    //     html += '<div class="mdui-box-flex-1">';
    //     html += '<div class="list-item-title">' + '熊继柏' + '</div>';
    //     html += '<div class="list-item-sub mdui-ellipsis-2">'+'职称:教授 主任医师 硕士导师'+'&nbsp;&nbsp;&nbsp;&nbsp;擅长科目:'+'肿瘤外科'+'</div>';
    //     html += '</div>';
    //     html += '</div>';
    // }
    // $('.tj-caipu>.tj-list').html(html);
    // $($(".tj-caipu>.tj-list").find(".caipu-img")).each(function(index,each){
    //     var $img = $(each);
    //     $.log('imgsrc: '+$img.attr("imgsrc"));
    //     image.setImage($img.attr("imgid"),$img.attr("imgsrc"),ImageType.cookbook,$img);
    // });

}
function clickLevelHos(){
    $(".hoslevel").on("tap",".hoslevelimg",function(){
        var cltpit01id=$(this).data('clthtp01id');
        var title = $(this).data('clthtp01001');
        var address = $(this).data('clthtp01006');
        var distance = $(this).data('distance');
        var clthtp01013 = $(this).data('clthtp01013');
        var time = $(this).data('clthtp01011');
        var comment = $(this).data('tiaoshu');
        var isFocus = $(this).data('isfocus');
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
                isfocus:isFocus
            }
        });
    })
}
/*
* 设置医院等级
* */
function setYouLike(data,boole,n){
    var srcpath = "../images/hos_slider/";
    var html='';
    for(var i=0;i<data.length;i++){
        var m=0;
        var j=0;
        var url;
        image.setCount(data.length);
        html+='<div class="tj-list-item mdui-box hoslevel">';
        html+='<div>';
        // html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].cltpit02002+'">';
        html+='<img class="hoslevelimg" src="'+srcpath+n+'.jpg'+'"' +
            'data-clthtp01001="' +data[i].clthtp01001+'"'+ //医院名称
            'data-clthtp01006="' +data[i].clthtp01006+'"'+//地址
            'data-clthtp01013="' +data[i].clthtp01013+'"'+//等级
            'data-clthtp01011="' +data[i].clthtp01011+'"'+//营业时间
            'data-clthtp01id="' +data[i].clthtp01id+'"'+//医院id
            'data-tiaoshu="' +data[i].tiaoshu+'"'+//评论条数
            'data-isfocus="' +data[i].isfocus+'"'+//评论条数
            'data-distance="' +data[i].distance+'"'+//评论条数
            '/>';
        html+='</div>';
        html+='<div class="mdui-box-flex-1" >';
        html+='<div class="list-item-title">'+data[i].clthtp01001+'</div>';
        html+='<div class="star">';
        if(data[i].star) {
            for(j;j<parseInt(data[i].star);j++){
                html+='<img src="../images/star_01.png" />';
                m++;
            }
            if (parseInt(data[i].star.split('.')[1])>0){
                html+='<img src="../images/star_03.png"/>';
                m++;
            }
            if(m<5){
                for (j=m;j<5;j++){
                    html+='<img src="../images/star_02.png"/>';
                }
            }
        }
        else{
            for (j=0;j<5;j++){
                html+='<img src="../images/star_02.png" />'
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
        console.log("医院等级:"+html)
        $('.tj-caipu>.tj-list').html(html);

    }
    else {
        html+='</div></div>';
        $('.focusMarket').html(html);
    }
    clickLevelHos();
}

/*
* setNearMarket
* */
function setNearMarket(data,boole,homepage){
    var srcpath = "../images/hos_slider/";
    var html='';
    if(!boole){
        html+='<div class="tj-focusMarket">';
        html+='<div class="tj-title"><img src="../images/store.png">&nbsp;关注医院</div>';
        html+='<div class="tj-more" id="wdgz">我的关注&nbsp;<img src="../images/you.png"></div>';
        html+='<div class="tj-list">';
    }
    if(homepage == '01'){
        var len = 3
    }else{
        len = data.length;
    }
    for(var i=0;i<len;i++){
        var m=0;
        var j=0;
        var url;
        var n = i+1;
        html+='<div class="tj-list-item mdui-box" data-cltpit01id="'+data[i].clthtp01id +'"';
        html += 'data-src ="'+srcpath+n+'.jpg"';
        html += 'data-title = "'+data[i].clthtp01001+'"';
        html += 'data-address ="'+data[i].clthtp01006+'"';
        html += 'data-time = "'+data[i].clthtp01011+'"';
        html += 'data-distance="'+data[i].distance+'"';
        html += 'data-clthtp01013="'+data[i].clthtp01013+'"';
        html += 'data-tiaoshu="'+data[i].tiaoshu;
        html +='">';
        html+='<div>';
        // html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].cltpit02002+'">';
        html+='<img src="'+srcpath+n+'.jpg'+'"/>';
        html+='</div>';
        html+='<div class="mdui-box-flex-1" >';
        html+='<div class="list-item-title">'+data[i].clthtp01001+'</div>';
        html+='<div class="star">';
        if(data[i].star) {
            for(j;j<parseInt(data[i].star);j++){
                html+='<img src="../images/star_01.png" />';
                m++;
            }
            if (parseInt(data[i].star.split('.')[1])>0){
                html+='<img src="../images/star_03.png"/>';
                m++;
            }
            if(m<5){
                for (j=m;j<5;j++){
                    html+='<img src="../images/star_02.png"/>';
                }
            }
        }
        else{
            for (j=0;j<5;j++){
                html+='<img src="../images/star_02.png" />'
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

        $('.tj-market>.tj-list').html(html);
    }
    else {
        html+='</div></div>';
       $('.focusMarket').html(html);
   }
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
    var srcpath = "../images/hos_slider";
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[last].cltpit01id+'">';
    html+='<a href="#">';
    html+='<img src="'+srcpath+'/'+3+'.jpg'+'"/>';
    // html+='<img class="banner-img" src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';

    html+='<div class="mask">';
    html+='<div class="mask-title">'+data[last].clthtp01001+'</div>';
    html+='<div class="mask-sub">'+data[last].clthtp01006+'</div>';
    html+='</div>';
    html+='</a>';
    html+='</div>';

    for(var i=1;i<4;i++){
        html+='<div class="mdui-slider-item" data-cltpit01id="'+data[i].cltpit01id+'">';
        html+=' <a href="#">';
        html+='<img src="'+srcpath+'/'+i+'.jpg'+'"/>';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[i].clthtp01001+'</div>';
        html+='<div class="mask-sub">'+data[i].clthtp01006+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[0].cltpit01id+'">';
    html+='<a href="#">';
    html+='<img src="'+srcpath+'/'+1+'.jpg'+'"/>';

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