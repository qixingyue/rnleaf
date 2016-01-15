"use strict";

var React = require("react-native");

var {
	StyleSheet
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1
    ,backgroundColor: '#F5FCFF'
  }
	,littleMargin: {
		margin:15
	}
	,appList:{
		marginTop:30	
		,padding:10
	}
	,appItem: {
		padding:5
		,borderBottomWidth:1
		,borderStyle:'solid'
		,flexDirection:'row'
		,borderColor:'#B3D5BC'
		,alignItems:'center'
		,justifyContent:'center'
	}
	
	//占位符，放置图片
	,holder:{
		backgroundColor:'#eee'
		,width:60
		,height:60
		,marginRight:5
		,alignItems:'center'
		,justifyContent:'center'
	}
	,textPanel: {
		marginLeft:15
		,flex:1	
	}
	,buttonList: {
		width:80
		,marginRight:5
	}
	,itemTitle:{
    color: '#333333',
	}
	,itemDescription:{
    color: '#999999',
	}
	,lineButton:{
		backgroundColor:'#fck'	
		,borderColor:'#B3D5BC'
		,borderWidth:1
		,borderRadius:4
		,margin:2
		,padding:2
		,alignItems:'center'
		,height:30
	}
});


