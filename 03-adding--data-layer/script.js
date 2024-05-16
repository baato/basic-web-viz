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
        source: 'forest-fires-source'
    });
});