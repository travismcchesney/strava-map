var geocoder;
var map;
function decodeLevels(encodedLevelsString) {
   var decodedLevels = [];

   for (var i = 0; i < encodedLevelsString.length; ++i) {
        var level = encodedLevelsString.charCodeAt(i) - 63;
        decodedLevels.push(level);
   }
   return decodedLevels;
}
function initialize() {
   var map_canvas = document.getElementById('map_canvas');
   geocoder = new google.maps.Geocoder();

   // Create an array of styles.
   var styles = [
      {
         stylers : [
            {
               hue : "#FF9900"
            },
            {
               saturation : 10
            }
         ]
      },
      {
         featureType : "road",
         elementType : "geometry",
         stylers : [
            {
               lightness : 100
            },
            {
               visibility : "simplified"
            }
         ]
      },
      {
         featureType : "road",
         elementType : "labels",
         stylers : [
            {
               lightness : 50
            },
            {
               visibility : "simplified"
            }
         ]
      },
      {
         featureType : "poi.business",
         elementType : "labels",
         stylers : [
            {
               visibility : "off"
            }
         ]
      }
   ];

   var stravaMap = new google.maps.StyledMapType(styles, { name : 'Strava' });
   var types = [ 'map_fg', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID ];
   var map_options = {
      center : new google.maps.LatLng(39.7392, -104.9842),
      zoom : 9,
      mapTypeId : google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions : {
         style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
         mapTypeIds : types
      }
   };

   map = new google.maps.Map(map_canvas, map_options);

   var decodedPath = google.maps.geometry.encoding.decodePath('mwxqFnvgaS`AqFhEyEfAgLhPqLnAwEbRG~A{C`FSdAuBqCyV|ByFUiDxAeBlAwRtCwIIiHiDaPuHmC_E_PcFk@aH|EnHaFzEv@`EzObIlDbDdUeD~LaAdSiBlB`@fDsBtEhAvCk@tDnBnIYdEnDoJpGg@gGb@l@uEwBbMkC`DeG\\wApC_RJU}UqB}EzAvBf@jH{@zUoPbMmAtLiFlH_L`CxIN_AYs@@');
   var decodedLevels = decodeLevels('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');

   var setRegion = new google.maps.Polyline({
        path: decodedPath,
        levels: decodedLevels,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
   });

   map.mapTypes.set('map_fg', stravaMap);
   map.setMapTypeId('map_fg');
}


$(document).ready(function(){
   initialize();
});