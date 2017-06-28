/**
 * Created by lenovo on 2016/7/21.
 */
//网络请求传递参数
var Base = {
    "BaseUrl":"http://192.168.22.118:8080/priceforall/mobile/mcheap/mcheapAction!"
}
function getserverBaseUrl(url) {
    alert(Base.BaseUrl+url+".do?mac=12343");
    return Base.BaseUrl+url+".do?mac=12343";
}
function requestServerByUrl(url,data,callback,type,datatypes){
    $.ajax(
        url,{
            data:data,
            dataType:datatypes||'json',
            type:type,
            timeout: 10000,
            success:function(data){
                if(typeof callback == "function") {
                    callback(data);
                }
            },
            error: function(xhr, type) {
                //$.toast('网络错误!');
            }
        }
    )
}