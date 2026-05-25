import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    client_name: 'Ashutosh',
    text: 'Working with Ramsnehi was an absolute pleasure. They understood our vision instantly and delivered wedding photos that exceeded every expectation we had.',
    client_image: null,
    rating: 5,
    type: 'Wedding Client'
  },
  {
    id: 2,
    client_name: 'Akansha',
    text: 'The attention to detail was remarkable. Every moment, every emotion felt captured perfectly. Our guests frequently compliment the stunning photographs.',
    client_image: null,
    rating: 5,
    type: 'Pre-Wedding Shoot'
  },
  {
    id: 3,
    client_name: 'Priya Mehta',
    text: "From the very first consultation, communication was seamless. Rahul and his team delivered the cinematic wedding film we always dreamed of. Highly recommended!",
    client_image: null,
    rating: 5,
    type: 'Wedding Film'
  },
  {
    id: 4,
    client_name: 'Pradeep',
    text: "Ramsnehi didn't just capture photos — they captured the essence of our love story. The creativity and professionalism were truly exceptional.",
    client_image: null,
    rating: 5,
    type: 'Wedding Client'
  },
  {
    id: 5,
    client_name: 'Vijay',
    text: "The entire process felt collaborative and smooth. They brought creative ideas we hadn't considered and delivered beyond what we imagined.",
    client_image: null,
    rating: 5,
    type: 'Pre-Wedding'
  },
  {
    id: 6,
    client_name: 'Ananya',
    text: "We've seen many photographers over the years, but Ramsnehi is something truly special. A genuine creative partnership that produced timeless memories.",
    client_image: null,
    rating: 5,
    type: 'Wedding Client'
  },
];

const TestimonialCard = ({ testimonial, index, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative p-8 md:p-10 border transition-all duration-300 group overflow-hidden ${
        isActive 
          ? 'bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-500/50 ring-1 ring-red-500/30' 
          : 'bg-gradient-to-br from-neutral-900/60 to-neutral-800/40 border-neutral-700/40 hover:border-red-500/30'
      }`}
    >
      {/* Decorative Corner Accent */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-red-500/20 group-hover:text-red-500/40 transition-colors duration-300 mb-4" />
      
      {/* Rating */}
      <div className="flex gap-1.5 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={13}
            className="fill-red-500 text-red-500"
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="text-white/70 text-sm leading-[1.8] mb-8 italic font-light z-10 relative">
        "{testimonial.text}"
      </p>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent mb-6" />

      {/* Client Info */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/30 to-red-500/10 flex items-center justify-center border border-red-500/20 overflow-hidden shrink-0">
          {testimonial.client_image ? (
            <img src={testimonial.client_image} alt={testimonial.client_name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-serif text-red-400 uppercase font-bold">
              {testimonial.client_name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-0.5">
            {testimonial.client_name}
          </h4>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            {testimonial.type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 3;
  const totalSlides = Math.ceil(TESTIMONIALS.length / itemsPerView);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleTestimonials = TESTIMONIALS.slice(current * itemsPerView, (current + 1) * itemsPerView);

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-500 text-[10px] tracking-[0.5em] uppercase font-bold block mb-4"
          >
            Client Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight tracking-tight mb-6"
          >
            Words from <span className="text-red-500">Happy Couples</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/40 text-sm md:text-base max-w-xl mx-auto"
          >
            Real moments, real emotions. Here's what our clients say about working with Ramsnehi.
          </motion.p>
        </div>

        {/* Grid with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="wait">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
                isActive={index === 1}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation - Only show on small screens */}
        {totalSlides > 1 && (
          <div className="lg:hidden flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-red-500' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Dots Indicator - Desktop */}
        {totalSlides > 1 && (
          <div className="hidden lg:flex items-center justify-center gap-2 mt-12">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-red-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;