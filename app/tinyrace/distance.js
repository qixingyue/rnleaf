"use strict";

var RADIUS = 6371 * 1000;

var toRad = function(n) {
  return n * Math.PI / 180;
};

var getDistance = function(from, to) {
  var fromLat = from.coords.latitude;
  var fromLon = from.coords.longitude;
  var toLat = to.coords.latitude;
  var toLon = to.coords.longitude;
  var dLat = toRad(toLat - fromLat);
  var dLon = toRad(toLon - fromLon);
  var fromLat = toRad(fromLat);
  var toLat = toRad(toLat);

  var a = Math.pow(Math.sin(dLat / 2), 2) +
          (Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat));
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS * c;
};

module.exports = getDistance ;
