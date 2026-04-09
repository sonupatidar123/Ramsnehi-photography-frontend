import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HERO_IMAGES, BRAND_NAME } from '../data/mockData';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black p-4 md:p-10">
      {/* Framed Border - Design from your image */}
      <div className="absolute inset-4 md:inset-10 border border-white/30 z-40 pointer-events-none"></div>

      {/* Cinematic Background Slideshow */}
      {HERO_IMAGES.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: current === idx ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img src={img} alt="Rahul Patidar Photography" className="w-full h-full object-cover opacity-60" />
        </motion.div>
      ))}

      {/* Top-Right: Bio Slogan */}
      <div className="absolute top-12 right-12 z-50 text-right hidden md:block">
        <div className="bg-white/5 backdrop-blur-md p-5 text-white border-r-4 border-red-500">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-60 mb-1">
            " We don't see things
          </p>
          <p className="text-2xl font-serif italic tracking-wide">
            As They Are "
          </p>
        </div>
      </div>

      {/* Bottom-Right: Official Brand Card */}
      <div className="absolute bottom-14 right-14 z-50">
        <div className="bg-white px-10 py-8 shadow-2xl flex flex-col items-center group cursor-pointer hover:bg-red-600 transition-all duration-500">
           <span className="text-[9px] tracking-[0.6em] uppercase font-bold text-gray-400 group-hover:text-white mb-1">Rahul Patidar</span>
           <h2 className="text-4xl font-serif tracking-tighter uppercase font-black text-black group-hover:text-white">
             {BRAND_NAME}
           </h2>
           <div className="h-[1.5px] w-full bg-black group-hover:bg-white my-3"></div>
           <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-gray-500 group-hover:text-white">
             Photography | Mandsaur
           </span>
        </div>
      </div>

      {/* Service Tags - Left Bottom */}
      <div className="absolute bottom-14 left-14 z-50 hidden lg:flex flex-col gap-2 text-white">
         <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-red-500"></div>
            <span className="text-xs uppercase tracking-widest font-light">Pre-Wedding</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-red-500"></div>
            <span className="text-xs uppercase tracking-widest font-light">Cinematic Films</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-red-500"></div>
            <span className="text-xs uppercase tracking-widest font-light">Viral Reels</span>
         </div>
      </div>
    </div>
  );
};

export default Hero;