import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const StationDetails = ({station}) => {
    const [stationData, setStationData] = useState([]);
    
    useEffect(() => {
        axios("https://localhost:7199/api/station/" + station)
          .then(response => {
            setStationData(response.data);
          }
          )},[station])

    return (
        <div>{stationData.nimi}</div>
    )
}

export default StationDetails;