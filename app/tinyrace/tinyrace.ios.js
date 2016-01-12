'use strict';

//../../node_modules/react-native/Libraries/Geolocation/Geolocation.js
var React = require("react-native");
var RU = require("../../RctUpdate");
var TimerMixin = require('react-timer-mixin');
var GpsDistance = require("./distance");
var RPoint = require("./RPoint");
var ShowTimer = require("./ShowTimer"); 

var {
	View
	,App
  ,AppRegistry
	,StyleSheet
	,Text
	,TouchableHighlight
	,VibrationIOS
	,ListView
	,StatusBarIOS
	,AsyncStorage
} = React;

StatusBarIOS.setHidden(true);

var tinyrace = React.createClass({

	mixins: [TimerMixin]	
	,markpoints:[]
	,watchID:false
	,gpsWatched:false
	,scores:[]
	,getInitialState(){
		//var rpoints = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)});
		var rpoints = new ListView.DataSource({rowHasChanged: (r1, r2) => true });
		return {
			initialPosition:null	
			,state:'Watch Gps'
			,gpsobj:{
				coords:{}	
			}
			,rpoints:rpoints.cloneWithRows(this.markpoints)
		};
	}
	//	<Text style={styles.infosize}>alt:{this.state.gpsobj.coords.altitude}</Text>
	//	<Text style={styles.infosize}>heading:{this.state.gpsobj.timestamp}</Text>
	,render(){
		return (
			<View style={styles.container}>
				<ShowTimer.Show></ShowTimer.Show>
				<TouchableHighlight onPress={this.seeCores} underlayColor="#red">
						<Text style={styles.btntext}>See Scores</Text>
				</TouchableHighlight>
				<View>
						<ListView
							dataSource = {this.state.rpoints}	
							renderRow = {(rowData) => <RPoint gpsinfo={rowData}></RPoint>}
					 	>		
						</ListView>		
				</View>
				<View style={{flexDirection:"row"}}>
					<TouchableHighlight style={styles.optBtn} onPress={this.startOrEndWatchGps} underlayColor="#red">
						<Text style={styles.btntext}>{this.state.state}</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.optBtn} onPress={this.addPoint} underlayColor="#red">
						<Text style={styles.btntext}>Add Point</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.optBtn} onPress={this.saveLine} underlayColor="#red">
						<Text style={styles.btntext}>Save Line</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.optBtn} onPress={this.loadLine} underlayColor="#red">
						<Text style={styles.btntext}>Load Line</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.gpsinfo}>
					<Text style={styles.infosize}>Timestamp:{this.state.gpsobj.timestamp}</Text>
					<Text style={styles.infosize}>Lat:{this.state.gpsobj.coords.latitude}</Text>
					<Text style={styles.infosize}>Long:{this.state.gpsobj.coords.longitude}</Text>
					<Text style={styles.infosize}>Speed:{this.state.gpsobj.coords.speed}</Text>
				</View>
				{RU.backButton()}
			</View>		
		);	
	}

	,startWatchGps(){
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.setState({gpsobj:position,state:"Stop Watch"});
			this.reCalucate();
		},(error) => {this.startWatchGps();this.watchID = false;}
		,{enableHighAccuracy: true, timeout: 0, maximumAge: 0} );	
	}

	,endWatchGps(){
		 navigator.geolocation.clearWatch(this.watchID);
		 this.setState({gpsobj:{coords:{}},state:"Watch Gps"});
	}

	,startOrEndWatchGps(){
		if(this.gpsWatched)	{
			this.endWatchGps();	
		} else {
			this.startWatchGps();	
		}
		this.gpsWatched = ! this.gpsWatched;
	}

	,addPoint(){
		if(this.state.gpsobj) {
			this.markpoints.push(this.state.gpsobj);
			this.reCalucate();
		}
	}

	,reCalucate(){
		var me = this;
		if( me.markpoints.length > 0) {
				for(var k in me.markpoints){
					me.markpoints[k].distance = GpsDistance(me.markpoints[k],me.state.gpsobj);
					if(me.markpoints[k].distance < 10 ) {
						if(me.scores[k] == null) me.scores[k] = [];
						me.scores[k].push(ShowTimer.getTime());
					}
				}
				me.setState({
					rpoints:me.state.rpoints.cloneWithRows(me.markpoints)	
				});
		}
	}

	,saveLine(){
		AsyncStorage.setItem("line",JSON.stringify(this.markpoints),(err)=>{if(err == null) alert("Save OK!");});	
	}

	,loadLine(){
		AsyncStorage.getItem("line",(e,s)=>{
			if(e == null) {
				this.markpoints = JSON.parse(s);	
			}
		});
	}

	,seeCores(){
		this.endWatchGps();
		for(var i in this.markpoints){
			this.markpoints[i].distance = this.scores[i] ? this.scores[i].join(",") : "";
		}
		this.setState({
			rpoints:this.state.rpoints.cloneWithRows(this.markpoints)	
		});
	}

});

var styles = StyleSheet.create({
	container:{
    flex: 1
    ,backgroundColor: '#F5FCFF'
		,marginTop:20
		,alignItems:'center'
		,justifyContent:'flex-end'
		,paddingBottom:40
	}
	,optBtn:{
		borderWidth:5
		,width:80
		,height:80
		,alignItems:'center'
		,justifyContent:'center'
		,borderRadius:40
		,borderColor:"#red"
		,backgroundColor:"#eeffee"
	}
	,btntext:{
		fontSize:15	
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

AppRegistry.registerComponent("tinyrace",()=>tinyrace);
