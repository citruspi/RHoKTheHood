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

    var shpfile = new L.Shapefile('static/data/tl_2013_36_bg.zip',{onEachFeature:function(feature, layer) {
        console.log(layer);
    }});
    shpfile.addTo(map);
    
})
