"use strict";

var React = require("react-native");
var TouchableBounce = require("TouchableBounce");
var RU = require("../../RctUpdate");
var styles = require("./styles");
var Common = require("./Common");
var appm = require("./appm");

var {
	View
	,Text
} = React;

var AppItem = React.createClass({

		getInitialState(){
				return {
					itemInfo:this.props.itemInfo	
				};
		}

		,render(){

			var buttons ;
			if(this.state.itemInfo.delMode) {
				buttons = (
						<View style={styles.buttonList}> 
							<Common.LineButton onPress={this._delApp}	text={"DEL"} />
						</View>
				);	
			} else {
				buttons = (
						<View style={styles.buttonList}> 
							<Common.LineButton onPress={this._dAndRun}	text={"d&run"} />
							<Common.LineButton onPress={this._rLocal}	text={"run@local"} />
						</View>
				);	
			}

			return (
				<TouchableBounce style={styles.appItem} onPress={this._loadDefault}>
						<View style={styles.holder}>
						</View>
						<View style={styles.textPanel}>
							<Text style={styles.itemTitle}>{this.state.itemInfo.name}</Text>
							<Text style={styles.itemDescription}>{this.state.itemInfo.description}</Text>
						</View>
						{buttons}
				</TouchableBounce>
			);	
		}

		,_loadDefault(){
			this.setState({
				loaded:false
			});
			var url = this.state.itemInfo.url;
			var moduleName = this.state.itemInfo.moduleName;
			RU.loadFromUrl(url,moduleName)
		}

		,_dAndRun(){
			this.setState({
				loaded:false
			});
			var url = this.state.itemInfo.url;
			var moduleName = this.state.itemInfo.moduleName;
			RU.downloadAndRun(url,moduleName)
		}

		,_rLocal(){
			this.setState({
				loaded:false
			});
			var moduleName = this.state.itemInfo.moduleName;
			RU.loadFromLocal(moduleName)
		}

		,_delApp(){
			var url = this.state.itemInfo.url;
			var moduleName = this.state.itemInfo.moduleName;
			var me = this;
			appm.removeApp(url,moduleName,(res,message) => {
				if(res) {
					me.props.reloadHandler && me.props.reloadHandler();
				} else {
					alert("DEL FAILED >> " + message);	
				}
			});			
		}
});

module.exports = AppItem;
