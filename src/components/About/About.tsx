import React from "react";
import styles from "./About.module.scss";

const About = () => {
  const skillsList = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3",
    "SCSS",
    "Tailwind CSS",
    "Expo React Native",
    "Node.js",
    "REST API",
    "GraphQL (Basic)",
    "Token-based auth",
    "Git",
    "GitHub",
    "VS Code",
    "App architecture",
    "UI/UX Principles",
    "Agile Methodologies",
    "Problem Solving",
  ];

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.container}>
        <div className={styles.aboutMe}>
          <h2>About Me</h2>
          <p>
            I am a dedicated and passionate junior full-stack developer with a
            strong enthusiasm for web technologies, clean UI, and creating
            impactful digital experiences. I thrive in collaborative, agile
            environments and enjoy transforming complex ideas into functional,
            user-friendly products. With a user-centric mindset and a keen eye
            for detail, I strive to write clean, maintainable, and efficient
            code. I&apos;m always eager to learn new technologies and improve my
            skills.
          </p>
        </div>
        <div className={styles.skills}>
          <h2>Skills</h2>
          <ul>
            {skillsList.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
