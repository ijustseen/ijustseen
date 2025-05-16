import { useRef, useState, useEffect } from 'react';

interface Section {
  readonly id: string;
  readonly name: string;
}

export const useSectionObserver = (sections: readonly Section[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.5,
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

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionElements = containerRef.current?.querySelectorAll('.section');
    if (sectionElements) {
      sectionElements.forEach((sec) => observer.observe(sec));
    }

    return () => {
      if (sectionElements) {
        sectionElements.forEach((sec) => observer.unobserve(sec));
      }
    };
  }, [sections]);

  return { containerRef, currentSectionIndex };
}; 