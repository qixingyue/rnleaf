"use strict";

var React = require("react-native");
var styles = require("./styles");
var NavigationBar = require('react-native-navbar');
var Common = require("./Common");
var appm = require("./appm");

var {
	View
	,ScrollView
} = React;

var {
	ELineFiled
	,LoadingView
	,LineButton
	,EPickerField
} = Common;

var addAppItem = {
	"url":""
	,"name":""
	,"moduleName":""
	,"description":""
};

function setValueHander(name,value){
	addAppItem[name] = value;
}


var AddAppScreen = React.createClass({

	getInitialState(){
		return {
			netsync:false	
		};
	}

	,render(){
		const { navigator } = this.props;
		if(this.state.netsync){
			return (
					<LoadingView loadingText="Add App Item..."/>
			);	
		} else {
			return (
				<View style={styles.container}>
					<ScrollView>
					<NavigationBar title={{title:"Add App Item"}} leftButton={{title:"Back",handler:()=>{navigator.pop()}}} />
					<ELineFiled setValueHander = {setValueHander} label="Name:" name="name"/>	
					<ELineFiled setValueHander = {setValueHander} label="ModuleName:" name="moduleName"/>	
					<ELineFiled setValueHander = {setValueHander} label="Description:" multiline={true} style={{height:120}} name="description"/>	
					<EPickerField 
						items={["localhost:8081","192.168.1.114:8081","10.217.39.76:8081","10.217.39.251:8081"]}
						setValueHander={setValueHander}
						name="url"
					/>
					<LineButton style={{marginTop:20}} onPress={this.addApp} text="Add This App"/>
					</ScrollView>
				</View>
			);	
		}
	}

	,addApp(){
		addAppItem.url = "http://" + addAppItem.url 
			+ "/app/" + addAppItem.moduleName + "/" 
			+ addAppItem.moduleName + ".ios.bundle";
		const { navigator } = this.props;
		appm.addApp(addAppItem,(res,message)=>{
			if(res){
				navigator.pop();
			} else {
				alert("Add Failed...." + message);	
			}
		});
	}

});

module.exports = AddAppScreen;
