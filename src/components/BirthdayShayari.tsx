import { useState, useEffect } from 'react';

export default function BirthdayShayari() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${12 + Math.random() * 8}px`,
            }}
          >
            {i % 4 === 0 ? '✨' : i % 4 === 1 ? '💖' : i % 4 === 2 ? '🌸' : '💫'}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            💝 दिल से दिल तक 💝
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            कोडर सिद्धेश के लिए खास शायरी
          </p>
        </div>

        {/* Shayari Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* First Shayari */}
          <div className="group hover:scale-105 transition-all duration-500">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">खुशियों की दुआ</h3>
              </div>
              
              <div className="space-y-4 text-center">
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-pink-600 transition-colors">
                  तेरे चेहरे की मुस्कान सदा सलामत रहे,
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-pink-600 transition-colors">
                  तेरी हर दुआ में खुदा की रहमत रहे।
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-pink-600 transition-colors">
                  जिंदगी में आए खुशियों का कारवाँ,
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-pink-600 transition-colors">
                  और तेरा हर दिन तेरे नाम जैसा रोशन रहे।
                </p>
              </div>
              
              <div className="text-center mt-6">
                <span className="text-3xl">💝</span>
              </div>
            </div>
          </div>

          {/* Second Shayari */}
          <div className="group hover:scale-105 transition-all duration-500">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🌸</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">दोस्ती का एहसास</h3>
              </div>
              
              <div className="space-y-4 text-center">
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-emerald-600 transition-colors">
                  मोटाभाई हमारी जान हैं,
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-emerald-600 transition-colors">
                  दोस्ती की पहचान हैं।
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-emerald-600 transition-colors">
                  हर कदम पर साथ निभाएँगे,
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-emerald-600 transition-colors">
                  ये रिश्ता उम्रभर की शान है।
                </p>
              </div>
            </div>
          </div>

          {/* Third Shayari */}
          <div className="group hover:scale-105 transition-all duration-500">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">😎</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">स्टाइल का सितारा</h3>
              </div>
              
              <div className="space-y-4 text-center">
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-orange-600 transition-colors">
                  मोटाभाई की बात ही न्यारी है,
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-orange-600 transition-colors">
                  उनकी दोस्ती सबसे प्यारी है।
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-orange-600 transition-colors">
                  स्टाइल में, स्माइल में सबसे आगे,
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed hover:text-orange-600 transition-colors">
                  यारों के दिलों के वो असली अधिकारी हैं।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg border-2 border-pink-200">
            <span className="text-2xl animate-bounce">🎂</span>
            <span className="text-lg font-bold text-gray-700">Happy Birthday Siddhesh Pagar (#Asli Coder)</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🎉</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce opacity-60" style={{animationDelay: '1s'}}>
          🌟
        </div>
        <div className="absolute top-16 right-16 text-3xl animate-bounce opacity-60" style={{animationDelay: '2s'}}>
          ✨
        </div>
        <div className="absolute bottom-10 left-16 text-4xl animate-bounce opacity-60" style={{animationDelay: '1.5s'}}>
          💫
        </div>
        <div className="absolute bottom-16 right-10 text-3xl animate-bounce opacity-60" style={{animationDelay: '0.5s'}}>
          🎊
        </div>
      </div>
    </section>
  );
}