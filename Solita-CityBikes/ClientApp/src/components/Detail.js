import React from "react";
import StationDetails from "./StationDetails";
import TripDetails from "./TripDetails";

// Näyttää aseman tai matkan yksityiskohtaiset tiedot
const Details = ({ trip, station, stations }) => {
    if (station) {
        return (
            <div className="details">
                <StationDetails station={station} stations={stations}/>
            </div>
        )
    }
    if (trip) {
        return (
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