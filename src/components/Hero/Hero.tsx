import React from "react";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section id="hero" className={`section ${styles.hero}`}>
      {/* Фоновые анимированные фигуры удалены */}

      {/* Основной контент */}
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          {/* Возвращаем простую структуру */}
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
