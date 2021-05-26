import { Component } from 'react';
import Reviews from '../reviews';
import Menu from '../menu';

export default class Restaurant extends Component {

  render() {
    return (
      <div>
        <Menu menu={this.props.menu} />
        <Reviews reviews={this.props.reviews} />
      </div>
    );
  } 
}