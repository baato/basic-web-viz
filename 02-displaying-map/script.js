// Initialize MapLibre GL JS with Baato map style
const map = new maplibregl.Map({
    container: "map",
    style: "https://api.baato.io/api/v1/styles/dark?key=YOUR_BAATO_ACCESS_TOKEN", // Baato stylesheet location
    center: [85.31853583740946, 27.701739466949107], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
