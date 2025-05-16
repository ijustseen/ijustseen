'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Projects.module.scss';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 'doctalkie',
    title: 'DocTalkie',
    description:
      'A hackathon project using AI to create custom assistants from uploaded documentation. Worked on the main interface, assistant system, and subscription logic.',
    achievement: '⚙️ Built with Next.js, deployed as a fully functional MVP.',
    skills: ['Next.js', 'AI', 'Supabase', 'Tailwind'],
    liveUrl: 'https://doctalkie-next.vercel.app/',
  },
  {
    id: 'learnshare',
    title: 'Learn&Share',
    description:
      'Learn&Share is a platform that connects people who want to learn and teach various skills through one-on-one video lessons. Users can find mentors, become teachers themselves, and exchange knowledge in a simple and accessible way. The app features profiles, reviews, chats, and a built-in wallet for booking and managing lessons.',
    achievement: '🏆 Winner of MTS App Challenge (Serbia)',
    skills: ['Expo React Native', 'Next.js', 'LiveKit', 'Node.js'],
    liveUrl: '',
  },
  {
    id: 'tondash',
    title: 'TonDash',
    description:
      "A small project - a game similar to chess, go and similar classic games. Very simple rules of movement with 'catch-up' mechanics. Your ability to analyze global trends on the board is decisive in it.",
    achievement: '🏆 Winner of MTS App Challenge (Serbia)',
    skills: ['Next.js', 'TON Blockchain'],
    liveUrl: 'https://tondash-next.vercel.app/',
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [currentProjectData, setCurrentProjectData] = useState(projects[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopScreenRef = useRef<HTMLDivElement>(null);
  const [iframeScale, setIframeScale] = useState(1);

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

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setCurrentProjectData(projects[currentIndex]);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentIndex]);

  useEffect(() => {
    function handleResize() {
      if (laptopScreenRef.current) {
        const containerWidth = laptopScreenRef.current.offsetWidth;
        const containerHeight = laptopScreenRef.current.offsetHeight;
        const scaleW = containerWidth / 1440;
        const scaleH = containerHeight / 900;
        setIframeScale(Math.min(scaleW, scaleH));
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTransition = (dir: 'next' | 'prev') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setDirection(dir);

    setTimeout(() => {
      if (dir === 'next') {
        setCurrentIndex(prevIndex => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
      } else {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
      }

      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 800);
    }, 400);
  };

  const handlePrev = () => handleTransition('prev');
  const handleNext = () => handleTransition('next');

  return (
    <section
      id="projects"
      className={`section ${styles.projects} ${
        isVisible ? styles.visible : ''
      } ${isTransitioning ? styles.transitioning : ''} ${
        direction ? styles[`slide-${direction}`] : ''
      }`}
      ref={containerRef}
    >
      <div className={styles.projectDisplay}>
        <div className={styles.infoColumn}>
          <h3 data-number={`0${currentIndex + 1}`}>{currentProjectData.title}</h3>

          <div className={styles.projectDescription}>
            <p>{currentProjectData.description}</p>
          </div>

          <div className={styles.skills}>
            <strong>Technologies</strong>
            <ul>
              {currentProjectData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={styles.navigation}>
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              disabled={isTransitioning}
              className={isTransitioning ? styles.disabled : ''}
            >
              <FaArrowLeft />
            </button>
            <span>{`${currentIndex + 1} / ${projects.length}`}</span>
            <button
              onClick={handleNext}
              aria-label="Next project"
              disabled={isTransitioning}
              className={isTransitioning ? styles.disabled : ''}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className={styles.previewColumn}>
          <div className={styles.monitorPreview}>
            <div className={styles.monitorScreen} ref={laptopScreenRef}>
              <div className={styles.iframeWrapper}>
                {currentProjectData.liveUrl && currentProjectData.liveUrl !== '' ? (
                  <iframe
                    key={`laptop-${currentProjectData.id}`}
                    src={currentProjectData.liveUrl}
                    title={`${currentProjectData.title} - Monitor Preview`}
                    loading="lazy"
                    style={{
                      width: 1440,
                      height: 900,
                      border: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: `scale(${iframeScale})`,
                      transformOrigin: 'top left',
                      pointerEvents: 'auto',
                      background: '#fff',
                    }}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <div className={styles.devPlaceholder}>
                    <div>In development</div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.monitorLegRight}></div>
          </div>
          {currentProjectData.liveUrl && currentProjectData.liveUrl !== '' ? (
            <a
              href={currentProjectData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectButton}
            >
              <span>See the project</span>
              <FaExternalLinkAlt />
            </a>
          ) : (
            <button className={`${styles.projectButton} ${styles.inactiveButton}`} disabled>
              <span>In development</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
