'use strict';

var React = require("react-native");
var RU = require("../../RctUpdate");
var GpsDistance = require("./distance");
var RPoint = require("./RPoint");
var ShowTimer = require("./ShowTimer"); 
var styles = require("./styles");
var Score = require("./Score");
var Line = require("./Line");

var Common = require("./Common");

var {
	View
  ,AppRegistry
	,Text
	,ListView
	,StatusBarIOS
} = React;

var tinyrace = React.createClass({

	markpoints:[]
	,watchID:false
	,gpsWatched:false
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
	,render(){
		return (
			<View style={styles.container}>
				<ShowTimer.Show></ShowTimer.Show>

				<Common.simpleButton style={{width:200}} onPress={this.seeCores} text="See Scores"></Common.simpleButton>

				<View style={{flex:1}}>
						<ListView
							dataSource = {this.state.rpoints}	
							renderRow = {(rowData) => <RPoint gpsinfo={rowData}></RPoint>}
					 	>		
						</ListView>		
				</View>
				<View style={{flexDirection:"row"}}>
					<Common.simpleButton onPress={this.startOrEndWatchGps} text={this.state.state}></Common.simpleButton>
					<Common.simpleButton onPress={this.addPoint} text="Add Point"></Common.simpleButton>
					<Common.simpleButton onPress={this.saveLine} text="Save Line"></Common.simpleButton>
					<Common.simpleButton onPress={this.loadLine} text="Load Line"></Common.simpleButton>
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
						Score.markPoint(k,me.markpoints[k],ShowTimer.getTime());
					}
				}
				me.setState({
					rpoints:me.state.rpoints.cloneWithRows(me.markpoints)	
				});
		}
	}

	,saveLine(){
		Line.saveLine(this.markpoints);
	}

	,loadLine(){
		Line.loadLine((e,s)=>{
			if(e == null) {
				this.markpoints = JSON.parse(s);	
			}
		});
	}

	,seeCores(){
		this.endWatchGps();
		this.markpoints = Score.writeScore(this.markpoints);
		this.setState({
			rpoints:this.state.rpoints.cloneWithRows(this.markpoints)	
		});
	}

});

AppRegistry.registerComponent("tinyrace",()=>tinyrace);
