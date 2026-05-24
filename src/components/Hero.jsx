import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // Removed the problematic Instagram import
import { HERO_IMAGES } from '../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();
const location = useLocation();
  const [current, setCurrent] = useState(0);
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
const handleNavigation = (id) => {
  if (location.pathname !== '/') {
    navigate('/');
    setTimeout(() => {
      scrollToSection(id);
    }, 100);
  } else {
    scrollToSection(id);
  }
};
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Editorial Border Frame */}
      <div className="absolute inset-4 md:inset-8 border border-white/10 z-40 pointer-events-none"></div>

      {/* Background Slideshow with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={HERO_IMAGES[current].img} 
            alt="Wedding Photography by Rahul Patidar" 
            className="w-full h-full object-cover object-center" 
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-50 h-full flex flex-col justify-center px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl"
        >
          <span className="text-red-500 text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
            Premier Wedding Cinematography
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-none tracking-tighter mb-8">
            Ramsnehi Photography <br />
            <span className="italic font-light text-white/80"> mandsaur</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 md:gap-6 items-center">
          <button 
  onClick={() => handleNavigation('contact')}
  className="bg-white text-black px-8 md:px-10 py-4 md:py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-600 hover:text-white transition-all duration-500 flex items-center gap-4 group"
>
  Book Your Story 
  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
</button>
            <button 
  onClick={() => navigate('/review')}
  className="text-white border border-white/20 px-8 md:px-10 py-4 md:py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500"
>
  Google Review
</button>
          </div>
        </motion.div>
      </div>

      {/* Trust Badge - Floating */}
      <div className="absolute bottom-16 right-16 z-50 hidden lg:block">
        <div className="flex flex-col items-end gap-2 text-white/40">
          <span className="text-[9px] tracking-[0.4em] uppercase font-medium">Based in Mandsaur & Indore</span>
          <div className="h-[1px] w-20 bg-red-500/50"></div>
          <span className="text-[9px] tracking-[0.4em] uppercase font-medium">200+ Weddings Documented</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-red-500 to-transparent"
        />
      </div>
    </div>
  );
};

export default Hero;