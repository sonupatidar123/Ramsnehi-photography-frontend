import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HERO_IMAGES } from '../data/mockData';
import aboutimg from '../assets/rahul-patidar.png'
import prewedding from '../assets/gallery/prewedding-1.jpg'
import wedding from '../assets/gallery/wedding-1.jpg'
import film from '../assets/gallery/prewedding-5.jpg'
import maternity from '../assets/gallery/maternity-1.jpg'
import testimonial from '../assets/gallery/wedding-2.jpg'
import contact from '../assets/gallery/wedding-3.jpg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', id: 'top', img: HERO_IMAGES[0]?.img },
    { name: 'About', id: 'about', img: aboutimg },
    { name: 'Pre-Wedding', id: 'pre-wedding', img: prewedding },
    { name: 'Wedding', id: 'wedding', img: wedding},
    { name: 'Films', id: 'films', img:film  },
    { name: 'Maternity & Kids', id: 'maternity', img: maternity },
    { name: 'Testimonials', id: 'testimonials', img:testimonial },
    { name: 'Contact', id: 'contact', img: contact},
  ];

  const handleNavigation = (id) => {
    setMenuOpen(false);
    
    // If we are not on the homepage, go home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-8 left-8 z-[110] flex items-center gap-3">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className={`group flex items-center gap-4 px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 rounded-full border shadow-sm
            ${menuOpen 
              ? "bg-white text-black border-white" 
              : "bg-black/90 text-white border-white/10 hover:bg-white hover:text-black hover:border-black"
            }`}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <motion.span 
              animate={{ width: menuOpen ? "100%" : "60%", backgroundColor: menuOpen ? "#000" : "#fff" }} 
              className="h-[1px] transition-all group-hover:bg-black" 
            />
            <span className={`h-[1px] w-full transition-all ${menuOpen ? "bg-black" : "bg-white"} group-hover:bg-black`} />
            <motion.span 
              animate={{ width: menuOpen ? "100%" : "40%", backgroundColor: menuOpen ? "#000" : "#fff" }} 
              className="h-[1px] transition-all group-hover:bg-black" 
            />
          </div>
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
        
        <button 
          onClick={() => handleNavigation('contact')}
          className="hidden sm:flex items-center gap-3 bg-black text-white border border-black/10 px-7 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-600 hover:border-red-600 transition-all duration-500 rounded-full shadow-lg"
        >
          <Mail size={14} className="mb-0.5" />
          <span>Enquire Now</span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              {menuItems.map((item) => (
                <img
                  key={item.name}
                  src={item.img}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    hoveredItem === item.name ? "opacity-40 scale-110" : "opacity-0 scale-100"
                  }`}
                  alt=""
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 w-full">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative w-fit mx-auto"
                >
                  <button 
                    onClick={() => handleNavigation(item.id)}
                    className="relative flex items-center justify-center text-3xl md:text-5xl lg:text-6xl font-serif text-white/40 hover:text-white transition-all duration-500 tracking-tighter hover:italic"
                  >
                    <span className="absolute right-full mr-4 text-[10px] md:text-xs font-sans tracking-[0.5em] text-red-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 italic whitespace-nowrap">
                      0{index + 1}
                    </span>
                    {item.name}
                  </button>
                  <motion.div 
                    className="h-[1px] bg-red-600 w-0 group-hover:w-full transition-all duration-700 mx-auto mt-1 md:mt-2"
                  />
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-12 w-full flex flex-col items-center gap-4">
              <div className="flex gap-8 md:gap-16 text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-white/30 font-medium">
                <span>Mandsaur • Indore • Udaipur</span>
                <span className="hidden md:inline">Ramsnehi Photography</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;