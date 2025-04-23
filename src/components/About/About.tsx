"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./About.module.scss";
import { FaReact, FaNodeJs, FaCode, FaGithub, FaServer } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGraphql,
} from "react-icons/si";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [techElements, setTechElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Генерируем технологические элементы только на клиентской стороне
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 15; i++) {
      elements.push(
        <div
          key={i}
          className={styles.techElement}
          style={
            {
              "--delay": `${i * 0.5}s`,
              "--size": `${Math.random() * 30 + 5}px`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
            } as React.CSSProperties
          }
        />
      );
    }
    setTechElements(elements);
  }, []);

  // Определяем навыки с иконками для лучшей визуализации
  const skillsList = [
    { name: "React", icon: <FaReact />, category: "frontend" },
    { name: "Next.js", icon: <SiNextdotjs />, category: "frontend" },
    { name: "TypeScript", icon: <SiTypescript />, category: "language" },
    { name: "JavaScript (ES6+)", icon: <SiJavascript />, category: "language" },
    { name: "HTML5", icon: <FaCode />, category: "frontend" },
    { name: "CSS3", icon: <FaCode />, category: "frontend" },
    { name: "SCSS", icon: <FaCode />, category: "frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "frontend" },
    { name: "Expo React Native", icon: <FaReact />, category: "mobile" },
    { name: "Node.js", icon: <FaNodeJs />, category: "backend" },
    { name: "REST API", icon: <FaServer />, category: "backend" },
    { name: "GraphQL (Basic)", icon: <SiGraphql />, category: "backend" },
    { name: "Token-based auth", icon: <FaServer />, category: "security" },
    { name: "Git", icon: <FaCode />, category: "tools" },
    { name: "GitHub", icon: <FaGithub />, category: "tools" },
    { name: "VS Code", icon: <FaCode />, category: "tools" },
    { name: "App architecture", icon: <FaServer />, category: "concept" },
    { name: "UI/UX Principles", icon: <FaCode />, category: "concept" },
    { name: "Agile Methodologies", icon: <FaCode />, category: "concept" },
    { name: "Problem Solving", icon: <FaCode />, category: "concept" },
  ];

  return (
    <section
      id="about"
      className={`section ${styles.about} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.techBackground}>{techElements}</div>

      <div className={styles.container} ref={containerRef}>
        <div className={styles.aboutMe}>
          <div className={styles.glowingHeading}>
            <h2>About Me</h2>
          </div>
          <div className={styles.contentBox}>
            <p>
              I am a dedicated and passionate junior full-stack developer with a
              strong enthusiasm for web technologies, clean UI, and creating
              impactful digital experiences. I thrive in collaborative, agile
              environments and enjoy transforming complex ideas into functional,
              user-friendly products.
            </p>
            <p>
              With a user-centric mindset and a keen eye for detail, I strive to
              write clean, maintainable, and efficient code. I&apos;m always
              eager to learn new technologies and improve my skills.
            </p>
            <div className={styles.codeSnippet}>
              <pre>
                <code>
                  <span className={styles.keyword}>const</span> developer ={" "}
                  {"{"}
                  <br />
                  {"  "}
                  <span className={styles.property}>name</span>:{" "}
                  <span className={styles.string}>
                    &quot;Andrew Eroshenkov&quot;
                  </span>
                  ,
                  <br />
                  {"  "}
                  <span className={styles.property}>passion</span>:{" "}
                  <span className={styles.string}>
                    &quot;Building amazing web apps&quot;
                  </span>
                  ,
                  <br />
                  {"  "}
                  <span className={styles.property}>seeking</span>:{" "}
                  <span className={styles.string}>
                    &quot;New challenges & hackathons&quot;
                  </span>
                  <br />
                  {"}"};
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className={styles.skills}>
          <div className={styles.glowingHeading}>
            <h2>Skills</h2>
          </div>
          <div
            className={`${styles.skillsContainer} ${
              isHovered ? styles.hovered : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ul>
              {skillsList.map((skill) => (
                <li
                  key={skill.name}
                  className={`${styles[`category-${skill.category}`]}`}
                >
                  <span className={styles.skillIcon}>{skill.icon}</span>
                  <span className={styles.skillName}>{skill.name}</span>
                </li>
              ))}
            </ul>

            <div className={styles.hoverMessage}>Hover to stabilize skills</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
