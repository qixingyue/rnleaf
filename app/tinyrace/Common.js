"use strict";

var React = require("react-native");
var {
	TouchableHighlight
	,Text
} = React;
var styles = require("./styles");

var simpleButton = React.createClass({

	render(){
		return (
			<TouchableHighlight style={[styles.optBtn,this.props.style]} onPress={this.props.onPress} underlayColor="#red">
					<Text style={styles.btntext}>{this.props.text}</Text>
			</TouchableHighlight>
		);		
	}

});


module.exports = {

	simpleButton:simpleButton
	
};
