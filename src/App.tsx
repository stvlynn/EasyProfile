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

function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
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
        const data = yaml.load(yamlText) as ProfileData;

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
        const orderedSections = data.sections ? Object.entries(data.sections)
          .filter(([_, order]) => order > 0)
          .sort(([_, a], [__, b]) => a - b)
          .map(([key]) => key) : [];
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
    
    const handleTouchStart = (e: TouchEvent) => {
      // 先记录触摸位置，以避免后续逻辑中使用 null 值
      const touch = e.touches[0];
      touchStartY.current = touch.clientY;
      
      // 只有当触摸事件不是发生在可滚动元素内部时才阻止默认行为
      const target = e.target as HTMLElement;
      const scrollableParent = findScrollableParent(target);
      
      // 检查是否在可滚动元素内，如果是则允许默认滚动行为
      if (scrollableParent && !isScrolledToEdge(scrollableParent, false)) {
        return;
      }
      
      // 否则阻止默认行为以允许页面滑动
      try {
        e.preventDefault();
      } catch (err) {
        console.warn('无法阻止默认事件', err);
      }
    };
  
    const handleTouchMove = (e: TouchEvent) => {
      if (!sections.length || touchStartY.current === null) return;
      
      const touch = e.touches[0];
      const deltaY = touchStartY.current - touch.clientY;
      const isScrollingDown = deltaY > 0;
      
      const target = e.target as HTMLElement;
      const scrollableParent = findScrollableParent(target);
      
      // 如果在可滚动元素内部且该元素未滚动到边界，则不处理部分切换
      if (scrollableParent) {
        const isAtEdge = isScrolledToEdge(scrollableParent, isScrollingDown);
        if (!isAtEdge) {
          return; // 允许元素内部默认滚动
        }
      }
      
      // 已经滚动到边界或不在可滚动元素内，阻止默认行为以实现页面切换
      try {
        e.preventDefault();
      } catch (err) {
        console.warn('无法阻止默认事件', err);
      }
      
      const threshold = 50; // 增大滑动阈值，以便于与普通滚动区分
  
      if (Math.abs(deltaY) > threshold) {
        if (isScrollingDown) {
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
    
    // 工具函数：查找可滚动的父元素
    const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
      if (!element || element === document.body) return null;
      
      const { overflowY } = window.getComputedStyle(element);
      const isScrollable = 
        overflowY !== 'visible' && 
        overflowY !== 'hidden' && 
        element.scrollHeight > element.clientHeight;
        
      if (isScrollable) {
        return element;
      }
      
      return findScrollableParent(element.parentElement);
    };
    
    // 工具函数：检查元素是否已滚动到边缘
    const isScrolledToEdge = (element: HTMLElement, isScrollingDown: boolean): boolean => {
      // 添加容差值，提高检测的容错性
      const tolerance = 5;
      
      if (isScrollingDown) {
        // 向下滚动时，检查是否到达底部
        return Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < tolerance;
      } else {
        // 向上滚动时，检查是否到达顶部
        return element.scrollTop <= tolerance;
      }
    };

    // 添加键盘导航支持
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sections.length) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
        e.preventDefault();
      }
    };

    // 尝试采用不同的方式绑定触摸事件
    let touchEventsSupported = true;
    
    // 检测触摸事件是否受支持
    try {
      document.addEventListener('test' as keyof DocumentEventMap, null as any, {
        get passive() { 
          touchEventsSupported = true;
          return true; 
        }
      });
      document.removeEventListener('test' as keyof DocumentEventMap, null as any);
    } catch (err) {
      touchEventsSupported = false;
      console.warn('被动事件监听器可能不受支持', err);
    }
    
    // 正常事件监听器
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    
    // 根据兼容性选择事件监听方式
    if (touchEventsSupported) {
      try {
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
      } catch (err) {
        console.warn('无法以非被动模式添加触摸事件', err);
        // 降级为被动监听
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
      }
    } else {
      // 在不支持触摸事件的设备上，使用点击事件降级
      console.info('此设备可能不支持触摸事件，已启用点击导航');
    }
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
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
      
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
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
              aria-label={`移至${section}部分`}
            />
          ))}
        </div>
      </div>

      {currentSection < sections.length - 1 && (
        <button
          onClick={() => setCurrentSection(prev => prev + 1)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-300 animate-bounce z-50"
          aria-label="下一部分"
        >
          <ChevronDown size={32} />
        </button>
      )}
      
      {/* 添加备用导航按钮，确保在触摸失效时仍能导航 */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
        {currentSection > 0 && (
          <button
            onClick={() => setCurrentSection(prev => prev - 1)}
            className="p-2 bg-gray-800/80 rounded-full text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="上一部分"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        )}
        {currentSection < sections.length - 1 && (
          <button
            onClick={() => setCurrentSection(prev => prev + 1)}
            className="p-2 bg-gray-800/80 rounded-full text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="下一部分"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;