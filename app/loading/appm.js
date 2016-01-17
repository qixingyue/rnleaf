var CONFIG = require("./config");

function toQueryString(obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];
		if (Array.isArray(val)) {
			return val.sort().map(function (val2) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
			}).join('&');
		}

		return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	}).join('&') : '';
}

module.exports={

	loadAppList (dataHandler) {
		fetch(CONFIG.AppListURL)
		.then((response) => response.json())		
		.then((responseData) => {
			dataHandler && dataHandler(responseData);
		}).done();	
	}

	,addApp(appItem,fnHandler){
		fetch(CONFIG.AddAppURL,{
			method:'POST'	
			,body:toQueryString(appItem)
		})
		.then((response) => response.json())
		.then((responseData)=>{
			res = responseData.res;
			message = responseData.message;
			fnHandler && fnHandler(res,message);	
		})
		.done();	
	}

	,removeApp(url,moduleName,fnHandler){
		var obj = toQueryString({url:url,moduleName:moduleName});		
		fetch(CONFIG.DelAppURL,{
			method:'POST'	
			,body:obj
		})
		.then((response) => response.json())
		.then((responseData) => {
			res = responseData.res;	
			message = responseData.message;
			fnHandler && fnHandler(res,message);
		})
		.done();
	}

}
