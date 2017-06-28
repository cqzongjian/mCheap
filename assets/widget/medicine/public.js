
/*
 *超市关注后刷新首页和超市列表页面
 * */
function refreshPage(){
	$.execScript({
		winName:'medicine',
		frameName:'medicine_index',
		script:'requestHomeNear();requestFocusStore();'
	});
	$.execScript({
		winName:'medicine',
		frameName:'shop_list',
		script:'requestData();'
	});
}

