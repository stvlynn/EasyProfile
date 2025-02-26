import React from 'react';
import { motion } from 'framer-motion';
import { BentoCard as BentoCardType, CardSize } from '../../types/profile';

interface BentoCardProps {
  card: BentoCardType;
  children: React.ReactNode;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ card, children, className = '' }) => {
  // 根据卡片尺寸确定类名
  const getSizeClass = (size?: CardSize) => {
    switch(size) {
      case CardSize.SMALL:
        return 'col-span-1 row-span-1';
      case CardSize.MEDIUM:
        return 'col-span-1 row-span-1 md:col-span-2';
      case CardSize.LARGE:
        return 'col-span-1 row-span-1 md:col-span-2 md:row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`
        ${getSizeClass(card.size)}
        ${card.gridArea ? `grid-area: ${card.gridArea}` : ''}
        ${className}
        relative overflow-hidden
        border border-gray-800 rounded-2xl
        transition-all duration-300 hover:translate-y-[-2px]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-gray-700
        group h-[200px] md:h-auto
      `}
      style={{ gridArea: card.gridArea }}
    >
      {children}
      
      {card.description && (
        <div className="absolute bottom-2 right-2 bg-gray-900/80 px-2 py-1 rounded-md text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {card.description}
        </div>
      )}
    </motion.div>
  );
}; 