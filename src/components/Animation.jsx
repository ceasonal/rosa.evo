import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LogoAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;

    // Initial state of the logo (hidden)
    gsap.set(logo, { autoAlpha: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Animation complete callback
        setAnimationComplete(true);
      }
    });

    tl.to(logo, { duration: 0.1, autoAlpha: 1, repeat: 5, yoyo: true }) // Flicker
    .to(logo, { duration: 3, autoAlpha: 1 }) // Fade in
    .to(logo, { duration: 0.1, autoAlpha: 0, repeat: 5, yoyo: true }) // Flicker
    .to(logo, { duration: 2, autoAlpha: 0 }); // Fade out

    // Cleanup
    return () => {
      tl.kill(); // Kill the animation on unmount
    };
  }, []);

  return (
    <>
      <div ref={logoRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <img src="https://i.ibb.co/7Kq2xhY/iii-removebg-preview.png" width="50%" height="50%" viewBox="0 0 24 24"/>
        <h2>Logo Animation</h2>
      </div>
    </>
  );
};

export default LogoAnimation;