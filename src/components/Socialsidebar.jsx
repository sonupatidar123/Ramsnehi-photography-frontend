import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react'; 
import { SiInstagram, SiPinterest, SiWhatsapp } from '@icons-pack/react-simple-icons'; 

const SocialSidebar = () => {
  const socials = [
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
    },
    { 
      icon: <SiPinterest size={18} />, 
      link: "https://www.pinterest.com/taj_studio/", 
      color: "hover:bg-[#BD081C]",
      label: "Pinterest" 
    },
    { 
      icon: <Mail size={20} />, 
      link: "mailto:info@ramsnehi.photography", 
      color: "hover:bg-red-600",
      label: "Email" 
    },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          whileHover={{ x: 5 }}
          className={`w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/10 text-white rounded-full transition-all duration-300 ${social.color} group`}
        >
          {social.icon}
          <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all origin-left bg-white text-black text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-xl">
            {social.label}
          </span>
        </motion.a>
      ))}
      <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent mx-auto mt-2"></div>
    </div>
  );
};

export default SocialSidebar;