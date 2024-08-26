import React, { useEffect, useRef } from 'react';
import Pace from 'pace-js';
import { gsap } from 'gsap';
import './index.css';

const App = () => {
  const loadingTextRef = useRef(null);

  useEffect(() => {
    Pace.start({
      ajax: true,
      document: true
    });

    // Split the text into individual span elements
    const loadingText = loadingTextRef.current;
    const letters = loadingText.textContent.split('');
    loadingText.textContent = '';
    letters.forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter;
      loadingText.appendChild(span);
    });

    Pace.on('done', () => {
      gsap.timeline()
        .add('p')
        .to('.pace', { transform: 'scale(10, 1)', duration: 4 , ease: "power4.out"}, "+=.2")
        .to('.pace', { duration: 1, height: "100%", ease: "power4.out" }, "-=3.1")
        .to('.loading__text span', { 
          delay: 0.2, 
          duration: 0.5, 
          opacity: 0, 
          y: -100,
          stagger: 0.1,
          ease: "power4.out"
        }, 'p')
        .to('.title', { duration: 2, y: -10, opacity: 1, ease: "expo.inOut" }, '-=3');
    });
  }, []);

  return (
    <>
      <h1 className="title">Hi</h1>
      <div id="preloader">
        <div className="loading__text" ref={loadingTextRef}>LOADING</div>
      </div>
    </>
  );
};

export default App;