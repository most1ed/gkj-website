import React, { useRef } from 'react';
import { motion, useScroll, useInView, useSpring } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  once?: boolean;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  threshold = 0.2,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '-20% 0px',
    amount: threshold,
  });

  const getInitialAnimation = () => {
    switch (animation) {
      case 'fade':
        return { opacity: 0 };
      case 'slide':
        switch (direction) {
          case 'up':
            return { opacity: 0, y: 50 };
          case 'down':
            return { opacity: 0, y: -50 };
          case 'left':
            return { opacity: 0, x: 50 };
          case 'right':
            return { opacity: 0, x: -50 };
          default:
            return { opacity: 0, y: 50 };
        }
      case 'scale':
        return { opacity: 0, scale: 0.9 };
      default:
        return {};
    }
  };

  const getFinalAnimation = () => {
    switch (animation) {
      case 'fade':
        return { opacity: 1 };
      case 'slide':
        switch (direction) {
          case 'up':
          case 'down':
            return { opacity: 1, y: 0 };
          case 'left':
          case 'right':
            return { opacity: 1, x: 0 };
          default:
            return { opacity: 1, y: 0 };
        }
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialAnimation()}
      animate={isInView ? getFinalAnimation() : getInitialAnimation()}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Progress bar component
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="relative top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// Page wrapper with scroll progress
export const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </>
  );
};
