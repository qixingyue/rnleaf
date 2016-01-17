"use strict";

var React = require("react-native");
var styles = require("./styles");
var NavigationBar = require('react-native-navbar');
var Common = require("./Common");
var appm = require("./appm");

var {
	View
	,Text
	,TextInput
} = React;

var addAppItem = {
	"url":""
	,"name":""
	,"moduleName":""
	,"description":""
};

var ELineFiled = React.createClass({

	render(){
		return (
			<View style={{marginTop:10,marginLeft:20}}>
				<Text>{this.props.label}</Text>	
				<TextInput 
					style={[{padding:5,height: 40,borderColor:'gray',borderWidth:1,marginTop:10,marginRight:20},this.props.style]}
					multiline={this.props.multiline}
					onChangeText={(text)=>{addAppItem[this.props.name] = text;}}
				/>
			</View>
		);
	}

});


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
					<Common.LoadingView loadingText="Add App Item..."/>
			);	
		} else {
			return (
				<View style={styles.container}>
					<NavigationBar title={{title:"Add App Item"}} leftButton={{title:"Back",handler:()=>{navigator.pop()}}} />
					<ELineFiled label="Name:" name="name"/>	
					<ELineFiled label="ModuleName:" name="moduleName"/>	
					<ELineFiled label="URL:" name="url"/>	
					<ELineFiled label="Description:" multiline={true} style={{height:120}} name="description"/>	
					<Common.LineButton style={{marginTop:20}} onPress={this.addApp} text="Add This App"/>
				</View>
			);	
		}
	}

	,addApp(){
		console.log(addAppItem);
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
