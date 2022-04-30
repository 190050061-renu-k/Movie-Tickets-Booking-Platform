import React from "react";
import SeatSelection from "../booking/SeatSelection";

const LiveBooking = (props) => {
  return <SeatSelection {...props} type="offline"></SeatSelection>;
};

export default LiveBooking;
