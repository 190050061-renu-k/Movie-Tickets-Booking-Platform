import React from "react"
import Seat from './Seat'
import './styles/Seat.css'

const GenerateSeats = (occupied, total, rows, cols, cells) => {

	var allseats = [];
	for(var j = 0;j<cells;j++){
		var cell = [];
		for(var i=0;i<rows;i++){
			var colArray = Array.from({length:cols},(v,k)=>({color:"grey", row:i, col:k, cell:j}));
			cell.push(colArray);
		}
		allseats.push(cell);
	}
	
	for(var i of occupied){
		const numcells = cols*cells;

		const getRow = Math.floor(i/numcells);
		const getCol = i%cols ==0 ? cols-1 : i%cols-1;
		const getCell = i%numcells<=5? 0:1;
		console.log(i, getRow, getCol, getCell);
		const getentry = allseats[getCell][getRow][getCol];
		getentry["color"] = "red";

		allseats[getCell][getRow][getCol] = getentry;
	}
	console.log(allseats);
	return (
		<div className="container row movie-layout">
			{allseats.map((cell_)=>{
				return(
					<div>
						{cell_.map((rowi)=>{
							console.log(rowi);
							// const seatNum = row_.row *cols + row_.col+1;
							// console.log(c.row, c.col,c.color, seatNum);

							return(
								<div className="row">
								 {rowi.map((col_)=>{
									const seatNum = col_.row*cols * cells + col_.col + col_.cell*cols + 1;
									// console.log(col_.row,col_.col, col_.cell, seatNum);
									return(<Seat seatno={seatNum} key={seatNum} seatColor = {"seat-"+col_.color}></Seat>);
									})}
								</div>
								
								// <Seat seatno={seatNum} key={seatNum} seatColor = {"seat-"+c.color}></Seat>
							);
						})}
						{console.log(i)}
					</div>
				);
			})}
			
		</div>
	)
}



const SeatMatrix = (props) => {
	return (
		<div className="movie-complex">
			<p>Screen This way!</p>
			<div className="container row movie-layout">
				{/* <div className="movie-column-1">  */}
					{GenerateSeats(props.occupied, 130,13, 5, 2)}
					{/* {GenerateSeats([11,12,13,14,15,16,17,18,19,20])} */}
				 {/* </div> */}
				 
				 {/* <div className="movie-column-2">
					{GenerateSeats(props.occupied, 65,13, 2)}
				</div> */}
				
			</div>
		</div>
	)
}

export default SeatMatrix;
