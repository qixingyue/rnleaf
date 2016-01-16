"use strict";

var React = require("react-native");

var {
	View
	,Text
} = React;

var RPointNum = 0;
module.exports = React.createClass({

	getInitialState(){
		return {
			num:RPointNum++					
			,gpsinfo:this.props.gpsinfo
		}	
	}	
	
	,render(){
		return (
			<View style={{flexDirection:"row"}}>	
				<Text style={{color:"blue",fontSize:12,margin:10}}>{this.state.num}</Text>
				<Text style={{fontSize:12,margin:10}}>{this.state.gpsinfo.distance}</Text>
			</View>	
		);
	}

});


