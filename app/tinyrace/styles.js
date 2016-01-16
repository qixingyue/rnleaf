"use strict";

var React = require("react-native");
var {
	StyleSheet
} = React;

module.exports =  StyleSheet.create({
	container:{
    flex: 1
    ,backgroundColor: '#F5FCFF'
		,alignItems:'center'
		,justifyContent:'flex-end'
		,paddingBottom:40
		,marginTop:30
	}
	,optBtn:{
		borderWidth:1
		,width:80
		,height:30
		,alignItems:'center'
		,justifyContent:'center'
		,borderRadius:5
		,borderColor:"#red"
		,backgroundColor:"#eeffee"
		,margin:2
	}
	,btntext:{
		fontSize:12
	}
	,gpsinfo:{
		borderWidth:1	
		,width:300
		,height:120
		,borderRadius:5
		,backgroundColor:"#eeeeee"
		,alignItems:'flex-start'
		,justifyContent:'center'
		,paddingLeft:20
		,marginTop:20
	}
	,infosize:{
		fontSize:18
	}
});

