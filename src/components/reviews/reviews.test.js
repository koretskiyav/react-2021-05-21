import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Reviews from './reviews';
import {restaurants} from '../../fixtures';

Enzyme.configure({adapter: new Adapter()});

const reviews = restaurants[0].reviews;
const review = reviews[0];

describe('Reviews', () => {
    it('should render', () => {
        const wrapper = mount(<Reviews reviews={reviews}/>);
        expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
    });

    it('should have children', () => {
        const wrapper = mount(<Reviews reviews={reviews}/>);
        expect(wrapper.find('Review').length).toBe(reviews.length);
    });

    it('should have user Antony', () => {
        const wrapper = mount(<Reviews reviews={reviews}/>);
        const node = wrapper.find('[data-id="user"]').get(0);
        expect(node.props.children).toBe('Antony');
    });

    it('should have text "Not bad"', () => {
        const wrapper = mount(<Reviews reviews={reviews}/>);
        const node = wrapper.find('[data-id="text"]').get(0);
        expect(node.props.children).toBe('Not bad');
    });

    it('should have 8 stars', () => {
        const wrapper = mount(<Reviews reviews={reviews}/>);
        expect(wrapper.find('svg.checked').length).toBe(8);
    });
});
