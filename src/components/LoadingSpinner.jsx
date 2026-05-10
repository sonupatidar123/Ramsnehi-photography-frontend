import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-2 border-red-500 border-t-white rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;
