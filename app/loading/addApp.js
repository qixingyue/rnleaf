"use strict";

var React = require("react-native");
var styles = require("./styles");
var NavigationBar = require('react-native-navbar');
var Common = require("./Common");

var {
	View
	,Text
	,TextInput
} = React;

var addAppItem = [];

var ELineFiled = React.createClass({

	render(){
		return (
			<View style={{marginTop:10,marginLeft:20}}>
				<Text>{this.props.label}</Text>	
				<TextInput 
					style={[{padding:5,height: 40,borderColor:'gray',borderWidth:1,marginTop:10,marginRight:20},this.props.style]}
					multiline={this.props.multiline}
				/>
			</View>
		);
	}

});


var AddAppScreen = React.createClass({

	render(){
		const { navigator } = this.props;
		return (
			<View style={styles.container}>
				<NavigationBar title={{title:"Add App Item"}} leftButton={{title:"Back",handler:()=>{navigator.pop()}}} />
				<ELineFiled label="Name:" name="name"/>	
				<ELineFiled label="ModuleName:" name="moduleName"/>	
				<ELineFiled label="URL:" />	
				<ELineFiled label="Description:" multiline={true} style={{height:120}}/>	
				<Common.LineButton style={{marginTop:20}} onPress={this.addApp} text="Add This App"/>
			</View>
		);	
	}

	,addApp(){
		const { navigator } = this.props;
		navigator.pop();
	}

});

module.exports = AddAppScreen;
