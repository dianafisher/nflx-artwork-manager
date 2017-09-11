import React from 'react';
import PropTypes from 'prop-types';
import SmallThumbnail from './SmallThumbnail';
import './Movie.css';

/*
  A Movie component displays a SmallThumbnail component for each entry in
  it's group.

  This component passes the onThumbnailClicked prop down to the SmallThumbnail
*/
function Movie (props) {
  // If we do not have data for some reason, do not render anything.
  if (props.entries.length === 0) {
    return null;
  }

  const languageCode = props.entries[0].languageCode;
  const movieName = props.entries[0].movieName;

  const langTitle = `${props.entries[0].language} (${languageCode})` ;

  const title = props.groupedBy === 'movieId' ? movieName : langTitle;

  return (
    <div className='movie'>
      <div className='movie-title'>{title}</div>
      <div className='small-thumbnails'>
        {props.entries.map((entry) =>
          <SmallThumbnail
            key={entry.thumbnailUrl}
            onClick={props.onThumbnailClicked}
            data={entry}
          ></SmallThumbnail>
        )}
      </div>
    </div>
  )
}

Movie.propTypes = {
  onThumbnailClicked: PropTypes.func.isRequired,
  groupedBy: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

export default Movie;
