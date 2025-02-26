import React from 'react';
import { Github } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { GithubCard as GithubCardType } from '../../types/profile';

interface GithubCardProps {
  card: GithubCardType;
}

// 模拟GitHub贡献数据
const generateContributionData = () => {
  const weeks = 26; // 半年的贡献
  const daysPerWeek = 7;
  const data = [];
  
  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < daysPerWeek; j++) {
      // 0-4的随机贡献级别
      week.push(Math.floor(Math.random() * 5));
    }
    data.push(week);
  }
  
  return data;
};

// 获取贡献级别对应的颜色
const getContributionColor = (level: number) => {
  switch(level) {
    case 0: return 'bg-gray-800';
    case 1: return 'bg-green-900';
    case 2: return 'bg-green-700';
    case 3: return 'bg-green-500';
    case 4: return 'bg-green-300';
    default: return 'bg-gray-800';
  }
};

export const GithubCard: React.FC<GithubCardProps> = ({ card }) => {
  const contributionData = generateContributionData();
  
  return (
    <BentoCard card={card}>
      <div className="block w-full h-full bg-[#111] rounded-2xl overflow-hidden">
        <a 
          href={`https://github.com/${card.username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-full p-4"
        >
          <div className="flex items-center mb-3">
            <Github size={20} className="text-white mr-2" />
            <h3 className="text-lg font-medium text-white group-hover:text-gray-300 transition-colors duration-300">
              {card.title || 'GitHub'}
            </h3>
          </div>
          
          {/* GitHub贡献墙 */}
          <div className="overflow-hidden py-2">
            <div className="flex flex-wrap justify-center gap-[2px]">
              {contributionData.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="flex flex-col gap-[2px]">
                  {week.map((day, dayIndex) => (
                    <div 
                      key={`day-${weekIndex}-${dayIndex}`} 
                      className={`${getContributionColor(day)} w-[8px] h-[8px] rounded-sm 
                        transform scale-95 group-hover:scale-100 transition-all
                        duration-300 opacity-90 group-hover:opacity-100`}
                      title={`${day} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            github.com/{card.username}
          </div>
        </a>
      </div>
    </BentoCard>
  );
}; 