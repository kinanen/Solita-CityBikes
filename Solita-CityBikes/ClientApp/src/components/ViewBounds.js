import React, { useEffect, useState } from "react";
import { useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const SetViewBounds = ({stationData,defaultBounds}) => {    
    const map = useMap();

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
          map.fitBounds(minMaxBounds);
        }
      }, [stationData, map]);
}

export default SetViewBounds;