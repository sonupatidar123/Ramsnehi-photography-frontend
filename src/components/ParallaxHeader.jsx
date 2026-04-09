import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxHeader = ({ title, bgImage, subTitle }) => {
  // Optional: Real Parallax Scroll Effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with Slow Zoom & Parallax */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          // This keeps the image moving slightly for a deeper parallax feel
        }}
      />

      {/* Elegant Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>

      {/* Content Overlay */}
      <div className="relative z-20 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 0.8, letterSpacing: "0.6em" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white text-[10px] md:text-xs uppercase font-bold mb-6"
        >
          {subTitle || "Unforgettable Memories"}
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white text-6xl md:text-9xl font-serif italic tracking-tighter"
        >
          {title}
        </motion.h2>

        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-8 h-[1px] w-32 bg-white/40 mx-auto origin-center"
        ></motion.div>
      </div>

      {/* Floating Bottom Tag */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] text-white/40 uppercase tracking-[0.4em]">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHeader;