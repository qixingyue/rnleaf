"use strict";

var React = require("react-native");
var {
	AsyncStorage
} = React;

module.exports = {

	saveLine(markpoints){
		AsyncStorage.setItem("line",JSON.stringify(markpoints),(err)=>{if(err == null) alert("Save OK!");});	
		//var line_name = "line" + (new Date()).getTime();
		//AlertIOS.prompt(
		//	"saveLines"	
		//	,"Default Name is : " + line_name
		//	,null
		//	,(v)=>{
		//		if(v==""){
		//			v = line_name;
		//		}
		//		AsyncStorage.getItem("lines",(e,v)=>{
		//			var lines_obj = [];
		//			if(v != null) {
		//				lines_obj = JSON.parse(v);	
		//			}
		//			lines_obj[line_name] = this.markpoints;
		//			AsyncStorage.setItem("lines",JSON.stringify(lines_obj),(err)=>{if(err == null) alert("Save OK!");});	
		//		});
		//	}
		//);
	}

	,loadLine(handler){
		AsyncStorage.getItem("line",handler);
	}
}
