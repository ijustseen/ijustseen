import React from "react";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section id="hero" className={`section ${styles.hero}`}>
      <div className={styles.content}>
        <h1>Andrew Eroshenkov</h1>
        <p>Junior Full-Stack Web Developer</p>
        <p>Открыт к удаленной работе</p>
        {/* Можно добавить кнопки или ссылки позже */}
      </div>
      <div className={styles.scrollIndicator}>
        <span>↓ Scroll Down ↓</span>
      </div>
    </section>
  );
};

export default Hero;
