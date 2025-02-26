import { IconName } from '../config/icons';

// 卡片类型枚举
export enum CardType {
  LINK = 'link',
  GITHUB = 'github',
  MAP = 'map',
  TEXT = 'text',
  IMAGE = 'image',
  TWITTER = 'twitter',
  MASTODON = 'mastodon',
  CUSTOM = 'custom'
}

// 卡片尺寸枚举
export enum CardSize {
  SMALL = 'small',   // 1x1
  MEDIUM = 'medium', // 1x2 or 2x1
  LARGE = 'large'    // 2x2
}

// 基础卡片接口
export interface BentoCard {
  id: string;
  type: CardType;
  title?: string;
  description?: string;
  size?: CardSize;
  gridArea?: string; // 可选，用于手动指定位置
}

// 链接卡片
export interface LinkCard extends BentoCard {
  type: CardType.LINK;
  url: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
}

// GitHub卡片
export interface GithubCard extends BentoCard {
  type: CardType.GITHUB;
  username: string;
  repo?: string;
}

// 地图卡片
export interface MapCard extends BentoCard {
  type: CardType.MAP;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// 文本卡片
export interface TextCard extends BentoCard {
  type: CardType.TEXT;
  content: string;
  textColor?: string;
  backgroundColor?: string;
}

// 图片卡片
export interface ImageCard extends BentoCard {
  type: CardType.IMAGE;
  imageUrl: string;
  alt?: string;
}

// Twitter卡片
export interface TwitterCard extends BentoCard {
  type: CardType.TWITTER;
  username: string;
  tweetId?: string;
}

// Mastodon卡片
export interface MastodonCard extends BentoCard {
  type: CardType.MASTODON;
  instance: string;
  username: string;
}

// 自定义卡片
export interface CustomCard extends BentoCard {
  type: CardType.CUSTOM;
  content: string;
  icon?: IconName;
  backgroundColor?: string;
}

// 所有卡片类型的联合类型
export type AnyCard = LinkCard | GithubCard | MapCard | TextCard | ImageCard | TwitterCard | MastodonCard | CustomCard;

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  image?: string;
  tech: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  image?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  image?: string;
}

export interface TechnologyStack {
  name: string;
  proficiency: 0 | 1 | 2 | 3;
  icon: IconName;
}

export interface Profile {
  name: string;
  avatar: string;
  tagline: string;
  email: string;
  links?: SocialMedia[];
  socialMedia?: SocialMedia[];
  cards?: AnyCard[]; // 添加卡片数组字段
}

export interface ProfileData {
  profile: Profile;
  intro: {
    content: string;
  };
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  techStacks: TechnologyStack[];
}