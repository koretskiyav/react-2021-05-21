import React from 'react';
import { ReactComponent as Star } from '../icons/star.svg';


export default function Rate(props) {

    return(
        <div>
            {[props.review.length].map((star)=>{
                 return <Star key={star}/>
            })}
        </div>     
    )

}