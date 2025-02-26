import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { LinkCard as LinkCardType } from '../../types/profile';

interface LinkCardProps {
  card: LinkCardType;
}

export const LinkCard: React.FC<LinkCardProps> = ({ card }) => {
  const [metadata, setMetadata] = useState({
    title: card.metaTitle || '',
    description: card.metaDescription || '',
    image: card.image || ''
  });

  // 模拟获取链接元数据
  // 实际项目中，你可能需要一个后端服务来抓取这些元数据
  useEffect(() => {
    if (!card.metaTitle && !card.metaDescription) {
      // 这里可以调用API获取链接元数据
      // 现在我们只是使用卡片中提供的数据
      setMetadata({
        title: card.title || new URL(card.url).hostname,
        description: card.description || '',
        image: card.image || ''
      });
    }
  }, [card]);

  return (
    <BentoCard card={card}>
      <a 
        href={card.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-full p-4 bg-[#111]"
      >
        <div className="flex flex-col h-full">
          {metadata.image && (
            <div className="mb-3 w-full h-32 overflow-hidden rounded-lg">
              <img 
                src={metadata.image} 
                alt={metadata.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          
          <div className={metadata.image ? "flex-1" : "flex items-center justify-center flex-1"}>
            <h3 className="text-lg font-medium text-white mb-1 group-hover:text-gray-300 transition-colors duration-300 flex items-center">
              {metadata.title}
              <ExternalLink size={16} className="ml-2 opacity-70" />
            </h3>
            
            {metadata.description && (
              <p className="text-sm text-gray-300">{metadata.description}</p>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            {new URL(card.url).hostname}
          </div>
        </div>
      </a>
    </BentoCard>
  );
}; 