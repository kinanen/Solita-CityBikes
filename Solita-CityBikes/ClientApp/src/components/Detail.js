import React from "react";
import StationDetails from "./StationDetails";
import TripDetails from "./TripDetails";


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