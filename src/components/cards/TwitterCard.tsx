import React, { useEffect, useState } from 'react';
import { Twitter } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { TwitterCard as TwitterCardType } from '../../types/profile';

interface TwitterCardProps {
  card: TwitterCardType;
}

interface TwitterProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isLoading: boolean;
}

export const TwitterCard: React.FC<TwitterCardProps> = ({ card }) => {
  const [profile, setProfile] = useState<TwitterProfile>({
    name: card.title || card.username,
    username: card.username,
    avatar: `https://unavatar.io/twitter/${card.username}`,
    bio: 'Follow me on Twitter for updates.',
    isLoading: true
  });

  // 模拟加载Twitter个人资料
  useEffect(() => {
    // 在实际项目中，你应该使用Twitter API获取用户资料
    // 这里只是模拟一些示例数据
    const fakeTwitterProfiles: Record<string, Partial<TwitterProfile>> = {
      'stvlynn': {
        name: 'Steven Lynn',
        bio: 'Follow me on Twitter for updates.',
        avatar: '/avatar.jpg'
      },
      'default': {
        name: 'Twitter User',
        bio: 'Twitter bio default text',
        avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
      }
    };

    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const userProfile = fakeTwitterProfiles[card.username] || fakeTwitterProfiles.default;
      setProfile({
        name: userProfile.name || card.title || card.username,
        username: card.username,
        avatar: userProfile.avatar || `https://unavatar.io/twitter/${card.username}`,
        bio: userProfile.bio || 'Follow me on Twitter for updates.',
        isLoading: false
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [card.username, card.title]);

  return (
    <BentoCard card={card}>
      <div className="w-full h-full flex flex-col bg-[#15202b] rounded-2xl overflow-hidden">
        {/* 顶部Twitter图标 */}
        <div className="p-4 flex items-center gap-2">
          <Twitter size={20} className="text-[#1d9bf0]" />
          <span className="text-white text-sm font-semibold">Twitter</span>
        </div>
        
        {/* 用户信息 */}
        <div className="px-4 pb-4 flex-1 flex flex-col">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
              <img 
                src={profile.avatar}
                alt={profile.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-base truncate">
                {profile.name}
              </h3>
              <p className="text-gray-400 text-sm">
                @{profile.username}
              </p>
            </div>
          </div>
          
          {/* 用户简介 */}
          <p className="text-white text-sm mt-3 mb-auto">
            {profile.bio}
          </p>
          
          {/* 底部按钮 */}
          <div className="mt-4 flex justify-between items-center">
            <a
              href={`https://twitter.com/${card.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#1d9bf0] hover:underline"
            >
              View Profile
            </a>
            
            <button className="bg-[#1d9bf0] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}; 