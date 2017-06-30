﻿$.serverSettings={
    //serverPath:'http://118.112.188.108:8019/price',//接正式库演示
    //serverPath:'http://192.168.22.205:8080/price',//接李阳
	//serverPath:'http://182.150.36.126:8085/price',//正式库测试
    serverPath:'http://182.150.36.126:8086/price',//正式库测试
    //serverPath:'http://192.168.10.198:8081/price',//测试库
    //serverPath:'http://192.168.22.118:8081/price',//接亚雄
    //serverPath:'http://192.168.29.167:8080/back',//接贺
    //serverPath:'http://182.150.36.126:8082/price',//正式库
    //serverPath:'http://192.168.29.236:8080/price',
    //serverPath:'http://192.168.29.33:8080/price',//接李苗
    //serverPath:'http://192.168.22.137:8080/price',
    urlPath:{
        gettoken:'/mobile/mcheap?',//index页面获取token
        deleteAllPushMessage:'/mobile/mcheap/jpushAction!deleteAllPushMessage.do?',//删除所有推送消息
        productCutPrice:'/mobile/mcheap/jpushAction!productCutPrice.do?',//推送500米以内的市场
        modifyCode:'/mobile/mcheap/loginAction!modifyCode.do?',//登陆后修改密码
        onloadImg:'/mobile/mcheap/mcheapAction!onloadImg.do',//报价上传图片
        sendMsg:'/mobile/mcheap/shopAction!sendMsg.do?',//报价成功后触发短信
        medicineQueryUserPrice:'/mobile/mcheap/medicineAction!queryUserPrice.do?',//medicine-获取公众报价信息
        mcheapQueryUserPrice:'/mobile/mcheap/mcheapAction!queryUserPrice.do?',//maicai-获取公众报价信息
        shopAddUserPrice:'/mobile/mcheap/shopAction!addUserPrice.do?',//supermarket-新增超市产品报价
        medicineAddUserPrice:'/mobile/mcheap/medicineAction!addUserPrice.do?',//medicine-新增药品报价
        mcheapAddUserPrice:'/mobile/mcheap/mcheapAction!addUserPrice.do?',//mcheapAction-新增菜谱报价
        getMenuOptimalPrice:'/mobile/mcheap/mcheapAction!getMenuOptimalPrice.do?',//maicai-我的菜谱进行最优询价
        forgetCode:'/mobile/mcheap/loginAction!forgetCode.do?',//maicai-忘记密码
        checkMessageCode:'/mobile/mcheap/loginAction!checkMessageCode.do?',//maicai-提交修改后密码
        supermarketqueryUserPrice:'/mobile/mcheap/shopAction!queryUserPrice.do?',//supermarket-获取公众报价信息
        getecommendMenuOptimalPrice:'/mobile/mcheap/mcheapAction!getecommendMenuOptimalPrice.do?',//推荐菜谱进行组合询价
        getAppNewVersion:'/mobile/mcheap/loginAction!getAppNewVersion.do?',//手动更新版本
        hosmedicne_queryCategory:'/mobile/mcheap/hosiptalAction!queryCategory.do?',//hospital-获取药品分类信息
        hosmedicen_content:'/mobile/mcheap/hosiptalAction!queryBasicDrug.do?',//hospital-获取药品详细信息
        hosContent:'/mobile/mcheap/hosiptalAction!nearHospital.do?',//hospital-获取附近医院信息
        hosiptalLeve:'/mobile/mcheap/hosiptalAction!hosiptalLeve.do?',//hospital-获取指定医院等级信息
        allhosiptalLeve:'/mobile/mcheap/hosiptalAction!allHosiptalLeve.do?',//hospital-获取所有医院等级信息
        hosiptalService:'/mobile/mcheap/hosiptalAction!hosiptalService.do?',//hospital --获取医疗服务
        hospitalComment:'/mobile/mcheap/hosiptalAction!hosiptalAssess.do?',//hospital--获取医院评价信息
        hosInputComment:'/mobile/mcheap/hosiptalAction!addHosiptalAssess.do?',//hospital--添加评价信息
        qureryDrugInfo:'/mobile/mcheap/hosiptalAction!qureryDrugInfo.do?',//hospital--医院下药品信息
        drugAssess:'/mobile/mcheap/hosiptalAction!drugAssess.do?',//hospital-医院药品评价信息
        hos_insertDrugstore:'/mobile/mcheap/hosiptalAction!insertDrugstore.do?',//hospital-新增医院药品评价
        hos_addFocusHosiptal:'/mobile/mcheap/hosiptalAction!addFocusHosiptal.do?',//hospital增加关注医院
        hos_delFocusHosiptal:'/mobile/mcheap/hosiptalAction!delFocusHosiptal.do?',//hospital取消关注医院
        hos_fouceHosiptalInfo:'/mobile/mcheap/hosiptalAction!fouceHosiptalInfo.do?',//hospital 获取关注医院
        hos_queryAllHospital:'/mobile/mcheap/hosiptalAction!queryAllHospital.do?',//hospital 首页
        guessUserLike:'/mobile/mcheap/mcheapAction!guessUserLike.do?',
        login:'/mobile/mcheap/loginAction!login.do?',//登陆
        register:'/mobile/mcheap/loginAction!register.do?',//注册
        dxRegister:'/mobile/mcheap/loginAction!dxRegister.do?',
        logout:'/mobile/mcheap/loginAction!logout.do?',//退出注册
        productList:'/mobile/mcheap/mcheapAction!productList.do?',//查询类别下产品1
        homePage:'/mobile/mcheap/mcheapAction!homePage.do?',//菜市首页获取分类和推荐菜谱1
        focus:'/mobile/mcheap/mcheapAction!focus.do?',//查询我的关注商品1
        productDetail:'/mobile/mcheap/mcheapAction!productDetail.do?',//查询具体产品
        recommendDetail:'/mobile/mcheap/mcheapAction!recommendDetail.do?',//查询推荐菜谱详情
        menu:'/mobile/mcheap/mcheapAction!menu.do?',//查询我的菜谱1
        addMenu:'/mobile/mcheap/mcheapAction!addMenu.do?',//新增我的菜谱
        deleteMenu:'/mobile/mcheap/mcheapAction!deleteMenu.do?',//删除我的菜谱1
        modifyMenu:'/mobile/mcheap/mcheapAction!modifyMenu.do?',//编辑我的菜谱
        addRecommendMenu:'/mobile/mcheap/mcheapAction!addRecommendMenu.do?',//添加推荐菜谱到我的菜谱
        focusStation:'/mobile/mcheap/mcheapAction!focusStation.do?',//我关注的市场
        addFocusStation:'/mobile/mcheap/mcheapAction!addFocusStation.do?',//新增关注市场
        deleteFocus:'/mobile/mcheap/mcheapAction!deleteFocus.do?',//取消关注产品1
        deleteFocusStation:'/mobile/mcheap/mcheapAction!deleteFocusStation.do?',//取消关注市场
        addFocus:'/mobile/mcheap/mcheapAction!addFocus.do?',//添加关注产品1
        nearMarketPrice:'/mobile/mcheap/mcheapAction!nearMarketPrice.do?',//产品在附近市场或关注市场的价格
        getProductPriceInAllCollection:'/mobile/mcheap/mcheapAction!getProductPriceInAllCollection.do?',//询价界面市场
        stationPrice:'/mobile/mcheap/mcheapAction!stationPrice.do?',//查询采集点信息和采集点下的产品价格
        queryProducts:'/mobile/mcheap/mcheapAction!queryProducts.do?',//查询所有产品（根据拼音排序）
        getRecommendMenuprice:'/mobile/mcheap/mcheapAction!getRecommendMenuprice.do?',//推荐菜谱进行市场询价
        addmenuProduct:'/mobile/mcheap/mcheapAction!addmenuProduct.do?',//添加菜品到菜谱
        checkLoading:'/mobile/mcheap/mcheapAction!checkLoading.do?',//验证登陆
        getPicture:'/mobile/mcheap/mcheapAction!getPicture.do?',//得到图片
        orderproductList:'/mobile/mcheap/mcheapAction!orderproductList.do?',//排序
        setUserInfo:'/mobile/mcheap/mcheapAction!setUserInfo.do?',//设置用户信息
        getUserPrice:'/mobile/mcheap/mcheapAction!getUserPrice.do?',//我的菜谱询价
        querySC:'/mobile/mcheap/mcheapAction!querySC.do?',//首页搜索
        queryUserComplain:'/mobile/mcheap/mcheapAction!queryUserComplain.do?',//查询用户建议信息
        userComplainDetail:'/mobile/mcheap/mcheapAction!userComplainDetail.do?',//查询建议详情
        replyMessage:'/mobile/mcheap/mcheapAction!replyMessage.do?',//新增回复
        editUserComplain:'/mobile/mcheap/mcheapAction!editUserComplain.do',//意见建议文字提交
        queryProductPrice:'/mobile/mcheap/mcheapAction!queryProductPrice.do',//market查询功能
        savePicture:'/mobile/mcheap/mcheapAction!savePicture.do',//picture upload
        getPushHistoryMessage:'/mobile/mcheap/jpushAction!getPushHistoryMessage.do?',//查询推送过得消息接口
        getFocusStationInfo:'/mobile/mcheap/jpushAction!getFocusStationInfo.do?',//推送用户关注市场有哪些便宜产品接口
        getFocusProductsInfo:'/mobile/mcheap/jpushAction!getFocusProductsInfo.do?',//推送用户关注产品在附近市场最便宜价格接口
        getStationCheapProducts:'/mobile/mcheap/jpushAction!getStationCheapProducts.do?',//推送用户附近的市场的便宜信息接口
        getRoundStationNames:'/mobile/mcheap/jpushAction!getRoundStationNames.do?',//查询用户附近市场接口
        getPushHistoryMessageMore:'/mobile/mcheap/jpushAction!getPushHistoryMessageMore.do?',//message窗口数据加载
        changeReadedStatus:'/mobile/mcheap/jpushAction!changeReadedStatus.do?',//message标识为已读接口
        deletePushMessage:'/mobile/mcheap/jpushAction!deletePushMessage.do?',//message文件夹删除推送消息
        userNearMarkets:'/mobile/mcheap/mcheapAction!userNearMarkets.do?',//附近查询
        duanxinValidate:'/mobile/mcheap/loginAction!duanxinValidate.do?',
      	queryPurchase:'/mobile/mcheap/mcheapAction!queryPurchase.do?',//查询购买点
      	deletePurchasePoint:'/mobile/mcheap/mcheapAction!deletePurchasePoint.do?',//删除购买点
      	addPurchasePoint:'/mobile/mcheap/mcheapAction!addPurchasePoint.do?',//添加购物点
        getHosiptalServiceByHosiptal:'/mobile/mcheap/hs/hsForAppAction!getHosiptalServiceByHosiptal.do?',//获取医疗服务
        getHospitalInfo:'/mobile/mcheap/hs/hsForAppAction!getHospitalInfo.do?',//获取医院信息
        getMedicinalByHosiptal:'/mobile/mcheap/hs/hsForAppAction!getMedicinalByHosiptal.do?',//获取药品信息
    	checkVersion:"/mobile/update/updateAction!versionUpdate.do",//检查更新
        getNotReadNum:'/mobile/mcheap/jpushAction!getNotReadNum.do?',//获取未读消息条数
        queryWeekRecommend:'/mobile/mcheap/mcheapAction!queryWeekRecommend.do?',//每周推荐
        queryDayRecommend:'/mobile/mcheap/mcheapAction!queryDayRecommend.do?',//每日推荐
        queryCsAssess:'/mobile/mcheap/mcheapAction!queryCsAssess.do?',//查询市场或产品评价接口
        addCsAssess:'/mobile/mcheap/mcheapAction!addCsAssess.do?',//市场评接口
        moreCollections:'/mobile/mcheap/mcheapAction!moreCollections.do?',//更多市场
        getStandomPriceGroupHsLevel:'/mobile/mcheap/hs/standomHosServerPriceAction!getStandomPriceGroupHsLevel.do?',//hospital-标准医疗服务查询接口
        queryPriceInfo:'/mobile/mcheap/mcheapAction!queryPriceInfo.do?',//获取采集者信息
        productPriceTrend:'/mobile/mcheap/mcheapAction!productPriceTrend.do?',//趋势图
        tenCollections:'/mobile/mcheap/mcheapAction!tenCollections.do?',//市场top10
        productPriceDiscrete:'/mobile/mcheap/mcheapAction!productPriceDiscrete.do?',//离散图
        thermodynamicMap:'/mobile/mcheap/mcheapAction!thermodynamicMap.do?',
        productPriceWarning:'/mobile/mcheap/mcheapAction!productPriceWarning.do?',//查预警图
        medicineTypeLimit:'/mobile/mcheap/medicineAction!medicineTypeLimit.do?',//medicine-查询首页小分类
        medicineType:'/mobile/mcheap/medicineAction!medicineType.do?',//medicine-分类页请求
        serachInfo:'/mobile/mcheap/medicineAction!serachInfo.do?',//medicine-首页搜索
        homeNear:'/mobile/mcheap/medicineAction!homeNear.do?',//medicine-首页附近药店
        medicineDetail:'/mobile/mcheap/medicineAction!medicineDetail.do?',//medicine-中类或者小类下药品详情
        queryYdAssessInfo:'/mobile/mcheap/medicineAction!queryYdAssessInfo.do?',//medicine-获取药店评价信息
        addYdAssess:'/mobile/mcheap/medicineAction!addYdAssess.do?',//medicine-对药店进行评论
        addFocusDrugstore:'/mobile/mcheap/medicineAction!addFocusDrugstore.do?',//medicine-药店设置为关注药店
        delFocusDrugstore:'/mobile/mcheap/medicineAction!delFocusDrugstore.do?',//medicine-取消关注药店
        focusDrugstore:'/mobile/mcheap/medicineAction!focusDrugstore.do?',//medicine-查看关注药店
        addFocusMedicine:'/mobile/mcheap/medicineAction!addFocusMedicine.do?',//medicine-设置关注药品
        delFocusMedicine:'/mobile/mcheap/medicineAction!delFocusMedicine.do?',//medicine-取消关注药品
        focusMedicine:'/mobile/mcheap/medicineAction!focusMedicine.do?',//medicine-查看关注药品
        checkDrugstore:'/mobile/mcheap/medicineAction!checkDrugstore.do?',//medicine-查看药品评论
        queryDrugstoreInfo:'/mobile/mcheap/medicineAction!queryDrugstoreInfo.do?',//medicine-获取药品详情
        insertDrugstore:'/mobile/mcheap/medicineAction!insertDrugstore.do?',//medicine-发表药品评论
        nearDrugstore:'/mobile/mcheap/medicineAction!nearDrugstore.do?',//medicine-点击底部药店页面接口
        nearPharmacyPrice:'/mobile/mcheap/medicineAction!nearPharmacyPrice.do?',//medicine-根据药品查药店的接口
        pharmacyOfCategory:'/mobile/mcheap/medicineAction!pharmacyOfCategory.do?',//medicine-查药店下的分类的接口
        pharmacyOfMedicine:'/mobile/mcheap/medicineAction!pharmacyOfMedicine.do?',//medicine-药店下药品查询接口
        lifeNeed:'/mobile/mcheap/medicineAction!lifeNeed.do?',//medicine-药店常备药品接口
        nearQuery:'/mobile/mcheap/mcheapAction!allNear.do?',//地图附近的公用接口
        bigCategory:'/mobile/mcheap/shopAction!bigCategory.do?',//supermarket-首页查大分类接口
        category:'/mobile/mcheap/shopAction!category.do?',//supermarket-单个大类别下中小类接口
        homeSearch:'/mobile/mcheap/shopAction!homeSearch.do?',//supermarket-首页搜索接口
        nearSupermarkets:'/mobile/mcheap/shopAction!nearSupermarkets.do?',//supermarket-首页附近超市接口
        queryMinorSortGoods:'/mobile/mcheap/shopAction!queryMinorSortGoods.do?',//supermarket-某个小类下的商品接口
        nearSupermarktPrice:'/mobile/mcheap/shopAction!nearSupermarktPrice.do?',//supermarket-根据商品查超市接口
        goodBasicInfo:'/mobile/mcheap/shopAction!goodBasicInfo.do?',//supermarket-请求商品基本信息接口
        focusGoods:'/mobile/mcheap/shopAction!focusGoods.do?',//supermarket-获取关注产品接口
        queryShopComm:'/mobile/mcheap/shopAction!queryShopComm.do?',//supermarket-查看产品评论信息接口
        insertShopComm:'/mobile/mcheap/shopAction!insertShopComm.do?',//supermarket-对产品进行评论
        queryBigClass:'/mobile/mcheap/shopAction!queryBigClass.do?',//supermarket-查询超市下的大类别
        getMidAndSmallClass:'/mobile/mcheap/shopAction!getMidAndSmallClass.do?',//supermarket-查询超市下的小类别
        querySMAssessInfo:'/mobile/mcheap/shopAction!querySMAssessInfo.do?',//supermarket-获取超市评论
        addSMAssess:'/mobile/mcheap/shopAction!addSMAssess.do?',//supermarket-给超市进行超市评论
        addFocuShopping:'/mobile/mcheap/shopAction!addFocuShopping.do?',//supermarket-设置商品关注
        delFocusShopping:'/mobile/mcheap/shopAction!delFocusShopping.do?',//supermarket-取消商品关注
        focusSupermarket:'/mobile/mcheap/shopAction!focusSupermarket.do?',//supermarket-获取关注超市列表
        addFocusShop:'/mobile/mcheap/shopAction!addFocusShop.do?',//supermarket-设置关注超市
        delFocusShop:'/mobile/mcheap/shopAction!delFocusShop.do?',//supermarket-设置关注超市
        queryHotGoods:'/mobile/mcheap/shopAction!queryHotGoods.do?',//supermarket-设置热门产品
        goodsOfShop:'/mobile/mcheap/shopAction!goodsOfShop.do?',//supermarket-设置热门产品
        queryDayProductInfo: '/mobile/mcheap/mcheapAction!queryDayProductInfo.do',//查询本日七天前的数据
        queryWeekProductInfo: '/mobile/mcheap/mcheapAction!queryWeekProductInfo.do',//查询某产品八周平均价格
        getFocusProductOfStation: '/mobile/mcheap/mcheapAction!getFocusProductOfStation.do'//查询某产品是否关注

    }
};
