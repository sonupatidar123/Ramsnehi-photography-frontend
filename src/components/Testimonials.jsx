import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    client_name: 'Ashutosh',
    text: 'Working with this team was an absolute pleasure. They understood our vision instantly and delivered something that exceeded every expectation we had going in.',
    client_image: null,
    rating: 5,
  },
  {
    id: 2,
    client_name: 'Akansha',
    text: 'The attention to detail was remarkable. Every pixel, every interaction felt intentional. Our clients frequently comment on how refined the final product looks.',
    client_image: null,
    rating: 5,
  },
  {
    id: 3,
    client_name: 'Priya Mehta',
    text: 'From the very first call, communication was seamless. Deadlines were met without fuss, and the creative output was genuinely inspiring. I\'d recommend them without hesitation.',
    client_image: null,
    rating: 5,
  },
  {
    id: 4,
    client_name: 'pradeep',
    text: 'A rare combination of strategic thinking and flawless execution. They didn\'t just build what we asked for — they helped us understand what we actually needed.',
    client_image: null,
    rating: 5,
  },
  {
    id: 5,
    client_name: 'Vijay',
    text: 'The process felt collaborative every step of the way. They brought ideas we hadn\'t considered and always kept our audience front of mind. Truly exceptional work.',
    client_image: null,
    rating: 5,
  },
  {
    id: 6,
    client_name: 'Ananya',
    text: 'We\'ve worked with many agencies over the years, but this was something different. A genuine creative partnership that produced work we\'re still proud of two years later.',
    client_image: null,
    rating: 5,
  },
];

const StarRating = ({ count = 5 }) => (
  <div className="flex justify-center gap-0.5 mb-3" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill={i < count ? '#B87333' : 'none'}
        stroke={i < count ? '#B87333' : '#d1d5db'}
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const Avatar = ({ name, imageSrc }) => {
  const initial = name?.charAt(0)?.toUpperCase() ?? '?';

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <span className="text-2xl font-serif text-gray-400 uppercase select-none">
      {initial}
    </span>
  );
};

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    key={testimonial.id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center text-center"
  >
    {/* Avatar */}
    <div className="w-[88px] h-[88px] rounded-full overflow-hidden mb-5 flex items-center justify-center bg-gray-50 border-[3px] border-white ring-1 ring-gray-100 shadow-sm">
      <Avatar name={testimonial.client_name} imageSrc={testimonial.client_image} />
    </div>

    {/* Stars */}
    <StarRating count={testimonial.rating} />

    {/* Name */}
    <h4 className="text-[11px] font-serif tracking-[0.22em] uppercase text-gray-900 mb-1">
      {testimonial.client_name ?? 'Anonymous'}
    </h4>

    {/* Divider dot */}
    <div className="w-1 h-1 rounded-full bg-gray-200 mb-4" aria-hidden="true" />

    {/* Quote */}
    <p className="text-gray-500 leading-relaxed font-light italic text-sm">
      &ldquo;{testimonial.text}&rdquo;
    </p>
  </motion.div>
);

const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const visible = TESTIMONIALS.slice(0, visibleCount);
  const hasMore = visibleCount < TESTIMONIALS.length;

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.3em] text-gray-400 block mb-2"
          >
            Kind Words
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl font-serif tracking-widest uppercase mb-4 text-gray-900"
          >
            Testimonials
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="w-12 h-[1px] bg-gray-900 mx-auto origin-left"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
          {visible.map((t, index) => (
            <TestimonialCard key={t.id} testimonial={t} index={index} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + 2, TESTIMONIALS.length))}
              className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-700 transition-colors duration-200 border-b border-gray-200 hover:border-gray-700 pb-0.5"
            >
              Read More
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;