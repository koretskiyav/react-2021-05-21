import { Component } from 'react';
import Rate from './rate';

export default class Reviews extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { reviews, averageRate } = this.props;

    return (
      <>
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <h1>{review.user}</h1>
              <p>{review.text}</p>
              <Rate value={review.rating}></Rate>
            </div>
          )
        })}
      </>
    )
  }
}