import { Link as LinkIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Card } from './Card';
import type { ProfileData } from '../types/profile';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { icons } from '../config/icons';

interface ProfileSectionProps {
  data: ProfileData['profile'];
}

export function ProfileSection({ data }: ProfileSectionProps) {
  const getIconComponent = (platform: string) => {
    const iconKey = platform.toLowerCase();
    const config = icons[iconKey];
    return config ? LucideIcons[config.icon] : LinkIcon;
  };

  const getIconColor = (platform: string) => {
    const iconKey = platform.toLowerCase();
    const config = icons[iconKey];
    return config ? `text-${config.color}` : 'text-gray-300';
  };

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
        <Card className="text-center max-w-2xl mx-auto backdrop-blur-md">
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
              {data.socialMedia.map((social) => {
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
      </motion.div>
    </Section>
  );
}