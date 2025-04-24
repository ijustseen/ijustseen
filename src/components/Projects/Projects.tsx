"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Projects.module.scss";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import Phone3D from "./Phone3D";

const projects = [
  {
    id: "doctalkie",
    title: "DocTalkie",
    description:
      "A hackathon project using AI to create custom assistants from uploaded documentation. Worked on the main interface, assistant system, and subscription logic.",
    achievement: "⚙️ Built with Next.js, deployed as a fully functional MVP.",
    skills: ["Next.js", "TypeScript", "AI", "Supabase", "Tailwind"],
    liveUrl: "https://doctalkie-next.vercel.app/",
  },
  {
    id: "learnshare",
    title: "Learn&Share",
    description:
      "Learn&Share is a platform that connects people who want to learn and teach various skills through one-on-one video lessons. Users can find mentors, become teachers themselves, and exchange knowledge in a simple and accessible way. The app features profiles, reviews, chats, and a built-in wallet for booking and managing lessons.",
    achievement: "🏆 Winner of MTS App Challenge (Serbia)",
    skills: ["Expo React Native", "Next.js", "LiveKit", "Node.js"],
    liveUrl: "",
  },
  {
    id: "tondash",
    title: "TonDash",
    description:
      "A small project - a game similar to chess, go and similar classic games. Very simple rules of movement with 'catch-up' mechanics. Your ability to analyze global trends on the board is decisive in it.",
    achievement: "🏆 Winner of MTS App Challenge (Serbia)",
    skills: ["Next.js", "TON Blockchain"],
    liveUrl: "https://tondash-next.vercel.app/",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentProject = projects[currentIndex];

  return (
    <section
      id="projects"
      className={`section ${styles.projects} ${
        isVisible ? styles.visible : ""
      }`}
      ref={containerRef}
    >
      <div className={styles.projectDisplay}>
        <div className={styles.infoColumn}>
          <h3 data-number={`0${currentIndex + 1}`}>{currentProject.title}</h3>

          <div className={styles.projectDescription}>
            <p>{currentProject.description}</p>
          </div>

          <div className={styles.skills}>
            <strong>Technologies</strong>
            <ul>
              {currentProject.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={styles.navigation}>
            <button onClick={handlePrev} aria-label="Previous project">
              <FaArrowLeft />
            </button>
            <span>{`${currentIndex + 1} / ${projects.length}`}</span>
            <button onClick={handleNext} aria-label="Next project">
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className={styles.previewColumn}>
          <div className={styles.laptopPreview}>
            <div className={styles.laptopScreen}>
              {currentProject.liveUrl && currentProject.liveUrl !== "" ? (
                <iframe
                  key={`laptop-${currentProject.id}`}
                  src={currentProject.liveUrl}
                  title={`${currentProject.title} - Laptop Preview`}
                  loading="lazy"
                  scrolling="no"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  srcDoc={`
                    <html>
                      <head>
                        <meta name="viewport" content="width=1440, initial-scale=1" />
                        <style>
                          body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                          iframe { width: 100%; height: 100%; border: none; }
                        </style>
                      </head>
                      <body>
                        <iframe src="${currentProject.liveUrl}" width="1440" height="900" 
                          frameBorder="0" style="transform: scale(1); transform-origin: 0 0;"
                          sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
                      </body>
                    </html>
                  `}
                />
              ) : (
                <div className={styles.devPlaceholder}>
                  <div>In development</div>
                </div>
              )}
            </div>
          </div>
          {currentProject.liveUrl && currentProject.liveUrl !== "" ? (
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectButton}
            >
              <span>See the project</span>
              <FaExternalLinkAlt />
            </a>
          ) : (
            <button
              className={`${styles.projectButton} ${styles.inactiveButton}`}
              disabled
            >
              <span>In development</span>
            </button>
          )}
          <div className={styles.phoneContainer}>
            <Phone3D
              key={`phone3d-${currentProject.id}`}
              liveUrl={currentProject.liveUrl}
              projectId={currentProject.id}
              projectTitle={currentProject.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
