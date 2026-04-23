import React, { useState, useEffect } from 'react';

interface CarouselProps {
  slides: string[][];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slideImages, slideIndex) => (
          <div
            key={slideIndex}
            style={{
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {slideImages.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={img}
                alt={`Slide ${slideIndex + 1} Image ${imgIndex + 1}`}
                style={{
                  maxWidth: '30%',
                  height: 'auto',
                  margin: '5px',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;