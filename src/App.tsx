import React, { useEffect, useState, useRef } from 'react';
import yaml from 'js-yaml';
import { ChevronDown, Github } from 'lucide-react';
import type { ProfileData } from './types/profile';
import { ProfileSection } from './components/ProfileSection';
import { IntroSection } from './components/IntroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { TechStacksSection } from './components/TechStacksSection';
import { EducationSection } from './components/EducationSection';
import { ResumeExportButton } from './components/ResumeExportButton';
import { ThemeProvider, ThemeConfig, useTheme } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { MinimalLayout } from './components/MinimalLayout';

// 彩蛋类型定义
interface EasterEgg {
  id: string;
  trigger: string;
  content: string;
}

interface EasterEggsConfig {
  enabled: boolean;
  autoDisplay: boolean;
  eggs: EasterEgg[];
}

// 扩展 ProfileData 接口以包含 YAML 中实际使用的属性
export interface ExtendedProfileData extends ProfileData {
  meta?: {
    title: string;
    favicon: string;
    description: string;
    resumeExport?: {
      enabled: boolean;
      sections: {
        profile?: boolean;
        experiences?: boolean;
        education?: boolean;
        projects?: boolean;
        techStacks?: boolean;
        intro?: boolean;
      };
      label?: string;
    };
    themes?: ThemeConfig;
    easterEggs?: EasterEggsConfig;
  };
  sections?: Record<string, number>;
}

function App() {
  const [profileData, setProfileData] = useState<ExtendedProfileData | null>(null);
  const [introContent, setIntroContent] = useState<string>('');
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<string[]>([]);
  const touchStartY = useRef<number | null>(null);
  const easterEggsLoaded = useRef<boolean>(false);
  const scrollCooldown = useRef<boolean>(false);
  const scrollThreshold = useRef<number>(0);
  const scrollAccumulator = useRef<number>(0);
  const wheelAccumulator = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  // 加载彩蛋内容
  const loadEasterEgg = async (eggPath: string): Promise<string> => {
    try {
      const response = await fetch(`/config/${eggPath}`);
      if (!response.ok) {
        throw new Error(`Failed to load easter egg: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading easter egg:', error);
      return '// Easter egg content could not be loaded';
    }
  };

  // 设置彩蛋
  const setupEasterEggs = async (easterEggs: EasterEggsConfig) => {
    if (!easterEggs || !easterEggs.enabled || easterEggsLoaded.current) {
      return;
    }

    // 标记彩蛋已加载，避免重复加载
    easterEggsLoaded.current = true;

    // 处理每个彩蛋
    for (const egg of easterEggs.eggs) {
      const eggContent = await loadEasterEgg(egg.content);
      
      if (egg.trigger === '' && easterEggs.autoDisplay) {
        // 自动显示的彩蛋
        console.log(eggContent);
      } else if (egg.trigger) {
        // 需要触发的彩蛋
        const originalConsoleLog = console.log;
        
        // 重写 console.log 来检测触发词
        console.log = function(...args) {
          originalConsoleLog.apply(console, args);
          
          // 检查是否包含触发词
          const input = args.join(' ').toLowerCase().replace(/['"]/g, '');
          if (input === egg.trigger.toLowerCase()) {
            originalConsoleLog(eggContent);
          }
        };

        // 为开发者添加提示
        console.info(`🥚 Type console.log("${egg.trigger}") to reveal an easter egg!`);

        // 创建全局触发函数
        (window as any)[egg.trigger] = () => {
          console.log(eggContent);
        };
      }
    }
  };

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
          
          // 设置彩蛋
          if (data.meta.easterEggs) {
            setupEasterEggs(data.meta.easterEggs);
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
      if (e.defaultPrevented || !sections.length || scrollCooldown.current) return;
      
      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      
      if (timeDelta > 500) {
        wheelAccumulator.current = 0;
      }
      
      wheelAccumulator.current += Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.5, 50);
      
      lastScrollTime.current = now;
      
      const threshold = Math.max(100, 200 - timeDelta * 0.2);
      
      if (Math.abs(wheelAccumulator.current) > threshold) {
        if (wheelAccumulator.current > 0) {
          setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
        } else {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }
        
        wheelAccumulator.current = 0;
        
        scrollCooldown.current = true;
        setTimeout(() => {
          scrollCooldown.current = false;
        }, 800);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartY.current = touch.clientY;
      scrollAccumulator.current = 0;
    };
  
    const handleTouchMove = (e: TouchEvent) => {
      if (e.defaultPrevented || !sections.length || touchStartY.current === null || scrollCooldown.current) return;
  
      const touch = e.touches[0];
      const deltaY = touchStartY.current - touch.clientY;
      
      scrollAccumulator.current += deltaY * 0.3;
      
      touchStartY.current = touch.clientY;
      
      const touchThreshold = 120;
  
      if (Math.abs(scrollAccumulator.current) > touchThreshold) {
        if (scrollAccumulator.current > 0) {
          setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
        } else {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }
        
        scrollAccumulator.current = 0;
        
        scrollCooldown.current = true;
        setTimeout(() => {
          scrollCooldown.current = false;
        }, 800);
      }
    };
  
    const handleTouchEnd = () => {
      touchStartY.current = null;
      if (Math.abs(scrollAccumulator.current) > 0) {
        const inertiaInterval = setInterval(() => {
          scrollAccumulator.current *= 0.9;
          if (Math.abs(scrollAccumulator.current) < 10) {
            scrollAccumulator.current = 0;
            clearInterval(inertiaInterval);
          }
        }, 50);
      }
    };
  
    window.addEventListener('wheel', handleWheel, { passive: true });
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

  const AppContent = () => {
    const { currentTheme, isLoading } = useTheme();
    
    // 防止在主题还在加载时渲染错误的布局
    if (isLoading || !currentTheme) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    // 如果是极简主题，使用完全不同的布局
    if (currentTheme.id === 'minimal') {
      return (
        <div className="relative">
          {/* 主题切换按钮 - 极简风格 */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          
          {/* 极简布局 */}
          <MinimalLayout 
            profileData={profileData!} 
            introContent={introContent} 
          />
        </div>
      );
    }

    // 默认的深色主题布局
    return (
      <div className="relative bg-gray-900">
        {/* GitHub Star 按钮 */}
        <a
          href="https://github.com/stvlynn/EasyProfile"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-4 right-32 z-50 flex items-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg transition-colors duration-300"
        >
          <Github size={18} className="mr-2" />
          <span className="text-sm font-medium">Star</span>
        </a>
        
        {/* 主题切换按钮 */}
        <div className="fixed top-4 right-16 z-50">
          <ThemeToggle />
        </div>
        
        {/* 导出简历按钮 */}
        {profileData && 
          <div className="fixed top-4 right-4 z-50">
            <ResumeExportButton profileData={profileData} />
          </div>
        }
        
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
  };

  const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    if (profileData?.meta?.themes) {
      return (
        <ThemeProvider themeConfig={profileData.meta.themes}>
          <AppContent />
        </ThemeProvider>
      );
    }
    return <AppContent />;
  };

  return <ThemeWrapper>{null}</ThemeWrapper>;
}

export default App;