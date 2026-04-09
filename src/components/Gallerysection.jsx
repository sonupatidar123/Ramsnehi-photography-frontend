import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import API_BASE_URL from '../config';

// GET /api/gallery/
// Returns: [{ id, title, category, image }]
// image is an absolute URL from the backend (Cloudinary / S3 / media)

const GallerySection = ({ title, category, categories, lightBg = false }) => {
  const [items,         setItems]         = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [showAll,       setShowAll]       = useState(false);
  const [visibleCount,  setVisibleCount]  = useState(6);
  const [selectedImage, setSelectedImage] = useState(null);

  const isMulti = Array.isArray(categories) && categories.length > 0;

  // ── Responsive visible count ─────────────────────────────────────
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640)       setVisibleCount(3);
      else if (window.innerWidth < 1024) setVisibleCount(4);
      else                               setVisibleCount(6);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // ── Fetch gallery ────────────────────────────────────────────────
  // Stable dep for categories array — serialise to string to avoid
  // infinite re-fetch when parent passes a new array reference each render.
  const categoriesKey = JSON.stringify(categories);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/gallery/`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        const allItems = Array.isArray(data) ? data : data.results ?? [];

        if (isMulti) {
          setItems(allItems.filter((item) => categories.includes(item.category)));
        } else if (category) {
          setItems(allItems.filter((item) => item.category === category));
        } else {
          setItems(allItems);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoriesKey]);

  // ── Resolve image URL (handles relative & absolute) ──────────────
  const resolveUrl = useCallback(
    (url) => (url && url.startsWith('http') ? url : `${API_BASE_URL}${url}`),
    [],
  );

  const displayItems = showAll ? items : items.slice(0, visibleCount);

  return (
    <section className={`py-24 ${lightBg ? 'bg-white' : 'bg-[#fcfcfc]'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-gray-900" />
          <h2 className="text-2xl font-serif tracking-[0.2em] uppercase text-gray-900">{title}</h2>
        </div>

        {loading && (
          <p className="text-center text-gray-400 tracking-widest text-xs uppercase py-10">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {displayItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-sm">
                    <img
                      src={resolveUrl(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <p className="text-white text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white pb-1">
                        View Full Size
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <h4 className="text-gray-800 text-sm font-medium tracking-wide uppercase italic">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 md:p-10"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>

              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                src={resolveUrl(selectedImage.image)}
                className="max-w-full max-h-full object-contain shadow-2xl"
                alt={selectedImage.title}
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-8 left-0 w-full text-center">
                <p className="text-white font-serif tracking-[0.2em] uppercase text-sm">
                  {selectedImage.title}
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explore More / Show Less */}
        {!loading && !error && items.length > visibleCount && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group relative inline-flex items-center gap-6 px-12 py-5 border border-gray-900 overflow-hidden transition-all"
            >
              <span
                className={`relative z-10 text-xs uppercase tracking-[0.4em] transition-colors duration-300 ${
                  showAll ? 'text-white' : 'text-gray-900'
                } group-hover:text-white`}
              >
                {showAll ? 'Show Less' : `Explore More ${title}`}
              </span>
              <div
                className={`absolute inset-0 bg-gray-900 transition-all duration-500 ${
                  showAll ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;