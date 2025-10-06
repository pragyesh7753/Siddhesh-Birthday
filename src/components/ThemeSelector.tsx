import { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-20 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-4 shadow-lg transition-all hover:scale-110 group"
        aria-label="Change theme"
      >
        <Palette className="w-6 h-6 text-purple-600" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4 min-w-[300px] animate-fade-in">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Choose Your Theme</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setTheme(theme.id);
                  setIsOpen(false);
                }}
                className={`relative p-4 rounded-xl transition-all duration-300 text-left group hover:scale-105 ${
                  currentTheme.id === theme.id
                    ? 'ring-2 ring-purple-500 bg-purple-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme.gradients.hero} flex items-center justify-center text-xl shadow-lg`}
                  >
                    {theme.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-600">
                      {theme.name}
                    </h4>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>

                  {currentTheme.id === theme.id && (
                    <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Theme Preview */}
                <div className="mt-3 flex gap-2">
                  <div 
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.gradients.button} shadow-sm`}
                  />
                  <div 
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.gradients.hero} shadow-sm opacity-70`}
                  />
                  <div 
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.gradients.card} border shadow-sm`}
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              🎨 Theme changes are saved automatically
            </p>
          </div>
        </div>
      )}

      {/* Background overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}