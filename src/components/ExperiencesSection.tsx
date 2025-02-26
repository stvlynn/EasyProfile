import { Section } from './Section';
import { Card } from './Card';
import type { Experience } from '../types/profile';

interface ExperiencesSectionProps {
  experiences: Experience[];
}

export function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
  return (
    <Section className="bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.1)_0%,transparent_65%)]" />
      
      <div className="relative">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-accent-200 
          bg-clip-text text-transparent mb-12 text-center">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card
              key={`${exp.company}-${exp.position}`}
              className="relative overflow-hidden bg-gray-800/30 backdrop-blur-md p-8
                border border-gray-700/50 shadow-[0_0_15px_rgba(0,0,0,0.1)]
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-blue-500/10
                before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-100 group"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                {exp.image && (
                  <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl flex items-center justify-center">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-contain transform group-hover:scale-105 
                        transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 ring-1 ring-accent-500/30 
                      group-hover:ring-accent-500/50 rounded-2xl transition-all duration-300" />
                  </div>
                )}
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-xl font-semibold text-white mb-1 
                    group-hover:text-accent-300 transition-colors duration-300">
                    {exp.position}
                  </h3>
                  <p className="text-lg text-accent-300 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400 mb-4 font-medium tracking-wide">
                    {exp.period}
                  </p>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}