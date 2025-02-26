import { useState } from 'react';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ExtendedProfileData } from '../App';
import type { Experience, Project, Education, TechnologyStack, SocialMedia } from '../types/profile';

interface ResumeExportButtonProps {
  profileData: ExtendedProfileData;
}

export function ResumeExportButton({ profileData }: ResumeExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!profileData.meta?.resumeExport?.enabled) {
    return null;
  }

  const exportLabel = profileData.meta.resumeExport.label || '导出简历';

  const generateResume = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // 创建一个临时的简历DOM元素
      const resumeContainer = document.createElement('div');
      resumeContainer.className = 'resume-container';
      resumeContainer.style.width = '210mm';
      resumeContainer.style.padding = '15mm';
      resumeContainer.style.position = 'absolute';
      resumeContainer.style.left = '-9999px';
      resumeContainer.style.backgroundColor = 'white';
      resumeContainer.style.color = 'black';
      resumeContainer.style.fontFamily = 'Arial, sans-serif';
      
      document.body.appendChild(resumeContainer);
      
      // 添加简历内容
      const sections = profileData.meta?.resumeExport?.sections || {};
      
      // 个人信息部分
      if (sections.profile && profileData.profile) {
        const profileSection = document.createElement('div');
        profileSection.innerHTML = `
          <h1 style="font-size: 24px; margin-bottom: 5px;">${profileData.profile.name}</h1>
          <p style="font-size: 16px; margin-bottom: 15px; color: #555;">${profileData.profile.tagline}</p>
          <p style="font-size: 14px; margin-bottom: 20px;">
            ${profileData.profile.email ? `Email: ${profileData.profile.email}<br>` : ''}
            ${(profileData.profile.socialMedia || profileData.profile.links || []).map((link: SocialMedia) => 
              `${link.platform}: ${link.url}`
            ).join('<br>')}
          </p>
          <hr style="margin: 15px 0; border: 1px solid #eee;">
        `;
        resumeContainer.appendChild(profileSection);
      }
      
      // 工作经验部分
      if (sections.experiences && profileData.experiences?.length) {
        const expSection = document.createElement('div');
        expSection.innerHTML = `
          <h2 style="font-size: 18px; margin: 15px 0 10px 0;">Work Experience</h2>
          ${profileData.experiences.map((exp: Experience) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <strong>${exp.position} @ ${exp.company}</strong>
                <span>${exp.period}</span>
              </div>
              <p style="margin: 0; font-size: 14px;">${exp.description}</p>
            </div>
          `).join('')}
          <hr style="margin: 15px 0; border: 1px solid #eee;">
        `;
        resumeContainer.appendChild(expSection);
      }
      
      // 教育经历部分
      if (sections.education && profileData.education?.length) {
        const eduSection = document.createElement('div');
        eduSection.innerHTML = `
          <h2 style="font-size: 18px; margin: 15px 0 10px 0;">Education</h2>
          ${profileData.education.map((edu: Education) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <strong>${edu.degree}</strong>
                <span>${edu.period}</span>
              </div>
              <p style="margin: 0; font-size: 14px;">${edu.institution}</p>
              ${edu.description ? `<p style="margin: 5px 0 0; font-size: 14px;">${edu.description}</p>` : ''}
            </div>
          `).join('')}
          <hr style="margin: 15px 0; border: 1px solid #eee;">
        `;
        resumeContainer.appendChild(eduSection);
      }
      
      // 项目经验部分
      if (sections.projects && profileData.projects?.length) {
        const projSection = document.createElement('div');
        projSection.innerHTML = `
          <h2 style="font-size: 18px; margin: 15px 0 10px 0;">Projects</h2>
          ${profileData.projects.map((project: Project) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <strong>${project.name}</strong>
                <a href="${project.url}" style="color: #0366d6; font-size: 14px;">View Project</a>
              </div>
              <p style="margin: 0; font-size: 14px;">${project.description}</p>
              <p style="margin: 5px 0 0; font-size: 13px; color: #555;">
                Tech Stack: ${project.tech.join(', ')}
              </p>
            </div>
          `).join('')}
          <hr style="margin: 15px 0; border: 1px solid #eee;">
        `;
        resumeContainer.appendChild(projSection);
      }
      
      // 技术栈部分
      if (sections.techStacks && profileData.techStacks?.length) {
        const techSection = document.createElement('div');
        techSection.innerHTML = `
          <h2 style="font-size: 18px; margin: 15px 0 10px 0;">Technical Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${profileData.techStacks.map((tech: TechnologyStack) => `
              <span style="background: #f1f5f9; padding: 5px 10px; border-radius: 4px; font-size: 14px;">
                ${tech.name} ${['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'][tech.proficiency]}
              </span>
            `).join('')}
          </div>
        `;
        resumeContainer.appendChild(techSection);
      }
      
      // 使用html2canvas将DOM转换为图片
      const canvas = await html2canvas(resumeContainer, {
        scale: 2, // 提高清晰度
        useCORS: true,
        logging: false,
        backgroundColor: null
      });
      
      // 创建PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // 将canvas添加到PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // 保存PDF
      pdf.save(`${profileData.profile.name || 'Resume'}.pdf`);
      
      // 清理DOM
      document.body.removeChild(resumeContainer);
      
    } catch (error) {
      console.error('生成简历时出错:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generateResume}
      disabled={isGenerating}
      className="fixed top-4 right-4 z-50 bg-accent-500 hover:bg-accent-600 text-white p-2 rounded-lg 
        flex items-center justify-center transition-colors duration-300 shadow-lg"
      aria-label="Export Resume"
    >
      <FileDown size={20} />
      {isGenerating && (
        <span className="absolute inset-0 flex items-center justify-center bg-accent-500 rounded-lg">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </button>
  );
} 