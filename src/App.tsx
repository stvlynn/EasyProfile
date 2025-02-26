import React, { useEffect, useState, useRef } from 'react';
import yaml from 'js-yaml';
import { ChevronDown } from 'lucide-react';
import type { ProfileData } from './types/profile';
import { ProfileSection } from './components/ProfileSection';
import { IntroSection } from './components/IntroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { TechStacksSection } from './components/TechStacksSection';
import { EducationSection } from './components/EducationSection';

// 扩展 ProfileData 接口以包含 YAML 中实际使用的属性
interface ExtendedProfileData extends ProfileData {
  meta?: {
    title: string;
    favicon: string;
    description: string;
  };
  sections?: Record<string, number>;
}

function App() {
  const [profileData, setProfileData] = useState<ExtendedProfileData | null>(null);
  const [introContent, setIntroContent] = useState<string>('');
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<string[]>([]);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Load profile.yaml
        const profileResponse = await fetch('/config/profile.yaml');
        const yamlText = await profileResponse.text();
        const data = yaml.load(yamlText) as ExtendedProfileData;

        // Update meta information
        if (data.meta) {
          document.title = data.meta.title;
          const favicon = document.querySelector('link[rel="icon"]');
          if (favicon) {
            favicon.setAttribute('href', data.meta.favicon);
          }
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', data.meta.description);
          } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = data.meta.description;
            document.head.appendChild(meta);
          }
        }
        
        // Load intro.md if it exists in the data
        if (data.intro?.content) {
          const introResponse = await fetch(`/config/${data.intro.content}`);
          const introText = await introResponse.text();
          setIntroContent(introText);
        }
        
        setProfileData(data);
        
        // Calculate sections once when profile data is loaded
        const orderedSections = data.sections 
          ? Object.entries(data.sections)
              .filter(([_, order]) => typeof order === 'number' && order > 0)
              .sort(([_, a], [__, b]) => a - b)
              .map(([key]) => key) 
          : [];
        setSections(orderedSections);
      } catch (error) {
        console.error('Failed to load profile data:', error);
      }
    };
    
    loadProfile();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 如果事件已被处理（被 Section 组件阻止了冒泡），则不执行翻页操作
      if (e.defaultPrevented || !sections.length) return;
      
      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      // 不再调用 preventDefault，避免阻止所有触摸交互
      // 只保存开始触摸位置
      const touch = e.touches[0];
      touchStartY.current = touch.clientY;
    };
  
    const handleTouchMove = (e: TouchEvent) => {
      // 如果事件已被处理（被 Section 组件阻止了冒泡），则不执行翻页操作
      if (e.defaultPrevented || !sections.length || touchStartY.current === null) return;
  
      const touch = e.touches[0];
      const deltaY = touchStartY.current - touch.clientY;
      const threshold = 50; // 增大滑动阈值，以便区分内容滚动和页面翻页
  
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
        } else {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }
        touchStartY.current = null;
      }
    };
  
    const handleTouchEnd = () => {
      touchStartY.current = null;
    };
  
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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