import { Component } from 'react';
import Review from '../review'
import './style.css'

export default class Reviews extends Component {
  
  render() {
    
    return (
      <div>
        {this.props.reviews.map((review) => <Review key={review.id} review={review}/>)}
      </div>
      
    );
  }
}
