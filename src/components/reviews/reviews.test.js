import Reviews from './reviews'
import Enzyme, {mount} from 'enzyme'

import {restaurants} from '../../fixtures';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Reviews', ()=>{
  it('render with reviews', ()=>{
    const wrapper = mount(<Reviews reviews={restaurants[0].reviews} />);
    expect(wrapper.find('[data-id="reviews"]')).toBe(1);
  });

})
