import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';
/*

*/
function Loading (props) {

  let text;
  if (props.status === 'loading') {
    text = 'Loading...';
  } else if (props.status === 'error') {
    text = 'Failed To Load Data';
  } else {
    text = '';
  }
  if (text.length) {
    return (
      <div className='loading'>{text}</div>
    )
  } else {
    return null;
  }

}

Loading.propTypes = {
  status: PropTypes.string.isRequired
}

export default Loading;
