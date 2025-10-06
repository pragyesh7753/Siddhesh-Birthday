import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import './BirthdayCake3D.css';

interface Candle {
  id: number;
  isLit: boolean;
  x: number;
  y: number;
}

export default function BirthdayCake3D() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  useEffect(() => {
    const initialCandles: Candle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      isLit: true,
      x: 50 + (i % 4) * 100 - 150 + Math.random() * 20,
      y: 40 + Math.floor(i / 4) * 40 + Math.random() * 10,
    }));
    setCandles(initialCandles);
  }, []);

  const blowCandle = (id: number) => {
    setCandles(prev => prev.map(candle => 
      candle.id === id ? { ...candle, isLit: false } : candle
    ));
  };

  useEffect(() => {
    const litCandles = candles.filter(candle => candle.isLit);
    if (candles.length > 0 && litCandles.length === 0 && !allCandlesBlown) {
      setAllCandlesBlown(true);
      setShowWish(true);
    }
  }, [candles, allCandlesBlown]);

  const relightCandles = () => {
    setCandles(prev => prev.map(candle => ({ ...candle, isLit: true })));
    setAllCandlesBlown(false);
    setShowWish(false);
  };

  return (
    <div className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Make a Wish! 🎂
        </h2>
        
        <div className="relative mx-auto" style={{ width: '400px', height: '500px' }}>
          {/* 3D Cake Base */}
          <div className="cake-container">
            <div className="cake-base">
              <div className="cake-layer cake-layer-1">
                <div className="cake-side cake-side-front"></div>
                <div className="cake-side cake-side-back"></div>
                <div className="cake-side cake-side-left"></div>
                <div className="cake-side cake-side-right"></div>
                <div className="cake-top"></div>
              </div>
              
              <div className="cake-layer cake-layer-2">
                <div className="cake-side cake-side-front"></div>
                <div className="cake-side cake-side-back"></div>
                <div className="cake-side cake-side-left"></div>
                <div className="cake-side cake-side-right"></div>
                <div className="cake-top"></div>
              </div>
              
              <div className="cake-layer cake-layer-3">
                <div className="cake-side cake-side-front"></div>
                <div className="cake-side cake-side-back"></div>
                <div className="cake-side cake-side-left"></div>
                <div className="cake-side cake-side-right"></div>
                <div className="cake-top"></div>
              </div>
            </div>

            {/* Candles */}
            {candles.map((candle) => (
              <div
                key={candle.id}
                className={`candle ${candle.isLit ? 'lit' : 'blown'}`}
                style={{
                  left: `${candle.x}px`,
                  top: `${candle.y}px`,
                }}
                onClick={() => blowCandle(candle.id)}
              >
                <div className="candle-stick"></div>
                {candle.isLit && (
                  <div className="flame">
                    <div className="flame-inner"></div>
                  </div>
                )}
                {candle.isLit && <div className="candle-glow"></div>}
              </div>
            ))}

            {/* Cake Decorations */}
            <div className="decoration decoration-1"></div>
            <div className="decoration decoration-2"></div>
            <div className="decoration decoration-3"></div>
            <div className="decoration decoration-4"></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8">
          {!allCandlesBlown ? (
            <p className="text-lg text-gray-600 mb-4">
              Click on the candles to blow them out! 🕯️
            </p>
          ) : (
            <div className="space-y-4">
              <div className="text-2xl font-bold text-pink-600 animate-pulse">
                🎉 All candles blown! Your wish will come true! 🎉
              </div>
              <button
                onClick={relightCandles}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                Light Candles Again
              </button>
            </div>
          )}
        </div>

        {/* Wish Animation */}
        {showWish && (
          <div className="wish-animation">
            <div className="wish-text">✨ Happy Birthday Siddhesh! ✨</div>
          </div>
        )}
      </div>
    </div>
  );
}