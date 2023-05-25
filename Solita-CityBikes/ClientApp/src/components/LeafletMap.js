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

const LeafletMap = ({ stationData, tripData, setTrip, setStation, trip, station, setOnViewTrips, stations}) => {
    
    const viewStation = (id) => {
        setTrip(null)
        setStation(id)
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


        const stadiaTileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
        const stadiaAttribution =
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
          '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, ' +
          '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      

    return (
        <MapContainer scrollWheelZoom={false} bounds={defaultBounds}>
        <TileLayer attribution={stadiaAttribution} url={stadiaTileUrl} maxZoom={16} />
        <ViewBounds stationData={stationData} defaultBounds={defaultBounds} />
        <MapZoom trip={trip} station={station} setOnViewTrips={setOnViewTrips} stations={stations} />
        <LayerGroup>
          {stationData && drawStations}
        </LayerGroup>
        {tripData && <DrawTrips tripData={tripData} />}
      </MapContainer>
    )
}

export default LeafletMap;