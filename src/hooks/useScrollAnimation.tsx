import { useEffect, useRef } from 'react';

type AnimationOptions = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  animationClass?: string;
};

export function useScrollAnimation(options: AnimationOptions = {}) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    animationClass = 'animate-fade-in',
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animation class when element comes into view
            entry.target.classList.add(animationClass);
          }
        });
      },
      { threshold, root, rootMargin }
    );

    const currentRef = ref.current;
    
    // Observe all elements with animation-on-scroll class inside the referenced element
    const elements = currentRef?.querySelectorAll('.animate-on-scroll');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    // Clean up
    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [threshold, root, rootMargin, animationClass]);

  return ref;
} 