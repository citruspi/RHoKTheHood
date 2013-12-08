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

   $.getJSON('/static/data/US/NY/055/US-NY-055.json', function (data) {

        L.geoJson(data, { 
            style: function (feature) {
                       return {
                           fillColor: "blue",
                           fillOpacity: 0.4
                        }
            },
            onEachFeature: function (feature, layer) {

                    console.log(layer);

            }
        }).addTo(map);

    });
})
