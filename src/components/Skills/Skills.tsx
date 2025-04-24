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
  FaTools,
  FaMobileAlt,
  FaShieldAlt,
  FaBrain,
  FaDocker,
  FaPython,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGraphql,
  SiHtml5,
  SiCss3,
  SiSass,
  SiRedux,
} from "react-icons/si";

// Определяем типы для лучшей типизации
interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  level: number; // 1-5 для уровня навыка
  description: string;
}

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

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

  // Определяем навыки с иконками, уровнем и описанием
  const skillsList: Skill[] = [
    {
      name: "React",
      icon: <FaReact />,
      category: "frontend",
      level: 5,
      description: "Components creation, hooks, state management",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs />,
      category: "frontend",
      level: 4,
      description: "SSR, SSG, API routes, image optimization",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
      category: "language",
      level: 4,
      description: "Type safety, interfaces, generics, utility types",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
      category: "language",
      level: 5,
      description: "ES6+, asynchronous programming, closures, prototypes",
    },
    {
      name: "HTML5",
      icon: <SiHtml5 />,
      category: "frontend",
      level: 5,
      description: "Semantic markup, accessibility, SEO",
    },
    {
      name: "CSS3",
      icon: <SiCss3 />,
      category: "frontend",
      level: 5,
      description: "Flexbox, grid, animations, responsive design",
    },
    {
      name: "SCSS",
      icon: <SiSass />,
      category: "frontend",
      level: 4,
      description: "Variables, mixins, nesting, modules",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      category: "frontend",
      level: 4,
      description: "Utility classes, customization, optimization",
    },
    {
      name: "React Native",
      icon: <FaMobileAlt />,
      category: "mobile",
      level: 3,
      description: "Cross-platform development, device API integration",
    },
    {
      name: "Node.js",
      icon: <FaNodeJs />,
      category: "backend",
      level: 4,
      description: "Express, middleware, REST API, authentication",
    },
    {
      name: "REST API",
      icon: <FaServer />,
      category: "backend",
      level: 4,
      description: "Endpoint design, validation, documentation",
    },
    {
      name: "GraphQL",
      icon: <SiGraphql />,
      category: "backend",
      level: 3,
      description: "Schemas, resolvers, queries, mutations",
    },
    {
      name: "Authentication",
      icon: <FaShieldAlt />,
      category: "security",
      level: 4,
      description: "JWT, OAuth, secure data storage",
    },
    {
      name: "Git",
      icon: <FaCode />,
      category: "tools",
      level: 4,
      description: "Branching, merging, CI/CD, team collaboration",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      category: "tools",
      level: 4,
      description: "Issues, PR, Actions, Pages",
    },
    {
      name: "Dev Tools",
      icon: <FaTools />,
      category: "tools",
      level: 4,
      description: "VS Code, npm, ESLint, Prettier, DevTools",
    },
    {
      name: "Architecture",
      icon: <FaServer />,
      category: "concept",
      level: 4,
      description: "Scalability, modularity, DRY, SOLID principles",
    },
    {
      name: "UI/UX",
      icon: <FaCode />,
      category: "concept",
      level: 4,
      description: "Usability, interfaces, user experience",
    },
    {
      name: "Agile",
      icon: <FaCode />,
      category: "concept",
      level: 3,
      description: "Scrum, Kanban, iterative development",
    },
    {
      name: "Algorithms",
      icon: <FaBrain />,
      category: "concept",
      level: 3,
      description: "Data structures, optimization, problem solving",
    },
    {
      name: "Python",
      icon: <FaPython />,
      category: "language",
      level: 4,
      description: "Automation, data analysis, web development, scripting",
    },
    {
      name: "Redux",
      icon: <SiRedux />,
      category: "frontend",
      level: 4,
      description: "State management, middleware, async actions",
    },
    {
      name: "Docker",
      icon: <FaDocker />,
      category: "tools",
      level: 3,
      description: "Containerization, Docker Compose, orchestration",
    },
    {
      name: "Machine Learning",
      icon: <FaBrain />,
      category: "data",
      level: 3,
      description: "Basics, neural networks, data modeling, TensorFlow",
    },
  ];

  // Функция для фильтрации навыков по категории
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return skillsList;
    }
    return skillsList.filter((skill) => skill.category === activeCategory);
  };

  // Определение динамического класса анимации на основе количества элементов
  const getAnimationClass = () => {
    const filteredItems = getFilteredSkills();

    // Если выбрана категория и элементов мало, отключаем анимацию
    if (activeCategory !== "all" && filteredItems.length < 5) {
      return styles.noAnimation;
    }

    // Если много элементов, используем обычную анимацию
    return isHoveringCard ? styles.pauseAnimation : "";
  };

  // Расчет высоты контейнера в зависимости от количества элементов
  const getContainerStyle = () => {
    const filteredItems = getFilteredSkills();
    const itemsCount = filteredItems.length;

    // Если элементов мало, уменьшаем высоту
    if (activeCategory !== "all" && itemsCount < 5) {
      // Примерно 180px на один ряд (высота карточки) + отступы
      const rows = Math.ceil(itemsCount / 4); // Допустим, что в строке примерно 4 элемента
      return {
        height: `${Math.max(rows * 220, 250)}px`, // Минимальная высота 250px
      };
    }

    return {}; // Дефолтная высота через CSS
  };

  // Красивое форматирование названий категорий
  const formatCategoryName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      all: "All Skills",
      frontend: "Frontend",
      backend: "Backend",
      language: "Languages",
      tools: "Tools",
      concept: "Concepts",
      security: "Security",
      mobile: "Mobile Development",
      data: "Data Science",
    };

    return (
      categoryNames[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

  // Функция, возвращающая цвет для категории
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      frontend: "var(--accent-blue)",
      backend: "rgb(125, 211, 83)",
      language: "rgb(255, 153, 51)",
      tools: "var(--accent-purple)",
      concept: "var(--accent-purple)",
      security: "var(--accent-purple)",
      mobile: "var(--accent-blue)",
    };

    return colors[category] || "var(--accent-purple)";
  };

  // Отображение уровня навыка
  const renderSkillLevel = (level: number) => {
    return (
      <div className={styles.skillLevel}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.levelDot} ${
              index < level ? styles.active : ""
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="skills"
      className={`section ${styles.skills} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container} ref={containerRef}>
        <div className={styles.categoryFilter}>
          <div
            className={styles.categoryMenu}
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          >
            <div className={styles.activeCategory}>
              <FaFilter className={styles.filterIcon} />
              {formatCategoryName(activeCategory)}
            </div>
            {showCategoryMenu && (
              <ul className={styles.categoryList}>
                <li
                  className={activeCategory === "all" ? styles.activeItem : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCategory("all");
                    setShowCategoryMenu(false);
                  }}
                >
                  All Skills
                </li>
                {Array.from(
                  new Set(skillsList.map((skill) => skill.category))
                ).map((category) => (
                  <li
                    key={category}
                    className={
                      activeCategory === category ? styles.activeItem : ""
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

        <div className={styles.skillsGrid} style={getContainerStyle()}>
          <div
            className={`${styles.skillsInfiniteScroll} ${getAnimationClass()}`}
          >
            {getFilteredSkills().map((skill, index) => (
              <div
                className={`${styles.skillCard} category-${skill.category}`}
                key={`${skill.name}-${index}`}
                style={{ "--index": index } as React.CSSProperties}
                onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => setIsHoveringCard(false)}
              >
                <div className={styles.skillCardInner}>
                  <div
                    className={`${styles.cardFront} ${
                      styles[`category-${skill.category}`]
                    }`}
                  >
                    <div className={styles.skillIcon}>{skill.icon}</div>
                    <div className={styles.skillName}>{skill.name}</div>
                    <div className={styles.skillLevel}>
                      {renderSkillLevel(skill.level)}
                    </div>
                  </div>
                  <div
                    className={`${styles.cardBack} ${
                      styles[`category-${skill.category}`]
                    }`}
                  >
                    <h3>{skill.name}</h3>
                    <p>{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Дублируем элементы для бесконечной прокрутки только если анимация активна */}
            {activeCategory === "all" || getFilteredSkills().length >= 5
              ? getFilteredSkills().map((skill, index) => (
                  <div
                    className={`${styles.skillCard} category-${skill.category}`}
                    key={`${skill.name}-duplicate-${index}`}
                    style={{ "--index": index } as React.CSSProperties}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setIsHoveringCard(true)}
                    onMouseLeave={() => setIsHoveringCard(false)}
                  >
                    <div className={styles.skillCardInner}>
                      <div
                        className={`${styles.cardFront} ${
                          styles[`category-${skill.category}`]
                        }`}
                      >
                        <div className={styles.skillIcon}>{skill.icon}</div>
                        <div className={styles.skillName}>{skill.name}</div>
                        <div className={styles.skillLevel}>
                          {renderSkillLevel(skill.level)}
                        </div>
                      </div>
                      <div
                        className={`${styles.cardBack} ${
                          styles[`category-${skill.category}`]
                        }`}
                      >
                        <h3>{skill.name}</h3>
                        <p>{skill.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        {selectedSkill && (
          <div
            className={styles.skillDetailOverlay}
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className={styles.skillDetail}
              onClick={(e) => e.stopPropagation()}
              style={{
                borderColor: `${getCategoryColor(selectedSkill.category)}50`,
              }}
            >
              <span
                className={styles.skillDetailIcon}
                style={{ color: getCategoryColor(selectedSkill.category) }}
              >
                {selectedSkill.icon}
              </span>
              <h3>{selectedSkill.name}</h3>
              <div className={styles.skillDetailLevel}>
                <span>Level:</span>
                {renderSkillLevel(selectedSkill.level)}
              </div>
              <p>{selectedSkill.description}</p>
              <div
                className={styles.skillDetailCategory}
                style={{
                  backgroundColor: `${getCategoryColor(
                    selectedSkill.category
                  )}30`,
                }}
              >
                {formatCategoryName(selectedSkill.category)}
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedSkill(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
