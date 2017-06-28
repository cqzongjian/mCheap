/**
 * Created by Administrator on 2016/7/5.
 */
/*
* 通过参数epsrmm01id从后台得到数据
* */
function setData(data){
    var dataMenu=data.data.recommendMenuDishDetail;
    var dataTop=data.data.recommendMenuProduct;
    var len=dataMenu.length;
    var html='';
    var htmlTop='';
    for(var i=0;i<len;i++){
        var url=dataMenu[i].epsrmm05003;
        html+= '<div class="list-item mdui-box" data-id="'+dataMenu[i].epsrmm02id+'">';
        html += '<div class="list-item-img"><img src="'+ $.serverSettings.serverPath+'/mobile/mcheap/mcheapAction!getDishPicture.do?access_token='+ $.getStorage('access_token')+'&url='+url+'"/></div>'
        html+=  '<div class="mdui-box-flex-1">';
        html+=      '<div class="list-item-title">'+dataMenu[i].epsrmm02001+'</div>';
        html+=      '<div class="list-item-sub mdui-box">'+dataMenu[i].epsrmm02002+'</div>';
        html+=  '</div>';
        html+=  '<div class="list-item-more">制作方法</div>';
        html+=  '</div>';
    }
    if(dataTop.length<=4) {
        for (i = 0; i < dataTop.length; i++) {
            htmlTop += '<div class="mdui-box-flex-1" data-id="' + dataTop[i].cltpro01id + '">';
            htmlTop += '<span>' + dataTop[i].cltpro01001 + '</span>';
            htmlTop += '<span>' + dataTop[i].epsmym02001 + dataTop[i].epsmym02002 + '</span>';
            htmlTop += '</div>'
        }
    }
    else{
        for(var i=0;i<dataTop.length;i++){
            htmlTop += '<div class="bar" data-id="' + dataTop[i].cltpro01id + '">';
            htmlTop += '<span>' + dataTop[i].cltpro01001 + '</span>';
            htmlTop += '<span>' + dataTop[i].epsmym02001 + dataTop[i].epsmym02002 + '</span>';
            htmlTop += '</div>'
        }
    }
    $('.cailiao-detail').html(htmlTop);
    $('.list').html(html);
}
