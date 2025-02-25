import { Section } from './Section';
import { Card } from './Card';
import * as LucideIcons from 'lucide-react';
import type { TechnologyStack } from '../types/profile';
import { icons } from '../config/icons';

interface TechStacksSectionProps {
  techStacks: TechnologyStack[];
}

export function TechStacksSection({ techStacks }: TechStacksSectionProps) {
  const sortedTechStacks = [...techStacks].sort((a, b) => b.proficiency - a.proficiency);

  const getIconComponent = (iconName: string) => {
    const config = icons[iconName];
    return config ? LucideIcons[config.icon as keyof typeof LucideIcons] : LucideIcons.Code;
  };

  const getIconColor = (iconName: string) => {
    const config = icons[iconName];
    return config ? `text-${config.color}` : 'text-gray-300';
  };

  return (
    <Section className="bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="relative">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-accent-200 
          bg-clip-text text-transparent mb-12 text-center">
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sortedTechStacks.map((tech) => {
            const Icon = getIconComponent(tech.icon);
            const iconColorClass = getIconColor(tech.icon);
            const proficiencyColors = {
              0: 'bg-pink-900/30 text-pink-300 border-pink-700/50',
              1: 'bg-purple-900/30 text-purple-300 border-purple-700/50',
              2: 'bg-accent-900/30 text-accent-300 border-accent-700/50',
              3: 'bg-teal-900/30 text-teal-300 border-teal-700/50',
            };
            const proficiencyClass = proficiencyColors[tech.proficiency as keyof typeof proficiencyColors];

            return (
              <Card key={tech.name} className="flex flex-col items-center group 
                hover:bg-gray-800/50 transition-colors duration-300">
                <Icon 
                  size={32} 
                  className={`mb-3 ${iconColorClass} group-hover:scale-110 transition-transform duration-300`} 
                />
                <h3 className="text-lg font-medium text-white mb-3">{tech.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm border ${proficiencyClass}`}>
                  {['Beginner', 'Basic', 'Intermediate', 'Advanced'][tech.proficiency]}
                </span>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}