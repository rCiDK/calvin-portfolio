import React, { useEffect, useRef } from 'react';
import Pace from 'pace-js';
import { gsap } from 'gsap';
import './index.css';
import { CustomEase } from "gsap/CustomEase";


gsap.registerPlugin(CustomEase);

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
        .to('.pace', { 
          transform: 'scale(10, 1)', 
          duration: 4, 
          ease: "power4.out" 
        }, "+=.2")
        .to('.pace', { 
          duration: 1, 
          height: "100%", 
          ease: "power4.out" 
        }, "-=3.1")
        .to('.loading__text span', { 
          delay: 0.2, 
          duration: 0.5, 
          opacity: 0, 
          y: -100,
          stagger: 0.1,
          ease: "power4.out"
        }, 'p')
        .to('.title', { duration: 1, opacity: 1 }, '-=3')
        .to('.title', { duration: 2.5, xPercent: -370, ease: CustomEase.create("custom", "M0,0 C0.419,0.019 0.473,0.449 0.527,0.567 0.578,0.681 0.62,1 1,1 ") }, '-=2.7')
        .to('.pace', { 
          duration: 1, 
          height: "0%",
          rotate: 90, 
          ease: "power3.in" 
        }, "-=1")
        .to('.helloTitle', { 
          duration: 1, 
          opacity: 1, 
          ease: "power4.in" 
        }, "-=1")
        .to('.title', { 
          duration: 1, 
          opacity: 0, 
          ease: "power4.in" 
        }, "-=1");
    });
  }, []);

  return (
    <>
      <div id='title-container'>
        <h1 className='helloTitle'>Hello</h1>
        <h1 className="title">Halo • नमस्ते • こんにちは • สวัสดี • Olá • Hola • Salut • Привет • Ciao • Hello</h1>
      </div>
      <div id="preloader">
        <div className="loading__text" ref={loadingTextRef}>LOADING</div>
      </div>
    </>
  );
};

export default App;