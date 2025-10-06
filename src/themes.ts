export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    cardBg: string;
  };
  gradients: {
    hero: string;
    section: string;
    button: string;
    card: string;
  };
  animations: {
    float: string;
    pulse: string;
    bounce: string;
  };
}

export const themes: Record<string, Theme> = {
  classic: {
    id: 'classic',
    name: 'Classic Birthday',
    description: 'Traditional pink and purple celebration',
    icon: '🎂',
    colors: {
      primary: '#ec4899',
      secondary: '#a855f7',
      accent: '#f59e0b',
      background: 'from-pink-50 via-purple-50 to-blue-50',
      text: '#374151',
      cardBg: 'bg-white/80'
    },
    gradients: {
      hero: 'from-pink-500 via-purple-500 to-blue-500',
      section: 'from-purple-50 via-pink-50 to-blue-50',
      button: 'from-pink-500 to-purple-500',
      card: 'from-white/80 to-white/60'
    },
    animations: {
      float: 'animate-float',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce'
    }
  },
  modern: {
    id: 'modern',
    name: 'Modern Gradient',
    description: 'Sleek and contemporary design',
    icon: '✨',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: 'from-slate-50 via-blue-50 to-indigo-50',
      text: '#1f2937',
      cardBg: 'bg-white/90'
    },
    gradients: {
      hero: 'from-blue-600 via-purple-600 to-indigo-600',
      section: 'from-slate-50 via-blue-50 to-indigo-50',
      button: 'from-blue-500 to-indigo-500',
      card: 'from-white/90 to-blue-50/80'
    },
    animations: {
      float: 'animate-pulse',
      pulse: 'animate-ping',
      bounce: 'animate-bounce'
    }
  },
  neon: {
    id: 'neon',
    name: 'Neon Glow',
    description: 'Electric and vibrant neon theme',
    icon: '⚡',
    colors: {
      primary: '#ff0080',
      secondary: '#00ff80',
      accent: '#ffff00',
      background: 'from-gray-900 via-purple-900 to-gray-900',
      text: '#ffffff',
      cardBg: 'bg-gray-800/80'
    },
    gradients: {
      hero: 'from-pink-500 via-cyan-400 to-yellow-400',
      section: 'from-gray-900 via-purple-900 to-gray-900',
      button: 'from-pink-500 to-cyan-400',
      card: 'from-gray-800/80 to-purple-800/60'
    },
    animations: {
      float: 'animate-pulse',
      pulse: 'animate-ping',
      bounce: 'animate-bounce'
    }
  },
  vintage: {
    id: 'vintage',
    name: 'Vintage Charm',
    description: 'Warm and nostalgic colors',
    icon: '🌻',
    colors: {
      primary: '#d97706',
      secondary: '#dc2626',
      accent: '#059669',
      background: 'from-amber-50 via-orange-50 to-red-50',
      text: '#78716c',
      cardBg: 'bg-amber-50/90'
    },
    gradients: {
      hero: 'from-amber-600 via-orange-500 to-red-500',
      section: 'from-amber-50 via-orange-50 to-red-50',
      button: 'from-amber-500 to-red-500',
      card: 'from-amber-50/90 to-orange-50/80'
    },
    animations: {
      float: 'animate-bounce',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce'
    }
  },
  galaxy: {
    id: 'galaxy',
    name: 'Galaxy Dream',
    description: 'Cosmic and starry night theme',
    icon: '🌌',
    colors: {
      primary: '#7c3aed',
      secondary: '#1e40af',
      accent: '#f59e0b',
      background: 'from-indigo-900 via-purple-900 to-pink-900',
      text: '#e5e7eb',
      cardBg: 'bg-indigo-800/60'
    },
    gradients: {
      hero: 'from-indigo-600 via-purple-600 to-pink-600',
      section: 'from-indigo-900 via-purple-900 to-pink-900',
      button: 'from-indigo-500 to-purple-600',
      card: 'from-indigo-800/60 to-purple-800/40'
    },
    animations: {
      float: 'animate-pulse',
      pulse: 'animate-ping',
      bounce: 'animate-bounce'
    }
  }
};