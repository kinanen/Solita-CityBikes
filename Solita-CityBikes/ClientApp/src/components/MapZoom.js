import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import * as L from "leaflet";
import DrawTrips from "./DrawTrips";
import ViewBounds from "./ViewBounds";

const MapZoom = ({trip, station}) => {
    const map = useMap();
    useEffect(() => {
        if (station!=null){
            map.setView([60.16353,24.9145], 15);
            map.openPopup("Joku string", [60.16353,24.9145])
            console.log(station);
        }
        if (trip!=null){
            map.setView([60.19353,24.4145], 15)
            console.log(trip);
        }
    },[trip, station])

}

export default MapZoom;