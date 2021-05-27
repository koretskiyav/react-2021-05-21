import { Component } from 'react';
import Rate from '../rate';
import './style.css'

export default class Review extends Component {
  
  render() {
    return (
      <div className="review" >
        <p>{this.props.review.user}</p>
        <p>{this.props.review.text}</p>
        <Rate rating={this.props.review.rating} />
      </div>
    );
  }
}
