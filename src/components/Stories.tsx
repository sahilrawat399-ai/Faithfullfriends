import React, { useState } from 'react';
import { ArrowRight, X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { StoryItem } from '../types';
import { STORIES_OF_CHANGE } from '../data/mockData';

export const Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <section id="stories" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Ground Realities</span>
            <span aria-hidden="true">·</span>
            <span>Voices of Transformation</span>
            <span aria-hidden="true">·</span>
            <span>Real Impact</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-4"
          >
            Stories of Hope & Change.
          </h2>

          <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed font-normal">
            Behind every number is a human being or an innocent animal whose life was touched.
            These genuine accounts reflect the quiet triumphs made possible by your support.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES_OF_CHANGE.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-xl overflow-hidden border border-[#103D2B]/12 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] uppercase tracking-wider text-[#D6B46A] font-semibold">
                      {story.cause}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Clean unboxed metadata (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <span>{story.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.metrics}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#103D2B] group-hover:text-[#176B4D] transition-colors leading-snug mb-3">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#202720]/75 line-clamp-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedStory(story)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B4D] hover:text-[#103D2B] transition-colors group/btn cursor-pointer"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Story Full Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F0] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#103D2B]/20">
            <div className="relative h-64 sm:h-80">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B46A] font-semibold mb-1">
                  <span>{selectedStory.cause}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedStory.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {selectedStory.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-[#202720]">
              <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-[#202720]/85">
                {selectedStory.fullStory}
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#103D2B]/10 flex items-center justify-between text-xs text-stone-600">
                <span className="font-medium text-[#103D2B]">
                  Impact Verified: {selectedStory.metrics}
                </span>
                <span className="italic">Field verified documentation</span>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#103D2B]/10">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2.5 bg-[#176B4D] hover:bg-[#103D2B] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
