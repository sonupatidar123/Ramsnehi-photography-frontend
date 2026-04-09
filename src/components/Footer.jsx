import React from 'react';
import { 
  Camera, 
  Share2, 
  Play, 
  Bird,
  Mail, 
} from "lucide-react"; 

const Footer = () => (
  <footer className="bg-[#080808] text-white pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
        
        {/* Column 1: Contact & Location */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-red-500 font-bold">
            Contact Us
          </h4>
          <p className="text-sm mb-2 opacity-80">Mandsaur, Madhya Pradesh</p>
          <p className="text-sm mb-2 opacity-80">P: +91 96441 67702</p>
          <p className="text-sm opacity-80">E: hello@ramsnehi.photography</p>
        </div>

        {/* Column 2: Brand/Logo */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-serif tracking-[0.2em] uppercase mb-2">
            Ramsnehi
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4 italic">
            Photography
          </span>
          <p className="text-xs text-gray-500 max-w-xs text-center leading-relaxed">
            Rahul Patidar | Crafting cinematic memories across Indore, Udaipur, and Jaipur.
          </p>
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-red-500 font-bold">
            Follow The Journey
          </h4>
          <div className="flex gap-6">
            {/* Instagram */}
            <a href="https://instagram.com/ramsnehi_photography_mandsaur" target="_blank" rel="noreferrer">
                <Camera size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
            </a>
            {/* Facebook */}
            <Share2 size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
            {/* YouTube/Cinematic */}
            <Play size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
            {/* Twitter/X */}
            <Bird size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-500">
        <p>© 2026 Ramsnehi Photography. All Rights Reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span className="opacity-50">By WebTrezor</span>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;