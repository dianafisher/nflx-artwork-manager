import React from 'react';
import { shallow } from 'enzyme';
import Movie from '../Movie';

const groupedBy = 'movieId'
const entries = [{"movieId":70242311,"movieName":"Orange Is the New Black","imageType":"sdp","thumbnailUrl":"http://art.nflximg.net/673e9/b39fcc29b2ac668ee01343de9f21f611c8f673e9.jpg","fullSizeImageUrl":"http://art.nflximg.net/78bc7/198343ed941f178d54878aa366a122e4e2e78bc7.jpg","languageCode":"it"}];

const invalidEntry = {
  'movieId': 70242311,
  "movieName": "Orange Is the New Black",
  "langgeCode": "it",
  "thumbnailUrl":"http://art.nflximg.net/673e9/b39fcc29b2ac668ee01343de9f21f611c8f673e9.jpg",
  "fullSizeImageUrl":"http://art.nflximg.net/78bc7/198343ed941f178d54878aa366a122e4e2e78bc7.jpg"
};

describe('Movie', () => {
  it('renders with an entry', () => {
    expect(shallow(
      <Movie
        onThumbnailClicked={jest.fn()}
        groupedBy={groupedBy}
        entries={entries}
      ></Movie>
    )).toMatchSnapshot();
  });

  it('does not explode with no data', () => {
    expect(shallow(
      <Movie
        onThumbnailClicked={jest.fn()}
        groupedBy={groupedBy}
        entries={[]}
      ></Movie>
    ))
  });

  it('does not explode with invalid data', () => {
    expect(shallow(
      <Movie
        onThumbnailClicked={jest.fn()}
        groupedBy='uknown'
        entries={[invalidEntry]}
      ></Movie>
    ))
  });

});
