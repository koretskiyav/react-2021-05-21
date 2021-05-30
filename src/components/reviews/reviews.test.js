import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Reviews from './reviews';

Enzyme.configure({ adapter: new Adapter() });

const reviews = [
  {
    id: '5909796d-5030-4e36-adec-68b8f9ec2d96',
    user: 'Antony',
    text: 'Not bad',
    rating: 5,
  },
  {
    id: '429dea85-11dd-4054-a31e-c60c92e17255',
    user: 'Sam',
    text: 'No burgers',
    rating: 3,
  },
]

describe('Reviews', () => {
  it('should render', function() {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });

  it('should render 2 review child', function() {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(reviews.length);
  });
});