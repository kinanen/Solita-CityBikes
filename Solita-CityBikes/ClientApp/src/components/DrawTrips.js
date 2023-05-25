import { useEffect, useState } from "react";
import { LayerGroup, Polyline } from "react-leaflet";

// Piirtää saadun propsin perusteella kartalle valittujen reittien mukaiset viivat karttaan.

const DrawTrips = ({tripData}) => {
    const [trips, setTrips] = useState([]);
    useEffect(()=> {
        tripData && setTrips(tripData)
    },[tripData]);

    const pathColor = {color: 'yellow'}
    const drawLines = trips.map(trip =>(
        <Polyline key={trip}  pathOptions={pathColor} positions={trip}></Polyline>
    ));

    return (
        <LayerGroup>
        {trips && drawLines}
        </LayerGroup>

    )
}

export default DrawTrips; 