import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from './review';

import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Review', () => {
  const wrapper = mount(<Review review={review} />);
  it('should render', () => {
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('is user exist', () => {
    expect(wrapper.find('[data-id="user"]').length).toBe(1);
  });

  it('is comment exist', () => {
    expect(wrapper.find('[data-id="comment"]').length).toBe(1);
  });

  it('is rating exist', () => {
    expect(wrapper.find('[data-id="rating"]').length).toBe(1);
  });
});
