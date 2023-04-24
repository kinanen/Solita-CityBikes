import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import L from "leaflet";

const LeafletMap = () => {
    const testBounds = [
        [60.147921, 24.721367],
        [60.28075, 25.159346]
        ]

    const [center, setCenter] = useState([60.2009, 24.9281]);
    const [stations, setStations] = useState(0);
    const [bounds, setBounds] = useState(testBounds);
    const myMap = useMap;


    useEffect(() => {
        const getStations = async () => {
            const response = await axios.get("https://localhost:7199/api/station");
            setStations(response.data);
        }
        getStations();

        const getAvgPosition = async () => {
            const response = await axios.get("https://localhost:7199/api/station/avgposition");
            setCenter([response.data[0], response.data[1]]);
        }
        getAvgPosition();



    }, []);


    useEffect(() =>  {
        const minMaxPosition = () => {
            if(stations){
            let maxY = 0.000;
            let minY = 100.000;
            let maxX = 0.000;
            let minX = 100.000;

            stations.map((station) => {
                if (station.x > maxX) maxX = station.x;
                if (station.x < minX) minX = station.x;
                if (station.y > maxY) maxY = station.y;
                if (station.y < minY) minY = station.y;
            });

            const minMaxBounds = [[minY,minX],[maxY,maxX]];
            setBounds(minMaxBounds);
        }
    }
    if (stations && myMap) {
        minMaxPosition();
      }
    },[stations]);


    // const zoom = 12;

    return (
        <MapContainer scrollWheelZoom={true} bounds={bounds}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            </TileLayer>
            <LayerGroup>
            {stations && stations.map(station => (
                <Circle key={station.hslStationId} center={[station.y, station.x]} radius={100}>
                    <Popup>
                        {station.nimi}
                    </Popup>
                </Circle>
            ))}
            </LayerGroup>

        </MapContainer>
    )
}

export default LeafletMap;