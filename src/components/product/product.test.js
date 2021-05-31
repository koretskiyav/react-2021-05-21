import Enzyme, { mount /* TODO: change to shallow??? */ } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Product from './product';
import { DataIds } from './product.dataids';

import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const product = restaurants[0].menu[0];

describe('Product', () => {
  it('<Product />', () => {
    const wrapper = mount(<Product />);

    expect(wrapper.find(`[data-id="${DataIds.isNotAvailable}"]`).length).toBe(1);
    expect(wrapper.find(`[data-id="${DataIds.product}"]`).length).toBe(0);
  });

  it('<Product fetchData/>', () => {
    const fetchData = jest.fn();
    const wrapper = mount(<Product fetchData={fetchData} />);

    expect(fetchData).toBeCalledTimes(0);
  });

  it('<Product product={}/>', () => {
    const wrapper = mount(<Product product={{}} />);

    expect(wrapper.find(`[data-id="${DataIds.isNotAvailable}"]`).length).toBe(0);
    expect(wrapper.find(`[data-id="${DataIds.product}"]`).length).toBe(1);
  });

  it('<Product product={} fetchData/>', () => {
    const fetchData = jest.fn();
    const wrapper = mount(<Product product={{}} fetchData={fetchData} />);

    expect(fetchData).toBeCalledTimes(0);
  });

  it('<Product product={id}/>', () => {
    const wrapper = mount(<Product product={{ id: '3' }} />);

    expect(wrapper.find(`[data-id="${DataIds.isNotAvailable}"]`).length).toBe(0);
    expect(wrapper.find(`[data-id="${DataIds.product}"]`).length).toBe(1);
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('0');
  });

  it('<Product product={id} fetchData/>', () => {
    const fetchData = jest.fn();
    const wrapper = mount(<Product product={{ id: '3' }} fetchData={fetchData} />);

    expect(fetchData).toBeCalledTimes(1);
    expect(fetchData).toBeCalledWith('3');
  });

  it('<Product product={id}/> -> click Increment', () => {
    const wrapper = mount(<Product product={{ id: '0' }} />);

    wrapper.find(`[data-id="${DataIds.increment}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('1');

    wrapper.find(`[data-id="${DataIds.increment}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('2');
  });

  it('<Product product={id}/> -> click Increment -> click Decrement', () => {
    const wrapper = mount(<Product product={{ id: '0' }} />);

    wrapper.find(`[data-id="${DataIds.increment}"]`).simulate('click');
    wrapper.find(`[data-id="${DataIds.increment}"]`).simulate('click');

    wrapper.find(`[data-id="${DataIds.decrement}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('1');

    wrapper.find(`[data-id="${DataIds.decrement}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('0');

    wrapper.find(`[data-id="${DataIds.decrement}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('0');
  });

  it('<Product product={id}/> -> click Decrement', () => {
    const wrapper = mount(<Product product={{ id: '0' }} />);

    wrapper.find(`[data-id="${DataIds.decrement}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('0');

    wrapper.find(`[data-id="${DataIds.decrement}"]`).simulate('click');
    expect(wrapper.find(`[data-id="${DataIds.amount}"]`).text()).toBe('0');
  });
});
