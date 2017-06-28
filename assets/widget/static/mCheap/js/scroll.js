
(function(){


    var CONSTANT = {
        MODE : {
            UPFREASH : 0,
            DOWNLOADMORE : 1,
            BOTH : 2
        },
        STATE : {

        }
    };
    var $funs = {
        after : function(){

        },
        prepare : function(){
            list.html.append(list.loading);
            var start = 0;
            list.html.on("touchstart",function(e){
                start = e.changedTouches[0].pageY;
            });
            list.html.on("touchmove",function(e){

            })
        },
        prepareFinish : function(){
            list.loading.remove();
        }
    };
    var $id;
    var list = {
        loading : $('<div style="height: 3rem;text-align: center;float: left;width: 100%;"><img src="../../../static/mCheap/images/loading.gif" style="width: 1.4rem;margin-top: 0.8rem;"/> <span style="margin: 0 .5rem;">正在加载...</span> </div>')
    };
    $.initScroll = function(options){
        try{
            $id = options.id;
            setOptionByDefault(options.funs,$funs);
            $funs = options.funs;
            list.html = $("#"+$id);
            list.startY = 0;
            list.space = 0; //列表位移距离
            list.top = false;   //是否滑动到顶部
            list.bottom = false;
            list.dom = document.getElementById($id);
            //判断是否滑动到底部
            list.isBottom = function(){
                return list.html.height() + list.dom.scrollTop > list.dom.scrollHeight - 10;
            }

            list.isTop = function(){
                return list.dom.scrollTop < 30;
            }

            list.isMoveUp = function(){
                return list.space <= -30;
            }

            list.isMoveDown = function(){
                return list.space >= 30;
            }

        }catch(e){
            console.log("option 参数错误");
        }

        list.dom.addEventListener("touchstart",function(e){


            console.log(e);
            list.startY = e.changedTouches[0].pageY;
            list.bottom = false;

        });

        list.dom.addEventListener("touchmove",function(e){


            list.space = e.changedTouches[0].pageY - list.startY;
            if(list.html.height() + list.dom.scrollTop > list.dom.scrollHeight - 10 && list.isMoveUp()){
                $funs.prepare();
                list.loading.css("padding-bottom",-list.space);
                list.bottom = true;
            }
        });


        list.dom.addEventListener("touchend",function(e){

            list.space = e.changedTouches[0].pageY - list.startY;
            if(list.bottom && list.isMoveUp()){
                $funs.prepareFinish();
                $funs.after();
            }
        });
        list.dom.addEventListener("touchcancel",function(e){

            list.space = e.changedTouches[0].pageY - list.startY;
            if(list.bottom && list.isMoveUp()){
                $funs.prepareFinish();
                $funs.after();
            }
        });

        /*  list.dom.addEventListener("dragstart",function(e){
         console.log(e);
         list.startY = e.detail.changedTouches[0].pageY;
         list.bottom = false;

         });

         list.dom.addEventListener("dragmove",function(e){
         list.space = e.detail.changedTouches[0].pageY - list.startY;
         if(list.html.height() + list.dom.scrollTop > list.dom.scrollHeight - 10 && list.isMoveUp()){
         $funs.prepare();
         list.loading.css("padding-bottom",-list.space);
         list.bottom = true;
         }
         });


         list.dom.addEventListener("dragend",function(e){
         list.space = e.detail.changedTouches[0].pageY - list.startY;
         alert("end");
         if(list.bottom && list.isMoveUp()){
         $funs.prepareFinish();
         $funs.after();
         }
         if(list.isMoveUp()){
         console.log("up");
         }
         if(list.isMoveDown()){
         console.log("down");
         }
         });
         */

    }



})();


/**
 * 通过默认配置设置配置信息 （自动以默认配置信息填充用户没有配置的信息）
 * @param option 用户的配置
 * @param defaultOption 默认配置
 */
function setOptionByDefault(option,defaultOption){
    if(!option){
        option = defaultOption;
    }
    for(var key in defaultOption){
        if("object" == typeof defaultOption[key]){
            if(!option[key]){
                option[key] = defaultOption[key];
                continue;
            }
            setOptionByDefault(option[key],defaultOption[key]);
        }else{
            option[key] = option[key] || defaultOption[key];
        }
    }
}