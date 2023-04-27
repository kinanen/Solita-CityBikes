import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import * as L from "leaflet";
import DrawTrips from "./DrawTrips";

const defaultBounds = [
    [60.147921, 24.721367],
    [60.28075, 25.159346]
]

const SetViewBounds = ({stationData}) => {    
    const map = useMap();
    const [bounds, setBounds] = useState(defaultBounds);

    useEffect(() => {
        if (stationData) {
          let maxY = 0.0;
          let minY = 100.0;
          let maxX = 0.0;
          let minX = 100.0;
    
          stationData.forEach((station) => {
            if (station.x > maxX) maxX = station.x;
            if (station.x < minX) minX = station.x;
            if (station.y > maxY) maxY = station.y;
            if (station.y < minY) minY = station.y;
          });
    
          const minMaxBounds = [[minY, minX], [maxY, maxX]];
          setBounds(minMaxBounds);
          map.fitBounds(minMaxBounds);
        }
      }, [stationData, map]);
}

const SetZoom = ({trip, station}) => {
    const map = useMap();

    useEffect(() => {
        if (station){
            map.setView([60.16353,24.9145], 15);
            map.closePopup();
            map.openPopup("Joku string", [60.16353,24.9145])
            console.log(station);
        }
        if (trip){
            map.setView([60.19353,24.4145], 15)
            console.log(trip);
        }
        else{
            map.closePopup();
            map.fitBounds(defaultBounds);
        }
    },[trip, station])

}

const LeafletMap = ({ stationData, tripData, setTrip, setStation, trip, station}) => {
    
    const viewStation = (id) => {
        setTrip(null)
        setStation(id)
        console.log("view stations id:", id)
    }
    
    const rad = 80;

    // const zoom = 12;

    const drawStations = stationData.map(station => (
        <Circle key={station.hslStationId} center={[station.y, station.x]} radius={rad}>
            <Popup>
                <div onClick={() => viewStation(station.hslStationId)}>
                {station.nimi}
                </div>
            </Popup>
        </Circle>
    ))

    return (
        <MapContainer scrollWheelZoom={true} bounds={defaultBounds}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            </TileLayer>
            <SetViewBounds stationData={stationData} />
            <SetZoom trip={trip} station={station} />
            <LayerGroup>
                {stationData && drawStations }
            </LayerGroup>
            {tripData && <DrawTrips tripData={tripData}/>}
        </MapContainer >
    )
}

export default LeafletMap;