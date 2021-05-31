import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Review from './review';
import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const { user, text, rating } = restaurants[0].reviews[0];

describe('Review', () => {
  it('should be render', () => {
    const wrapper = mount(<Review user={user} rating={rating} text={text} />);
    expect(wrapper.find('[data-test="review"]').length).toBe(1);
  });

  it('should be render anonymous user', () => {
    const wrapper = mount(<Review rating={rating} text={text} />);
    expect(wrapper.find('[data-test="review__name"]').text()).toBe('Anonymous');
  });
});
