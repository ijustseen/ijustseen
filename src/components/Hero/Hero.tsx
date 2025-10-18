'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Меньший порог для Hero, так как он обычно первый на странице
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className={`section ${styles.hero} ${isVisible ? styles.visible : ''}`}
      ref={containerRef}
    >
      {/* Фоновые анимированные фигуры удалены */}

      {/* Основной контент */}
      <div className={`${styles.contentContainer} ${isVisible ? styles.visible : ''}`}>
        <h1 className={styles.title}>
          <span className={styles.nameSpan}>Andrew</span>
          <span className={styles.surnameSpan}>Eroshenkov</span>
        </h1>
        <p className={styles.subtitle}>Junior Full-Stack Web Developer</p>
      </div>

      <div className={styles.scrollHint}>
        <span>↓ Scroll Down ↓</span>
      </div>
    </section>
  );
};

export default Hero;
