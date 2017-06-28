/**
 * Created by Administrator on 2016/7/5.
 */
/*
 * 设置分类
 * */
function setSort(data){
    var htmlOne='',htmlTwo='', i,len=data.length,dz,name;
    for(i=0;i<len;i++){
        if(i<4){
            htmlOne +='<div class="sort-box" data-id="'+data[i].bigId+'" data-name="'+data[i].bigType+'">';
            htmlOne +='<div class="picture-box">';
            name = data[i].bigType.substring(0,4);
            dz = choosePic(data[i].bigId);
            htmlOne +='<img src="'+dz+'" class="pro-img">';
            htmlOne +='</div>';
            htmlOne +='<div class="sort-item">'+name+'</div>';
            htmlOne +='</div>';
        }
        //else{
        //    htmlTwo +='<div class="sort-box" data-id="'+data[i].bigId+'" data-name="'+data[i].bigType+'">';
        //    htmlTwo +='<div class="picture-box">';
        //    name = data[i].bigType.substring(0,4);
        //    dz = choosePic(data[i].bigId);
        //    htmlTwo +='<img src="'+dz+'" class="pro-img">';
        //    htmlTwo +='</div>';
        //    htmlTwo +='<div class="sort-item">'+name+'</div>';
        //    htmlTwo +='</div>';
        //}
    }
    htmlOne +='<div class="sort-box" data-id="more">';
    htmlOne +='<div class="picture-box">';
    htmlOne +='<img src="../images/10.png" class="pro-img">';
    htmlOne +='</div>';
    htmlOne +='<div class="sort-item">更多</div>';
    htmlOne +='</div>';
    $('.sort').html(htmlOne);
    //$('.sort-two').html(htmlTwo);
}

/*
 * 分类选图标
 * */
function choosePic(id){
    var src;
    switch(id){
        case '506':src='../images/1.png';
            return src;
            break;
        case '501':src='../images/2.png';
            return src;
            break;
        case '507':src='../images/3.png';
            return src;
            break;
        case '502':src='../images/4.png';
            return src;
            break;
        case '508':src='../images/5.png';
            return src;
            break;
        case '503':src='../images/6.png';
            return src;
            break;
        case '509':src='../images/7.png';
            return src;
            break;
        case '504':src='../images/8.png';
            return src;
            break;
        case '505':src='../images/9.png';
            return src;
            break;
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
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-tiaoshu="'+data[last].tiaoshu+'" data-lsh="'+data[last].cltpit01id+'" data-star="'+data[last].star+'" data-tiaoshu="'+data[last].tiaoshu+'" data-range="'+data[last].cltpit01011+'" data-focus="'+data[last].isfocus+'" data-yysj="营业时间:'+data[last].cltpit01005+'~'+data[last].cltpit01006+'" data-dis="'+data[last].distance+'" data-picture="'+data[last].cltpit02002+'" data-log="'+data[last].cltpit01007+'" data-lat="'+data[last].cltpit01008+'">';
    html+='<a href="#">';
    html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';
    // html+='<img class="banner-img" src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[last].cltpit02002+'">';

    html+='<div class="mask">';
    html+='<div class="mask-title">'+data[last].cltpit01001+'</div>';
    html+='<div class="mask-sub">地址:'+data[last].cltpit01004+'</div>';
    html+='</div>';
    html+='</a>';
    html+='</div>';
    for(var i=0;i<len;i++){
        html+='<div class="mdui-slider-item" data-tiaoshu="'+data[i].tiaoshu+'" data-lsh="'+data[i].cltpit01id+'" data-star="'+data[i].star+'" data-tiaoshu="'+data[i].tiaoshu+'" data-range="'+data[i].cltpit01011+'" data-focus="'+data[i].isfocus+'" data-yysj="营业时间:'+data[i].cltpit01005+'~'+data[i].cltpit01006+'" data-dis="'+data[i].distance+'" data-picture="'+data[i].cltpit02002+'" data-log="'+data[i].cltpit01007+'" data-lat="'+data[i].cltpit01008+'">';
        html+=' <a href="#">';
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].cltpit02002+'">';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[i].cltpit01001+'</div>';
        html+='<div class="mask-sub">地址:'+data[i].cltpit01004+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }
    html+= '<div class="mdui-slider-item mdui-slider-item-duplicate" data-tiaoshu="'+data[0].tiaoshu+'" data-lsh="'+data[0].cltpit01id+'" data-star="'+data[0].star+'" data-tiaoshu="'+data[0].tiaoshu+'" data-range="'+data[0].cltpit01011+'" data-focus="'+data[0].isfocus+'" data-yysj="营业时间:'+data[0].cltpit01005+'~'+data[0].cltpit01006+'" data-dis="'+data[0].distance+'" data-picture="'+data[0].cltpit02002+'" data-log="'+data[0].cltpit01007+'" data-lat="'+data[0].cltpit01008+'">';
    html+= '<a href="#">';
    html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[0].cltpit02002+'">';
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