import React from "react";
import { Slide } from "react-slideshow-image";
import "./slideshow.css"

const slideImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaZknc0FxI5UJ0m_Z5moZR2DMT1jRXkK_0w&usqp=CAU",
  "https://persiangood.com/wp-content/uploads/2020/09/6-min-480x270.jpg",
  "https://qph.cf2.quoracdn.net/main-qimg-06bc87e4e2c71da6454ebe2a27548547-pjlq"
];

const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
};

const SlideShow = () => {
  return (
    <>
      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[0]})` }}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
};

export default SlideShow;
