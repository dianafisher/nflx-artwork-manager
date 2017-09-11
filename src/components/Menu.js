import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

class Menu extends Component{

  _onChange = (e) => {
    this.props.onGroupByChange(e.target.value);
  }

  _renderRadio = (value, text) => {
    const groupBy = this.props.groupedBy;
    return (
      <div className='radio'>
        <label>
          <input
            onChange={this._onChange}
            type="radio"
            name="groupOptions"
            value={value}
            checked={groupBy === value}
          ></input>
          <span className='circle'></span>
          <span className='check'></span>
          <span className='text'>{text}</span>
        </label>
      </div>
    )
  }

  render() {

    return (
      <div className='menu'>
        <div className='menu-title'>Options</div>
        <div className='menu-content'>
          <form className='form-horizontal'>
            <h4 className='menu-subtitle'>Group By</h4>
            <div className='form-group'>
              {this._renderRadio('movieId', 'Movie')}
              {this._renderRadio('languageCode', 'Language')}
            </div>
          </form>
        </div>
      </div>
    )
  }

}

Menu.propTypes = {
  onGroupByChange: PropTypes.func.isRequired,
  groupedBy: PropTypes.string.isRequired
};

export default Menu;
