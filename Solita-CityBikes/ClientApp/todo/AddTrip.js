import TripForm from "./TripForm";

const AddTrip = ({setViewAddTrip, stations}) => {
    console.log("lisää matka")
    return (
        <div className="inputForm" >
            <TripForm setViewAddTrip={setViewAddTrip} stations={stations}/>
        </div>
    )
}

export default AddTrip;