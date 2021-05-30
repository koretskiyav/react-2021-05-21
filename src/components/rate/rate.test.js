import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ReactComponent as Star } from '../../icons/star.svg';

import Rate from './rate';

Enzyme.configure({ adapter: new Adapter() });

describe('Rate', () => {

  const wrapper = mount(<Rate value="1" />);

  it('should render rate', function() {
    expect(wrapper.find('[data-id="rate"]').length).toBe(1);
  });

  it('should render 5 stars total', function() {
    expect(wrapper.find(Star).length).toBe(5);
  });

  it('should render 1 stars active', function() {
    expect(wrapper.find(Star).children().find({ 'data-checked': "star-active" }).length).toBe(1);
  });

  it('should render 4 stars inactive', function() {
    expect(wrapper.find(Star).children().find({ 'data-checked': "star-inactive" }).length).toBe(4);
  });

  it('should render all stars inactive with <1 value', function() {
    const wrapperTest = mount(<Rate value="-1" />);
    expect(wrapperTest.find(Star).children().find({ 'data-checked': "star-inactive" }).length).toBe(5);
  });

  it('should render all stars active with >5 value', function() {
    const wrapperTest = mount(<Rate value="10" />);
    expect(wrapperTest.find(Star).length).toBe(5);
  });

})