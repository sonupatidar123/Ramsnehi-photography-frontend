import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import API_BASE_URL from '../config';

const GallerySection = ({ title, category, categories, lightBg = false, staticItems = [] }) => {
  const [dynamicItems, setDynamicItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const isMulti = Array.isArray(categories) && categories.length > 0;
  const categoriesKey = JSON.stringify(categories);

  // Fetch additional images from backend when expanded
  useEffect(() => {
    if (!expanded) return;

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/gallery/`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        let allItems = Array.isArray(data) ? data : data.results ?? [];

        // Filter by category
        if (isMulti) {
          allItems = allItems.filter((item) => categories.includes(item.category));
        } else if (category) {
          allItems = allItems.filter((item) => item.category === category);
        }

        // Remove items that match static item IDs (avoid duplicates)
        const staticIds = new Set(staticItems.map((item) => item.id));
        const newDynamic = allItems.filter((item) => !staticIds.has(item.id));

        setDynamicItems(newDynamic);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [expanded, category, categoriesKey, isMulti, categories, staticItems]);

  // Resolve image URL (handles imported, local, and backend URLs)
  const resolveUrl = useCallback((url) => {
    if (!url) return '';
    // Already an absolute URL (http/https)
    if (url.startsWith('http')) return url;
    // Local file (imported or public folder)
    if (url.startsWith('/')) return url;
    // Backend relative URL - add API base
    return `${API_BASE_URL}${url}`;
  }, []);

  // Display logic:
  // - Not expanded: show first 4 static items only
  // - Expanded: show ALL static items + ALL dynamic items from backend
  const displayItems = expanded
    ? [...staticItems, ...dynamicItems]
    : staticItems.slice(0, 4);

  // Debug logging
  React.useEffect(() => {
    console.log(`[GallerySection: ${title}]`, {
      staticItemsCount: staticItems.length,
      dynamicItemsCount: dynamicItems.length,
      displayItemsCount: displayItems.length,
      expanded,
      staticItems,
      displayItems
    });
  }, [title, staticItems, dynamicItems, displayItems, expanded]);
  const shouldShowButton = staticItems.length > 0;

  return (
    <section className={`py-24 ${lightBg ? 'bg-white' : 'bg-[#fcfcfc]'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-gray-900" />
          <h2 className="text-2xl font-serif tracking-[0.2em] uppercase text-gray-900">{title}</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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

        {/* Loading indicator when fetching more */}
        {loading && expanded && (
          <p className="text-center text-gray-400 tracking-widest text-xs uppercase py-10">
            Loading more...
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="text-center text-red-500 py-10">{error}</p>
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

        {/* Explore More / Show Less Button */}
        {shouldShowButton && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              disabled={loading}
              className="group relative inline-flex items-center gap-6 px-12 py-5 border border-gray-900 overflow-hidden transition-all hover:shadow-lg disabled:opacity-50"
            >
              <span
                className={`relative z-10 text-xs uppercase tracking-[0.4em] transition-colors duration-300 ${
                  expanded ? 'text-white' : 'text-gray-900'
                } group-hover:text-white`}
              >
                {expanded ? '← Show Less' : 'Explore More →'}
              </span>
              <div
                className={`absolute inset-0 bg-gray-900 transition-all duration-500 ${
                  expanded ? 'w-full' : 'w-0 group-hover:w-full'
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
