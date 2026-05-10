import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import rahulImg from '../assets/rahul-patidar.png';
import { useNavigate } from 'react-router-dom';

const StudioStory = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Rahul's Portrait with Artistic Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* The Outer Frame */}
            <div className="aspect-[1/1] md:aspect-[3/4] relative z-10 overflow-hidden border-[15px] border-[#fcfcfc] shadow-2xl">
              <img 
                src={rahulImg}
                alt="Rahul Patidar - Lead Photographer" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Decorative Red Accent Box */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-red-600/10 -z-0 hidden md:block"></div>
            
            {/* Floating Experience Tag */}
            <div className="absolute -top-5 -right-5 bg-black text-white p-6 z-20 hidden md:block">
                <p className="text-2xl font-serif italic">12+</p>
                <p className="text-[8px] uppercase tracking-widest opacity-60">Years of Art</p>
            </div>
          </motion.div>

          {/* Right Side: The Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] tracking-[0.6em] uppercase text-red-600 font-bold mb-4 block">The Visionary</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-gray-900 leading-tight">
                Rahul Patidar
              </h2>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mt-2">Founder & Lead Cinematographer</p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg font-light">
              Ramsnehi Photography is a pursuit of unscripted emotions. Based in <span className="font-semibold text-black">Mandsaur</span>, Rahul and his team travel across Indore, Udaipur, and Jaipur to find stories that deserve a cinematic lens.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-2 w-10 h-[1px] bg-red-600"></div>
                <p className="text-sm text-gray-500 italic">"We don't just take pictures; we capture the feeling of being there."</p>
              </div>
              
              <p className="text-gray-600 font-light">
                Specializing in Pre-Wedding, Cinematic Films, and Viral Instagram Reels, Rahul ensures that every client doesn't just get a gallery—they get a piece of art that trends.
              </p>
            </div>

            <button 
  onClick={() => navigate('/gallery')}
  className="group flex items-center gap-4 text-xs uppercase tracking-[0.4em] font-bold text-gray-900 pt-6"
>
              Daily Stories
              <span className="p-2 border border-gray-200 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <ArrowRight size={16} />
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StudioStory;