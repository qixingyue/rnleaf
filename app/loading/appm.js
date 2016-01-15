var CONFIG = require("./config");

module.exports={

	loadAppList (dataHandler) {
		fetch(CONFIG.AppListURL)
		.then((response) => response.json())		
		.then((responseData) => {
			dataHandler && dataHandler(responseData);
		}).done();	
	}

	

}
