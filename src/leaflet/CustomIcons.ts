import Leaflet from "leaflet";

export const selectIcon = new Leaflet.Icon({
    ...Leaflet.Icon.Default.prototype.options,
    iconUrl: `${process.env.PUBLIC_URL}/leaflet/marker-icon.png`,
    shadowUrl: `${process.env.PUBLIC_URL}/leaflet/marker-shadow.png`
});

export const targetIcon = new Leaflet.Icon({
    ...Leaflet.Icon.Default.prototype.options,
    iconUrl: `${process.env.PUBLIC_URL}/leaflet/target-icon.png`,
    shadowUrl: `${process.env.PUBLIC_URL}/leaflet/marker-shadow.png`
});
