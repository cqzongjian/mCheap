
/*
 *超市关注后刷新首页和超市列表页面
 * */
function refreshPage(){
	$.execScript({
		winName:'supermarket',
		frameName:'supermarket_index',
		script:'requestHomeNear();requestFocusStore();'
	});
	$.execScript({
		winName:'supermarket',
		frameName:'shop_lists',
		script:'requestData();'
	});
}

