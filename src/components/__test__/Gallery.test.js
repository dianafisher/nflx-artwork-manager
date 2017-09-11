import React from 'react';
import { shallow } from 'enzyme';
import Gallery from '../Gallery';


const groups = [
    [
      {
        "movieId": 70305883,
        "movieName": "Marco Polo",
        "imageType": "sdp",
        "thumbnailUrl": "http://art.nflximg.net/86e1f/8cbce4164b1b825620987fd60e279456a6c86e1f.jpg",
        "fullSizeImageUrl": "http://art.nflximg.net/4696b/7ff1f9558cb6f8116093c1f96d6f308bb0e4696b.jpg",
        "languageCode": "zh-Hant"
      },
      {
        "movieId": 70305883,
        "movieName": "Marco Polo",
        "imageType": "sdp",
        "thumbnailUrl": "http://art.nflximg.net/5ce1a/af5a8ec811c8c2da90a7967e1616fbb3c6a5ce1a.jpg",
        "fullSizeImageUrl": "http://art.nflximg.net/a828d/02339453136e68aeeb1251ff66e7d16d3b2a828d.jpg",
        "languageCode": "it"
      }]
    ];

describe('Gallery', () => {
  it('renders', () => {
    expect(shallow(
      <Gallery
        groups={groups}
        groupedBy='movieId'
        onThumbnailClicked={jest.fn()}
      ></Gallery>
    )).toMatchSnapshot();
  });

  it('renders with empty groups', () => {
    expect(shallow(
      <Gallery
        groups={[]}
        groupedBy='movieId'
        onThumbnailClicked={jest.fn()}
      ></Gallery>
    )).toMatchSnapshot();
  });
});
