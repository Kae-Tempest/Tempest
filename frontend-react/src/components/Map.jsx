import { MapContainer, TileLayer, Marker } from 'react-leaflet'
export function Map({lat, lng}) {

    return (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} />
    </MapContainer>
    )
}