import { motion } from 'framer-motion';
import { cardVariants } from '../utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative overflow-hidden
        bg-gray-800/30 backdrop-blur-md rounded-2xl p-8
        border border-gray-700/50
        shadow-[0_0_15px_rgba(0,0,0,0.1)]
        before:absolute before:inset-0
        before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-blue-500/10
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
        ${className}`}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}