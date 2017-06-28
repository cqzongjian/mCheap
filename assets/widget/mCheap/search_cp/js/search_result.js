/**
 * Created by Administrator on 2016/7/21.
 */
function creatResultHtml(data){
    var message=data.message;
    data=data.data;
    var html='';
    for(var i=0;i<data.length;i++) {
        html += '<div class="search-result-item" data-id="'+data[i].cltpro01id+'">';
        html += '<div class="search-result-item-top">'+data[i].cltpro01001+'</div>';
        html += '<div class="mdui-box search-result-item-data">';
        html += '<div class="mdui-box-flex-1 minprice">￥'+number(data[i].cltprc05007)+'</div>';
        html += '<div class="mdui-box-flex-1 maxprice">￥'+number(data[i].cltprc05004)+'</div>';
        html += '<div class="mdui-box-flex-1 avgprice">￥'+number(data[i].cltprc05006)+'</div>';
        html += '<div class="mdui-box-flex-1 lastprice">￥'+number(data[i].cltprc05006)+'</div>';
        html += '</div>';
        if(!message) {
            if (data[i].isfocus == '1') {
                html += '<div class="islike like"></div>';
            }
        }
        else{
            html+='<div class="islike dislike"></div>';
        }
        html += '<div class="add"></div>';
        html += '</div>'
    }
    return html;
}
function number(number){
    number=number.toString();
    if(number.indexOf('.')){
        if(number.lastIndexOf('.')==1){
            return number+'0'
        }
    }
    else {
        return number+'.00';
    }
}