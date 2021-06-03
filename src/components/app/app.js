import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Restaurants from '../restaurants';
import Basket from '../basket';
import Header from '../header';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Basket restaurants={this.props.restaurants} />
        <Restaurants restaurants={this.props.restaurants} />
      </div>
    );
  }
}

App.propTypes = {
  restaurants: PropTypes.array,
};
