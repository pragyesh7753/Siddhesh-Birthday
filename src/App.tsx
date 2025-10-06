import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import PhotoSlideshow from './components/PhotoSlideshow';
import PersonalMessage from './components/PersonalMessage';
import CountdownTimer from './components/CountdownTimer';
import Guestbook from './components/Guestbook';
import ShareButtons from './components/ShareButtons';
import MusicPlayer from './components/MusicPlayer';
import BirthdayCake3D from './components/BirthdayCake3D';
import BirthdayTimeline from './components/BirthdayTimeline';
import FloatingWishes from './components/FloatingWishes';
import BirthdayMemoryGame from './components/BirthdayMemoryGame';
import BirthdayShayari from './components/BirthdayShayari';
import { ThemeProvider } from './components/ThemeContext';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function ThemedApp() {
  const [showConfetti, setShowConfetti] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.colors.background} transition-all duration-500`}>
      <MusicPlayer />
      <ThemeSelector />
      <FloatingWishes />
      <Hero showConfetti={showConfetti} />
      <BirthdayCake3D />
      <BirthdayTimeline />
      <PhotoSlideshow />
      <BirthdayShayari />
      <BirthdayMemoryGame />
      <PersonalMessage />
      <CountdownTimer />
      <Guestbook />
      <ShareButtons />

      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>"Made with ❤️ by Pragyesh for Siddhesh Pagar</p>
      </footer>
    </div>
  );
}
function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
