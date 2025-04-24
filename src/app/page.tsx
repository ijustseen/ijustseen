"use client"; // Добавляем директиву, так как будем использовать хуки для индикатора

import React, { useRef, useState, useEffect } from "react";

// Импортируем реальные компоненты
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

// Определяем секции на английском
const sections = [
  { id: "hero", name: "Welcome" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "contact", name: "Contact" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current, // Используем контейнер как root
      rootMargin: "0px",
      threshold: 0.5, // Считаем секцию видимой, если видно 50%
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex((sec) => sec.id === entry.target.id);
          if (index !== -1) {
            setCurrentSectionIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Наблюдаем за каждой секцией
    const sectionElements = containerRef.current?.querySelectorAll(".section");
    if (sectionElements) {
      sectionElements.forEach((sec) => observer.observe(sec));
    }

    // Очистка при размонтировании компонента
    return () => {
      if (sectionElements) {
        sectionElements.forEach((sec) => observer.unobserve(sec));
      }
    };
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился один раз

  return (
    <div ref={containerRef} className="page-container">
      {/* Отображаем реальные компоненты */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      {/* Передаем данные в индикатор */}
      <ScrollIndicator
        sections={sections}
        currentSectionIndex={currentSectionIndex}
      />
    </div>
  );
}
