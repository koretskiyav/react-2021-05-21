import React from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';



export default function Restaurant(props) {
let sum = 0;
const arrayL= props.activeRestaurantRev.length;

{[...props.activeRestaurantRev].map((rev)=>{
    sum+=rev.rating;
    return sum;
})}  

let avg = Math.floor(sum/arrayL)


  return (
    <div>
        <p>Active Restaurant name: <strong>{props.activeRestaurant.name}</strong></p>
        <p>Average Restaurant <strong>Rating:</strong> (math.floor) </p>
        <Rate review={avg}/>

        <p>Menu from Restaurant component</p>
        <Menu menu={props.activeRestForMenu} />        
        <Reviews reviews={props.activeRestaurantRev}  />  
    </div>
  );
}