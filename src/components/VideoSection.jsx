import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';

// GET /api/films/
// Returns: [{ id, title, video_id, type, thumbnail? }]

const VideoCard = ({ videoId, title, thumbnail }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Prefer backend thumbnail, fall back to YouTube maxres default
  const thumbnailUrl =
    thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="relative aspect-video bg-zinc-900 rounded-sm overflow-hidden shadow-2xl cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black"
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
              className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors z-40"
            >
              <X size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.div key="thumbnail" className="h-full w-full">
            {/* Static thumbnail */}
            <img
              src={thumbnailUrl}
              alt={title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
              }`}
            />

            {/* Muted preview on hover */}
            {isHovered && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                <iframe
                  className="w-full h-full scale-110"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&start=10`}
                  allow="autoplay"
                  title={`${title} preview`}
                />
              </div>
            )}

            {/* Gradient overlay + title + play button */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-transparent to-black/20 p-6 flex flex-col justify-between transition-opacity duration-500 group-hover:opacity-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-xs font-serif">R</span>
                </div>
                <h3 className="text-white font-serif text-lg tracking-wide">{title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-12 bg-red-600/90 rounded-xl flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:scale-110">
                  <Play size={24} fill="white" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VideoSection = () => {
  const [films,   setFilms]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/films/`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setFilms(Array.isArray(data) ? data : data.results ?? []);
      } catch (err) {
        console.error('Films fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf9]">
        <Loader2 className="animate-spin text-zinc-400" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf9]">
        <p className="text-red-400 text-sm uppercase tracking-widest">
          Unable to load films. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="px-6 py-24 bg-[#fdfbf9] min-h-screen font-serif">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl text-zinc-900 mb-4">Cinematic Gallery</h2>
          <p className="text-zinc-500 italic">Every frame tells a story of royalty</p>
        </div>

        {films.length === 0 ? (
          <p className="text-center text-zinc-400 italic py-10">No films available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {films.map((film) => (
              <VideoCard
                key={film.id}
                videoId={film.video_id}
                title={film.title}
                thumbnail={film.thumbnail}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;