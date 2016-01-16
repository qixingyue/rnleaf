'use strict';

var React = require('react-native');
var Applist = require("./applist");

var {
  AppRegistry
	,Navigator
} = React;


var rnleaf = React.createClass({

	render() {
		var defaultName = 'Applist';
		var defaultComponent = Applist;
		return (
			<Navigator
				initialRoute={{ name: defaultName, component: defaultComponent }}
				configureScene={() => {
					return Navigator.SceneConfigs.PushFromRight;
				}}
				renderScene={(route, navigator) => {
					let Component = route.component;
					if(route.component) {
						return <Component {...route.params} navigator={navigator} />
					}
				}} />
			);
	}
});


AppRegistry.registerComponent('rnleaf', () => rnleaf);
