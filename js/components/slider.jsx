import React from 'react';
import Swiper from 'react-id-swiper';

class Slider extends React.Component {
    render() {
        const params = {
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: { delay: 8000 },
            autoplayDisableOnInteraction: false,
            loop: true,
            effect: "fade"
        }

        return (
            <div className="sliderContainer">
                <Swiper {...params}>
                    <div className="slide slide1">
                        <p className="slide-title">Nike shoes</p>
                        <p className="slide-text">SALE -15&#37;</p>
                    </div>
                    <div className="slide slide2">
                        <p className="slide-title">Womens shoes</p>
                        <p className="slide-text">SALE -10&#37;</p>
                    </div>
                </Swiper>
            </div>
        )
    }
}

export default Slider;
