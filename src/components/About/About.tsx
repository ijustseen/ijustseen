import React from "react";
import styles from "./About.module.scss";

const About = () => {
  const skills = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "SCSS",
    "Expo React Native",
    "REST API",
    "Token-based auth",
    "Git",
    "GitHub",
    "Vercel",
    "VS Code",
    "AI hackathon experience",
    "App architecture",
    "Chat/Call systems",
  ];

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.container}>
        <div className={styles.aboutMe}>
          <h2>Обо мне</h2>
          <p>
            Я целеустремленный junior full-stack разработчик с большой страстью
            к веб-технологиям и чистому UI. Мне нравится работать в небольших,
            гибких командах и превращать идеи в реальные, работающие продукты. С
            ориентированным на пользователя мышлением и минималистичным подходом
            к дизайну, я привношу креативность и структуру в свой код.
          </p>
        </div>
        <div className={styles.skills}>
          <h2>Навыки</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
