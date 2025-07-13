import React, { useState } from 'react';
import type { ExtendedProfileData } from '../App';

interface MinimalLayoutProps {
  profileData: ExtendedProfileData;
  introContent: string;
}

export const MinimalLayout: React.FC<MinimalLayoutProps> = ({ profileData, introContent }) => {
  const profile = profileData.profile;
  const [hoveredItem, setHoveredItem] = useState<any>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (item: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredItem(item);
    setHoverPosition({
      x: rect.right + 20,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 px-8">
      {/* Hover Card */}
      {hoveredItem && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-md"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
        >
          {hoveredItem.type === 'project' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{hoveredItem.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{hoveredItem.description}</p>
              {hoveredItem.tech && hoveredItem.tech.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hoveredItem.tech.map((tech: string, index: number) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {hoveredItem.image && (
                <img 
                  src={hoveredItem.image} 
                  alt={hoveredItem.name}
                  className="w-full mt-3 rounded border"
                />
              )}
            </div>
          )}
          {hoveredItem.type === 'experience' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{hoveredItem.position}</h3>
              <p className="text-gray-500 text-sm mb-2">{hoveredItem.company}</p>
              <p className="text-gray-600 text-sm mb-2">{hoveredItem.description}</p>
              <p className="text-gray-400 text-xs">{hoveredItem.period}</p>
              {hoveredItem.image && (
                <img 
                  src={hoveredItem.image} 
                  alt={hoveredItem.company}
                  className="w-full mt-3 rounded border"
                />
              )}
            </div>
          )}
          {hoveredItem.type === 'education' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{hoveredItem.degree}</h3>
              <p className="text-gray-500 text-sm mb-2">{hoveredItem.institution}</p>
              {hoveredItem.description && (
                <p className="text-gray-600 text-sm mb-2">{hoveredItem.description}</p>
              )}
              <p className="text-gray-400 text-xs">{hoveredItem.period}</p>
              {hoveredItem.image && (
                <img 
                  src={hoveredItem.image} 
                  alt={hoveredItem.institution}
                  className="w-full mt-3 rounded border"
                />
              )}
            </div>
          )}
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-bold mb-2">
            {profile.name}
            {profile.tagline && ` | ${profile.tagline}`}
          </h1>
          {profile.email && (
            <div className="flex justify-center gap-4 text-gray-500">
              <a href={`mailto:${profile.email}`} className="hover:text-gray-900 transition-colors">
                E-mail
              </a>
              {profile.socialMedia?.map(social => (
                <a 
                  key={social.platform}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Introduction with expandable content */}
        {introContent && (
          <section className="mb-12 text-center">
            <details className="group">
              <summary className="cursor-pointer text-gray-900 hover:text-gray-600 transition-colors inline-flex items-center">
                <span>More about me</span>
                <svg 
                  className="w-4 h-4 ml-2 transform group-open:rotate-180 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-700 prose prose-sm max-w-none text-left">
                <div dangerouslySetInnerHTML={{ 
                  __html: introContent.replace(/\n/g, '<br />') 
                }} />
              </div>
            </details>
          </section>
        )}

        {/* Work Experience */}
        {profileData.experiences && profileData.experiences.length > 0 && (
          <section className="mb-12">
            <h2 className="text-gray-400 uppercase text-sm font-medium mb-4 tracking-wider text-center">
              Works ({profileData.experiences.length})
            </h2>
            <div className="space-y-4">
              {profileData.experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                  onMouseEnter={(e) => handleMouseEnter({ ...exp, type: 'experience' }, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-center flex-1">
                    <h3 className="text-gray-900 font-medium">
                      {exp.position} at {exp.company}
                    </h3>
                  </div>
                  <span className="text-gray-400 text-sm whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {profileData.projects && profileData.projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-gray-400 uppercase text-sm font-medium mb-4 tracking-wider text-center">
              Other Projects
            </h2>
            <div className="space-y-4">
              {profileData.projects.map((project, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                  onMouseEnter={(e) => handleMouseEnter({ ...project, type: 'project' }, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-center flex-1">
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
                    >
                      {project.name}
                    </a>
                  </div>
                  <span className="text-gray-400 text-sm whitespace-nowrap ml-4">
                    Recent
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stacks */}
        {profileData.techStacks && profileData.techStacks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-gray-400 uppercase text-sm font-medium mb-4 tracking-wider text-center">
              Software ({profileData.techStacks.length})
            </h2>
            <div className="space-y-4">
              {profileData.techStacks.map((tech, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="text-center flex-1">
                    <span className="text-gray-900 font-medium">{tech.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm whitespace-nowrap ml-4">
                    Level {tech.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profileData.education && profileData.education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-gray-400 uppercase text-sm font-medium mb-4 tracking-wider text-center">
              Education ({profileData.education.length})
            </h2>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                  onMouseEnter={(e) => handleMouseEnter({ ...edu, type: 'education' }, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-center flex-1">
                    <h3 className="text-gray-900 font-medium">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-gray-400 text-sm whitespace-nowrap ml-4">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};