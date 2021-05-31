import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Reviews from './reviews';
import { DataIds } from './reviews.dataids';

Enzyme.configure({ adapter: new Adapter() });

// https://blog.sapegin.me/all/react-testing-3-jest-and-react-testing-library/

describe('Reviews', () => {
  it('<Reviews />', () => {
    const wrapper = shallow(<Reviews />);

    expect(wrapper.find(`[data-testid="${DataIds.isNotAvailable}"]`).length).toBe(1);
  });

  it('<Reviews reviews=[]/>', () => {
    const wrapper = shallow(<Reviews reviews={[]} />);

    expect(wrapper.find(`[data-testid="${DataIds.isNotAvailable}"]`).length).toBe(1);
  });

  it('<Reviews reviews=[{}]/>', () => {
    const review = {};
    const wrapper = shallow(<Reviews reviews={[review]} />);

    expect(wrapper.find(`[data-testid="${DataIds.isNotAvailable}"]`).length).toBe(0);
    expect(wrapper.find(`Review`).length).toBe(1);
    expect(wrapper.find('Review').props().review).toBe(review);
  });

  it('<Reviews reviews=[{}, {}]/>', () => {
    const review1 = {};
    const review2 = {};
    const wrapper = shallow(<Reviews reviews={[review1, review2]} />);

    expect(wrapper.find(`[data-testid="${DataIds.isNotAvailable}"]`).length).toBe(0);
    expect(wrapper.find(`Review`).length).toBe(2);
    expect(wrapper.find('Review').at(0).props().review).toBe(review1);
    expect(wrapper.find('Review').at(1).props().review).toBe(review2);
  });

  it('<Reviews reviews=[{id=1}, {id=2}]/>', () => {
    const review1 = { id: 'review_id_1' };
    const review2 = { id: 'review_id_2' };
    const wrapper = shallow(<Reviews reviews={[review1, review2]} />);

    // Not supported: expect(wrapper.find(`[key="1"]`).length).toBe(1); - https://github.com/enzymejs/enzyme/issues/645

    const reviewWraper1 = wrapper
      .findWhere((node) => node.key() == review1.key /* TODO: why '===' doesn't work here? */)
      .at(0);
    expect(reviewWraper1.props().review).toBe(review1);

    const reviewWraper2 = wrapper
      .findWhere((node) => node.key() == review2.key /* TODO: why '===' doesn't work here? */)
      .at(0);
    expect(reviewWraper1.props().review).toBe(review2);
  });
});
