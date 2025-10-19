'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Skills.module.scss';
import {
  FaReact,
  FaNodeJs,
  FaCode,
  FaGithub,
  FaServer,
  FaTools,
  FaMobileAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGraphql,
  SiHtml5,
  SiCss3,
  SiSass,
} from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

// Определяем типы для лучшей типизации
interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  level: number; // 1-5 для уровня навыка
  description: string;
  color: string;
}

const skillsListInitial: Skill[] = [
  {
    name: 'React',
    icon: <FaReact />,
    category: 'frontend',
    level: 5,
    description: 'Advanced React development with hooks, context, and performance optimization',
    color: '#61DAFB',
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs />,
    category: 'frontend',
    level: 4,
    description: 'Server-side rendering, static generation, and API routes',
    color: '#A040FF',
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
    category: 'language',
    level: 4,
    description: 'Type-safe development and advanced type features',
    color: '#61DAFB',
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript />,
    category: 'language',
    level: 4,
    description: 'Modern ES6+ features and functional programming',
    color: '#A040FF',
  },
  {
    name: 'HTML5',
    icon: <SiHtml5 />,
    category: 'frontend',
    level: 5,
    description: 'Semantic markup and accessibility',
    color: '#61DAFB',
  },
  {
    name: 'CSS3',
    icon: <SiCss3 />,
    category: 'frontend',
    level: 5,
    description: 'Advanced styling, animations, and responsive design',
    color: '#A040FF',
  },
  {
    name: 'SCSS',
    icon: <SiSass />,
    category: 'frontend',
    level: 5,
    description: 'CSS preprocessing and modular styling',
    color: '#61DAFB',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss />,
    category: 'frontend',
    level: 3,
    description: 'Utility-first CSS framework and custom configurations',
    color: '#A040FF',
  },
  {
    name: 'React Native',
    icon: <FaMobileAlt />,
    category: 'mobile',
    level: 3,
    description: 'Cross-platform mobile development',
    color: '#61DAFB',
  },
  {
    name: 'Node.js',
    icon: <FaNodeJs />,
    category: 'backend',
    level: 4,
    description: 'Server-side JavaScript and API development',
    color: '#A040FF',
  },
  {
    name: 'REST API',
    icon: <FaServer />,
    category: 'backend',
    level: 4,
    description: 'API design and implementation',
    color: '#61DAFB',
  },
  {
    name: 'GraphQL',
    icon: <SiGraphql />,
    category: 'backend',
    level: 3,
    description: 'GraphQL schema design and implementation',
    color: '#A040FF',
  },
  {
    name: 'Authentication',
    icon: <FaShieldAlt />,
    category: 'security',
    level: 4,
    description: 'JWT, OAuth, and secure authentication flows',
    color: '#61DAFB',
  },
  {
    name: 'Git',
    icon: <FaCode />,
    category: 'tools',
    level: 4,
    description: 'Version control and collaboration',
    color: '#A040FF',
  },
  {
    name: 'GitHub',
    icon: <FaGithub />,
    category: 'tools',
    level: 4,
    description: 'Project management and collaboration',
    color: '#61DAFB',
  },
  {
    name: 'Dev Tools',
    icon: <FaTools />,
    category: 'tools',
    level: 4,
    description: 'Browser dev tools and debugging',
    color: '#A040FF',
  },
  {
    name: 'Architecture',
    icon: <FaServer />,
    category: 'concept',
    level: 3,
    description: 'System design and architecture patterns',
    color: '#61DAFB',
  },
  {
    name: 'UI/UX',
    icon: <FaCode />,
    category: 'concept',
    level: 2,
    description: 'User interface and experience design',
    color: '#A040FF',
  },
  {
    name: 'Agile',
    icon: <FaCode />,
    category: 'concept',
    level: 4,
    description: 'Agile methodologies and project management',
    color: '#61DAFB',
  },
];

const Skills = () => {
  const [skills] = useState<Skill[]>(skillsListInitial);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [glowingSkillIndex, setGlowingSkillIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * skills.length);
      setGlowingSkillIndex(randomIndex);
    }, 2000); // Меняем каждые 2 секунды

    return () => clearInterval(interval);
  }, [skills.length]);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const renderSkillLevel = (level: number) => (
    <div className={styles.skillLevel}>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={`${styles.levelDot} ${index < level ? styles.active : ''}`} />
      ))}
    </div>
  );

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${styles.skillCard} ${glowingSkillIndex === index ? styles.glowing : ''}`}
              onClick={() => handleSkillClick(skill)}
              style={{ '--skill-color': skill.color } as React.CSSProperties}
            >
              <div className={styles.skillIcon}>{skill.icon}</div>
              <h3 className={styles.skillName}>{skill.name}</h3>
              {renderSkillLevel(skill.level)}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.skillDetail}
              onClick={() => setSelectedSkill(null)}
            >
              <div className={styles.skillDetailContent}>
                <div className={styles.skillDetailHeader}>
                  <div className={styles.skillDetailIcon}>{selectedSkill.icon}</div>
                  <h3>{selectedSkill.name}</h3>
                </div>
                <p>{selectedSkill.description}</p>
                <div className={styles.skillDetailLevel}>
                  <span>Expertise Level:</span>
                  {renderSkillLevel(selectedSkill.level)}
                </div>
                <button className={styles.closeButton} onClick={() => setSelectedSkill(null)}>
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
