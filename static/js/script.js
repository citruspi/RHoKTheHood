var blocks = [],
    menu = false;

//TODO: Don't hard code this.
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

$(document).ready(function () {
    var main = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © OpenStreetMap contributors',
            minZoom: 5,
            maxZoom: 18,
        });
        counties = L.layerGroup(),
        current_towns = L.layerGroup();

    // generate list of filter choices.
    for (var filter in filters){
        $('#filterList').append('<li><a href="#">' + filters[filter] + '</a></li>').click(changeType);
    }

    window.map = L.map('map-canvas', {
        center: [43.160552395407585, -77.60656356811523],
        zoom: 13,
        layers: [
            main
         ]
    });

    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.Esri(),
        showMarker: true
    }).addTo(map);

    $.getJSON('/static/data/US/NY/055/US-NY-055-SHAPE.json', function (features) {
        csvToJson('/static/data/US/NY/055/US-NY-055-STATS.csv', function (stats) {
            L.geoJson(features, { 
                style: function (feature) {
                    var id = feature.properties['GEOID'];
                           return {
                               fillColor: "blue",
                               fillOpacity: 0,
                               opacity: 0
                            }
                },
                onEachFeature: function (feature, layer) {
                    layer.index = stats['Block Group ID'].indexOf(feature.properties.GEOID);
                    window.stats = stats;
                    if(layer.index !== -1) {
                        blocks.push(layer);
                    }

                    layer.on('mouseover', function (event) {
                        layer.setStyle({ fillColor: 'red' });
                    });

                    layer.on('mouseout', function (event) {
                        layer.setStyle({ fillColor: 'blue' });
                    });

                    layer.on('click', function (event) {
                        //TODO: Create a popup menu with more information
                    });
                }
            }).addTo(map);
            populateScale('Violent Crime Rate')

        });
    });
});

function changeType(event) {
    populateScale(event.target.innerHTML);
    $('#filter').text(event.target.innerHTML);
}

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
        block.setStyle({fillOpacity: o});
        
        var rank = getRanking(label, val);

        var html = 'Block Group ID: ' + stats['Block Group ID'][block.index] + '</br>'
            + 'Median Value: ' + stats[label][block.index] + '</br>'
            + 'Rank: #' + rank;

        block.bindPopup(html);
    });
}

function getRanking(label, val) {
    var sorted = stats[label].map(Number).sort();
    return sorted.indexOf(val) + 1;
}

document.getElementById('leaflet-control-geosearch-qry').focus();
