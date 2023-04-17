import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const LeafletMap = ()=> {
    const position = [60.192059, 24.945831];
    const zoom = 12;
    return(
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">

            </TileLayer>
        </MapContainer>
    )
}

export default LeafletMap;