import React from 'react';
import { shallow } from 'enzyme';
import TitleBar from '../TitleBar';

describe('TitleBar', () => {

  it('renders', () => {
    expect(shallow(
      <TitleBar/>
    )).toMatchSnapshot();
  });
});
