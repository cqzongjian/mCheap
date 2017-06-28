/**
 *  Created by dell on 2016/8/4.
 */
//标记已经阅读过此消息
function markHaveRead(cltpush01id){
    $.request({
        urlType:'changeReadedStatus',
        data:{
            "access_token": $.getStorage('access_token'),
            cltpush01id:cltpush01id
        }
    },function(data){
        if(data.success) {

        }
        else {
        }
    });
}

function del_message(cltpush01id,cltpush01idArr){
    $.request({
        urlType:'deletePushMessage',
        data:{
            "access_token": $.getStorage('access_token'),
            cltpush01id:cltpush01id
        }
    },function(data){
        if(data.success){
            $.toast("删除成功");
            if(!cltpush01idArr)return;
            for(var i= 0,len=cltpush01idArr.length;i<len;i++){
                if(cltpush01id==cltpush01idArr[i].cltpush01id){
                    cltpush01idArr.splice(i, 1);
                    break;
                }
            }
        }else{
            $.toast('删除失败');
        }
    });
}
