import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'children', label: "Children's Meals" },
    { id: 'meals', label: 'Hunger Relief' },
    { id: 'cows', label: 'Gau Seva' },
    { id: 'community', label: 'Community Drives' },
    { id: 'volunteers', label: 'Volunteers in Action' }
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Visual Documentation</span>
            <span aria-hidden="true">·</span>
            <span>Ground Realities</span>
            <span aria-hidden="true">·</span>
            <span>Activity Archive</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-4"
          >
            Moments of Compassion.
          </h2>

          <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed font-normal">
            A photographic chronicle of our daily food distribution drives, animal welfare care,
            and dedicated community service across northern India.
          </p>
        </div>

        {/* Interactive Segmented Control (Category Filters) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#103D2B]/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#103D2B] text-white shadow-sm'
                  : 'bg-white text-[#202720]/75 hover:text-[#103D2B] hover:bg-stone-100 border border-[#103D2B]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-white rounded-xl overflow-hidden border border-[#103D2B]/10 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2.5 rounded-full text-[#103D2B] shadow-md scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#103D2B] group-hover:text-[#176B4D] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#202720]/75 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                {/* Clean Unboxed Metadata */}
                <div className="mt-4 pt-3 border-t border-[#103D2B]/10 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#176B4D]" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#176B4D]" />
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-white">
            <div className="text-xs">
              <span className="font-semibold text-[#D6B46A]">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <span className="mx-2">·</span>
              <span>{filteredItems[lightboxIndex].title}</span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Centered Image & Caption */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-center text-white mt-4 max-w-2xl px-4">
              <h3 className="font-serif font-bold text-lg text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {filteredItems[lightboxIndex].caption}
              </p>
              <p className="text-[11px] text-[#D6B46A] mt-2">
                {filteredItems[lightboxIndex].location} · {filteredItems[lightboxIndex].date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
