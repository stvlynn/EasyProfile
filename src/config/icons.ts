import { IconName } from 'lucide-react';

export interface IconConfig {
  icon: IconName;
  color: string;
}

export const icons: Record<string, IconConfig> = {
  github: {
    icon: 'Github',
    color: 'purple-500'  // GitHub 紫色
  },
  linkedin: {
    icon: 'Linkedin',
    color: 'accent-600'  // LinkedIn 蓝色
  },
  twitter: {
    icon: 'Twitter',
    color: 'accent-400'  // Twitter 浅蓝色
  },
  mail: {
    icon: 'Mail',
    color: 'teal-500'    // 清新的青色
  },
  link: {
    icon: 'Link',
    color: 'pink-500'    // 醒目的粉色
  },
  star: {
    icon: 'Star',
    color: 'accent-300'  // 星星用浅蓝色
  },
  react: {
    icon: 'Blocks',
    color: 'accent-400'  // React 蓝色
  },
  typescript: {
    icon: 'FileType',
    color: 'accent-600'  // TypeScript 深蓝色
  },
  nodejs: {
    icon: 'Server',
    color: 'teal-600'    // Node.js 深青色
  },
  python: {
    icon: 'Code',
    color: 'accent-500'  // Python 蓝色
  },
  'chevron-down': {
    icon: 'ChevronDown',
    color: 'gray-400'    // 导航箭头用灰色
  }
} as const;
