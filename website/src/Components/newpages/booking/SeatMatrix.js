import React from "react";
import Seat from "./Seat";
import "./styles/Seat.css";

const GenerateSeats = (occupied, total, rows, cols, cells) => {
  console.log(occupied);
  var allseats = [];
  for (var j = 0; j < cells; j++) {
    var cell = [];
    for (var i = 0; i < rows; i++) {
      var colArray = Array.from({ length: cols }, (v, k) => ({
        color: "grey",
        row: i,
        col: k,
        cell: j,
      }));
      cell.push(colArray);
    }
    allseats.push(cell);
  }

  for (var i of occupied) {
    const numcells = cols * cells;

    const getRow = Math.floor((i - 1) / numcells);
    const getCol = ((i - 1) % numcells) % cols;
    const getCell = (i - 1) % numcells < 5 ? 0 : 1;
    const getentry = allseats[getCell][getRow][getCol];
    getentry["color"] = "red";

    allseats[getCell][getRow][getCol] = getentry;
  }
  return (
    <div className="container row movie-layout">
      {allseats.map((cell_) => {
        return (
          <div>
            {cell_.map((rowi) => {
              return (
                <div className="row">
                  {rowi.map((col_) => {
                    const seatNum =
                      col_.row * cols * cells + col_.col + col_.cell * cols + 1;
                    // console.log(col_.row,col_.col, col_.cell, seatNum);
                    return (
                      <Seat
                        seatno={seatNum}
                        key={seatNum}
                        seatColor={"seat-" + col_.color}
                      ></Seat>
                    );
                  })}
                </div>

                // <Seat seatno={seatNum} key={seatNum} seatColor = {"seat-"+c.color}></Seat>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const SeatMatrix = (props) => {
  return (
    <div className="movie-complex">
      <p>Screen This way!</p>
      <div className="container row movie-layout">
        {GenerateSeats(props.occupied, 130, 13, 5, 2)}
      </div>
    </div>
  );
};

export default SeatMatrix;
