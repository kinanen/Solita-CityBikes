import React from "react";
import { MapContainer, TileLayer, Popup, Circle, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import DrawTrips from "./DrawTrips";
import ViewBounds from "./ViewBounds";
import MapZoom from "./MapZoom"

const defaultBounds = [
    [60.147921, 24.721367],
    [60.28075, 25.159346]
]

const LeafletMap = ({ stationData, tripData, setTrip, setStation, trip, station}) => {
    
    const viewStation = (id) => {
        setTrip(null)
        setStation(id)
        console.log("view stations id:", id)
    }

    const rad = 75;

    const drawStations = stationData.map(s => (
        <Circle key={s.hslStationId} center={[s.y, s.x]} radius={rad} color="#fcbc19">
            <Popup>
                <div onClick={() => viewStation(s.hslStationId)}>
                {s.nimi}
                </div>
            </Popup>
        </Circle>
    ))

    return (
        <MapContainer scrollWheelZoom={false} bounds={defaultBounds}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            </TileLayer>
            <ViewBounds stationData={stationData} defaultBounds={defaultBounds} />
            <MapZoom trip={trip} station={station} />
            <LayerGroup>
                {stationData && drawStations }
            </LayerGroup>
            {tripData && <DrawTrips tripData={tripData}/>}
        </MapContainer >
    )
}

export default LeafletMap;