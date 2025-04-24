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
    content: `I started getting acquainted with development in early childhood at the age of 7, when I first tried to write layout on CodePen. A few years later, I remembered my hobbies and started learning again. At first, only layout, then full-fledged web developmentI, and now I am trying myself in more and more new areas, including game development and AI. Also, in the last year I have been actively participating in hackathons, and even became a winner in 8 App Izazov in Podgorica`,
  },
  {
    id: "education",
    title: "Education",
    icon: <FaGraduationCap />,
    content: `At the moment I am studying at the Jovan Jovanovic Zmaj Gymnasium in a specialized IT class. I took courses in web development and learning Python. However, I got a lot of knowledge through self-study.`,
  },
  {
    id: "interests",
    title: "Interests",
    icon: <FaLightbulb />,
    content: `Besides coding, I follow tech trends in AI and learn new frameworks. I enjoy contributing to open source projects and attending tech meetups. I also enjoy playing guitar and traveling, mostly in Europe.`,
  },
  {
    id: "philosophy",
    title: "My Philosophy",
    icon: <FaQuoteRight />,
    content: `With a user-centric mindset and a keen eye for detail, I strive to write clean, maintainable, and efficient code. I am always looking to learn new technologies and improve my skills, because lack of progress is regression in my opinion..`,
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
                <span className={styles.statNumber}>6</span>
                <span className={styles.statLabel}>Different Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
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
