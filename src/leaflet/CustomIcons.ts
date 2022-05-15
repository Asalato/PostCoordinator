import Leaflet from "leaflet";

export const selectIcon = new Leaflet.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/leaflet/marker-icon.png`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/leaflet/marker-icon-2x.png`,
    shadowUrl: `${process.env.PUBLIC_URL}/leaflet/marker-shadow.png`,
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    tooltipAnchor: [16, -28]
});

export const targetIcon = new Leaflet.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/leaflet/target-icon.png`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/leaflet/target-icon-2x.png`,
    shadowUrl: `${process.env.PUBLIC_URL}/leaflet/marker-shadow.png`,
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    tooltipAnchor: [16, -28]
});
