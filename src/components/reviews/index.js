import { Component } from 'react';
import Rate from '../rate';
import Review from '../review'
import './style.css'

export default class Reviews extends Component {
  
  render() {
    const averageRating = this.props.reviews
      .map((r) => r.rating)
      .reduce((a,b) => a + b) / this.props.reviews.length;
    return (
      <div>
        <h1>Reviews</h1>
        <div className="averageRating">
          <div style={{marginRight: '12px'}}>Average rating: </div> 
          <Rate rating={averageRating}/> 
        </div>
        {this.props.reviews.map((review) => <Review key={review.id} review={review}/>)}
      </div>
      
    );
  }
}
