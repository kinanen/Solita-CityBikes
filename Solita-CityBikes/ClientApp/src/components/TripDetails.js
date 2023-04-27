import React from "react";

const TripDetails = ({trip}) => {
    return (
        <div>{trip[0] + " - " + trip[1]}</div>
    )
}

export default TripDetails;