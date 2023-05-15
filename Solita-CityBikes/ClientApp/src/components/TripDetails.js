import React from "react";

const TripDetails = ({trip}) => {
    return (
        <div>
            {trip[0] + " - " + trip[1]}
            Hae asemien nimet, 
            matkojen määrä,
            matkat kuukausittain,
            matkan keskimääräinen kesto,
            matkan keskimääräinen pituus
        </div>
    )
}

export default TripDetails;