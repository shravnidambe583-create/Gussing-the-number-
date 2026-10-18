import React from 'react';
import { motion } from 'framer-motion';

export const FloatingDecor = ({ reducedMotion = false }) => {
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {/* Static soft decorative clouds */}
        <div className="absolute top-10 left-12 text-5xl">☁️</div>
        <div className="absolute top-20 right-16 text-6xl">☁️</div>
        <div className="absolute bottom-12 left-10 text-4xl">🌸</div>
        <div className="absolute bottom-16 right-14 text-4xl">🦋</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Gentle Floating Clouds */}
      <motion.div
        className="absolute top-6 left-8 text-sky-200/80 drop-shadow-sm text-6xl md:text-7xl"
        animate={{ x: [0, 40, 0], y: [0, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.div>

      <motion.div
        className="absolute top-16 right-12 text-sky-200/80 drop-shadow-sm text-7xl md:text-8xl"
        animate={{ x: [0, -45, 0], y: [0, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-4 text-sky-100/70 text-5xl hidden md:block"
        animate={{ x: [0, 25, 0], y: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.div>

      {/* Floating Sparkles & Stars */}
      <motion.div
        className="absolute top-28 left-1/4 text-yellow-300 text-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute top-36 right-1/4 text-amber-300 text-2xl"
        animate={{ scale: [1.2, 0.9, 1.2], rotate: [360, 180, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-1/3 text-pink-300 text-2xl"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>

      {/* Floating Playful Numbers */}
      <motion.div
        className="absolute top-44 left-10 font-bold text-4xl text-purple-300/40 select-none"
        animate={{ y: [0, -25, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        7
      </motion.div>

      <motion.div
        className="absolute top-52 right-10 font-bold text-5xl text-pink-300/40 select-none"
        animate={{ y: [0, 20, 0], rotate: [12, -8, 12] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        3
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-12 font-bold text-4xl text-emerald-300/40 select-none hidden sm:block"
        animate={{ y: [0, -18, 0], rotate: [-5, 8, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        42
      </motion.div>

      <motion.div
        className="absolute bottom-48 right-16 font-bold text-4xl text-sky-300/40 select-none hidden sm:block"
        animate={{ y: [0, 22, 0], rotate: [15, -10, 15] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        9
      </motion.div>

      {/* Cute Balloons & Butterflies at Bottom */}
      <motion.div
        className="absolute bottom-8 left-8 text-4xl select-none"
        animate={{ y: [0, -14, 0], rotate: [-4, 6, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎈
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-8 text-4xl select-none"
        animate={{ y: [0, -16, 0], x: [0, -10, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🦋
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl select-none opacity-80"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸 🌼 🌷
      </motion.div>
    </div>
  );
};
