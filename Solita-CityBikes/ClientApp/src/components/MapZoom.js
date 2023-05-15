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
        const fetchData = async () => {
          try {
            if (station != null) {
              const response = await axios.get(
                `https://localhost:7199/api/station/${station}`
              );
              map.setView([response.data.y, response.data.x], 15);
              map.openPopup(response.data.nimi, [response.data.y, response.data.x]);
            }
            if (trip != null) {
                const response1 = await axios.get(
                    `https://localhost:7199/api/station/${trip[0]}`
                  );
                const response2 = await axios.get(
                    `https://localhost:7199/api/station/${trip[1]}`
                );
                  map.fitBounds([[response1.data.y, response1.data.x], [response2.data.y, response2.data.x]]);
                  map.addLayer(L.polyline([[response1.data.y, response1.data.x], [response2.data.y, response2.data.x]]))
                  map.openPopup(response1.data.nimi +" - "+response2.data.nimi, [(response1.data.y+response2.data.y)/2, (response1.data.x + response2.data.x)/2]);

            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [map, trip, station]);
    
      return null;
    };
    



export default MapZoom;