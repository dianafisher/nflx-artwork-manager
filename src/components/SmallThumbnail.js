import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SmallThumbnail.css';

class SmallThumbnail extends Component {

  _onThumnbailClicked = () => {
    this.props.onClick(this.props.data);
  }

  render() {
    const data = this.props.data;
    
    return (
      <div className='small-thumbnail'>
        <img
          src={data.thumbnailUrl}
          alt='small thumbnail'
          onClick={this._onThumnbailClicked}
        ></img>
      </div>
    )
  }
}

SmallThumbnail.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default SmallThumbnail;
