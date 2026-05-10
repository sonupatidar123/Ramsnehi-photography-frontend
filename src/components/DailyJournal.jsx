import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, RefreshCw, X, ArrowLeft } from 'lucide-react';
import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/api/blogs/`;
const LONG_EXCERPT_THRESHOLD = 280;

const DailyJournal = () => {
  const [blogs,    setBlogs]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [selected, setSelected] = useState(null); // full blog detail view

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : (data.results || []));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    const handler = (e) => {
      if (e.key === 'Escape') {
        setLightbox(null);
        setSelected(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fetchPosts]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected || lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected, lightbox]);

  const isLongExcerpt = (text) => text && text.length > LONG_EXCERPT_THRESHOLD;

  return (
    <>
      {/* ── Blog Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[600] bg-[#0a0a09] overflow-y-auto"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-10 bg-[#0a0a09]/95 backdrop-blur-sm border-b border-white/[0.06] px-5 lg:px-10 h-16 flex items-center justify-between">
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Journal
              </button>
              <span className="font-sans text-[10px] text-white/20 tracking-widest uppercase hidden md:block">
                The Daily Journal
              </span>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 text-white/40 hover:text-white transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-5 lg:px-0 py-16">

              {/* Meta */}
              <div className="flex items-center gap-3 mb-8">
                <Calendar size={11} className="text-red-500" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {selected.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif italic text-4xl md:text-5xl lg:text-[56px] leading-[1.08] tracking-tighter text-white mb-10">
                {selected.title}
              </h1>

              {/* Hero image */}
              {selected.image && (
                <div className="w-full aspect-[16/9] overflow-hidden mb-12">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-red-500" />
                <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/20">Story</span>
              </div>

              {/* Body — content if exists, else full excerpt */}
              <div className="font-sans text-[15px] text-white/55 leading-[1.9] space-y-6">
                {selected.content ? (
                  selected.content.split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>{selected.excerpt}</p>
                )}
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.35em] font-bold text-white/30 hover:text-white transition-colors"
                >
                  <ArrowLeft size={11} />
                  Back to Journal
                </button>
                <span className="font-sans text-[10px] text-white/15 tracking-widest">
                  Ramsnehi Photography
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/75"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              className="relative bg-white w-full max-w-3xl overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={13} className="text-gray-700" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[75vh] object-contain bg-white block"
              />
              <div className="px-6 py-4 border-t border-black/[0.06]">
                <p className="font-serif italic text-gray-900 text-lg leading-snug">{lightbox.title}</p>
                <p className="font-sans text-[10px] text-gray-400 tracking-widest uppercase mt-1">{lightbox.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Section ── */}
      <section id="journal" className="py-20 md:py-32 bg-[#080808] text-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">

          {/* Header */}
          <div className="mb-14">
            <span className="font-sans text-red-500 text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
              The Daily Journal
            </span>
            <h2 className="font-serif italic text-5xl md:text-[64px] tracking-tighter leading-[1.06] mb-6">
              Behind The <br />
              <em className="text-red-500 not-italic font-serif italic">Cinematic</em> Lens
            </h2>
            <div className="border-t border-white/[0.07] pt-5">
              {!loading && blogs.length > 0 && (
                <span className="font-sans text-[11px] text-white/20 tracking-[0.2em] uppercase">
                  {blogs.length} stor{blogs.length === 1 ? 'y' : 'ies'} published
                </span>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-24">
              <RefreshCw className="animate-spin text-red-500" size={24} />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-20">
              <p className="font-sans text-red-500 italic text-sm mb-4">{error}</p>
              <button
                onClick={fetchPosts}
                className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30 border border-white/10 px-5 py-2 hover:text-white hover:border-white/30 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-24">
              <p className="font-sans text-white/20 italic text-sm">No stories published yet.</p>
            </div>
          )}

          {/* Blog List */}
          {!loading && !error && blogs.length > 0 && (
            <div className="divide-y divide-white/[0.06]">
              {blogs.map((blog, index) => {
                const long = isLongExcerpt(blog.excerpt);
                return (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.45 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-12 lg:py-14 group items-start"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[900ms] cursor-zoom-in"
                          onClick={() => setLightbox({ src: blog.image, title: blog.title, date: blog.date })}
                        />
                      ) : (
                        <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                          <span className="font-sans text-[10px] text-white/10 uppercase tracking-widest">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3.5 left-3.5 bg-black/80 px-3 py-1.5 flex items-center gap-2 pointer-events-none">
                        <Calendar size={10} className="text-red-500 shrink-0" />
                        <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/55">{blog.date}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-start pt-6 lg:pt-0 lg:pl-12 xl:pl-14">
                      <p className="font-sans text-[10px] text-white/[0.13] tracking-[0.3em] mb-3">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3
                        className="font-serif italic text-2xl md:text-[28px] leading-[1.22] tracking-tight text-white/90 mb-4 group-hover:text-red-500 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelected(blog)}
                      >
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p className={`font-sans text-[13px] text-white/35 leading-[1.8] ${long ? 'line-clamp-4' : ''}`}>
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Read Story — only when excerpt is long */}
                      {long && (
                        <div className="mt-6 pt-5 border-t border-white/[0.06]">
                          <button
                            onClick={() => setSelected(blog)}
                            className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.35em] font-bold text-white/35 hover:text-white/80 transition-colors duration-300"
                          >
                            Read Story
                            <span className="w-[30px] h-[30px] border border-white/15 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all duration-300">
                              <ArrowRight size={11} />
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default DailyJournal;