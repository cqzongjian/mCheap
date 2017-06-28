/**
 * Created by Administrator on 2016/8/12.
 */
function loading(arr){
    var html='<img class="loading" src="../../public/images/loading.gif" style="width: 100%;height: auto">';
    arr.forEach(function(item){
        item.append(html)
    })
}
function clearLoading(){
    $('.loading').remove();
}