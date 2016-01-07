'use strict';

var React = require('react-native');
var RU = require("../RctUpdate");

var CONFIG = {
	/***
	获取app列表的URL 返回demo 
	返回类似数据:
	[
		...
		{
			"name":"demo"
			,"moduleName":"demo"
			,"description":"this is a simple demo"
			,"url":"http://10.217.39.220:8001/index.ios.bundle"
			,"icon":""
		}
		...
	]
	***/	
	AppListURL:'http://anyapi.sinaapp.com/rnapp/applist.php'
};

var {
  AppRegistry
  ,StyleSheet
  ,Text
  ,View
	,ActivityIndicatorIOS
	,ListView
} = React;

var TouchableBounce = require("TouchableBounce");

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
			var url = this.state.itemInfo.url;
			var moduleName = this.state.itemInfo.moduleName;
			RU.loadFromUrl(url,moduleName)
		}

		,_dAndRun(){
			var url = this.state.itemInfo.url;
			var moduleName = this.state.itemInfo.moduleName;
			RU.downloadAndRun(url,moduleName)
		}

		,_rLocal(){
			var moduleName = this.state.itemInfo.moduleName;
			RU.loadFromLocal(moduleName)
		}
});

var rnleaf = React.createClass({

	getInitialState() {
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			loaded:false
			,dataSource:dataSource.cloneWithRows([])
		};
	}	

  ,render() {
		if(false == this.loaded) {
			return (	
    	  <View style={styles.container}>
					<ActivityIndicatorIOS color="red" size="large" animating={true}></ActivityIndicatorIOS>
					<Text style={styles.littleMargin}>Loading App List ...</Text>
				</View>
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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
		,alignItems:'flex-start'
		,flexDirection:'row'
		,borderColor:'#B3D5BC'
	}
	
	//占位符，放置图片
	,holder:{
		backgroundColor:'#eee'
		,width:40
		,height:40
		,marginRight:5
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

	}
});

AppRegistry.registerComponent('rnleaf', () => rnleaf);
