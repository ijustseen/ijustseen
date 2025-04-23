import React, { useEffect, useRef } from "react";
import styles from "./ScrollIndicator.module.scss";

interface ScrollIndicatorProps {
  sections: { id: string; name: string }[];
  currentSectionIndex: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
  currentSectionIndex,
}) => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = indicatorRef.current;
    if (!container || sections.length === 0) return;

    const dotWrappers = container.querySelectorAll<HTMLDivElement>(
      `.${styles.dotWrapper}`
    );
    if (dotWrappers.length !== sections.length) return;

    const containerPaddingTop = 25;
    const containerPaddingBottom = 25;
    const totalPadding = containerPaddingTop + containerPaddingBottom;

    let activeLineHeight = 0;
    const containerHeight = container.offsetHeight;

    if (currentSectionIndex >= 0 && currentSectionIndex < sections.length) {
      if (currentSectionIndex === sections.length - 1) {
        activeLineHeight = containerHeight - totalPadding;
      } else {
        const targetWrapper = dotWrappers[currentSectionIndex];
        if (targetWrapper) {
          const targetCenterY =
            targetWrapper.offsetTop + targetWrapper.offsetHeight / 2;
          activeLineHeight = Math.max(0, targetCenterY - containerPaddingTop);
        }
      }
    }
    container.style.setProperty(
      "--active-line-height",
      `${activeLineHeight}px`
    );
  }, [currentSectionIndex, sections.length]);

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
                index < currentSectionIndex ? styles.active : ""
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
