import { useEffect, useState } from "react";
import { LayerGroup, Polyline } from "react-leaflet";

const DrawTrips = ({tripData}) => {
    const [trips, setTrips] = useState([]);
    let i = 1;
    useEffect(()=> {
        tripData && setTrips(tripData)
    },[tripData]);

    const drawLines = trips.map(trip =>(
        <Polyline key={trip} positions={trip}></Polyline>
    ));

    return (
        <LayerGroup>
        {trips && drawLines}
        </LayerGroup>

    )
}

export default DrawTrips; 