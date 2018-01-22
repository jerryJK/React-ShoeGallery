import React from 'react';


class GalleryContent extends React.Component {


  render() {

    return (
        <div className="gallery-items">
          {this.props.children}
        </div>
    )

  }
}


export default GalleryContent;
