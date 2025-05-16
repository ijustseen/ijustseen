"use client"; // Добавляем директиву, так как будем использовать хуки для индикатора

import React from 'react';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Projects from '@/components/Projects/Projects';
import Contact from '@/components/Contact/Contact';
import ScrollIndicator from '@/components/ScrollIndicator/ScrollIndicator';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { SECTIONS } from '@/constants/sections';

export default function Home() {
  const { containerRef, currentSectionIndex } = useSectionObserver(SECTIONS);

  return (
    <div ref={containerRef} className="page-container">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <ScrollIndicator
        sections={SECTIONS}
        currentSectionIndex={currentSectionIndex}
      />
    </div>
  );
}
