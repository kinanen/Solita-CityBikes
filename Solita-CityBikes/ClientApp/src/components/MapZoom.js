import { useEffect } from "react";
import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';



const MapZoom = ({ trip, station, setOnViewTrips, stations }) => {
  const map = useMap();

  useEffect(() => {
    try {
      if (station != null) {
        const stationData = stations.find(s => station === s.hslStationId)
        map.setView([stationData.y, stationData.x], 15);
        map.openPopup(stationData.nimi, [stationData.y, stationData.x]);
      }
      if (trip != null) {
        const departureStation = stations.find(s => trip[0] === s.hslStationId)
        const returnStation = stations.find(s => trip[1] === s.hslStationId)
        const latLngs = [[departureStation.y, departureStation.x], [returnStation.y, returnStation.x]];
        map.fitBounds(latLngs);
        map.openPopup(departureStation.nimi + " - " + returnStation.nimi, [(departureStation.y + returnStation.y) / 2, (departureStation.x + returnStation.x) / 2]);
        setOnViewTrips([latLngs]);

      }
    } catch (error) {
      console.error(error);
    }
  }, [map, trip, station]);

  return null;
};




export default MapZoom;