import TripForm from "./TripForm";

const AddTrip = ({setViewAddTrip, stations}) => {
    console.log("lisää matka")
    return (
        <div>
            <TripForm setViewAddTrip={setViewAddTrip} stations={stations}/>
            <button onClick={() => setViewAddTrip(false)}>
                    sulje
                </button>    
        </div>
    )
}

export default AddTrip;