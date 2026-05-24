import React from 'react';
import { motion } from 'framer-motion';
import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { Phone } from 'lucide-react';

const SocialSidebar = () => {
  const socials = [
    { 
      icon: <Phone size={18} />, 
      link: "tel:+919644167702", 
      color: "hover:bg-green-500",
      label: "Call" 
    },
    { 
      icon: <SiWhatsapp size={18} />, 
      link: "https://wa.me/919644167702", 
      color: "hover:bg-[#25D366]",
      label: "WhatsApp" 
    },
    { 
      icon: <SiInstagram size={18} />, 
      link: "https://instagram.com/ramsnehi_photography_mandsaur", 
      color: "hover:bg-[#E4405F]",
      label: "Instagram" 
    }
  ];

  return (
    <>
      {/* Desktop Top-Right Buttons */}
      <div className="fixed top-12 right-12 z-100 flex gap-3 hidden md:flex">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className={`w-11 h-11 flex items-center justify-center bg-black/30 backdrop-blur-xl border border-white/10 text-white rounded-full transition-all duration-300 ${social.color}`}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 flex justify-around items-center py-3 md:hidden z-[100]">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-white text-xs"
          >
            {social.icon}
            <span className="mt-1">{social.label}</span>
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialSidebar;