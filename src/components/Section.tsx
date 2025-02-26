import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { ReactNode, useRef } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight;
      const atTop = scrollTop === 0;
      // If scrolling down and not at bottom, prevent section scroll
      if (e.deltaY > 0 && !atBottom) {
        e.stopPropagation();
      } else if (e.deltaY < 0 && !atTop) {
        e.stopPropagation();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current) {
      (e.currentTarget as any).touchStartY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight;
      const atTop = scrollTop === 0;
      
      const touch = e.touches[0];
      const deltaY = touch.clientY - (e.currentTarget as any).touchStartY || 0;
      
      if (deltaY < 0 && !atBottom) {
        e.stopPropagation();
      } else if (deltaY > 0 && !atTop) {
        e.stopPropagation();
      }
      
      (e.currentTarget as any).touchStartY = touch.clientY;
    }
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={`min-h-screen flex items-center justify-center ${className}`}
    >
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="container mx-auto px-4 py-20 relative max-h-[80vh] overflow-y-auto scrollbar-hidden"
      >
        {children}
      </div>
    </motion.section>
  );
}