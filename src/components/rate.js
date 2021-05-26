import { Component } from "react";
import { ReactComponent as Star } from '../icons/star.svg';

export default class Rate extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;

    const items = []

    for (let i = 0; i < value; i++) {
      items.push(<Star key={i}></Star>)
    }

    return (
      <div>
        {items}
      </div>
    )
  }

}