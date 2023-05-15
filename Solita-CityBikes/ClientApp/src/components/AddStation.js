import { useState } from "react";

const AddStation = ({ viewAddStation, setViewAddStation }) => {
    return (
        <div>
            {viewAddStation ? (
                <div>
                    LOMAKE AUKI
                    <button onClick={() => setViewAddStation(false)}>
                        SULJE
                    </button>
                </div>
            ) :
                <div>

                </div>
            }
        </div>
    )
}

export default AddStation;