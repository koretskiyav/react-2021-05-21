import React from 'react';
import { ReactComponent as Star } from '../icons/star.svg';


export default function Rate(props) {
   const arr =[];
   arr.length = props.review;
    return(
        <div>
            {[...arr].map((star)=>{
                 return <Star/>
            })}
            <p>{props.review} </p> 
        </div>     
    )

}