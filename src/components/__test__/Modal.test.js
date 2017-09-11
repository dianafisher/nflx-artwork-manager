import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../Modal';

const item = {
  movieName: 'Test Movie',
  fullSizeImageUrl: 'http://via.placeholder.com/350x150',
  movieId: 1,
  imageType: 'sdp',
  language: 'English',
  languageCode: 'en'
};

describe('Modal', () => {
  
  it('renders nothing when closed', () => {
    expect(shallow(
      <Modal item={item} onClose={jest.fn()}/>
    )).toMatchSnapshot();
  });

  it('renders when open', () => {
    expect(shallow(
      <Modal item={item} show={true} onClose={jest.fn()}/>
    )).toMatchSnapshot();
  });

  it('calls onClose when button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Modal item={item} show={true} onClose={onClose}/>
    );

    wrapper.find('button').simulate('click');
    expect(onClose).toBeCalled();
  });
});
