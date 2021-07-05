function myFunction() {
var map = L.map("map").setView([12.9801708, 77.5730896], 10);

var legend = L.control();
	legend.onAdd = function (map) {
		div = L.DomUtil.create( 'div', 'info legend' );
		div.innerHTML = '<h4><b>Site Visit</b></h4>' +  ('Touch to get attribute');
		return div;
	};
	legend.addTo(map);

var scale = L.control.scale();
         scale.addTo(map);

var GoogleStreet =
          L.tileLayer('http://www.google.com/maps/vt?lyrs=m@189&gl=com&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy;2019 <a href="http://maps.google.com">Google</a> | Terms of Use',
            maxZoom: 21
          })
var GoogleSatellite =
          L.tileLayer('http://www.google.com/maps/vt?lyrs=s@189&gl=com&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy;2019 <a href="http://maps.google.com">Google</a> | Terms of Use',
            maxZoom: 21
          })
var GoogleHybrid =
          L.tileLayer('http://www.google.com/maps/vt?lyrs=s,h@189&gl=com&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy;2019 <a href="http://maps.google.com">Google</a> | Terms of Use',
            maxZoom: 21
          })
map.addLayer(GoogleStreet);

var sslr = L.esri.tiledMapLayer({
url: 'https://kgis.ksrsac.in/kgismaps1/rest/services/CadastralData_Admin/Cached_CadastralData_Admin/MapServer'
}).addTo(map);

map.attributionControl.setPrefix('');

var baseMaps = {'GoogleStreet': GoogleStreet,
            'GoogleSatellite': GoogleSatellite,
            'GoogleHybrid': GoogleHybrid
        };
L.control.layers(baseMaps,{'Cadastral': sslr,},{collapsed:true}).addTo(map);

var code = '1kbTwTfd0CwPPlbcvryJj8EPyDVa7bDKpj95dipz1cq0'

    Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){ 
      var markers = L.markerClusterGroup({maxClusterRadius: 40});
      for (var i in sheet){
var data = sheet[i];

popUpContent = (
'<strong>File_ID : </strong>' + data.File_ID + '<br/>' +
'<strong>District : </strong>' + data.district + '<br/>' +
'<strong>Taluk : </strong>' + data.taluk + '<br/>' +
'<strong>Hobli : </strong>' + data.hobli + '<br/>' +
'<strong>Village : </strong>' + data.village + '<br/>' +
'<strong>Sy No : </strong>' + data.syno + '<br/>' +
'<strong>Extent : </strong>' + data.extent + '<br/>' +
'<strong>Purpose : </strong>' + data.purpose + '<br/>' +
'<strong>Date : </strong>' + data.date + '<br/>' +
'<strong>Status : </strong>' + data.status
);
					
markers.addLayer(L.marker([data.lat, data.lon], {icon: L.VectorMarkers.icon({icon: 'tag', markerColor: data.colour, prefix: 'fa'})}).bindPopup(popUpContent));

		}
map.addLayer(markers);
map.fitBounds(markers.getBounds());
	},
simpleSheet: true 
  })
  
}