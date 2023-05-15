import React from "react";
import StationDetails from "./StationDetails";
import TripDetails from "./TripDetails";

// Näyttää aseman tai matkan yksityiskohtaiset tiedot
const Details = ({ trip, station }) => {
    if (station) {
        return (
            <div className="details">
                <StationDetails station={station}/>
            </div>
        )
    }
    if (trip) {
        return (
            // Get station names from database
            // get other data from DB considering trip
            <div className="details">
                <TripDetails trip = {trip}/>
            </div>
        )
    }
    else return (
        null
    )
}

export default Details;