"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./About.module.scss";
import GitHubActivity from "../GitHub/GitHubActivity";
import Image from "next/image";
import {
  FaUser,
  FaGraduationCap,
  FaLightbulb,
  FaQuoteRight,
  FaGithub,
} from "react-icons/fa";

// Данные для подразделов About
const aboutSections = [
  {
    id: "bio",
    title: "Biography",
    icon: <FaUser />,
    content: `I am a dedicated and passionate junior full-stack developer with a
    strong enthusiasm for web technologies, clean UI, and creating
    impactful digital experiences. I thrive in collaborative, agile
    environments and enjoy transforming complex ideas into functional,
    user-friendly products.`,
  },
  {
    id: "education",
    title: "Education",
    icon: <FaGraduationCap />,
    content: `Computer Science degree with focus on Web Development and Software Engineering.
    Completed specialization courses in modern JavaScript frameworks and cloud technologies.`,
  },
  {
    id: "interests",
    title: "Interests",
    icon: <FaLightbulb />,
    content: `Beyond coding, I'm passionate about UI/UX design, keeping up with tech trends, 
    and exploring new frameworks. I enjoy contributing to open-source projects and attending tech meetups.`,
  },
  {
    id: "philosophy",
    title: "My Philosophy",
    icon: <FaQuoteRight />,
    content: `With a user-centric mindset and a keen eye for detail, I strive to
    write clean, maintainable, and efficient code. I'm always
    eager to learn new technologies and improve my skills.`,
  },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [techElements, setTechElements] = useState<React.ReactNode[]>([]);
  const [activeTab, setActiveTab] = useState("bio");
  // Ваше имя пользователя GitHub
  const githubUsername = "ijustseen";

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

  return (
    <section
      id="about"
      className={`section ${styles.about} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.techBackground}>{techElements}</div>

      <div className={styles.container} ref={containerRef}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <div className={styles.tabsContainer}>
              {aboutSections.map((section) => (
                <button
                  key={section.id}
                  className={`${styles.tabButton} ${
                    activeTab === section.id ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab(section.id)}
                >
                  <span className={styles.tabIcon}>{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </div>

            <div className={styles.contentBox}>
              {aboutSections.map((section) => (
                <div
                  key={section.id}
                  className={`${styles.tabPanel} ${
                    activeTab === section.id ? styles.activePanel : ""
                  }`}
                >
                  <h3>
                    <span className={styles.sectionIcon}>{section.icon}</span>
                    {section.title}
                  </h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>

            <div className={styles.gitHubActivityContainer}>
              <h3>
                <span className={styles.sectionIcon}>
                  <FaGithub />
                </span>
                GitHub Activity
              </h3>
              <div className={styles.gitHubActivityStyles}>
                <GitHubActivity username={githubUsername} />
              </div>
            </div>
          </div>

          <div className={styles.profileImage}>
            <div className={styles.imageWrapper}>
              {/* Замените на реальный путь к фотографии */}
              <Image
                src="/profile.jpg"
                alt="Developer Profile"
                width={300}
                height={340}
                className={styles.profilePhoto}
                priority
              />
              <div className={styles.photoOverlay}>
                <div className={styles.photoInfo}>
                  <h3>Andrew Eroshenkov</h3>
                  <p>Based in Serbia</p>
                </div>
              </div>
            </div>

            <div className={styles.profileStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>2+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
