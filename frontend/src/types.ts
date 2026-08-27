export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  category: 'web' | 'system' | 'other';
  liveUrl?: string;
  githubUrl?: string;
  details?: string[];
  metrics?: { label: string; value: string }[];
  status?: string;
}

export interface Skill {
  name: string;
  level: 'Core' | 'Familiar' | 'Exploring';
  percentage?: number; // visual loading indicator
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconName: 'Code' | 'Book' | 'Cpu' | 'Shield' | 'Award' | 'Terminal';
  tag: string;
  status: 'completed' | 'learning' | 'upcoming';
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  role: string;
  timestamp: string;
}
