"use strict";

var React = require("react-native");

var {
	View
	,Text
} = React;

var TimerMixin = require('react-timer-mixin');

var currentCount = 0;

module.exports.Show = React.createClass({

	mixins:[TimerMixin]	
	,getInitialState(){
		return {
			timeCount:currentCount
		};
	}	

	,render(){
		return (
			<Text>Time:{this.state.timeCount}</Text>		
		);	
	}

	,componentDidMount(){
		var me = this;
		this.setInterval(()=>{me.setState({
			timeCount:(currentCount++)
		});},10);
	}

});

module.exports.getTime = () => currentCount ;
