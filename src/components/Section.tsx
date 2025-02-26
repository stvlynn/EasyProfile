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
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const atTop = scrollTop <= 5;
      
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
    if (containerRef.current && (e.currentTarget as any).touchStartY !== undefined) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const atTop = scrollTop <= 5;
      
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const startY = (e.currentTarget as any).touchStartY;
      const deltaY = startY - currentY;
      
      if (deltaY > 0) {
        if (!atBottom) {
          e.stopPropagation();
        }
      } else if (deltaY < 0) {
        if (!atTop) {
          e.stopPropagation();
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (containerRef.current) {
      (containerRef.current as any).touchStartY = undefined;
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="container mx-auto px-4 py-20 relative max-h-[80vh] overflow-y-auto scrollbar-hidden"
      >
        {children}
      </div>
    </motion.section>
  );
}