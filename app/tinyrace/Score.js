"use strict";

var scores = [];
var nextMarkTime = [];
//打点时间间隔必须超过一个固定值
var markSplitTime = 30;

module.exports = {

	markPoint:function(pointIndex,point,time){

		//一段时间内重复打点，忽略打点
		if(nextMarkTime[pointIndex] != null && time < nextMarkTime[pointIndex]) {
			return;
		}
		if(scores[pointIndex] == null) {
			scores[pointIndex] = [];
		}
		scores[pointIndex].push(time);
		nextMarkTime[pointIndex] = time + markSplitTime;
	}

	,writeScore:function(markpoints){
		for(var pointIndex in markpoints){
			markpoints[pointIndex].distance = ( scores[pointIndex] ? scores[pointIndex].join(",") : "" );
		}	
		return markpoints;
	}

};
