import { useEffect, useRef, useState } from 'react';

function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  distance = 30,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const baseStyle = {
    transitionDelay: `${delay}ms`,
    '--sr-distance': `${distance}px`,
  };

  return (
    <div
      ref={ref}
      className={`sr sr--${direction} ${isVisible ? 'sr--visible' : ''} ${className}`}
      style={baseStyle}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
