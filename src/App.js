import React, { Component } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import Modal from './components/Modal';
import TitleBar from './components/TitleBar';
import Loading from './components/Loading';

const LOAD_STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded'
}

class App extends Component {

  // initialize state
  state = {
    movies: [],
    groupBy: 'movieId',
    modalOpen: false,
    selectedItem: {},
    currentPage: 1,
    pages: 1,
    loadingStatus: LOAD_STATUS.LOADING
  }

  componentDidMount() {
    this._getMovies();
  }

  // invoked immediately after updating occurs..
  componentDidUpdate(prevProps, prevState) {
    // if value of currentPage has changed, call _getMovies()
    if (prevState.currentPage !== this.state.currentPage) {
      this._getMovies();
    } else if (prevState.groupBy !== this.state.groupBy) {
      // check that the groupBy value has changed before calling _getMovies()
      this._getMovies();
    }
  }

  _toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  /*
    When a 'group by' button is clicked, updates the state with the new value.
  */
  _onGroupByChange = (groupBy) => {
    this.setState({ groupBy, currentPage:1 });
  }

  /*
   When a thumbnail is clicked, displays the full screen thumnbail for
   a movie in a modal view.
  */
  _onThumbnailClicked = (data) => {
    this.setState({ selectedItem: data });
    this._toggleModal();
  }


  /*
    Fetches the movies grouped by either movieId or lanuageCode.
  */
  _getMovies = () => {
    const limitPerPage = 21;
    const currentPage = this.state.currentPage;
    const start = (currentPage - 1) * limitPerPage;

    this.setState({loadingStatus: LOAD_STATUS.LOADING});
    fetch(`/api/movies?groupBy=${this.state.groupBy}&start=${start}&limit=${limitPerPage}`)
      .then(res => res.json())
      .then(obj => {
        this.setState({ movies: obj.movies, pages: obj.pages, loadingStatus: LOAD_STATUS.LOADED });
      })
      .catch(error => {
        console.log(error)
        this.setState({loadingStatus: LOAD_STATUS.ERROR});
      });
  }

  _onNextPage = () => {
    let currentPage = this.state.currentPage;
    if (currentPage < this.state.pages) {
      // get the next page of items.
      currentPage += 1;
      this.setState({currentPage});
    }
  }

  _onPreviousPage = () => {
    let currentPage = this.state.currentPage;
    if (currentPage > 1) {
      currentPage -= 1;
      this.setState({currentPage});
    }
  }

  render() {
    const groups = this.state.movies;

    return (
      <div className="App">
        <div className='viewport'>
          <TitleBar />
          <div className='option-bar'>
            <Modal
              show={this.state.modalOpen}
              item={this.state.selectedItem}
              onClose={this._toggleModal}
            ></Modal>

          </div>
          {groups.length ? (
            <div className='container'>
              <Menu
                groupedBy={this.state.groupBy}
                onGroupByChange={this._onGroupByChange}
              ></Menu>
              <div className='scrollable'>
                <Gallery
                  groupedBy={this.state.groupBy}
                  groups={groups}
                  onThumbnailClicked={this._onThumbnailClicked}
                ></Gallery>
                <div className='page-buttons'>
                  <button
                    className='page-button'
                    onClick={this._onPreviousPage}
                  >Previous Page</button>
                  <button
                    className='page-button'
                    onClick={this._onNextPage}
                  >Next Page</button>
                  <div>Page {this.state.currentPage} of {this.state.pages} pages</div>
                </div>
              </div>
              <Loading status={this.state.loadingStatus}></Loading>
            </div>
          ): (<h1>No movie data available </h1>)}
        </div>
      </div>

    );
  }
}

export default App;
