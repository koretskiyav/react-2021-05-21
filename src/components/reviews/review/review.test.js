import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from './review';
import Rate from '../../rate';

Enzyme.configure({ adapter: new Adapter() });

describe('Review', () => {
  it('render', () => {
    const wrapper = mount(<Review user='Sam' rating='4' text='blablabla' />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('render userName', () => {
    const wrapper = mount(<Review user='Sam' rating='4' text='blablabla' />);
    expect(wrapper.find('[data-id="username"]').length).toBe(1);
  });

  it('render userText', () => {
    const wrapper = mount(<Review user='Sam' rating='4' text='blablabla' />);
    expect(wrapper.find('[data-id="userText"]').length).toBe(1);
  });

  it ('render stars', ()=>{
    const wrapper = mount(<Rate value="3"/>);
    expect(wrapper.find('[data-id="rate"]').length).toBe(1)
  })

  // не знаю почему, но эти два теста не проходят
  it('five stars render', () => {
    const wrapper = mount(<Rate value='3' />);
    expect(wrapper.find('[data-id="star"]').length).toBe(5);
  });

  it ('active stars equal rating', ()=>{
    const wrapper = mount(<Rate value="3"/>);
    expect(wrapper.find('.checked').length).toBe(3)
  })
});
