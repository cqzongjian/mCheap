/**
 * Created by Administrator on 2016/7/5.
 */
/*
 * 设置分类
 * */
function setSort(data){
    var html='';
    var len=data.length;
    for(var i=0;i<len;i++){
        html+='<div class="mdui-box-flex-1">';
        html+='<a class="sort-item btn-com" data-id="'+data[i].categoryid+'">';
        switch (data[i].categoryname){
            case "蔬菜":
                html+='<img src="../images/1.png"><br>';
                break;
            case "粮油":
                html+='<img src="../images/2.png"><br>';
                break;
            case "肉禽蛋":
                html+='<img src="../images/3.png"><br>';
                break;
            case "水产":
                html+='<img src="../images/4.png"><br>';
                break;
            case "水果":
                html+='<img src="../images/5.png"><br>';
                break;

        }
        html+='<span>'+data[i].categoryname+'</span>';
        html+='</a></div>'
    }
    $('.sort').html(html);
    $.setStorage('sortHtml',html)
}
/*
*设置首页推荐
* url待处理
* */
function setCaipu(data){
    var html='';
    var len=data.length;
    if(len>=3){
        len=3;
    }
    for(var i=0;i<len;i++) {
        image.setCount(len);
        var url=data[i].epsrmm04002;
        html += '<div class="tj-list-item mdui-box btn-com" data-id="'+data[i].epsrmm01id+'">';
        // html += '<div><img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getPhoto.do?access_token='+ $.getStorage('access_token')+'&url='+url+'"/></div>';
        html += '<div><img class="caipu-img" imgid="'+data[i].epsrmm01id+'" imgsrc="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getPhoto.do?url='+url+'&access_token='+$.getStorage('access_token')+'" src=""/></div>';

        html += '<div class="mdui-box-flex-1">';
        html += '<div class="list-item-title">' + data[i].epsrmm01001 + '</div>';
        html += '<div class="list-item-sub mdui-ellipsis-2">'+'适合人数:'+data[i].epsrmm01003+'人&nbsp;&nbsp;&nbsp;&nbsp;预算价格:'+data[i].epsrmm01004+'元</div>';
        html += '</div>';
        html += '</div>';
    }
    $('.tj-caipu>.tj-list').html(html);
    $($(".tj-caipu>.tj-list").find(".caipu-img")).each(function(index,each){
        var $img = $(each);
        // $.log('imgsrc: '+$img.attr("imgsrc"));
        image.setImage($img.attr("imgid"),$img.attr("imgsrc"),ImageType.cookbook,$img);
    });

}
/*
* 设置猜你喜欢
* */
function setYouLike(data){
    var html='';
    for(var i=0;i<data.length;i++){
        html+='<div class="mdui-box btn-com">';
        html+='<div class="tj-list-item mdui-box mdui-box-flex-1" data-epsgyl01002="'+data[i].epsgyl01002+'" data-epsgyl01001="'+data[i].epsgyl01001+'" data-name="'+data[i].likeName+'"data-epsgyl01002="'+data[i].epsgyl01002+'"data-epsgyl01003="'+data[i].epsgyl01003+'"data-cltprc05004="'+data[i].cltprc05004;
        html+='" data-cltprc05005="'+data[i].cltprc05005+'" data-cltprc05006="'+data[i].cltprc05006+'" data-cltprc05007="'+data[i].cltprc05007;
        html+='">';
        if(data[i].epsgyl01001=='01') {
            html += '<div><img src="' + $.serverSettings.serverPath + '/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token=' + $.getStorage('access_token') + '&url=' + data[i].url + '"/></div>';
        }
        else{
            html += '<div><img src="' + $.serverSettings.serverPath + '/mobile/mcheap/mcheapAction!getPicture.do?access_token=' + $.getStorage('access_token') + '&url=' + data[i].url + '"/></div>';
        }
        html+='<div class="mdui-box-flex-1">';
        html+='<div class="list-item-title" data-log="'+data[i].log+'" data-lat="'+data[i].lat+'">'+data[i].likeName+'</div>';
        html+='<div class="list-item-sub mdui-ellipsis-2">'+data[i].epsgyl01005+'</div>';
        html+='</div>';
        html+='</div>';
        if(data[i].epsgyl01001=='01') {
            html += '<div class="list-item-dis"><img src="../images/dis.png">&nbsp;'+data[i].distance+'km</div>';
        }
        html+='</div>';
    }
    $('.tj-like>.tj-list').html(html);

}
/*
* setNearMarket
* */
function setNearMarket(data,boole){
    var html='';
    if(!boole){
        html+='<div class="tj-focusMarket">';
        html+='<div class="tj-title"><img src="../images/store.png">&nbsp;关注市场</div>';
        html+='<div class="tj-more" id="wdgz">我的关注&nbsp;<img src="../images/you.png"></div>';
        html+='<div class="tj-list">';
    }
    for(var i=0;i<data.length;i++){
        var m=0;
        var j=0;
        var picurl=data[i].cltpit02002?data[i].cltpit02002:data[i].url;
        //image.setCount(data.length);
        html+='<div class="tj-list-item mdui-box" data-cltpit01id="'+data[i].cltpit01id+'" data-cltpit01001="'+data[i].cltpit01001+'" data-log="'+data[i].cltpit01007+'" data-lat="'+data[i].cltpit01008+'">';
        html+='<div>';
        //boole?url=data[i].cltpit02002:url=data[i].url;
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+picurl+'">';

        //html+='<img class="nearmarket-img" imgid="'+data[i].cltpit01id+'" imgsrc="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?url='+url+'&access_token='+$.getStorage('access_token')+'" src="">';
        html+='</div>';
        html+='<div class="mdui-box-flex-1">';
        html+='<div class="list-item-title">'+data[i].cltpit01001+'</div>';
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
        html+='<div class="market-address">'+data[i].cltpit01004+'</div>';
        html += '<div class="market-yysj">营业时间：' + data[i].cltpit01005 + '~' + data[i].cltpit01006 + '</div>';
        html+='</div>';
        html+='<div class="market-dis">'+data[i].distance+'km</div>';
        html+='</div>';
    }
    if(boole) {
        $('.tj-market>.tj-list').html(html);
        $($(".tj-market>.tj-list").find(".nearmarket-img")).each(function (index, each) {
            var $img = $(each);
            image.setImage($img.attr("imgid"), $img.attr("imgsrc"), ImageType.market, $img);
        });
    }
    else {
        html+='</div></div>';
       $('.focusMarket').html(html)
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
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[last].cltpit01id+'" data-log="'+data[last].cltpit01007+'" data-lat="'+data[last].cltpit01008+'">';
    html+='<a href="#">';
    html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';
    // html+='<img class="banner-img" src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';

    html+='<div class="mask">';
    html+='<div class="mask-title">'+data[last].cltpit01001+'</div>';
    html+='<div class="mask-sub">'+data[last].cltpit01004+'</div>';
    html+='</div>';
    html+='</a>';
    html+='</div>';
    for(var i=0;i<len;i++){
        html+='<div class="mdui-slider-item" data-cltpit01id="'+data[i].cltpit01id+'" data-log="'+data[i].cltpit01007+'" data-lat="'+data[i].cltpit01008+'">';
        html+=' <a href="#">';
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].cltpit02002+'">';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[i].cltpit01001+'</div>';
        html+='<div class="mask-sub">'+data[i].cltpit01004+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }
    html+= '<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[0].cltpit01id+'" data-log="'+data[0].cltpit01007+'" data-lat="'+data[0].cltpit01008+'">';
    html+= '<a href="#">';
    html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[0].cltpit02002+'">';
    html+= '<div class="mask">';
    html+='<div class="mask-title">'+data[0].cltpit01001+'</div>';
    html+='<div class="mask-sub">'+data[0].cltpit01004+'</div>';
    html+='</div>';
    html+= '</a>';
    html+= '</div>';
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