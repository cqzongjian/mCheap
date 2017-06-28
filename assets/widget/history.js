/**
 * Created by Administrator on 2016/8/11.
 */
/*
* 开启页面设置本地访问历史，点返回按钮上一页部分需刷新
* */
function setHistoryWin(winName,frameName){
    var historyWin= $.strToJson($.getStorage('historyWin'));
    if(!historyWin){
        historyWin=[];
    }
    var obj={
        winName:winName,
        frameName:frameName
    };
    historyWin.unshift(obj);
    $.setStorage($.jsonToStr(historyWin));
}
$('.back').on('tap',function(){
    var refreshTarget= $.strToJson($.getStorage('historyWin'))[1];
    if(refreshTarget.frameName!='') {
        $.execScript({
            winName: refreshTarget.winName,
            frameName: refreshTarget.frameName,
            script: '$.refreshWin()'
        });
    }
    else {
        $.execScript({
            winName: refreshTarget.winName,
            script: '$.refreshWin()'
        });
    }
});