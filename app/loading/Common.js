"use strict";

var React = require("react-native");
var styles = require("./styles");
var TouchableBounce = require("TouchableBounce");

var {
	View
	,Text
	,ActivityIndicatorIOS
} = React;

var LineButton = React.createClass({

	render(){
		return (
			<TouchableBounce style={[styles.lineButton,this.props.style]} onPress={this.props.onPress}>
				<Text style={styles.itemTitle}>{this.props.text}</Text>
			</TouchableBounce>
		);	
	}

});
			

var LoadingView = React.createClass({
	
	render(){
		return (
    	  <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
					<ActivityIndicatorIOS color="red" size="large" animating={true}></ActivityIndicatorIOS>
					<Text style={styles.littleMargin}>{this.props.loadingText}</Text>
				</View>
		);	
	}

});

module.exports = {

	LoadingView:LoadingView
	,LineButton:LineButton

};
