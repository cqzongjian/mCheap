/**
 *  Created by Administrator on 2016/7/12.
 */
function setMarketData(data){
    var sortId;
    var n= 0,allCheapNearNum= 0,allCheapAreaNum= 0,allCheapCityNum= 0;
    var sortHtml='';
    //console.log('hahaha:'+JSON.stringify(data.data));
    if(data.data){
        var cSCategoryPriceList=data.data.cSCategoryPriceList;
        if(!cSCategoryPriceList) {
            $('.market-top').html('<div class="market-nodata">该市场暂无产品信息</div>');
            return;
        }
    } else {
        $('.market-top').html('<div class="market-nodata">该市场暂无产品信息</div>');
        return;
    }

    var len=cSCategoryPriceList.length;
    var obj={};//用于根据ID存储产品html
    var cheapNum={};
    var objCheapNearHtml={};
    var objCheapAreaHtml={};
    var objCheapcityHtml={};
    var html='';
    var cheapHtml='';

    var allCheapNearHtml='',allCheapAreaHtml='',allCheapCityHtml='';

    var topHtml='';
    var collectStationDetail=data.data.collectStationDetail;
    var tiaoshu=collectStationDetail.tiaoshu?collectStationDetail.tiaoshu:'0';
    if(collectStationDetail.cltpit02002) {
        topHtml += '<div class="mask"></div>';
        topHtml += '<img src="' + $.serverSettings.serverPath + '/mobile/mcheap/mcheapAction!getMarketPicture.do?access_token=' + $.getStorage('access_token') + '&url=' + collectStationDetail.cltpit02002 + '"/>';
    }
    else{
        topHtml+='<img src="../images/market_hongxinglu.png">';
    }
    if(!collectStationDetail.cltpit01001){
        topHtml+='<div class="market-name">该市场暂无产品信息</div>';
        topHtml+='<div class="market-position"><span></span>&nbsp;&nbsp;&nbsp;<span class="market-dis"></span></div>';
    }else{
        topHtml+='<div class="market-name">'+collectStationDetail.cltpit01001+'</div>';
        marketName=collectStationDetail.cltpit01001;
        bdjd=collectStationDetail.cltpit01007;
        bdwd=collectStationDetail.cltpit01008;
        topHtml+='<div class="star">';

        /*===========================================*/
        //if(collectStationDetail.star) {
        //    for(var j=0;j<parseInt(collectStationDetail.star);j++){
        //        topHtml+='<img src="../images/star_01.png"/>';
        //    }
        //    if (parseInt(collectStationDetail.star.split('.')[1])>0){
        //        topHtml+='<img src="../images/star_02.png"/>';
        //    }
        //}
        //else {
        //    topHtml+='<img src="../images/star_01.png"/>';
        //}
        /*===========================================*/

        /*===========================================*/
        if(collectStationDetail.star) {
            var m =0,x = 0;
            for(x;x<parseInt(collectStationDetail.star);x++){
                topHtml+='<img src="../images/star_01.png" />';
                m++;
            }
            if (parseInt(collectStationDetail.star.split('.')[1])>0){
                topHtml+='<img src="../images/star_03.png"/>';
                m++;
            }
            if(m<5){
                for (x=m;x<5;x++){
                    topHtml+='<img src="../images/star_02.png"/>';
                }
            }
        }
        else{
            for (x=0;x<5;x++){
                topHtml+='<img src="../images/star_02.png" />'
            }
        }
        /*===========================================*/
        topHtml+='</div>';
        topHtml+='<div class="market-position"><span>'+collectStationDetail.cltpit01004+'</span>&nbsp;&nbsp;&nbsp;<span class="market-dis">'+collectStationDetail.distance+'km</span></div>';
        topHtml+='<div class="comment">评论：<span class="comment-num">'+tiaoshu+'</span>条</div>';
    }
    var startTime=collectStationDetail.cltpit01005||'',endTime=collectStationDetail.cltpit01006||'';
    topHtml+='<div class="market-yysj">营业时间（'+startTime+'-'+endTime+'）</div>';
    topHtml+='<div class="market-qt mdui-box">';
    topHtml+='<div class="">相因品种：&nbsp;&nbsp;<span>'+'</span></div>';
    if(collectStationDetail.isfocus=='0'){
        topHtml+='<div class="  isLike dislike"></div>'
    }
    else{
        topHtml+='<div class="  isLike like"></div>'
    }
    topHtml+='</div>';
    $('.market-top').html(topHtml).find('img').on('error',function(){
        $(this).attr('src','../../../public/images/market_default.png');
    });
    sortHtml+= '<div class="mdui-box-flex-1 sort-item" data-id="cheap">';
    sortHtml+='<div class="sort-item-text" id="xy">相因</div>';
    sortHtml+='</div>';
    sortHtml+='<div class="sort-item-gap">|</div>';
    for(var i=0;i<len;i++){
        sortHtml += '<div class="mdui-box-flex-1 sort-item" data-id="'+cSCategoryPriceList[i].category.categoryid+'">';
        sortHtml += '<div class="sort-item-text">' + cSCategoryPriceList[i].category.categoryname+ '</div>';
        sortHtml += '</div>';
        if(i!=(len-1)) {//不是最后一个就加分割线
            sortHtml += '<div class="sort-item-gap">|</div>';
        }
        var product=cSCategoryPriceList[i].userProductPriceList;
        var productHtml='';
        var cheapNearHtml='';
        var cheapAreaHtml='';
        var cheapcityHtml='';

        cheapNum[cSCategoryPriceList[i].category.categoryid]={};
        var cheapNearNum= 0,cheapAreaNum= 0,cheapCityNum= 0,cheapAllNum= 0;

        for (var x=0;x<product.length;x++){
            if(product[x].ischeaper) {
                n++;
                cheapAllNum++;
                productHtml += '<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                cheapHtml += '<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';


                if(product[x].ischeaper=='1'){
                    allCheapNearNum++;
                    cheapNearNum++;
                    productHtml+='<div class="cheap-near">附近·相因</div>';
                    cheapHtml+='<div class="cheap-near">附近·相因</div>';

                    cheapNearHtml+='<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                    cheapNearHtml+='<div class="cheap-near">附近·相因</div>';
                    cheapNearHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                    cheapNearHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                    cheapNearHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                    cheapNearHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                    cheapNearHtml+='</div>';
                    cheapNearHtml+='<div class="add"></div>';
                    cheapNearHtml+='</div>';

                    allCheapNearHtml+='<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                    allCheapNearHtml+='<div class="cheap-near">附近·相因</div>';
                    allCheapNearHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                    allCheapNearHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                    allCheapNearHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                    allCheapNearHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                    allCheapNearHtml+='</div>';
                    allCheapNearHtml+='<div class="add"></div>';
                    allCheapNearHtml+='</div>';
                }
                if(product[x].ischeaper=='2'){
                    allCheapAreaNum++;
                    cheapAreaNum++;
                    productHtml+='<div class="cheap-area">全区·相因</div>';
                    cheapHtml+='<div class="cheap-area">全区·相因</div>';

                    cheapAreaHtml+='<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                    cheapAreaHtml+='<div class="cheap-area">全区·相因</div>';
                    cheapAreaHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                    cheapAreaHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                    cheapAreaHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                    cheapAreaHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                    cheapAreaHtml+='</div>';
                    cheapAreaHtml+='<div class="add"></div>';
                    cheapAreaHtml+='</div>';

                    allCheapAreaHtml+='<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                    allCheapAreaHtml+='<div class="cheap-area">全区·相因</div>';
                    allCheapAreaHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                    allCheapAreaHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                    allCheapAreaHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                    allCheapAreaHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                    allCheapAreaHtml+='</div>';
                    allCheapAreaHtml+='<div class="add"></div>';
                    allCheapAreaHtml+='</div>';
                }
                if(product[x].ischeaper=='3'){
                    allCheapCityNum++;
                    cheapCityNum++;
                    productHtml+='<div class="cheap-city">全市·相因</div>';
                    cheapHtml+='<div class="cheap-city">全市·相因</div>';

                    cheapcityHtml+='<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                    cheapcityHtml+='<div class="cheap-city">全市·相因</div>';
                    cheapcityHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                    cheapcityHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                    cheapcityHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                    cheapcityHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                    cheapcityHtml+='</div>';
                    cheapcityHtml+='<div class="add"></div>';
                    cheapcityHtml+='</div>';


                    allCheapCityHtml+='<div class="market-data-item market-data-cheap mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';
                    allCheapCityHtml+='<div class="cheap-city">全市·相因</div>';
                    allCheapCityHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                    allCheapCityHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                    allCheapCityHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                    allCheapCityHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                    allCheapCityHtml+='</div>';
                    allCheapCityHtml+='<div class="add"></div>';
                    allCheapCityHtml+='</div>';
                }
                cheapHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
                cheapHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
                cheapHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
                cheapHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
                cheapHtml+='</div>';
                cheapHtml+='<div class="add"></div>';
                cheapHtml+='</div>';
            }
            else{
                productHtml += '<div class="market-data-item mdui-box" data-id="'+product[x].cltpro01id+'" data-cltpro01004="'+product[x].cltpro01004+'" data-cltpro01005="'+product[x].cltpro01005+'" data-cltpro01001="'+product[x].cltpro01001+'">';

            }
            productHtml+='<div class="mdui-box-flex-1 item-detail" data-isfocus="'+product[x].isfocus+'">';
            productHtml+='<div class="data-name">'+product[x].cltpro01001+'</div>';
            productHtml+='<div class="data-price avg-price">￥'+product[x].cltprc05006+'</div>';
            productHtml+='<div class="data-interval">(￥'+product[x].cltprc05004+'~￥'+product[x].cltprc05005+')</div>';
            productHtml+='</div>';
            productHtml+='<div class="add"></div>';
            productHtml+='</div>';

        }
        html+=productHtml;
        obj[cSCategoryPriceList[i].category.categoryid]=productHtml;
        obj.cheap=cheapHtml;
        obj.allCheapNearHtml=allCheapNearHtml;
        obj.allCheapAreaHtml=allCheapAreaHtml;
        obj.allCheapCityHtml=allCheapCityHtml;

        obj.allCheapNearNum=allCheapNearNum;
        obj.allCheapAreaNum=allCheapAreaNum;
        obj.allCheapCityNum=allCheapCityNum;


        cheapNum[cSCategoryPriceList[i].category.categoryid].cheapCityNum=cheapCityNum;
        cheapNum[cSCategoryPriceList[i].category.categoryid].cheapAreaNum=cheapAreaNum;
        cheapNum[cSCategoryPriceList[i].category.categoryid].cheapNearNum=cheapNearNum;
        cheapNum[cSCategoryPriceList[i].category.categoryid].cheapAllNum=cheapAllNum;
        objCheapNearHtml[cSCategoryPriceList[i].category.categoryid]=cheapNearHtml;
        objCheapAreaHtml[cSCategoryPriceList[i].category.categoryid]=cheapAreaHtml;
        objCheapcityHtml[cSCategoryPriceList[i].category.categoryid]=cheapcityHtml;



    }

    var cheapItemHtml = '<div class="cheap-item">附近相因</div>';
    cheapItemHtml+='<div class="cheap-item">全区相因</div>';
    cheapItemHtml+='<div class="cheap-item">全市相因</div>';
    cheapItemHtml+='<div class="cheap-item">全部</div>';
    $('.cheap-sort').html(cheapItemHtml);

    $('.market-qt>div>span').html(n+'种');
    $('.sort').html(sortHtml);
    $('.market-data').html(html);
    $('.sort-item').on('tap',function(){
        $('.cheap-sort>div').each(function(){
            $(this).removeClass('cheap-item-on').addClass('cheap-item');
        });
        $('.sort-item').find('.sort-item-text').removeClass('sort-item-on');
        $(this).find('.sort-item-text').addClass('sort-item-on');
        sortId=$(this).data('id');
        $('.market-data').html(obj[sortId]);
        if(sortId=='cheap'){
            $('.market-qt>div>span').html(n+'种');
        }else{
            $('.market-qt>div>span').html(cheapNum[sortId].cheapAllNum+'种');
        }
    });


    $('.cheap-item').on('tap',function(){
        $('.cheap-item').removeClass('cheap-item-on');
        $(this).addClass('cheap-item-on');
        var sortName=$(this).html(),spanNum=$('.market-qt>div>span');
        var market=$('.market-data');
        if(sortId=='cheap'){
            switch(sortName){
                case '附近相因':market.html(obj.allCheapNearHtml);spanNum.html(obj.allCheapNearNum+'种');
                    break;
                case '全区相因':market.html(obj.allCheapAreaHtml);spanNum.html(obj.allCheapAreaNum+'种');
                    break;
                case '全市相因':market.html(obj.allCheapCityHtml);spanNum.html(obj.allCheapCityNum+'种');
                    break;
                case '全部':market.html(obj[sortId]);spanNum.html(n+'种');
                    break;
            }
        }else{
            switch(sortName){
                case '附近相因':market.html(objCheapNearHtml[sortId]);spanNum.html(cheapNum[sortId].cheapNearNum+'种');
                    break;
                case '全区相因':market.html(objCheapAreaHtml[sortId]);spanNum.html(cheapNum[sortId].cheapAreaNum+'种');
                    break;
                case '全市相因':market.html(objCheapcityHtml[sortId]);spanNum.html(cheapNum[sortId].cheapCityNum+'种');
                    break;
                case '全部':market.html(obj[sortId]);spanNum.html(cheapNum[sortId].cheapAllNum+'种');
                    break;
            }
        }
    });
}



