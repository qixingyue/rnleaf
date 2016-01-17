var host = "http://anyapi.sinaapp.com";
module.exports = {
	/***
	获取app列表的URL 返回demo 
	返回类似数据:
	[
		...
		{
			"name":"demo"
			,"moduleName":"demo"
			,"description":"this is a simple demo"
			,"url":"http://10.217.39.220:8001/index.ios.bundle"
			,"icon":""
		}
		...
	]
	***/	
	AppListURL:host + '/rnapp/app.php?password=de7e95132907c131911a952240a246e2'
	,AddAppURL:host + '/rnapp/app.php?password=de7e95132907c131911a952240a246e2&action=add'
	,DelAppURL:host + '/rnapp/app.php?password=de7e95132907c131911a952240a246e2&action=del'
};


