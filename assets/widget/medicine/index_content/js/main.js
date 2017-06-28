/**
 * Created by Administrator on 2016/7/5.
 */
/*
 * 设置分类
 * */
function setSort(data){
    var htmlOne='',htmlTwo='', i,len=data.length,dz,name;
    for(i=0;i<len;i++){
        if(i<5){
            htmlOne +='<div class="sort-box" data-id="'+data[i].midid+'" data-name="'+data[i].midname+'">';
            htmlOne +='<div class="picture-box">';
            name = data[i].midname.substring(0,4);
            dz = choosePic(data[i].midid);
            htmlOne +='<img src="'+dz+'" class="pro-img">';
            htmlOne +='</div>';
            htmlOne +='<div class="sort-item">'+name+'</div>';
            htmlOne +='</div>';
        }else{
            htmlTwo +='<div class="sort-box" data-id="'+data[i].midid+'" data-name="'+data[i].midname+'">';
            htmlTwo +='<div class="picture-box">';
            name = data[i].midname.substring(0,4);
            dz = choosePic(data[i].midid);
            htmlTwo +='<img src="'+dz+'" class="pro-img">';
            htmlTwo +='</div>';
            htmlTwo +='<div class="sort-item">'+name+'</div>';
            htmlTwo +='</div>';
        }
    }
    htmlTwo +='<div class="sort-box" data-id="more">';
    htmlTwo +='<div class="picture-box">';
    htmlTwo +='<img src="../images/10.png" class="pro-img">';
    htmlTwo +='</div>';
    htmlTwo +='<div class="sort-item">更多</div>';
    htmlTwo +='</div>';
    $('.sort').html(htmlOne);
    $('.sort-two').html(htmlTwo);
}

/*
 * 分类选图标
 * */
function choosePic(id){
    var src;
    switch(id){
    
    case '401':src='../images/1.png';
             return src;
          break;
case '402':src='../images/2.png';
    return src;
    break;
case '403':src='../images/3.png';
    return src;
    break;
case '404':src='../images/4.png';
    return src;
    break;
case '405':src='../images/5.png';
    return src;
    break;
case '406':src='../images/6.png';
    return src;
    break;
case '407':src='../images/7.png';
    return src;
    break;
case '408':src='../images/8.png';
    return src;
    break;
case '409':src='../images/9.png';
    return src;
    break;
case '420':src='../images/11.png';
    return src;
    break;
case '415':src='../images/12.png';
    return src;
    break;
case '418':src='../images/21.png';
    return src;
    break;
case '423':src='../images/14.png';
    return src;
    break;
case '417':src='../images/16.png';
    return src;
    break;
case '424':src='../images/17.png';
    return src;
    break;
case '416':src='../images/19.png';
    return src;
    break;
case '414':src='../images/20.png';
    return src;
    break;
case '422':src='../images/22.png';
    return src;
    break;
case '425':src='../images/23.png';
    return src;
    break;
case '419':src='../images/24.png';
    return src;
    break;
case '411':src='../images/26.png';
    return src;
    break;
case '410':src='../images/13.png';
    return src;
    break;
case '421':src='../images/15.png';
    return src;
    break;
case '412':src='../images/18.png';
    return src;
    break;
case '413':src='../images/25.png';
    return src;
    break;
    }
}

function setBanner(data){
    var html='';
    var len=data.length;
    var last=len-1;
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-tiaoshu="'+data[last].tiaoshu+'" data-lsh="'+data[last].cltpit01id+'" data-star="'+data[last].star+'" data-tiaoshu="'+data[last].tiaoshu+'" data-range="'+data[last].cltpit01011+'" data-focus="'+data[last].isfocus+'" data-yysj="营业时间:'+data[last].cltpit01005+'~'+data[last].cltpit01006+'" data-picture="'+data[last].cltpit02002+'" data-log="'+data[last].cltpit01007+'" data-lat="'+data[last].cltpit01008+'">';
    html+='<a href="#">';
    html+='<img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+ $.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';
    // html+='<img class="banner-img" src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';

    html+='<div class="mask">';
    html+='<div class="mask-title">'+data[last].cltpit01001+'</div>';
    html+='<div class="mask-sub">地址:'+data[last].cltpit01004+'</div>';
    html+='</div>';
    html+='</a>';
    html+='</div>';
    for(var i=0;i<len;i++){
        html+='<div class="mdui-slider-item" data-tiaoshu="'+data[i].tiaoshu+'" data-lsh="'+data[i].cltpit01id+'" data-star="'+data[i].star+'" data-tiaoshu="'+data[i].tiaoshu+'" data-range="'+data[i].cltpit01011+'" data-focus="'+data[i].isfocus+'" data-yysj="营业时间:'+data[i].cltpit01005+'~'+data[i].cltpit01006+'" data-picture="'+data[i].cltpit02002+'" data-log="'+data[i].cltpit01007+'" data-lat="'+data[i].cltpit01008+'">';
        html+=' <a href="#">';
        html+='<img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+ $.getStorage('access_token')+'&url='+data[i].cltpit02002+'">';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[i].cltpit01001+'</div>';
        html+='<div class="mask-sub">地址:'+data[i].cltpit01004+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }
    html+= '<div class="mdui-slider-item mdui-slider-item-duplicate" data-tiaoshu="'+data[0].tiaoshu+'" data-lsh="'+data[0].cltpit01id+'" data-star="'+data[0].star+'" data-tiaoshu="'+data[0].tiaoshu+'" data-range="'+data[0].cltpit01011+'" data-focus="'+data[0].isfocus+'" data-yysj="营业时间:'+data[0].cltpit01005+'~'+data[0].cltpit01006+'" data-picture="'+data[0].cltpit02002+'" data-log="'+data[0].cltpit01007+'" data-lat="'+data[0].cltpit01008+'">';
    html+= '<a href="#">';
    html+='<img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+ $.getStorage('access_token')+'&url='+data[0].cltpit02002+'">';
    html+= '<div class="mask">';
    html+='<div class="mask-title">'+data[0].cltpit01001+'</div>';
    html+='<div class="mask-sub">地址:'+data[0].cltpit01004+'</div>';
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


//$('#slider').slider({
//    interval:3000
//});