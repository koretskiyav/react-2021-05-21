import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Reviews from './reviews';

import { restaurants } from '../../fixtures';
import Rate from '../rate';

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[0].reviews;

describe('Review', () => {
  it('should render', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });

  it('should render 2 reviews', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews"]').children().length).toBe(
      reviews.length
    );
  });

  it('Rate exist in first child of Reviews', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    const rate = wrapper.children().first().find(Rate);
    expect(rate.exists()).toBe(true);
  });

  it('First review Rate has 5 stars at all', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    const firstChild = wrapper.find(Rate).children().first();
    expect(firstChild.children().length).toBe(5);
  });

  it('Second review Rate has 3 checked stars', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    const secondChild = wrapper.find(Rate).children().at(1);
    const stars = secondChild.children().reduce((acc, current) => {
      return current.hasClass('checked') === true ? (acc += 1) : (acc += 0);
    }, 0);

    expect(stars).toBe(3);
  });
});
