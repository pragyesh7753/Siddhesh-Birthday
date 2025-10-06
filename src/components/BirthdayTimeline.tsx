import { useState } from 'react';
import { Calendar, Heart, Star, Gift, Award, Cake } from 'lucide-react';

interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  type: 'birthday' | 'achievement' | 'memory' | 'milestone';
}

export default function BirthdayTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeYear, setActiveYear] = useState<number>(2025);

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      year: 2025,
      title: "June - Introduction",
      description: "The beginning of an amazing journey! Getting to know each other and building the foundation of great memories.",
      icon: "👋",
      color: "from-green-500 to-teal-500",
      type: "milestone"
    },
    {
      id: 2,
      year: 2025,
      title: "July - Workload Handling",
      description: "Tackling challenges together and showing incredible teamwork. Managing heavy workloads with dedication and skill.",
      icon: "💼",
      color: "from-blue-500 to-indigo-500",
      type: "achievement"
    },
    {
      id: 3,
      year: 2025,
      title: "August - Mauj-Masti",
      description: "Time for fun and celebration! Creating joyful moments and unforgettable memories filled with laughter and happiness in between of all workloads.",
      icon: "🎉",
      color: "from-yellow-500 to-orange-500",
      type: "memory"
    },
    {
      id: 4,
      year: 2025,
      title: "September - Farewell",
      description: "A bittersweet goodbye marking the end of an incredible journey. Celebrating all the achievements and memories made together.",
      icon: "👋",
      color: "from-purple-500 to-pink-500",
      type: "birthday"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'birthday': return <Cake className="w-6 h-6" />;
      case 'achievement': return <Award className="w-6 h-6" />;
      case 'memory': return <Heart className="w-6 h-6" />;
      case 'milestone': return <Star className="w-6 h-6" />;
      default: return <Calendar className="w-6 h-6" />;
    }
  };

  const years = [...new Set(timelineEvents.map(event => event.year))].sort((a, b) => b - a);

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Journey Through Time
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the beautiful moments, achievements, and memories that make life special ✨
          </p>
        </div>

        {/* Year Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeYear === year
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:bg-white/80'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-lg"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents
              .filter(event => event.year === activeYear)
              .map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } group`}
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                      <div className="text-white text-2xl">{event.icon}</div>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      selectedEvent?.id === event.id ? 'ring-4 ring-purple-300 scale-105' : ''
                    }`}>
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${event.color} text-white mr-3`}>
                          {getIcon(event.type)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                          <p className="text-sm text-gray-500">{event.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                      
                      {selectedEvent?.id === event.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
                          <div className="flex items-center gap-2 text-sm text-purple-600">
                            <Gift className="w-4 h-4" />
                            <span>Click to collapse details</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Add Memory Button */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 group-hover:animate-pulse" />
              <span>Add Your Memory</span>
              <Star className="w-6 h-6 group-hover:animate-spin" />
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Years Celebrated', value: years.length, icon: '🎂' },
            { label: 'Amazing Memories', value: timelineEvents.length, icon: '💝' },
            { label: 'Achievements', value: timelineEvents.filter(e => e.type === 'achievement').length, icon: '🏆' },
            { label: 'Milestones', value: timelineEvents.filter(e => e.type === 'milestone').length, icon: '⭐' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}