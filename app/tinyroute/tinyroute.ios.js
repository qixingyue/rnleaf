"use strict";

var React = require("react-native");
var RU = require("../../RctUpdate");


var {
	View
	,Navigator
	,Text
	,AppRegistry
	,Stat
	,StatusBarIOS
	,TouchableOpacity
} = React;

//StatusBarIOS.setHidden(true);

var NavigationBarRouteMapper = {

 		LeftButton: function(route, navigator, index, navState) {
 	   if (index === 0) {
 	     return null;
 	   }

 	   var previousRoute = navState.routeStack[index - 1];
 	   return (
			<View style={{flex:1,alignItems:'center',justifyContent:'center',paddingLeft:10}}>
 	     <TouchableOpacity onPress={()=>{navigator.pop()}}>
 	       <Text>返回</Text>
 	     </TouchableOpacity>
			 </View>
 	   );
 	 }

  	,RightButton: function(route, navigator, index, navState) {
			return null;
  	}

		,Title(route, navigator, index, navState) {
			return (
				<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
					<Text>{route.name}</Text>
				</View>
			);
		}
};

var FirstPageComponent = React.createClass({

		nav:null

		,getInitialState(){
			this.nav = this.props.navigator;
			return {}	
		}

		,render(){
			return (	
				<View style={{flex:1}}>
					<TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={this.jump}>
						<Text>Hello route</Text>	
					</TouchableOpacity>
					<TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={this.jumpBack}>
						<Text>Hello Back</Text>	
					</TouchableOpacity>
					{RU.backButton()}
				</View>		
			);
		}

		,jump(){
			this.nav.push({
				name:'Second Screen'	
				,component:FirstPageComponent
				,params:{
						
				}
			});	
		}

		,jumpBack(){
			this.nav.pop();	
		}

});


var SampleComponent = React.createClass({

	render() {
		var defaultName = 'FirstPageComponent';
		var defaultComponent = FirstPageComponent;
		return (
			<Navigator
				initialRoute={{ name:defaultName , component: defaultComponent}}
				configureScene={()=>{
					//有很多种切换动画
					// node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
					return Navigator.SceneConfigs.FloatFromRight;
				}}
				navigationBar={
						<Navigator.NavigationBar
							 routeMapper={NavigationBarRouteMapper}
							 style={{backgroundColor: '#eee'}}
						/>	
				}
				renderScene={(route,navigator)=>{
					let Component = route.component;
			    if(route.component) {
						return <Component {...route.params} navigator={navigator} />
	        }		
				}}	
			>
			</Navigator>
		);
	}

});


AppRegistry.registerComponent("tinyroute",()=>SampleComponent);
