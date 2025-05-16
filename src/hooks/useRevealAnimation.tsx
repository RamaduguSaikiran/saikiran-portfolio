import { useEffect, useRef } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export const useRevealAnimation = ({
  threshold = 0.1,
  rootMargin = '-50px 0px',
  staggerChildren = true,
  staggerDelay = 0.15
}: RevealOptions = {}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all animated elements
            const elements = entry.target.querySelectorAll('[data-animate]');
            
            // Animate each element with a staggered delay
            elements.forEach((el, index) => {
              const delay = staggerChildren ? index * staggerDelay : 0;
              (el as HTMLElement).style.transitionDelay = `${delay}s`;
              el.classList.add('animate-reveal');
              el.classList.remove('opacity-0', 'translate-y-8');
            });
          } else {
            // Reset animations when out of view
            const elements = entry.target.querySelectorAll('[data-animate]');
            elements.forEach((el) => {
              (el as HTMLElement).style.transitionDelay = '0s';
              el.classList.remove('animate-reveal');
              el.classList.add('opacity-0', 'translate-y-8');
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [staggerChildren, staggerDelay]);

  return sectionRef;
}; 