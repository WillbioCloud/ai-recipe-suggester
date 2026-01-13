import React, { useRef, useEffect, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Add style prop to allow passing inline styles for transition delays.
  style?: React.CSSProperties;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, className = '', style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to trigger this once
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-animate ${isVisible ? 'is-visible' : ''} ${className}`}
      // FIX: Apply the passed style prop to the div element.
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
