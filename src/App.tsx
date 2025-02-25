import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import { ChevronDown } from 'lucide-react';
import type { ProfileData } from './types/profile';
import { ProfileSection } from './components/ProfileSection';
import { IntroSection } from './components/IntroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { TechStacksSection } from './components/TechStacksSection';
import { EducationSection } from './components/EducationSection';

function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [introContent, setIntroContent] = useState<string>('');
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Load profile.yaml
        const profileResponse = await fetch('/src/config/profile.yaml');
        const yamlText = await profileResponse.text();
        const data = yaml.load(yamlText) as ProfileData;
        
        // Load intro.md if it exists in the data
        if (data.intro?.content) {
          const introResponse = await fetch(`/src/config/${data.intro.content}`);
          const introText = await introResponse.text();
          setIntroContent(introText);
        }
        
        setProfileData(data);
        
        // Calculate sections once when profile data is loaded
        const orderedSections = Object.entries(data.sections)
          .filter(([_, order]) => order > 0)
          .sort(([_, a], [__, b]) => a - b)
          .map(([key]) => key);
        setSections(orderedSections);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sections.length) return;
      
      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [sections]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case 'profile':
        return <ProfileSection data={profileData.profile} />;
      case 'intro':
        return <IntroSection intro={{ content: introContent }} />;
      case 'projects':
        return <ProjectsSection projects={profileData.projects} />;
      case 'experiences':
        return <ExperiencesSection experiences={profileData.experiences} />;
      case 'techStacks':
        return <TechStacksSection techStacks={profileData.techStacks} />;
      case 'education':
        return <EducationSection education={profileData.education} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-gray-900">
      {renderSection(sections[currentSection])}
      
      <div className="fixed left-8 top-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-2">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setCurrentSection(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSection === index
                  ? 'bg-blue-500 scale-150'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {currentSection < sections.length - 1 && (
        <button
          onClick={() => setCurrentSection(prev => prev + 1)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-300 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      )}
    </div>
  );
}

export default App;