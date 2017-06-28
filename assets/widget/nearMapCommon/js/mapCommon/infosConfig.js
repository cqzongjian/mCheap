/*************************************配置各模块里面的信息*************************************/
var showMarkerInfos = {//配置marker的显示字段
	"greensNearby":{//买菜附近的地图上的marker
		//"cltpit01001":"菜市场名称:",
		"cltpit01004":"市场地址 :",
		//"cheapercount":"最低价格品种数 :"
	},
	"seeDoctor":{//看病附近的地图上的marker
		"cltpit01004":"医院地址 :",
		"level":"医院等级 :",
	},
	"buyThings":{//逛超市附近的地图上的marker
		"cltpit01004":"超市地址 :",
		//"cheapercount":"最低价格品种数:",
	},
	"buyDrugs":{//买药附近的地图上的marker
		"cltpit01004":"药店地址 :",
		//"cheapercount":"最低价格药品数 :",
	}
}
var markersInfos = {//生成marker市场的详细情况
	"greensNearby":{//买菜附近的地图上的marker
		//"cltpit01001":"菜市场名称:",
		"zhishu":"价格指数:",
		//"cheapercount":"最低价格品种数:"
	}
}
var queryMarkers = {//模块从后台查询的接口
	"greensNearby":{//买菜
		"flag":"03",
		"type":"买菜"
	},
	"seeDoctor":{//看病
		"flag":"02",
		"type":"看病"
	},
	"buyThings":{//逛超市
		"flag":"05",
		"type":"超市"
	},
	"buyDrugs":{//买药
		"flag":"04",
		"type":"买药"
	},
}
var yyLevel = {//医院等级的码表
		"0101":"一级甲等",
		"0102":"一级乙等",
		"0103":"一级丙等",
		"0201":"二级甲等",
		"0202":"二级乙等",
		"0203":"二级丙等",
		"0301":"三级甲等",
		"0302":"三级乙等",
		"0303":"三级丙等",
}
