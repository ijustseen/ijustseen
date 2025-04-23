import React from "react";
import styles from "./Projects.module.scss";

const projects = [
  {
    title: "Learn&Share",
    description:
      "Мобильное приложение, которое связывает людей, желающих преподавать и изучать различные навыки через видеоуроки. Реализованы аутентификация, профили, отзывы и поиск учителей.",
    achievement: "🏆 Победитель MTS App Challenge (Сербия)",
  },
  {
    title: "DocTalkie",
    description:
      "Проект для хакатона, использующий ИИ для создания пользовательских ассистентов из загруженной документации. Работал над основным интерфейсом, системой ассистентов и логикой подписки.",
    achievement: "⚙️ Построен на Next.js, развернут как полноценный MVP.",
  },
];

const Projects = () => {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <h2>Проекты</h2>
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span>{project.achievement}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
