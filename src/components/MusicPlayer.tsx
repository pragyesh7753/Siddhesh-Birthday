import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAutoplayMessage, setShowAutoplayMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      
      // Try to autoplay when component mounts
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
          setIsMuted(false);
        } catch {
          // Autoplay failed, likely due to browser policy
          console.log('Autoplay failed, user interaction required');
          setIsMuted(true);
          setIsPlaying(false);
          setShowAutoplayMessage(true);
        }
      };

      playAudio();
    }

    // Add click listener to document to try autoplay on first user interaction
    const handleFirstInteraction = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
          setShowAutoplayMessage(false);
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        } catch {
          console.log('Failed to start audio on user interaction');
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMute = async () => {
    if (audioRef.current) {
      if (isMuted || !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
          setShowAutoplayMessage(false);
        } catch {
          console.log('Failed to play audio');
        }
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {/* Autoplay message */}
      {showAutoplayMessage && (
        <div className="fixed top-6 left-6 z-50 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <p className="text-sm">🎵 Click anywhere to start the birthday music!</p>
        </div>
      )}
      
      <div className="fixed top-6 right-6 z-50">
        <button
        onClick={toggleMute}
        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-4 shadow-lg transition-all hover:scale-110 group"
        aria-label={isMuted || !isPlaying ? 'Play music' : 'Pause music'}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-6 h-6 text-gray-600" />
        ) : (
          <Volume2 className="w-6 h-6 text-pink-500 animate-pulse" />
        )}
      </button>

      <audio 
        ref={audioRef} 
        loop 
        autoPlay 
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          // src="/happy-birthday-220024.mp3"
          // src="/beautiful-sexy-and-forty-40th-birthday-song-for-a-woman-413089.mp3"
          src="/Haye Re Mere Yaar Ka Birthday-(Mr-Jat.in).mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="absolute top-full mt-2 right-0 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        <p className="text-xs text-gray-600">
          {isMuted || !isPlaying ? 'Click to play music' : 'Music playing'}
        </p>
      </div>
    </div>
    </>
  );
}
