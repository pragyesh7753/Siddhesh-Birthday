import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Heart, Download, Share2, Camera, Grid } from 'lucide-react';

interface Photo {
  url: string;
  caption: string;
  likes: number;
  tags: string[];
  id: number;
}

const photos: Photo[] = [
  {
    id: 0,
    url: '/asli-coder.jpg',
    caption: 'Happy Birthday Siddhesh! 🎂',
    likes: 50,
    tags: ['birthday', 'siddhesh', 'special']
  },
  {
    id: 1,
    url: '/duo.jpg',

    caption: 'Celebrating Life',
    likes: 24,
    tags: ['celebration', 'life', 'joy']
  },
  {
    id: 2,
    url: '/friends.jpg',

    caption: 'Special Moments',
    likes: 18,
    tags: ['special', 'moments', 'memory']
  },
  {
    id: 3,
    url: '/trio.jpg',
    caption: 'Making Memories',
    likes: 27,
    tags: ['memories', 'friends', 'fun']
  }
];

type FilterType = 'all' | 'celebration' | 'memory' | 'joy';

export default function PhotoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());
  const [autoPlay, setAutoPlay] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (photoId: number) => {
    setImageErrors(prev => new Set([...prev, photoId]));
  };

  const filteredPhotos = photos.filter(photo =>
    selectedFilter === 'all' || photo.tags.includes(selectedFilter)
  );

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredPhotos.length, autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setAutoPlay(false);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setAutoPlay(true);
  };

  const toggleLike = (photoId: number) => {
    setLikedPhotos(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(photoId)) {
        newLikes.delete(photoId);
      } else {
        newLikes.add(photoId);
      }
      return newLikes;
    });
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  if (filteredPhotos.length === 0) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Memory Lane</h2>
          <p className="text-xl text-gray-600">No photos match your filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Memory Lane
          </h2>
          <p className="text-xl text-gray-600">Capturing the beautiful moments of life ✨</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {[
              { key: 'all', label: 'All', icon: '🎯' },
              { key: 'celebration', label: 'Celebration', icon: '🎉' },
              { key: 'memory', label: 'Memories', icon: '💝' },
              { key: 'joy', label: 'Joy', icon: '😊' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as FilterType)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedFilter === filter.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/80'
                  }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="bg-white/60 backdrop-blur-sm hover:bg-white/80 text-gray-700 rounded-full p-3 shadow-lg transition-all hover:scale-105"
          >
            {isGridView ? <Camera className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          </button>
        </div>

        {isGridView ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  {imageErrors.has(photo.id) ? (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Photo Loading...</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(photo.id)}
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-2">{photo.caption}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">❤️ {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                      <div className="flex gap-2">
                        <ZoomIn className="w-5 h-5 text-white/80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Slideshow View */
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative aspect-video">
              {imageErrors.has(filteredPhotos[currentIndex].id) ? (
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Loading beautiful moments...</p>
                  </div>
                </div>
              ) : (
                <img
                  src={filteredPhotos[currentIndex].url}
                  alt={filteredPhotos[currentIndex].caption}
                  className="w-full h-full object-cover animate-fade-in cursor-pointer"
                  key={currentIndex}
                  onClick={() => openLightbox(currentIndex)}
                  onError={() => handleImageError(filteredPhotos[currentIndex].id)}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-8 flex justify-between items-end w-full">
                  <div>
                    <p className="text-white text-2xl font-semibold mb-2">
                      {filteredPhotos[currentIndex].caption}
                    </p>
                    <div className="flex items-center gap-4 text-white/80">
                      <span>❤️ {filteredPhotos[currentIndex].likes + (likedPhotos.has(filteredPhotos[currentIndex].id) ? 1 : 0)}</span>
                      <span>#{filteredPhotos[currentIndex].tags.join(' #')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(filteredPhotos[currentIndex].id);
                      }}
                      className={`p-2 rounded-full transition-all ${likedPhotos.has(filteredPhotos[currentIndex].id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(currentIndex);
                      }}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                    }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              {imageErrors.has(filteredPhotos[lightboxIndex].id) ? (
                <div className="w-full h-96 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <Camera className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-xl">Photo not available</p>
                  </div>
                </div>
              ) : (
                <img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  onError={() => handleImageError(filteredPhotos[lightboxIndex].id)}
                />
              )}

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Info Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{filteredPhotos[lightboxIndex].caption}</h3>
                    <p className="text-white/80">#{filteredPhotos[lightboxIndex].tags.join(' #')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleLike(filteredPhotos[lightboxIndex].id)}
                      className={`p-2 rounded-full transition-all ${likedPhotos.has(filteredPhotos[lightboxIndex].id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 hover:bg-white/30'
                        }`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => downloadImage(filteredPhotos[lightboxIndex].url, `birthday-photo-${filteredPhotos[lightboxIndex].id}.jpg`)}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
