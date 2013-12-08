var blocks = [];

$(document).ready(function () {
    var main = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © OpenStreetMap contributors',
            minZoom: 5,
            maxZoom: 18,
        });
        counties = L.layerGroup(),
        current_towns = L.layerGroup();

    window.map = L.map('map-canvas', {
        center: [43.160552395407585, -77.60656356811523],
        zoom: 13,
        layers: [
            main
         ]
    });

   $.getJSON('/static/data/US/NY/055/US-NY-055-SHAPE.json', function (features) {
        csvToJson('/static/data/US/NY/055/US-NY-055-STATS.csv', function (stats) {
            L.geoJson(features, { 
                style: function (feature) {
                    var id = feature.properties['GEOID'];
                           return {
                               fillColor: "blue",
                               fillOpacity: 0
                            }
                },
                onEachFeature: function (feature, layer) {
                    layer.index = stats['Block Group ID'].indexOf(feature.properties.GEOID);
                    window.stats = stats;
                    if(layer.index !== -1) {
                        blocks.push(layer);
                    }                    
                }
            }).addTo(map);
            populateScale('Violent Crime Rate')

        });
    });
});

function populateScale (label) {
    stats[label] = stats[label].map(Number);
    var min = d3.min(stats[label]),
        max = d3.max(stats[label]),
        scale = d3.scale.linear();
    scale.domain([min, max])
        .range([0, 0.9]);

    blocks.forEach(function (block) {
        var val = parseFloat(stats[label][block.index]),
            o = scale(val);
        //console.log(o, val, min, max);
        block.setStyle({fillOpacity: o});
    });
    console.log(stats[label]);
}