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
    bio: card.description || 'Follow me on Twitter for updates.',
    isLoading: true
  });
  const [avatarError, setAvatarError] = useState(false);

  // 模拟加载Twitter个人资料
  useEffect(() => {
    // 在实际项目中，你应该使用Twitter API获取用户资料
    // 这里只是模拟一些示例数据
    const fakeTwitterProfiles: Record<string, Partial<TwitterProfile>> = {
      'stv_lynn': {
        name: 'Steven Lynn',
        bio: 'AI Developer & Amateur Landscape Photographer. Building with passion.',
        avatar: '/avatar.jpg'
      },
      'stvlynn': {
        name: 'Steven Lynn',
        bio: 'AI Developer & Amateur Landscape Photographer. Building with passion.',
        avatar: '/avatar.jpg'
      },
      'default': {
        name: card.title || 'Twitter User',
        bio: card.description || 'Follow me on Twitter for updates.',
        avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
      }
    };

    // 尝试多个头像源
    const getAvatarUrl = (username: string) => {
      const sources = [
        `/avatar.jpg`, // 本地头像优先
        `https://unavatar.io/twitter/${username}`,
        `https://github.com/${username}.png`, // GitHub fallback
        'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png' // 默认
      ];
      return sources[0]; // 先尝试本地头像
    };

    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const userProfile = fakeTwitterProfiles[card.username] || fakeTwitterProfiles.default;
      setProfile({
        name: userProfile.name || card.title || card.username,
        username: card.username,
        avatar: userProfile.avatar || getAvatarUrl(card.username),
        bio: userProfile.bio || card.description || 'Follow me on Twitter for updates.',
        isLoading: false
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [card.username, card.title, card.description]);

  const handleAvatarError = () => {
    if (!avatarError) {
      setAvatarError(true);
      // 尝试备用头像源
      const fallbackAvatars = [
        `https://unavatar.io/twitter/${card.username}`,
        `https://github.com/${card.username}.png`,
        'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
      ];
      
      setProfile(prev => ({
        ...prev,
        avatar: fallbackAvatars[0]
      }));
    }
  };

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
          {profile.isLoading ? (
            // 加载状态
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-20"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img 
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                  onError={handleAvatarError}
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
          )}
          
          {/* 用户简介 */}
          {profile.isLoading ? (
            <div className="mt-3 mb-auto space-y-2">
              <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4"></div>
            </div>
          ) : (
            <p className="text-white text-sm mt-3 mb-auto">
              {profile.bio}
            </p>
          )}
          
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