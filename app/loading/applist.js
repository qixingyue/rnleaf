'use strict';

var React = require('react-native');
var styles = require("./styles");
var Common = require("./Common");
var AppItem = require("./appitem");
var Appm = require("./appm");
var AddApp = require("./addApp");

var {
  AppRegistry
  ,Text
  ,View
	,ListView
	,Navigator
} = React;

var Applist = React.createClass({

	appList:[]
	,delMode:false
	,getInitialState() {
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
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
						renderRow = {(rowData) => <AppItem itemInfo={rowData} reloadHandler={this.reLoadApp}></AppItem>}
					/>
					<Common.LineButton text="Reload App List" onPress={this.reLoadApp}/>
					<Common.LineButton text="Add App Item" onPress={this.addApp}/>
					<Common.LineButton text="Remove Item" onPress={this.removeApp}/>
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
		Appm.loadAppList((responseData)=>{
			this.appList = responseData;
			this.setState({
				loaded:true
				,dataSource:this.state.dataSource.cloneWithRows(responseData)
			});	
		});

	}

	,removeApp(){
		this.delMode = !this.delMode;
		for(var i = 0 ; i < this.appList.length; i++){
			this.appList[i].delMode = this.delMode;
		}
		this.setState({
			dataSource:	this.state.dataSource.cloneWithRows(this.appList)
		});
	}

	,addApp(){
		 const { navigator } = this.props;
		 if(navigator){
				navigator.push({
					name:"addApp screen"	
					,component:AddApp
					,params:{}
				}); 
		 }
	}

});

module.exports = Applist;
