$.imageOptions = {
	dbName:"collection",  //数据库名称
	opCode:1,   //opcode
	sqlFilePath:"", //创表sql语句
	appId:"20"
}

ImageType = {
		user:1,
		product:2,
		market:3,
		cookbook:4
};

$.imageHandler = new PicGetter();