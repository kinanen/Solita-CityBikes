import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import * as L from "leaflet";

const LeafletMap = ({ stationData }) => {

    const [map, setMap] = useState(null);
    const defaultBounds = [
        [60.147921, 24.721367],
        [60.28075, 25.159346]
    ]

    const [bounds, setBounds] = useState(defaultBounds);

    useEffect(() => {
        const minMaxPosition = () => {
            if (stationData) {
                let maxY = 0.000;
                let minY = 100.000;
                let maxX = 0.000;
                let minX = 100.000;

                stationData.map((station) => {
                    if (station.x > maxX) maxX = station.x;
                    if (station.x < minX) minX = station.x;
                    if (station.y > maxY) maxY = station.y;
                    if (station.y < minY) minY = station.y;
                });

                const minMaxBounds = [[minY, minX], [maxY, maxX]];
                setBounds(minMaxBounds);
            }
        }
        minMaxPosition();
    }, [stationData]);
    
    const rad = 80;
    
    map && console.log(map.getCenter());

    // const zoom = 12;

    return (
        <MapContainer scrollWheelZoom={true} bounds={bounds} ref={setMap}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
        </TileLayer>
        <LayerGroup>
            {stationData && stationData.map(station => (
                <Circle key={station.hslStationId} center={[station.y, station.x]} radius={rad}>
                    <Popup>
                        {station.nimi}
                    </Popup>
                </Circle>
            ))}
        </LayerGroup>
    </MapContainer >
    )
}

export default LeafletMap;

/*
    //const [center, setCenter] = useState([60.2009, 24.9281]);
        /*const getAvgPosition = async () => {
            const response = await axios.get("https://localhost:7199/api/station/avgposition");
            setCenter([response.data[0], response.data[1]]);
        }
        getAvgPosition();*/
