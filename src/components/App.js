import React, { Component } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import DATA from "./data";
// https://api.unsplash.com/search/photos/?query=office&client_id=f7911555a9f992e9fa03f982463a625f68be78b16ebad0b76095af1feb4ba8b5
// https://api.unsplash.com/photos/?client_id=f7911555a9f992e9fa03f982463a625f68be78b16ebad0b76095af1feb4ba8b5
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLoaded: false,
    };
  }

  componentDidMount() {

    // 1. set container width;

    axios.get('https://api.unsplash.com/photos/?client_id=f7911555a9f992e9fa03f982463a625f68be78b16ebad0b76095af1feb4ba8b5').then((res) => {
      const photos = res.data;
      setTimeout(() => {
        this.setState({
          photos: photos,
          isLoaded: true
        });
      }, 2000);
    }).catch(error => console.log('something went wrong! : ', error));

  }

  getSearchHandler = searchKeyword => {
    const keyword = searchKeyword.trim().toLowerCase();
    this.setState({
      isLoaded: false,
    });
    axios
      .get(
        `https://api.unsplash.com/search/photos/?query=${keyword}&client_id=f7911555a9f992e9fa03f982463a625f68be78b16ebad0b76095af1feb4ba8b5`
      )
      .then(res => {
        const photos = res.data.results;
        console.log("photos in getsearch Handelr ", res);
        setTimeout(() => {
          this.setState({
            photos: photos,
            isLoaded: true
          });
        }, 2000);

      }).catch(error => console.log('something went wrong! : ', error));
  };

  render() {
    //만약에 여기서 렌더링 하지않고, imagelistd으로 props 을 패스해서 거기서 렌더링 하려고 한다면?
    let photos = this.state.photos;

    if (!this.state.isLoaded) {
      photos = <div className="loader"><p>LOADING  . . .</p></div>
    } else {
      if (photos.length > 0) {
        console.log(photos);
        photos = photos.map((photo) => {
          return <ImageList key={photo.id} photo={photo} />;
        });
      } else {
        photos = <span className="no-result">{photos.length} Results found</span>
      }
    }

    return (
      <div className='App'>
        <div className='container'>
          <SearchBar clicked={this.getSearchHandler} />
          <div className='gallery'>
            {photos}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
