import { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Star, Timer } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameStats {
  moves: number;
  matches: number;
  timeElapsed: number;
  bestTime: number;
  gamesPlayed: number;
  totalMatches: number;
}

const emojis = ['🎂', '🎈', '🎁', '🎉', '🎊', '💫', '🎵', '🎯'];

export default function BirthdayMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    timeElapsed: 0,
    bestTime: 0,
    gamesPlayed: 0,
    totalMatches: 0
  });
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16);

    const newCards: Card[] = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setGameWon(false);
    setGameStarted(true);
    setShowCelebration(false);
    setGameStats(prev => ({
      ...prev,
      moves: 0,
      matches: 0,
      timeElapsed: 0
    }));
  };

  const flipCard = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }));
      
      setTimeout(() => {
        checkMatch(newFlippedCards);
      }, 1000);
    }
  };

  const checkMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
      // Match found
      setCards(prev => prev.map(card => 
        card.id === firstId || card.id === secondId 
          ? { ...card, isMatched: true } 
          : card
      ));
      
      setGameStats(prev => ({ 
        ...prev, 
        matches: prev.matches + 1,
        totalMatches: prev.totalMatches + 1
      }));
    } else {
      // No match - flip cards back
      setCards(prev => prev.map(card => 
        card.id === firstId || card.id === secondId 
          ? { ...card, isFlipped: false } 
          : card
      ));
    }

    setFlippedCards([]);
  };

  const resetGame = () => {
    initializeGame();
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setGameStats(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Check for game completion
  useEffect(() => {
    if (gameStats.matches === 8 && gameStarted) {
      setGameWon(true);
      setGameStarted(false);
      setShowCelebration(true);
      
      setGameStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        bestTime: prev.bestTime === 0 ? prev.timeElapsed : Math.min(prev.bestTime, prev.timeElapsed)
      }));

      // Save stats to localStorage
      const stats = {
        ...gameStats,
        gamesPlayed: gameStats.gamesPlayed + 1,
        bestTime: gameStats.bestTime === 0 ? gameStats.timeElapsed : Math.min(gameStats.bestTime, gameStats.timeElapsed)
      };
      localStorage.setItem('birthday-memory-stats', JSON.stringify(stats));
    }
  }, [gameStats.matches, gameStarted, gameStats]);

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('birthday-memory-stats');
    if (savedStats) {
      setGameStats(JSON.parse(savedStats));
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = () => {
    if (gameStats.moves <= 12) return { level: 'Amazing!', color: 'text-green-600', emoji: '🌟' };
    if (gameStats.moves <= 20) return { level: 'Great!', color: 'text-blue-600', emoji: '⭐' };
    if (gameStats.moves <= 30) return { level: 'Good!', color: 'text-yellow-600', emoji: '👍' };
    return { level: 'Keep trying!', color: 'text-purple-600', emoji: '💪' };
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🧠 Birthday Memory Game
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Match the birthday-themed pairs and test your memory! 🎯
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Timer className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{formatTime(gameStats.timeElapsed)}</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <RotateCcw className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-700">Moves</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{gameStats.moves}</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-700">Matches</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{gameStats.matches}/8</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-700">Best</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {gameStats.bestTime > 0 ? formatTime(gameStats.bestTime) : '--:--'}
            </div>
          </div>
        </div>

        {/* Game Board */}
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎮</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Play?</h3>
            <p className="text-gray-600 mb-6">Test your memory with birthday-themed cards!</p>
            <button
              onClick={initializeGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 Start Game
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-8">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => flipCard(card.id)}
                className={`aspect-square rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200'
                    : 'bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500'
                }`}
              >
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                  {card.isFlipped || card.isMatched ? card.emoji : '?'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Game Controls */}
        {cards.length > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              New Game
            </button>
          </div>
        )}

        {/* Win Celebration */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h3>
              <p className="text-gray-600 mb-6">You completed the memory game!</p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Time:</span> {formatTime(gameStats.timeElapsed)}
                  </div>
                  <div>
                    <span className="font-semibold">Moves:</span> {gameStats.moves}
                  </div>
                </div>
                <div className={`mt-2 font-bold ${getPerformanceLevel().color}`}>
                  {getPerformanceLevel().emoji} {getPerformanceLevel().level}
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setGameWon(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setGameWon(false);
                    initializeGame();
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              >
                {['🎉', '🎊', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        {/* Overall Stats */}
        {gameStats.gamesPlayed > 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🏆 Your Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{gameStats.gamesPlayed}</div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">{gameStats.totalMatches}</div>
                <div className="text-sm text-gray-600">Total Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {gameStats.bestTime > 0 ? formatTime(gameStats.bestTime) : '--:--'}
                </div>
                <div className="text-sm text-gray-600">Best Time</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}