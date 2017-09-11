import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

/*
  The Gallery component contains a list of Movie components.
  Gallery is a stateless functional component.
*/
function Gallery (props) {

  const groups = props.groups;

  return (
    <div>
      <ul className="movies">
        {groups.map((group, index) =>
          <Movie
            key={index}
            groupedBy={props.groupedBy}
            entries={group}
            onThumbnailClicked={props.onThumbnailClicked}
          ></Movie>
        )}
      </ul>
    </div>
  )
}

Gallery.propTypes = {
  groups: PropTypes.array.isRequired,
  groupedBy: PropTypes.string.isRequired,
  onThumbnailClicked: PropTypes.func.isRequired,
};

export default Gallery;
