import React from 'react';
import { AnyCard } from '../types/profile';
import { CardRenderer } from './cards/CardRenderer';

interface BentoGridProps {
  cards: AnyCard[];
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ cards, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full max-w-6xl mx-auto ${className}`}>
      {cards.map((card) => (
        <CardRenderer key={card.id} card={card} />
      ))}
    </div>
  );
}; 