import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    searchKeyword: "",
    filterKeyword: ""
  };
  enterKeyHandler = e => {
    console.log(e.target.value);
  };

  render() {
    console.log(this.state.searchKeyword);
    return (
      <div className='row'>
        <div className='text-center col-sm-6 m-auto pb-5'>
          <div className='text-center mt-5 input-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Search photos using API'
              value={this.state.searchKeyword}
              onChange={e => this.setState({ searchKeyword: e.target.value })}
              onKeyUp={e =>
                e.key === "Enter"
                  ? this.props.clicked(this.state.searchKeyword)
                  : ""
              }
            />
            <button
              className='btn btn-success'
              onClick={() => this.props.clicked(this.state.searchKeyword)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
