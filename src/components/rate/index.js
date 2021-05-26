import { PureComponent } from 'react';
import clump from '../../helpers/clump';
import { ReactComponent as Star } from '../../icons/star.svg';
import './style.css'

export default class Rate extends PureComponent {

  render() {
    const starCnt = clump(this.props.rating, 0, 5)
    return (
      <div>
        {[...Array(starCnt).keys()].map((r, i) => 
          <div className="iconContrainer">
            <Star className="icon" key={i} />
          </div>)}
      </div>
    );
  }
}
