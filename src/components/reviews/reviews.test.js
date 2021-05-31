import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Reviews from './reviews';

import { restaurants } from '../../fixtures';
import Review from "./review";
import {useMemo} from "react";

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Reviews', () => {
  it('should user not empty', () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review-user"]').length).toBe(1);
  });

  it('should text not empty', () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review-text"]').length).toBe(1);
  });
});
