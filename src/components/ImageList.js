import React, { Component } from 'react';

class ImageList extends Component {
    render() {
        return (
            <div className="image">
                <img src={this.props.photo.urls.small} alt={this.props.photo.id} />    
            </div>
        );
    };

}

export default ImageList;
