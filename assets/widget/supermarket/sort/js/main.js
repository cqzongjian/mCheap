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
            htmlOne +='<div class="sort-box" data-id="'+data[i].bigId+'" data-name="'+data[i].bigType+'">';
            htmlOne +='<div class="picture-box">';
            name = data[i].bigType.substring(0,4);
            dz = choosePic(data[i].bigId);
            htmlOne +='<img src="'+dz+'" class="pro-img">';
            htmlOne +='</div>';
            htmlOne +='<div class="sort-item">'+name+'</div>';
            htmlOne +='</div>';
        }else{
            htmlTwo +='<div class="sort-box" data-id="'+data[i].bigId+'" data-name="'+data[i].bigType+'">';
            htmlTwo +='<div class="picture-box">';
            name = data[i].bigType.substring(0,4);
            dz = choosePic(data[i].bigId);
            htmlTwo +='<img src="'+dz+'" class="pro-img">';
            htmlTwo +='</div>';
            htmlTwo +='<div class="sort-item">'+name+'</div>';
            htmlTwo +='</div>';
        }
    }
    htmlTwo +='<div class="sort-box" data-id="more">';
    htmlTwo +='<div class="picture-box">';
    htmlTwo +='<img src="../images/1.png" class="pro-img">';
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
        case '410':src='../images/2.png';
            return src;
            break;
        case '412':src='../images/3.png';
            return src;
            break;
        case '413':src='../images/4.png';
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
        case '421':src='../images/9.png';
            return src;
            break;
        case 'more':src='../images/10.png';
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
    html+='<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[last].cltpit01id+'">';
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
        html+='<div class="mdui-slider-item" data-cltpit01id="'+data[i].cltpit01id+'">';
        html+=' <a href="#">';
        html+='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].cltpit02002+'">';
        html+='<div class="mask">';
        html+='<div class="mask-title">'+data[i].cltpit01001+'</div>';
        html+='<div class="mask-sub">'+data[i].cltpit01004+'</div>';
        html+='</div>';
        html+='</a>';
        html+='</div>';
    }
    html+= '<div class="mdui-slider-item mdui-slider-item-duplicate" data-cltpit01id="'+data[0].cltpit01id+'">';
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

    //$('#slider').slider({
    //    interval:3000
    //});
}


$('#slider').slider({
    interval:3000
});