(function($, window, document) {
    $.init({
        gestureConfig:{
            tap: true, 
            doubletap: true, 
            longtap: true, 
            swipe: true, 
            drag: true, 
            hold:true,
            release:true
        }
    });

    var temp = $('<div style="position: absolute;background: #000;z-index: 90;opacity: 0.1"></div>')
    $(document).on("hold",".btn-com",function(event){
        // console.log(event);
        var offset = $(event.currentTarget).offset();
        temp.css({"top":offset.top,"left":offset.left,"height":offset.height,"width":offset.width});
        $("body").append(temp);
    });

    $(document).on("release",".btn-com",function(event){
        temp.remove();
    });


})(mdui, window, document);
