import { User } from 'lucide-react';

interface BirthdayPersonImageProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
}

export default function BirthdayPersonImage({ 
  src, 
  alt = "Siddhesh Pagar", 
  size = 'medium',
  className = ''
}: BirthdayPersonImageProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    hero: 'w-40 h-40 md:w-48 md:h-48'
  };

  const placeholderSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    hero: 'w-20 h-20 md:w-24 md:h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-full border-4 border-pink-300 shadow-lg bg-gradient-to-br from-pink-100 to-purple-100`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, show placeholder
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      
      <div className={`${src ? 'hidden' : ''} absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200`}>
        <User className={`${placeholderSizes[size]} text-pink-600`} />
      </div>
      
      {/* Add a subtle animation border */}
      <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-pulse opacity-50"></div>
    </div>
  );
}