import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends Component {

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <div className='title'>{this.props.item.movieName}</div>
          <img
            className="fullsize-image"
            src={this.props.item.fullSizeImageUrl}
            alt='full size'
          ></img>
          <div className="detail">
            <label>Movie ID:</label>
            <span>{this.props.item.movieId}</span>
          </div>
          <div className="detail">
            <label>Image Type:</label>
            <span>{this.props.item.imageType}</span>
          </div>
          <div className="detail">
            <label>Language:</label>
            <span>{this.props.item.language}</span>
          </div>
          <div className="detail">
            <label>Language Code:</label>
            <span>{this.props.item.languageCode}</span>
          </div>
          <div className="footer">
            <button
              className="close-button"
              onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  item: PropTypes.object.isRequired
};

export default Modal;
