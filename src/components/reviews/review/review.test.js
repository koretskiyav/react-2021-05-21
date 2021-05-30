import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Review from './review';

Enzyme.configure({ adapter: new Adapter() });

const review = {
  id: '429dea85-11dd-4054-a31e-c60c92e17255',
  user: 'Sam',
  text: 'No burgers',
  rating: 3,
};

const wrapper = mount(<Review {...review} />);

describe('Review', () => {
  it('should render component', function() {
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('should render content', function() {
    expect(wrapper.find('[data-id="review-content"]').length).toBe(1);
  });

  it('should render person information', function() {
    expect(wrapper.find('[data-id="review-person"]').length).toBe(1);
  });

  it('should render person name', function() {
    expect(wrapper.find('[data-id="review-name"]').length).toBe(1);
  });

  it('should person name match mock', function() {
    expect(wrapper.find('[data-id="review-name"]').text()).toEqual(review.user);
  });

  it('should render person comment', function() {
    expect(wrapper.find('[data-id="review-comment"]').length).toBe(1);
  });

  it('should person comment match mock', function() {
    expect(wrapper.find('[data-id="review-comment"]').text()).toEqual(review.text);
  });

  it('should render rate wrapper', function() {
    expect(wrapper.find('[data-id="review-rate"]').length).toBe(1);
  });

  it('should render rate component', function() {
    expect(wrapper.find('[data-id="rate"]').length).toBe(1);
  });

});