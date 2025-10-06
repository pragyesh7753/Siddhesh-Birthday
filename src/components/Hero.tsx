import { Cake, Sparkles } from 'lucide-react';
import Confetti from './Confetti';
import BirthdayPersonImage from './BirthdayPersonImage';

interface HeroProps {
  showConfetti: boolean;
}

export default function Hero({ showConfetti }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {showConfetti && <Confetti />}

      <div className="text-center z-10 px-4 animate-fade-in">
        {/* Birthday person's image */}
        <div className="flex justify-center mb-6">
          <BirthdayPersonImage 
            size="hero" 
            src="/images/asli-coder.jpg"
            className="animate-bounce-slow"
          />
        </div>

        <div className="flex justify-center mb-6 animate-bounce-slow">
          <Cake className="w-16 h-16 text-pink-500" strokeWidth={1.5} />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
          Happy Birthday
        </h1>

        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Siddhesh Pagar!  उर्फ़  Asli COder
        </h2>

        <div className="flex justify-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          <p className="text-xl md:text-2xl text-gray-700">
            October 6th Special Celebration
          </p>
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>

        <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg">
          <p className="text-lg font-medium text-gray-700">
            Wishing you a day filled with joy and happiness!
          </p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-pink-400 rounded-full opacity-20 animate-float-delayed"></div>
      </div>
    </div>
  );
}
