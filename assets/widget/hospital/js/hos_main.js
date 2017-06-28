/**
 * Created by Administrator on 2016/7/5.
 */
/*
 * 设置分类
 * */

/*
* 设置医院等级
* */
function setNearMarket(data,boole){
    var html='';
    for(var i=0;i<data.length;i++){
        var level = data[i].clthtp01013;
        html += '<div class="list-item">';
        html += '<div class="list-item-content mdui-box" ' +
            'data-clthtp01001="' +data[i].clthtp01001+'"'+ //医院名称
            'data-clthtp01006="' +data[i].clthtp01006+'"'+//地址
            'data-clthtp01013="' +data[i].clthtp01013+'"'+//等级
            'data-clthtp01011="' +data[i].clthtp01011+'"'+//营业时间
            'data-clthtp01id="' +data[i].clthtp01id+'"'+//医院id
        'data-log="' +data[i].clthtp01004+'"'+//医院id
        'data-lat="' +data[i].clthtp01005+'"'+//医院id
            'data-hosimg="' +data[i].clthtp01010+'"'+//picture
            'data-isfocus="' +data[i].isfocus+'"'+//评论条数
            '> ';
        html += '<div class="list-item-img">';
        html +='<img src="'+$.serverSettings.serverPath+'/mobile/mcheap/hosiptalAction!getHosiptalPicture.do?access_token='+$.getStorage('access_token')+'&url='+data[i].clthtp01010+'"/>';
        html += '</div>';
        html += '<div class="mdui-box-flex-1">';
        html += '<div class="list-item-title">';
        html += data[i].clthtp01001;
        html += '</div>';
        html += '<div class="list-item-price">';
        html += hosLevle(level);
        html += '</div>';
        html += '<div class ="hospital-address">';
        html += data[i].clthtp01006;
        html += '</div>';
        html += '</div>';
        html += '</div>';
        if(data[i].isfocus == "0"){
        html += '<div class="islike dislike" data-clthtp01id = " ' + data[i].clthtp01id+
            '" data-clthtp01001 = "' +data[i].clthtp01001+
            '"></div>';
        }else{
            html += '<div class="islike like" data-clthtp01id = " ' + data[i].clthtp01id+
            '" data-clthtp01001 = "' +data[i].clthtp01001+
            '"></div>';
        }
        html += '<div class="list-item-dis" >'+data[i].distance+'km</div>';
        html += '</div>';
    }
    if(boole) {
        $('.contentInfo').html(html);
    }else{
        html+='</div></div>';
        $('.focusMarket').html(html);
    }
}

$(document).on('tap','.islike',function(){
    var that=$(this);
    if ($(this).hasClass('dislike')){
        $.request({
            urlType:'hos_addFocusHosiptal',
            data:{
                'access_token':$.getStorage('access_token'),
                clthtp01id:that.data("clthtp01id"),//医院id
                clthtp01001:that.data("clthtp01001")//医院名称
            }
        },function(data){
            if(data.success){
                $.toast("成功关注");
                that.removeClass('dislike').addClass('like');
                $.execScript({
                    winName:'hos_list',
                    frameName:'hospital_content',
                    script:'requestFocusHos()'
                });
            }else{
                $.toast("网络异常 ,清稍后再试！")
            }
        });
    }else{
        $.request({
            urlType:'hos_delFocusHosiptal',
            data:{
                'access_token':$.getStorage('access_token'),
                clthtp01id:that.data("clthtp01id"),//医院id
                clthtp01001:that.data("clthtp01001")//医院名称
            }
        },function(data){
            if(data.success){
                $.toast("取消关注");
                that.removeClass('like').addClass('dislike');
                $.execScript({
                    winName:'hos_list',
                    frameName:'hospital_content',
                    script:'requestFocusHos()'
                });
            }else{
                $.toast("网络异常 ,清稍后再试！")
            }
        });
    }
});



function hosLevle(data){
    switch (data){
        case '0101':
            return '一级甲等';
        case '0102':
            return '一级乙等';
        case '0103':
            return '一级丙等';
        case '0201':
            return '二级甲等';
        case '0202':
            return '二级乙等';
        case '0203':
            return '二级丙等';
        case '0301':
            return '三级甲等';
        case '0302':
            return '三级乙等';
        case '0303':
            return '三级丙等';
        default:
            return '未知';
    }
}
