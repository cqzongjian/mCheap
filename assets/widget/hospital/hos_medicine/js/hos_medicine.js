/**
 * Created by lenovo on 2016/10/28.
 *
 */
/*
 用于设置医院等级全选与反选
 */
var hosMedicine = function(){
    this.init = function(){
        this.events();
    }
}
hosMedicine.prototype.events = function(){
   // var that = this;
    $("#allSelect").on("click","#allSelect",function(){
        if(this.checked){
            $("#selectedLevel :checkbox").checked = true;        }
        else{
            $("#selectedLevel :checkbox").checked = false;
        }
    })

}
hosMedicine.prototype.selectAll = function(){
    var that = this;
    
}