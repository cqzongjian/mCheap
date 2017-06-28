/**
 * Created by Administrator on 2016/7/6.
 */
/*var objdata={data:{
   cltpro01id:'1001',//产品流水号
   cltpro01001:'白菜',// 产品名称
   cltpro01004:'元/500g',// 计量单位
   cltpro01005:'元/斤',//民间计量单位
    minprice:'1.2',//最便宜
    maxprice:'1.8',//最贵
    avgprice:'1.3',//平均价格
    lastprice:'1.5',//最近价格
    lasttime:'2016-07-05 09:00',//最新时间
    isfocus:'1',//是否是关注产品 0不关注，1关注
    markets:[
        {
           cltpit01id:'10001',//采集点流水号
           cltpit01001:'三色路农贸市场',//采集点名称
            Isfocus:'1',//是否是关注市场
            Ispoint:'1',//是否是关注购买点附近市场
            distance:'5Km',//距离
           cltpro01id:'1001',//产品流水号
           cltpro01001:'白菜',// 产品名称
           cltpro01004:'元/500g',// 计量单位
           cltpro01005:'元/斤',//民间计量单位
            minprice:'1.2',//最便宜
            maxprice:'1.8',//最贵
            avgprice:'1.3',//平均价格
            lastprice:'1.5',//最近价格
            SortCoefficient:'1',
           cltpit02002:'',//采集点图片URL
            Ischeaper:'1'//便宜标志，1代表低于范围内平均价
            },
        {
           cltpit01id:'1001',//采集点流水号
           cltpit01001:'红星路菜市场',//采集点名称
            Isfocus:'0',//是否是关注市场
            Ispoint:'1',//是否是关注购买点附近市场
            distance:'3Km',//距离
           cltpro01id:'1001',//产品流水号
           cltpro01001:'白菜',// 产品名称
           cltpro01004:'元/500g',// 计量单位
           cltpro01005:'元/斤',//民间计量单位
            minprice:'1.2',//最便宜
            maxprice:'1.8',//最贵
            avgprice:'1.5',//平均价格
            lastprice:'1.5',//最近价格
            sortcoefficient:'1',
            cltpit02002:'',//采集点图片URL
            Ischeaper:'0'//便宜标志，1代表低于范围内平均价
    }
]}
};*/
/**
 * url和市场时间未处理
 * @param objData
 */
function setMarketListData(objData){
    var data=objData.data;
    var arr=data.markets;
    var len=arr.length;
    var html='';
//    $('.top-header>div:first-child').attr('data-id',data.cltpro01id).html(data.cltpro01001);
//    $('#minprice>span:last-child').html('￥'+data.minprice);
//    $('#maxprice>span:last-child').html('￥'+data.maxprice);
//    $('#avgprice>span:last-child').html('￥'+data.avgprice);
//    $('#lastprice>span:last-child').html('￥'+data.lastprice);
//    $('#lastTime').html(data.lasttime);
    if(data.isfocus){
        $('#isFocus').removeClass('dislike').addClass('like');
    }
    for(var i=0;i<len;i++){
        html+='<div class="list-item mdui-box" data-id="'+arr[i].cltpit01id+'">';
            html+='<div class="list-item-img"><img src="../images/market_hongxinglu.jpg"></div>';
            html+='<div class="mdui-box-flex-1">';
                html+='<div class="list-item-title">'+arr[i].cltpit01001+'</div>';
                html+='<div class="list-item-price">'+'￥'+arr[i].lastprice+'</div>';
            html+='</div>';
            html+='<div class="list-item-dis"><img src="../images/dis.png">&nbsp;'+arr[i].distance+'</div>';
            html+='<div class="list-item-time">2016-05-23 9:30</div>';
        html+='</div>';
    }
    $('.list').html(html);
}