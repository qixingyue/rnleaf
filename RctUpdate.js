"use strict";

var React = require("react-native");

var TimerMixin = require('react-timer-mixin');

var {
  StyleSheet
  ,Text
	,NativeModules
	,TouchableOpacity
	,Alert
} = React;

var rctUpdateObj = NativeModules.RctUpdate;

var styles = StyleSheet.create({
	backButton:{
		backgroundColor:"#ae1"
		,padding:5
		,borderColor:"#0fa"
		,borderWidth:1
		,borderRadius:10
		,position:'absolute'
	}
});

var warningMessage = function(message){
	if(null == message){
		message = "LOAD ERROR !";	
	}
	Alert.alert("Warning",message);
};

module.exports = {

	loadFromUrl(url,moduleName){
			rctUpdateObj.loadFromUrl(url,moduleName,()=>{warningMessage()});
	}

	,loadFromLocal(moduleName){
			rctUpdateObj.loadFromLocal(moduleName,()=>{warningMessage()});
	}

	,backToBase(){
			rctUpdateObj.backToBase(()=>{warningMessage()});
	}

	,downloadAndRun(url,moduleName){
			rctUpdateObj.downloadAndRun(url,moduleName,()=>{warningMessage()});
	}

	//切换场景，需提供中断回调
	,backButton(terminalHandler){
		var me = this;
		var realBackHandler = function(){
			terminalHandler && terminalHandler();	
			me.backToBase();	
		}	
		var RealBackButton = React.createClass({

			mixins: [TimerMixin]

			,getInitialState(){
				return {
					left:0	
					,bottom:0
				}
			}
			,render(){
				return (
					<TouchableOpacity onPress = {me.backToBase} style={[styles.backButton,{left:this.state.left,bottom:this.state.bottom}]}>
						<Text>BACK</Text>
					</TouchableOpacity>			
				);
			}

			,componentDidMount(){
				this.setInterval(()=>{
					this.setState({
						left:Math.random() * 10
						,bottom:Math.random() * 10
					});
				},500);	
			}
		});

		return <RealBackButton></RealBackButton>;
	}

}
