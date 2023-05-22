import { useEffect } from "react";
import {useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Stations from "../services/Stations";
import * as L from "leaflet";


const MapZoom = ({trip, station}) => {
    const map = useMap();
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (station != null) {
              Stations.getStation(station)
              .then(response => {
                map.setView([response.data.y, response.data.x], 15);
                map.openPopup(response.data.nimi, [response.data.y, response.data.x]);
              })
             
            }
            if (trip != null) {
                const response1 = await Stations.getStation(trip[0]);
                const response2 = await Stations.getStation(trip[1]);
                
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