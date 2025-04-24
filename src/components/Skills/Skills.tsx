"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Skills.module.scss";
import {
  FaReact,
  FaNodeJs,
  FaCode,
  FaGithub,
  FaServer,
  FaFilter,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGraphql,
} from "react-icons/si";

// Определяем типы для лучшей типизации
interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

interface SkillWithStyle extends Skill {
  randomOffset: number;
  animationDuration: string;
}

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [skillsWithStyles, setSkillsWithStyles] = useState<SkillWithStyle[]>(
    []
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

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

  // Определяем навыки с иконками для лучшей визуализации
  const skillsList: Skill[] = [
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

  // Получаем уникальные категории для фильтра
  const categories = [
    "all",
    ...Array.from(new Set(skillsList.map((skill) => skill.category))),
  ];

  // Функция для генерации случайного смещения
  const getRandomOffset = () => {
    return Math.floor(Math.random() * 20) - 10; // от -10 до 10
  };

  // Добавляем стили к навыкам только на клиенте, чтобы избежать проблем с гидратацией
  useEffect(() => {
    const skillsWithRandomStyles = skillsList.map((skill) => ({
      ...skill,
      randomOffset: getRandomOffset(),
      animationDuration: `${8 + getRandomOffset() / 5}s, 3s`,
    }));

    setSkillsWithStyles(skillsWithRandomStyles);
  }, []);

  // Функция для фильтрации навыков по категории
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return skillsWithStyles;
    }
    return skillsWithStyles.filter(
      (skill) => skill.category === activeCategory
    );
  };

  // Красивое форматирование названий категорий
  const formatCategoryName = (category: string) => {
    if (category === "all") return "All Skills";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <section
      id="skills"
      className={`section ${styles.skills} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container} ref={containerRef}>
        <div className={styles.glowingHeading}>
          <h2>Skills & Expertise</h2>
          <p className={styles.sectionDescription}>
            A collection of technologies and concepts I work with
          </p>
        </div>

        <div className={styles.categoryFilter}>
          <div
            className={styles.categoryMenu}
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          >
            <span className={styles.activeCategory}>
              <FaFilter className={styles.filterIcon} />
              {formatCategoryName(activeCategory)}
            </span>
            {showCategoryMenu && (
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={
                      category === activeCategory ? styles.activeItem : ""
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(category);
                      setShowCategoryMenu(false);
                    }}
                  >
                    {formatCategoryName(category)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.skillsWrapper}>
          <div
            className={`${styles.skillsContainer} ${
              isHovered ? styles.hovered : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ul>
              {skillsWithStyles.length > 0
                ? getFilteredSkills().map((skill) => (
                    <li
                      key={skill.name}
                      className={`${styles[`category-${skill.category}`]}`}
                      style={
                        {
                          "--random-offset": `${skill.randomOffset}px`,
                          animationDuration: skill.animationDuration,
                        } as React.CSSProperties
                      }
                    >
                      <span className={styles.skillIcon}>{skill.icon}</span>
                      <span className={styles.skillName}>{skill.name}</span>
                    </li>
                  ))
                : // Пока клиентский код не выполнился, отображаем статичные элементы
                  skillsList
                    .filter(
                      (skill) =>
                        activeCategory === "all" ||
                        skill.category === activeCategory
                    )
                    .map((skill) => (
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

export default Skills;
