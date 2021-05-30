import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from './review.js'

import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Review', () => {
  it('should render', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);    
  });

  it('Name and Text was rendered', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review-name-and-text"]').length).toBe(1);    
  });

  it('Stars was rendered', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review-stars"]').length).toBe(1);    
  });  
  
  it('Name was rendered', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review-name"]').length).toBe(1);    
  });

  it('Name was rendered', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review-text"]').length).toBe(1);    
  });
});