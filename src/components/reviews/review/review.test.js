import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { restaurants } from '../../../fixtures';
import Review from './review';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Review', () => {
  const wrapper = mount(<Review review={review} />);
  it('should render', () => {
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });
  it('user exists', () => {
    expect(wrapper.find('[data-id="user"]').length).toBe(1);
  });
  it('comment exists', () => {
    expect(wrapper.find('[data-id="text"]').length).toBe(1);
  });
  it('rating exists', () => {
    expect(wrapper.find('[data-id="rating"]').length).toBe(1);
  });
});
