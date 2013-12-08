$(document).ready(function () {
    var main = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © OpenStreetMap contributors',
            minZoom: 5,
            maxZoom: 18,
        });
        counties = L.layerGroup(),
        current_towns = L.layerGroup();

    window.map = L.map('map-canvas', {
        center: [42.6501, -76.3659],
        zoom: 7,
        layers: [
            main
         ]
    });

   $.getJSON('/static/data/US/NY/055/US-NY-055-SHAPE.json', function (features) {
        $.getJSON('/static/data/US/NY/055/US-NY-055-STATS.json', function (stats) {
            L.geoJson(features, { 
                style: function (feature) {
                    var id = feature.properties['GEOID'];
                           return {
                               fillColor: "blue",
                               fillOpacity: 0.4
                            }
                },
                onEachFeature: function (feature, layer) {

                }
            }).addTo(map);

        });
    });
})
