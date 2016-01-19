"use strict";

var React = require("react-native");
var styles = require("./styles");
var TouchableBounce = require("TouchableBounce");

var {
	View
	,Text
	,ActivityIndicatorIOS
	,TextInput
	,PickerIOS
	,PickerItemIOS
} = React;

var LineButton = React.createClass({

	render(){
		return (
			<TouchableBounce style={[styles.lineButton,this.props.style]} onPress={this.props.onPress}>
				<Text style={styles.itemTitle}>{this.props.text}</Text>
			</TouchableBounce>
		);	
	}

});
			

var LoadingView = React.createClass({
	
	render(){
		return (
    	  <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
					<ActivityIndicatorIOS color="red" size="large" animating={true}></ActivityIndicatorIOS>
					<Text style={styles.littleMargin}>{this.props.loadingText}</Text>
				</View>
		);	
	}

});

var ELineFiled = React.createClass({

	render(){
		return (
			<View style={{marginTop:10,marginLeft:20}}>
				<Text>{this.props.label}</Text>	
				<TextInput 
					style={[{padding:5,height: 40,borderColor:'gray',borderWidth:1,marginTop:10,marginRight:20},this.props.style]}
					multiline={this.props.multiline}
					onChangeText={(text)=>{ this.props.setValueHander && this.props.setValueHander(this.props.name,text);}}
				/>
			</View>
		);
	}

});

var EPickerField = React.createClass({

	type:"EPickerField"

	,getInitialState(){
		return {
			selectedValue:this.props.items[0]
		};	
	}

	,render(){
		return (
				<PickerIOS
					selectedValue={this.state.selectedValue}
					onValueChange={(item) => {this.setState({selectedValue:item}); this.props.setValueHander && this.props.setValueHander(this.props.name,item)}}
				>
				{this.props.items.map((item) => {
					return (<PickerItemIOS key={item} value={item} label={item}></PickerItemIOS>)
				})}
				</PickerIOS>
		);	
	}
});

module.exports = {

	LoadingView:LoadingView
	,LineButton:LineButton
	,ELineFiled:ELineFiled
	,EPickerField:EPickerField
};
