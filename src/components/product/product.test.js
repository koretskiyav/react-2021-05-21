import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Product from './product';

import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const product = restaurants[0].menu[0];

describe('Product', () => {
  it('should render', () => {
    const wrapper = mount(<Product product={product} />);
    expect(wrapper.find('[data-id="product"]').length).toBe(1);
  });

  it('should init from 0 amount', () => {
    const wrapper = mount(<Product product={product} />);
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('0');
  });

  it('should increment amount', () => {
    const wrapper = mount(<Product product={product} />);

    wrapper.find('[data-id="product-increment"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('1');
  });

  it('should decrement amount 0 will stay 0', () => {
    const wrapper = mount(<Product product={product} />);

    wrapper.find('[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('0');
  });

  it('should decrement amount #1', () => {
    const wrapper = mount(<Product product={product} />);

    wrapper.find('[data-id="product-increment"]').simulate('click');
    wrapper.find('[data-id="product-increment"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('2');

    wrapper.find('[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('1');
  });

  it('should decrement amount #2', () => {
    const wrapper = mount(<Product product={product} amount={3} />);
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('3');

    // ???
    // This approach has no affect - it doesn't change props in Product component
    // const newProps = { ...product };
    // newProps.amount = 5;
    // wrapper.setProps(newProps);
    // expect(wrapper.find('[data-id="product-amount"]').text()).toBe('5');

    // wrapper.setState({ amount: 5 }); // ReactWrapper::setState() can only be called on class components

    wrapper.find('[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('2');
  });

  it('should fetch data', () => {
    const fn = jest.fn();
    mount(<Product product={product} fetchData={fn} />);
    expect(fn).toBeCalledWith(product.id);
  });
});
