/**
 * EducationSection Component
 * 
 * Purpose: Displays education history in a timeline format
 * 
 * Implementation:
 * - Renders education cards with image and description
 * - Implements responsive layout (mobile/desktop)
 * - Adds hover animations and transitions
 * 
 * Technologies:
 * - React + TypeScript
 * - Tailwind CSS for styling
 * - Framer Motion for animations
 * 
 * Interaction:
 * - Receives education data from parent component
 * - Renders interactive education cards
 * - Integrates with main layout
 */
import { Section } from './Section';
import { Card } from './Card';
import type { Education } from '../types/profile';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section className="bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.1)_0%,transparent_65%)]" />
      
      <div className="relative">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-accent-200 
          bg-clip-text text-transparent mb-12 text-center">
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <Card
              key={`${edu.institution}-${edu.degree}`}
              className="relative overflow-hidden bg-gray-800/30 backdrop-blur-md p-8
                border border-gray-700/50 shadow-[0_0_15px_rgba(0,0,0,0.1)]
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-blue-500/10
                before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-100 group"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-accent-300 
                    transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-accent-300 mb-2">{edu.institution}</p>
                  <p className="text-sm text-gray-400 mb-4 font-medium tracking-wide">
                    {edu.period}
                  </p>
                  <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                </div>
                {edu.image && (
                  <div className="relative w-full md:w-80 h-48 overflow-hidden rounded-2xl shrink-0">
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover transform group-hover:scale-105 
                        transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 ring-1 ring-accent-500/30 
                      group-hover:ring-accent-500/50 rounded-2xl transition-all duration-300" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}