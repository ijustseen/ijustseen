import React from "react";
import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <h2>Связаться со мной</h2>
      <p className={styles.subtitle}>
        Всегда открыт к интересным проектам и предложениям!
      </p>
      <div className={styles.links}>
        <a href="mailto:anordgame@gmail.com" className={styles.linkItem}>
          📧 Email: anordgame@gmail.com
        </a>
        <a
          href="https://github.com/ijustseen"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkItem}
        >
          🔗 GitHub: ijustseen
        </a>
        <a
          href="https://www.linkedin.com/in/andrew-eroshenkov-27235a30b/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkItem}
        >
          🔗 LinkedIn: Andrew Eroshenkov
        </a>
      </div>
      <div className={styles.location}>
        <p>📍 Местоположение: Нови Сад, Сербия</p>
      </div>
    </section>
  );
};

export default Contact;
