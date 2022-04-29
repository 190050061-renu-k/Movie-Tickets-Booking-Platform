import React from "react";
import SeatSelection from "../booking/SeatSelection";

const LiveBooking = (props)=>{
    return (
        <SeatSelection {...props} type="online">

        </SeatSelection>
    );
}

export default LiveBooking;