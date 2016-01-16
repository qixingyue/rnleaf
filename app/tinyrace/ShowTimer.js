"use strict";

var React = require("react-native");

var {
	View
	,Text
} = React;

var TimerMixin = require('react-timer-mixin');
var showTime = function (t){
		var h = Math.floor(t / 3600);	
		var m = Math.floor((t - h * 3600) / 60 );
		var s = t % 60;
		var str = (( h < 10 ) ? ( 0 + "" + h) : h ) + ":" +  (( m < 10 ) ? ( 0 + "" + m) : m ) + ":" + (( s < 10 ) ? ( 0 + "" + s) : s );
		return str;
}

var getShowTime = () => showTime(currentCount);

var currentCount = 0;

module.exports.Show = React.createClass({

	mixins:[TimerMixin]	
	,getInitialState(){
		return {
			timeCount:showTime(currentCount)
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
			timeCount:showTime(currentCount++)
		});},1000);
	}

});

module.exports.getTime = () => currentCount ;
module.exports.showTime = showTime;
module.exports.getShowTime = getShowTime;
