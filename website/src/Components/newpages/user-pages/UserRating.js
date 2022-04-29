import React from "react";
import { useState } from "react";
import Rating from "react-rating";
import { Button } from "reactstrap";


const UserRating = (props)=>{
    var [rating, setRating] = useState(0);
    var [display,setDisplay] =useState(0);
    return(
        <div className="container" style={{marginTop:"40px"}}>
            <Rating
            onClick={setRating}
            initialRating={rating}
            onHover={setDisplay}
            emptySymbol="far fa-heart"
            fullSymbol="fas fa-heart"
            style={{
                
                color:"red",
                fontSize:"30px"
            }}
            fractions={2}
            ></Rating>
            <p>U chose {rating}</p>
            <p>U choosing {display}</p>
            <Button onSubmit={props.submitHandler}>Submit</Button>
        </div>
    );
}

export default UserRating;

// export default () => 
// ( <Popup trigger={<button className="button"> Open Modal </button>} modal nested > 
// {close => ( <div className="modal">
//      <button className="close" onClick={close}> &times; </button> 
//      <div className="header"> Modal Title </div> 
//      <div className="content"> {' '} Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//      Atque, a nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam 
//      voluptates delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos? 
//      <br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi
//       beatae optio voluptatum sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, 
//       doloribus, voluptas rem alias. Vitae?
//        </div> 
//        <div className="actions"> 
//         <Popup trigger={<button className="button"> Trigger </button>} 
//         position="top center" nested > 
//             <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo,
//                 maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione 
//                 sapiente! Laudantium, aperiam doloribus. Odit, aut. 
//             </span> 
//         </Popup> <button className="button" 
//         onClick={() => { console.log('modal closed '); close(); }} > 
//         close modal </button>
//          </div> 
//          </div> )} 
//         </Popup>); 