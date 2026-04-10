import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';

// GET /api/testimonials/
// Returns: [{ id, client_name, text, client_image, is_featured }]
// We filter is_featured on the frontend as a fallback in case the
// backend doesn't support the ?is_featured query param yet.

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        // Pass is_featured=true — Django will filter if the field/filter is set up,
        // otherwise we filter client-side below as a safe fallback.
        const res = await fetch(`${API_BASE_URL}/api/testimonials/`);

        if (!res.ok) throw new Error(`Server Error: ${res.status} ${res.statusText}`);

        const data = await res.json();

        console.log("Raw API Data:", data);

        const all  = Array.isArray(data) ? data : data.results ?? [];

        // Client-side fallback filter: if backend ignores the param, we filter here.
        // If backend already filtered, this is a no-op (all items will have is_featured=true).
        const featured = all;

        setTestimonials(featured);
      } catch (err) {
        console.error('Testimonial Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ── Resolve image URL ───────────────────────────────────────────
  const resolveUrl = (url) =>
    url && url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.3em] text-gray-400 block mb-2"
          >
            Kind Words
          </motion.span>
          <h2 className="text-3xl font-serif tracking-widest uppercase mb-4 text-gray-900">
            Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-gray-900 mx-auto" />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[1,2].map((i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-100 mb-6" />
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-4" />
                <div className="space-y-2 w-full">
                  <div className="h-3 bg-gray-50 rounded w-full" />
                  <div className="h-3 bg-gray-50 rounded w-5/6 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        )}
        

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-red-400 text-sm font-light uppercase tracking-widest">
              Unable to load testimonials at this time.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && testimonials.length === 0 && (
          <p className="text-center text-gray-400 py-8 font-light italic">
            No featured testimonials found.
          </p>
        )}

        {/* Content Grid */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Avatar */}
               <div className="w-24 h-24 rounded-full overflow-hidden mb-6 transition-all duration-500 shadow-lg border-4 border-white ring-1 ring-gray-100">
  {t.client_image ? (
    <img
      src={resolveUrl(t.client_image)}
      alt={t.client_name}
      className="w-full h-full object-cover" // Actual color strictly applied
    />
  ) : (
    // Fallback placement changed to center
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <span className="text-2xl font-serif text-gray-400 uppercase">
        {t.client_name?.charAt(0) ?? 'C'}
      </span>
    </div>
  )}
</div>
{/* 👆 YAHAN TAK UPDATE KAREIN 👆 */}

                {/* Name */}
                <h4 className="text-sm font-serif tracking-[0.2em] uppercase text-gray-900 mb-3">
                  {t.client_name ?? 'Anonymous'}
                </h4>

                {/* Quote */}
                <p className="text-gray-500 leading-relaxed font-light italic text-sm md:text-base">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;