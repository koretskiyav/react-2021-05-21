import { Component } from 'react';
import Reviews from '../reviews';
import Menu from '../menu';
import Rate from '../rate';

export default class Restaurant extends Component {

  render() {
    const averageRating = this.props.reviews
      .map((r) => r.rating)
      .reduce((a,b) => a + b) / this.props.reviews.length;

    return (
      <div>
        <h1>Menu</h1>
        <Menu menu={this.props.menu} />

        <h1>Reviews</h1>
        <div className="averageRating">
          <div style={{marginRight: '12px'}}>Average rating: </div> 
            <Rate rating={averageRating}/> 
        </div>
        <Reviews reviews={this.props.reviews} />
      </div>
    );
  } 
}