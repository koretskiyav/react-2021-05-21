import { Component } from 'react';
import Review from '../review'

export default class Reviews extends Component {
  
  render() {
    return (
      <div>
        <h1>Reviews</h1>
        {this.props.reviews.map((review) => <Review key={review.id} review={review}/>)}
      </div>
      
    );
  }
}
