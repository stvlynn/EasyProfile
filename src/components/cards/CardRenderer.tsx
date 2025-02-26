import React from 'react';
import { AnyCard, CardType } from '../../types/profile';
import { LinkCard } from './LinkCard';
import { GithubCard } from './GithubCard';
import { MapCard } from './MapCard';
import { TwitterCard } from './TwitterCard';
import { BentoCard } from './BentoCard';
import { MessageSquare, Image, Bookmark } from 'lucide-react';

interface CardRendererProps {
  card: AnyCard;
}

export const CardRenderer: React.FC<CardRendererProps> = ({ card }) => {
  switch (card.type) {
    case CardType.LINK:
      return <LinkCard card={card} />;
    
    case CardType.GITHUB:
      return <GithubCard card={card} />;
    
    case CardType.MAP:
      return <MapCard card={card} />;
    
    case CardType.TWITTER:
      return <TwitterCard card={card} />;
    
    // 对于其他类型的卡片，可以根据需要添加
    case CardType.TEXT:
      return (
        <BentoCard card={card}>
          <div className="w-full h-full bg-[#111] rounded-2xl overflow-hidden">
            <div className="w-full h-full p-4 flex flex-col">
              <div className="flex items-center mb-3">
                <MessageSquare size={20} className="text-white mr-2" />
                <h3 className="text-lg font-medium text-white">
                  {card.title || 'Note'}
                </h3>
              </div>
              
              <p className="text-white text-sm flex-1 overflow-hidden">
                {(card as any).content}
              </p>
            </div>
          </div>
        </BentoCard>
      );
    
    case CardType.IMAGE:
      return (
        <BentoCard card={card}>
          <div className="w-full h-full bg-[#111] rounded-2xl overflow-hidden relative">
            <img 
              src={(card as any).imageUrl} 
              alt={(card as any).alt || card.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {card.title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center">
                  <Image size={18} className="text-white mr-2 opacity-80" />
                  <h3 className="text-white font-medium">{card.title}</h3>
                </div>
              </div>
            )}
          </div>
        </BentoCard>
      );
    
    case CardType.MASTODON:
      return (
        <BentoCard card={card}>
          <div className="w-full h-full bg-[#111] rounded-2xl overflow-hidden">
            <div className="w-full h-full p-4 flex flex-col">
              <h3 className="text-lg font-medium text-white mb-2">{card.title || 'Mastodon'}</h3>
              <p className="text-sm text-gray-300">
                @{(card as any).username}@{(card as any).instance}
              </p>
            </div>
          </div>
        </BentoCard>
      );
    
    default:
      // 默认卡片
      return (
        <BentoCard card={card}>
          <div className="w-full h-full bg-[#111] rounded-2xl overflow-hidden">
            <div className="w-full h-full p-4 flex flex-col justify-center items-center">
              <Bookmark size={24} className="text-white mb-3 opacity-70" />
              <h3 className="text-lg font-medium text-white text-center">{card.title || 'Card'}</h3>
              {(card as any).content && (
                <p className="text-sm text-gray-300 text-center mt-2">
                  {(card as any).content}
                </p>
              )}
            </div>
          </div>
        </BentoCard>
      );
  }
}; 