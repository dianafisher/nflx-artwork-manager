import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../Menu';

describe('Menu', () => {

  it('renders', () => {
    expect(shallow(
      <Menu onGroupByChange={jest.fn()} groupedBy='movieId'></Menu>
    )).toMatchSnapshot();
  });

  it('changes radio tune when clicked', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Menu onGroupByChange={onChange} groupedBy='movieId'></Menu>
    );

    wrapper.find('input[value="languageCode"]').simulate('change', {target: {checked: true}});
    expect(onChange).toBeCalled();
  });
});
