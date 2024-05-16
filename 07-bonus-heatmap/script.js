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

    // Style the layer as a heatmap based on confidence
    map.addLayer({
        'id': 'forest-fire-heatmap',
        'type': 'heatmap',
        'source': 'forest-fires-source',
        'paint': {
            // Increase the heatmap weight based on confidence value
            'heatmap-weight': {
                'property': 'Confidence',
                'type': 'exponential',
                'stops': [
                    [0, 0],
                    [50, 1],
                    [70, 2]  // Adjust the maximum weight based on your data
                ]
            },
            // Adjust the heatmap intensity based on zoom level
            'heatmap-intensity': {
                'stops': [
                    [11, 1],
                    [15, 3]
                ]
            },
            // Adjust the heatmap color gradient
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(0, 0, 255, 0)',  // Low confidence, blue color with no opacity
                0.5, 'rgba(255, 255, 0, 0.5)',  // Medium confidence, yellow color with some opacity
                1, 'rgba(255, 0, 0, 0.8)'  // High confidence, red color with higher opacity
            ],
            // Adjust the heatmap radius based on zoom level
            'heatmap-radius': {
                'stops': [
                    [11, 15],
                    [15, 20]
                ]
            },
            // Adjust the opacity of the heatmap
            'heatmap-opacity': 0.8
        }
    });
});