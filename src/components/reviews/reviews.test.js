import Reviews from './reviews';

import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

describe('Reviews', () => {
  it ('should render', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });
  
  it('First review Rate has 5 stars at all', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    const firstChild = wrapper.find(Rate).children().first();
    expect(firstChild.children().length).toBe(5);
  });

});