'use strict';

var React = require("react-native");

var {
	View
	,App
  ,AppRegistry
	,StyleSheet
	,Text
	,TouchableHighlight
	,VibrationIOS
} = React;

var RU = require("../../RctUpdate");

var tinygps = {

	//lat 维度, lng 经度	
	distance(lat1,lng1,lat2,lng2){
			
	}	

};


var tinyrace = React.createClass({

	getInitialState(){
		return {
			initialPosition:null	
			,state:'Start'
			,gpsobj:{
				coords:{}	
			}
		};
	}


	,render(){
		return (
			<View style={styles.container}>
				<TouchableHighlight style={styles.startBtn} onPress={this.startGps} underlayColor="#red">
					<Text style={{fontSize:20}}>{this.state.state}</Text>
				</TouchableHighlight>
				<View style={styles.gpsinfo}>
					<Text style={styles.infosize}>Speed:{this.state.gpsobj.coords.speed}</Text>
					<Text style={styles.infosize}>Timestamp:{this.state.gpsobj.timestamp}</Text>
					<Text style={styles.infosize}>Lat:{this.state.gpsobj.coords.latitude}</Text>
					<Text style={styles.infosize}>Long:{this.state.gpsobj.coords.longitude}</Text>
					<Text style={styles.infosize}>alt:{this.state.gpsobj.coords.altitude}</Text>
					<Text style={styles.infosize}>heading:{this.state.gpsobj.timestamp}</Text>
				</View>
				{RU.backButton()}
			</View>		
		);	
	}

	,startGps(){
		if(this.state.state == "Loading")  return;
		var me = this;
		this.setState({
			'state':'Loading'
		});
		navigator.geolocation.getCurrentPosition(
			(initialPosition) => {
				this.setState({gpsobj:initialPosition,state:"Start"});
				me.startGps();
			},(error) => {
				this.setState({state:"Start"});
				me.startGps();
			},
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);
	}

});

var styles = StyleSheet.create({
	container:{
    flex: 1
    ,backgroundColor: '#F5FCFF'
		,marginTop:20
		,alignItems:'center'
		,justifyContent:'center'
	}
	,startBtn:{
		borderWidth:5
		,width:100
		,height:100
		,alignItems:'center'
		,justifyContent:'center'
		,borderRadius:50
		,borderColor:"#red"
		,backgroundColor:"#eeffee"
	}
	,gpsinfo:{
		borderWidth:1	
		,width:300
		,height:200
		,borderRadius:5
		,backgroundColor:"#eeeeee"
		,padding:5
		,alignItems:'flex-start'
		,justifyContent:'center'
		,paddingLeft:20
		,marginTop:20
	}
	,infosize:{
		fontSize:18
	}
});

AppRegistry.registerComponent("tinyrace",()=>tinyrace);
