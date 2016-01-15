"use strict";

var React = require("react-native");
var TouchableBounce = require("TouchableBounce");
var RU = require("../../RctUpdate");
var styles = require("./styles");

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
			return (
				<TouchableBounce style={styles.appItem} onPress={this._loadDefault}>
						<View style={styles.holder}>
						</View>
						<View style={styles.textPanel}>
							<Text style={styles.itemTitle}>{this.state.itemInfo.name}</Text>
							<Text style={styles.itemDescription}>{this.state.itemInfo.description}</Text>
						</View>
						<View style={styles.buttonList}>
							<TouchableBounce style={styles.lineButton} onPress={this._dAndRun}>
							<Text style={styles.itemTitle}>d&run</Text>
							</TouchableBounce>
							<TouchableBounce style={styles.lineButton} onPress={this._rLocal}>
							<Text style={styles.itemTitle}>run@local</Text>
							</TouchableBounce>
						</View>
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
});

module.exports = AppItem;
