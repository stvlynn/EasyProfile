/**
 * ProfileSection Component
 * 
 * Purpose: Displays personal profile information
 * 
 * Implementation:
 * - Renders profile picture, name, tagline and social links
 * - Implements responsive layout
 * - Adds hover effects and transitions
 * 
 * Technologies:
 * - React + TypeScript
 * - Tailwind CSS for styling
 * - Heroicons for social icons
 * 
 * Interaction:
 * - Receives profile data from parent component
 * - Renders interactive profile section
 * - Integrates with main layout
 */
import { Link as LinkIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Card } from './Card';
import { BentoGrid } from './BentoGrid';
import type { ProfileData, AnyCard } from '../types/profile';
import { CardType, CardSize } from '../types/profile';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { icons } from '../config/icons';

interface ProfileSectionProps {
  data: ProfileData['profile'];
}

export function ProfileSection({ data }: ProfileSectionProps) {
  const getIconComponent = (platform: string) => {
    const iconKey = platform.toLowerCase();
    const config = icons[iconKey];
    return config ? (LucideIcons as any)[config.icon] : LinkIcon;
  };

  const getIconColor = (platform: string) => {
    const iconKey = platform.toLowerCase();
    const config = icons[iconKey];
    return config ? `text-${config.color}` : 'text-gray-300';
  };

  // 准备卡片数据
  const prepareDefaultCards = (): AnyCard[] => {
    const defaultCards: AnyCard[] = [];
    const socialLinks = data.socialMedia || data.links || [];
    
    // 创建社交媒体卡片
    socialLinks.forEach((link, index) => {
      const platform = link.platform.toLowerCase();
      
      if (platform === 'github') {
        // GitHub卡片
        const username = new URL(link.url).pathname.split('/')[1];
        defaultCards.push({
          id: `github-${index}`,
          type: CardType.GITHUB,
          title: `GitHub`,
          description: 'My GitHub profile',
          username,
          size: CardSize.MEDIUM
        });
      } else if (platform === 'twitter') {
        // Twitter卡片
        const username = new URL(link.url).pathname.split('/')[1];
        defaultCards.push({
          id: `twitter-${index}`,
          type: CardType.TWITTER,
          title: `Twitter`,
          description: 'Follow me on Twitter',
          username,
          size: CardSize.MEDIUM
        });
      } else {
        // 通用链接卡片
        defaultCards.push({
          id: `link-${index}`,
          type: CardType.LINK,
          title: link.platform,
          url: link.url,
          size: CardSize.SMALL
        });
      }
    });
    
    return defaultCards;
  };

  // 获取用户自定义卡片或使用默认卡片
  const cards = data.cards || prepareDefaultCards();

  return (
    <Section className="bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.1)_0%,transparent_65%)]" />
      
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative"
      >
        {/* 主卡片 - 个人信息 */}
        <Card className="text-center max-w-2xl mx-auto backdrop-blur-md mb-12">
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"
              />
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={data.avatar}
                alt={data.name}
                className="relative w-40 h-40 rounded-full mx-auto object-cover 
                  shadow-lg ring-2 ring-blue-500/50 hover:ring-blue-400 
                  transition-all duration-300"
              />
            </div>

            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl font-bold text-white mb-3">{data.name}</h1>
              <p className="text-xl text-gray-300">{data.tagline}</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center px-4 py-2 rounded-lg 
                  bg-accent-900/30 text-accent-300 border border-accent-700/50 
                  hover:bg-accent-800/30 transition-colors duration-300"
              >
                {(() => {
                  const MailIcon = getIconComponent('mail');
                  return <MailIcon size={20} className={`mr-2 ${getIconColor('mail')}`} />;
                })()}
                {data.email}
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4">
              {(data.socialMedia || data.links || []).map((social) => {
                const Icon = getIconComponent(social.platform);
                const iconColor = getIconColor(social.platform);
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 
                      transition-colors duration-300"
                  >
                    <Icon 
                      size={24} 
                      className={iconColor}
                    />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </Card>
        
        {/* Bento卡片网格 */}
        {cards.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mt-8"
          >
            <BentoGrid cards={cards} />
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
}