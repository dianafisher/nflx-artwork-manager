import React from 'react';
import { shallow, render } from 'enzyme';
import Loading from '../Loading';

describe('Loading', () => {

  it('renders nothing when status is loaded', () => {
    expect(shallow(
      <Loading status='loaded'></Loading>
    )).toMatchSnapshot();
  });

  it('renders Loading when status is loading', () => {
    const wrapper = render(<Loading status='loading'></Loading>);
    expect(wrapper.text()).toBe('Loading...');
  });

  it('renders Failed To Load Data when status is error', () => {
    const wrapper = render(<Loading status='error'></Loading>);
    expect(wrapper.text()).toBe('Failed To Load Data');
  });

});
