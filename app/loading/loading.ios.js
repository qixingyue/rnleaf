'use strict';

var React = require('react-native');
var RU = require("../../RctUpdate");
var styles = require("./styles");
var Common = require("./Common");
var CONFIG = require("./config");
var AppItem = require("./appitem");

var {
  AppRegistry
  ,StyleSheet
  ,Text
  ,View
	,ActivityIndicatorIOS
	,ListView
} = React;


var rnleaf = React.createClass({

	getInitialState() {
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			loaded:false
			,dataSource:dataSource.cloneWithRows([])
		};
	}	

  ,render() {
		if(false == this.state.loaded) {
			return (	
					<Common.LoadingView loadingText="Loading App List ..."/>
			);
		} else {
    	return (
    	  <View style={styles.container}>
					<ListView
						style={styles.appList}
						dataSource = {this.state.dataSource}	
						renderRow = {(rowData) => <AppItem itemInfo={rowData}></AppItem>}
					>
					</ListView>	
    	  </View>
    	);
		}
  }

	,componentDidMount() {
		this.reLoadApp();
	}

	,reLoadApp(){
		this.setState({
			loaded:false	
		});
		fetch(CONFIG.AppListURL)
		.then((response) => response.json())		
		.then((responseData) => {
			this.setState({
				loaded:true
				,dataSource:this.state.dataSource.cloneWithRows(responseData)
			});	
		}).done();	
	}

});

AppRegistry.registerComponent('rnleaf', () => rnleaf);
