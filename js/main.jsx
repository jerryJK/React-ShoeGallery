import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/slider.jsx';
import Gallery from './components/gallery.jsx';
//import styles from '../scss/main.scss';


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Slider />
        <Gallery />
      </div>
    )
  }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('react-content')
    );
});
