;var TransitParty = (function (L, $, topojson) {

  var hexLayer;
  var baseLayer;
  //var map;

  function loadHexes() {
    $.getJSON('data/metro.topojson', function(data){
      layer = L.geoJson(topojson.feature(data, data.objects['metro']),{
        style: {
            fill: true,
            fillOpacity: 0,
            stroke: false
        },
        onEachFeature: function (feature, layer) {
            feature.properties.pid = whichFeature;
            layer.on('click', clickHandler);
            whichFeature++;
        }
      });
    });
  }

  function initializeMap() {
    map = new L.map('map',{
        center: new L.LatLng(41.238883, -96.089233),
        zoom: 11,
        attributionControl: false,
        scrollWheelZoom: false
    });

    baseLayer = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      subdomains: '1234'
    }).addTo(map);

    loadHexes();
  }

  return {

    init : function() {
      initializeMap();
    }

  }

})(L, $);

$(document).ready(function () {
  TransitParty.init();
});
