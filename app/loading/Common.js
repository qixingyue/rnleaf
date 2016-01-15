"use strict";

var React = require("react-native");
var styles = require("./styles");

var {
	View
	,Text
	,ActivityIndicatorIOS
} = React;

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

};
