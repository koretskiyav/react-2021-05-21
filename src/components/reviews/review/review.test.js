import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from './review';

import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Reviews', () => {
  it('should render', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('should display user name', () => {
    const testUserName = 'John';
    const wrapper = mount(<Review review={review} />);
    const newProps = { ...review };
    newProps.user = testUserName;
    wrapper.setProps(newProps);
    expect(wrapper.find('[data-id="review-user-name"]').text()).toBe(testUserName);
  });

  it('should display comment', () => {
    const testComment = 'It was tasty';
    const wrapper = mount(<Review review={review} />);
    const newProps = { ...review };
    newProps.text = testComment;
    wrapper.setProps(newProps);
    expect(wrapper.find('[data-id="review-comment"]').text()).toBe(testComment);
  });
});
