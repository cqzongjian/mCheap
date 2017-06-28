function PicGetter(){
    var that = this;

    this.options;
    this.savePathHead = "wgt://images/";
    this.basePath = "/storage/emulated/0/widgetone/apps/";

    //图片路径
    this.img;

    this.count = 0;
    this.imgArr = [];
    this.picInfo = null;

    this.picSelect={};

    /** 初始化下载对象配置信息 **/
    this.init = function(options){
        that.options = options;
        if(!that.options)return;
        //创建表(并插入基本数据)
        uexDataBaseMgr.openDataBase(that.options.dbName,that.options.opCode);//打开数据库
        uexDataBaseMgr.cbOpenDataBase = function(opId,dataType,data){
            if(data == 0){
                if($.getStorage("createTable")=="1")return;
                that.createTable();
            }else{
                $.log("初始化失败...");
            }
        };
    }

    this.setImage = function(mid,serverPath,picType,$img){
        if(!that.options)return;
        var picInfo = new PicInfo();
        picInfo.setImageInfo(mid,serverPath,picType,$img);
        that.imgArr.push(picInfo);
    }

    this.setCount = function(count) {
        that.count = count;
        if(that.count>0) {
            var task = setInterval(function(){
                if(!that.picInfo && that.imgArr[0]){
                    that.picInfo = that.imgArr[0];
                    if("object" == typeof that.picSelect["icon"+that.picInfo.type]){
                        that.imgArr.remove(that.picInfo,true);
                        that.checkImageExist(that.picInfo.mid,that.picInfo.type,getFileName(that.picInfo.serverPath));
                    }else{
                        that.getPicSelect(that.picInfo.type);
                    }

                }
                if(that.count<=0){
                    clearInterval(task);
                }
            });
        }
    }

    this.getPicSelect = function(type){
        if(!that.picSelect["icon"+that.picInfo.type]) {
            var sql = "SELECT * FROM pic WHERE type='" + type + "'";
            uexDataBaseMgr.selectSql(that.options.dbName, that.options.opCode, sql);
            uexDataBaseMgr.cbSelectSql = that.selectCallBack;
        }
    }

    this.checkImageExist = function(mid,type,fileName){
            var pic = that.getPicInfoByMid(mid,type,fileName);
            if(pic){
                that.picInfo.img.attr("src",pic.path);
                that.count--;
                that.picInfo = null;
            }else{
                that.download(that.picInfo.serverPath);
            }


    }

    this.createTable = function(){
        var sql = "CREATE TABLE pic(id INTEGER PRIMARY KEY, mid INTEGER, type STRING, name STRING, path STRING)";
        uexDataBaseMgr.executeSql(that.options.dbName,that.options.opCode,sql);
        $.setStorage("createTable","1");
    }

    this.getPicInfoByMid = function(mid,type,fileName){
        if(that.picSelect["icon"+type] && that.picSelect["icon"+type].length>0){
            for(var i=0,len=that.picSelect["icon"+type].length;i<len;i++){
                var each = that.picSelect["icon"+type][i];
                if(mid == each.mid && fileName == each.name){
                    return each;
                }
            }
            return null;
        }else{
            return null;
        }
    }

    this.selectCallBack = function(opCode,type,value){
        var jsonList = $.strToJson(value);
        if(jsonList.length>0){
            that.picSelect["icon"+that.picInfo.type] = jsonList;
        }else{

            that.picSelect["icon"+that.picInfo.type] = [];
        }
        that.picInfo = null;
    }

    this.download = function(serverPath){
        var fileName = createFileName(getFileName(serverPath));
        if(!fileName){
            return;
        }
        that.fileName = fileName;
        uexDownloaderMgr.createDownloader(that.picInfo.mid);//创建下载对象
        uexDownloaderMgr.onStatus = that.onStatus;
        uexDownloaderMgr.cbCreateDownloader = function(opCode,dataType,data){
            if(data == 0){
                uexDownloaderMgr.download(that.picInfo.mid,serverPath,that.savePathHead+fileName,'0');
            }
        }

    }

    this.onStatus = function(opCode,fileSize,percent,status){
        switch (status) {
            case 0:
                $.log('下载中...');
                break;
            case 1:
                var sql1 = "DELETE FROM pic WHERE mid='"+that.picInfo.mid+"' and type='"+that.picInfo.type+"'";
                var sql2 = "INSERT INTO pic (mid,type,name,path) VALUES ('"+that.picInfo.mid+"','"+that.picInfo.type+"','"+getFileName(that.picInfo.serverPath)+"','"+that.basePath+that.options.appId+"/images/"+that.fileName+"')";
                uexDataBaseMgr.executeSql(that.options.dbName,1,sql1);
                uexDataBaseMgr.executeSql(that.options.dbName,1,sql2);
                uexDownloaderMgr.closeDownloader(that.options.opCode);
                that.picInfo.img.attr("src", that.basePath+that.options.appId+"/images/"+that.fileName);
                that.count--;
                uexDownloaderMgr.closeDownloader(that.picInfo.mid);
                that.picInfo = null;
                $.log('下载成功!');
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
}

//讀取文件
function readFile(path, size) {
    uexFileMgr.openFile('1', path, '1');
    uexFileMgr.readFile('1', size);
    uexFileMgr.closeFile('1');
}

//获取文件名
function getFileName(URL){
    var arr1 = URL.split('\/');//通过\分隔字符串
    var arr2 = arr1[arr1.length-1].split('\&');//通过&分隔字符串
    return arr2[0];
}


function createFileName(serverName){
    if(serverName.split(".").length-1 != 1)return null;
    var date = new Date();
    var month = date.getMonth()<10?"0"+(date.getMonth()+1):""+date.getMonth()+1;
    var day = date.getDate()<10?"0"+date.getDate():""+date.getDate();
    return date.getFullYear()+month+day+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds()+serverName.substr(serverName.indexOf("."));    //获取完整的年份(4位,1970-????)
}


function PicInfo() {
    var that = this;
    this.serverPath;
    this.type;
    this.mid;
    //图片路径
    this.img;
    this.setImageInfo = function(mid,serverPath,picType,$img){
        that.serverPath = serverPath;
        that.mid = mid;
        that.type = picType;
        that.img = $img;

    }
}

//移出元素 只删除第一个的话onlyFirst传true
Array.prototype.remove = function(obj,onlyFirst){
    var index = this.indexOf(obj);
    if (index > -1) {
        this.splice(index, 1);
        if(!onlyFirst)this.remove(obj);
    }
    return this;
}