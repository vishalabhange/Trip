// FullPageSlider.js
import React, { useState, useEffect } from 'react';
import '../Css/FullPageSlider.css';
import image1 from '../assests/slide1.jpg';
import image2 from '../assests/slide2.webp';

const FullPageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: '1',
      image: image1,
      caption: 'Slide 1',
    },
    {
      id: '2',
      image: image2,
      caption: 'Slide 2',
    },
    // Add more slides as needed
  ];

  const goToNextSlide = () => {
    console.log("Current Slide Before:", currentSlide);
    setCurrentSlide((prevSlide) => {
      const nextSlide = (prevSlide + 1) % slides.length;
      console.log("Next Slide:", nextSlide);
      return nextSlide;
    });
  };
  

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000); // Change the interval duration as needed

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div className="full-page-slider">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <h1>{slide.caption}</h1>
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>
        Prev
      </button>
      <button className="next-button" onClick={goToNextSlide}>
        Next
      </button>
    </div>
  );
};

export default FullPageSlider;
