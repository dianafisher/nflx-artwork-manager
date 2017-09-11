import React from 'react';
import { shallow } from 'enzyme';
import SmallThumbnail from '../SmallThumbnail';

const data = {
  thumbnailUrl: 'http://via.placeholder.com/350x150'
};

describe('SmallThumbnail', () => {

  it('renders', () => {
    expect(shallow(
      <SmallThumbnail data={data} onClick={jest.fn()}/>
    )).toMatchSnapshot();
  });

  it('calls _onThumnbailClicked when clicked', () => {
    const onClicked = jest.fn();
    const wrapper = shallow(
      <SmallThumbnail data={data} onClick={onClicked}/>
    );

    wrapper.find('img').simulate('click');
    expect(onClicked).toBeCalled();
  });
});
