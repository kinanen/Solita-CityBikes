import React, { useEffect, useState } from "react";
import axios from "axios";

const Stations = () => {

    const [stations, setStations] = useState(0);
    const [center, setCenter] = useState([60.2009, 24.9281]);

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
    

}
export default Stations;