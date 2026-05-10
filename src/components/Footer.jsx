import React from 'react';
import { motion } from 'framer-motion';
import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { Phone, Play } from 'lucide-react';

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <footer className="bg-[#080808] text-white pt-20 pb-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
          
          {/* Column 1: Contact */}
          <motion.div {...fadeInUp}>
            <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-red-500 font-bold">
              Contact Us
            </h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>Mandsaur, Madhya Pradesh</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={14} className="text-red-500" />
                <span>+91 96441 67702</span>
              </div>
              
            </div>
          </motion.div>

          {/* Column 2: Branding */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-3xl font-serif tracking-[0.2em] uppercase mb-2">
              Ramsnehi
            </div>
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4 italic">
              Photography
            </span>
            <p className="text-xs text-gray-500 max-w-xs text-center leading-relaxed">
              Rahul Patidar | Crafting cinematic memories across mandsaur, ratlam, and indore.
            </p>
          </motion.div>

          {/* Column 3: Socials */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center md:items-end"
          >
            <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-red-500 font-bold">
              Follow The Journey
            </h4>
            <div className="flex gap-6">
              {/* Instagram */}
              <motion.a 
                href="https://instagram.com/ramsnehi_photography_mandsaur" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.2, color: '#ef4444' }}
                className="transition-colors"
              >
                <SiInstagram size={22} />
              </motion.a>

              {/* WhatsApp */}
              <motion.a 
                href="https://wa.me/919644167702" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.2, color: '#22c55e' }}
                className="transition-colors"
              >
                <SiWhatsapp size={22} />
              </motion.a>

             
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-500"
        >
          <p>© 2026 Ramsnehi Photography. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="opacity-50">By sonu patidar</span>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;