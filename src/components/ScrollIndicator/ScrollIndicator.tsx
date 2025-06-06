import React, { useEffect, useRef } from 'react';
import styles from './ScrollIndicator.module.scss';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SectionId, SectionName } from '@/constants/sections';

interface Section {
  readonly id: SectionId;
  readonly name: SectionName;
}

interface ScrollIndicatorProps {
  sections: readonly Section[];
  currentSectionIndex: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
  currentSectionIndex,
}) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const container = indicatorRef.current;
    if (!container || sections.length === 0) return;

    const dotWrappers = container.querySelectorAll<HTMLDivElement>(
      `.${styles.dotWrapper}`
    );
    if (dotWrappers.length !== sections.length) return;

    let activeLineHeight = 0;
    const containerHeight = window.innerHeight;

    if (currentSectionIndex >= 0 && currentSectionIndex < sections.length) {
      if (currentSectionIndex === sections.length - 1) {
        activeLineHeight = containerHeight;
      } else {
        const targetWrapper = dotWrappers[currentSectionIndex];
        if (targetWrapper) {
          const rect = targetWrapper.getBoundingClientRect();
          const targetCenterY = rect.top + rect.height / 2;
          activeLineHeight = Math.max(0, targetCenterY);
        }
      }
    }
    container.style.setProperty('--active-line-height', `${activeLineHeight}px`);
  }, [currentSectionIndex, sections.length, isMobile]);

  if (isMobile) return null;

  return (
    <div ref={indicatorRef} className={styles.indicatorContainer}>
      {sections.map((section, index) => (
        <div key={section.id} className={styles.dotWrapper}>
          {index === currentSectionIndex ? (
            <a
              href={`#${section.id}`}
              className={styles.currentSectionText}
              aria-current="step"
            >
              {section.name}
            </a>
          ) : (
            <a
              href={`#${section.id}`}
              className={`${styles.dot} ${
                index < currentSectionIndex ? styles.active : ''
              }`}
              aria-label={`Перейти к секции ${section.name}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollIndicator;
