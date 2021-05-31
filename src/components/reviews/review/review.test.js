import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { restaurants } from '../../../fixtures';
import Review from "./review";

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Review', () => {
    it('should render', () => {
        const wrapper = mount(<Review review={review} />);
        expect(wrapper.find('[data-id="review"]').length).toBe(1);
    });
    it('should render', () => {
        const wrapper = mount(<Review review={review} />);
        expect(wrapper.find('[data-id="name"]').length).toBe(1);
    });
    it('should render', () => {
        const wrapper = mount(<Review review={review} />);
        expect(wrapper.find('[data-id="comment"]').length).toBe(1);
    });
    it('should render', () => {
        const wrapper = mount(<Review review={review} />);
        expect(wrapper.find('[data-id="rate"]').length).toBe(1);
    });
})