import { Section } from './Section';
import { Card } from './Card';
import * as LucideIcons from 'lucide-react';
import { icons } from '../config/icons';

interface ProfileProps {
  profile: {
    name: string;
    avatar: string;
    tagline: string;
    email: string;
    socialMedia: {
      platform: string;
      url: string;
    }[];
  };
}

export function Profile({ profile }: ProfileProps) {
  const getIconComponent = (platform: string) => {
    const iconKey = platform.toLowerCase();
    const config = icons[iconKey];
    console.log('Icon config for', iconKey, ':', config);
    console.log('Available icons:', Object.keys(icons));
    console.log('Lucide icons:', Object.keys(LucideIcons));
    return config ? LucideIcons[config.icon] : LucideIcons.Link;
  };

  const getIconColor = (platform: string) => {
    const iconKey = platform.toLowerCase();
    const config = icons[iconKey];
    console.log('Color config for', iconKey, ':', config?.color);
    return config ? `text-${config.color}` : 'text-gray-300';
  };

  return (
    <Section className="bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900">
      <Card className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <img 
          src={profile.avatar} 
          alt={profile.name} 
          className="w-32 h-32 rounded-full mb-6 border-2 border-accent-500/30"
        />
        <h1 className="text-4xl font-bold text-white mb-3">{profile.name}</h1>
        <p className="text-xl text-gray-300 mb-6">{profile.tagline}</p>
        
        <a 
          href={`mailto:${profile.email}`}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-accent-900/30 
            text-accent-300 border border-accent-700/50 hover:bg-accent-800/30 
            transition-colors duration-300 mb-6"
        >
          {(() => {
            const MailIcon = getIconComponent('mail');
            return <MailIcon size={20} className={`mr-2 ${getIconColor('mail')}`} />;
          })()}
          {profile.email}
        </a>

        <div className="flex gap-4">
          {profile.socialMedia.map((social) => {
            const Icon = getIconComponent(social.platform);
            const iconColor = getIconColor(social.platform);
            console.log('Rendering social icon:', social.platform, 'with color:', iconColor);
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
        </div>
      </Card>
    </Section>
  );
}
