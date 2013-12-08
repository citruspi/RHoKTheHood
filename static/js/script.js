var blocks = [],
    menu = false;

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

var filters = [

    "% Bachelors or More",
    "% Commercial Land Use",
    "% High School or More",
    "% In Labor Force",
    "% Industrial Land Use",
    "% Other Land Use",
    "% Owner Occupied",
    "% Renter Occupied",
    "% Residential Land Use",
    "% School Aged Children",
    "% Vacant Land Use",
    "% on Public Assistance",
    "All Other Population",
    "American Indian Population",
    "Animal Calls Rate",
    "Asian Population",
    "Assessed Value 2012",
    "Black Population",
    "Blighted Properties",
    "Block Group ID",
    "Certs of Compliance/Occupancy Issued",
    "Child Poverty Rate",
    "City Demolitions",
    "Estimated Tax Bill 2012",
    "Forclosure Starts",
    "Household Size",
    "Households",
    "Land Value Per Acre 2012",
    "Median Household Income",
    "Nuisance Calls Rate",
    "Out of Town Owners",
    "Parcels",
    "PopDen",
    "Population",
    "Population 10-17",
    "Population 18-21",
    "Population 22-29",
    "Population 30's",
    "Population 40's",
    "Population 50's",
    "Population 60's",
    "Population Over 70",
    "Population Under 9",
    "Poverty Rate",
    "Property Crime Rate",
    "School Kids",
    "Square Miles",
    "Unemployment Rate",
    "Vacant Lots",
    "Vacant Structures",
    "Vice Calls Rate",
    "Violent Crime Rate",
    "White Population"
];

for (var filter in filters){

    //console.log(filter);

    $('#filterList').append('<li>' + filters[filter] + '</li>').click(changeType);

}

function changeType(event) {
    populateScale(event.target.innerHTML);
}

function populateScale (label) {
    stats[label] = stats[label].map(Number);
    //console.log(stats);
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
    //console.log(stats[label]);
}

function animateMap (event) {
    var map_canvas = document.getElementById('map-canvas'),
        header = document.getElementById('header');
    if (menu == true) {
        console.log(menu);
        map_canvas.style.width = '100%';
    } else {
        console.log('scaling down');
        map_canvas.style.width = '81%';
    }
    menu = !menu;
}