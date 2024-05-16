// Initialize MapLibre GL JS with Baato map style
const map = new maplibregl.Map({
    container: "map",
    style: "https://api.baato.io/api/v1/styles/dark?key=YOUR_BAATO_ACCESS_TOKEN", // Baato stylesheet location
    center: [85.31853583740946, 27.701739466949107], // starting position [lng, lat]
    zoom: 9, // starting zoom
});

// Proceed only when the base style has finished loading.
map.once("load", () => {
    // Add data source first
    map.addSource("forest-fires-source", {
        type: "geojson",
        data: "https://spatial.baato.io/resources/forestFires.json"

    });

    // Add a layer to visualize the forest fires based on added source
    map.addLayer({
        id: 'forest-fires-layer',
        type: 'circle',
        source: 'forest-fires-source',
        paint: {
            'circle-radius': {
                property: 'Confidence', // use the 'confidence' property from the GeoJSON data
                stops: [
                    [0, 2], // low confidence level - smaller radius
                    [50, 3], // medium confidence level - medium radius
                    [70, 5] // high confidence level - larger radius
                ]
            },
            'circle-color': {
                property: 'Confidence', // use the 'confidence' property from the GeoJSON data
                stops: [
                    [0, '#ece4db'], // low confidence level - mild white
                    [50, '#fd8d3c'], // medium confidence level - orange
                    [70, '#8c2d04'] // high confidence level - darker red
                ]
            }
        }
    });

    // Interactivity- show popup on click
    map.on("click", "forest-fires-layer", (e) => {
        const firePointAttributes = e.features[0];
        const message =
            `<b>Data for this incident</b><br>` +
            [
                `Confidence: ${firePointAttributes.properties.Confidence} (${firePointAttributes.properties.ConfidenceLevel})`,
                `Date: ${firePointAttributes.properties.Date}`,
                `Province: ${firePointAttributes.properties.Province}`,
                `District: ${firePointAttributes.properties.District}`,
                `Municipality: ${firePointAttributes.properties.municipality}`,
                `Ward: ${firePointAttributes.properties.Ward}`,
                `Lat: ${firePointAttributes.properties.Lat}`,
                `Lon: ${firePointAttributes.properties.Lon}`,
            ].join("<br>");
        new maplibregl.Popup().setHTML(message).setLngLat(firePointAttributes.geometry.coordinates)
            .addTo(map);
    });
});