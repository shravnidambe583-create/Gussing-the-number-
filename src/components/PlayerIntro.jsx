import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, HelpCircle, Award, Star } from 'lucide-react';
import { MascotBobo } from './MascotBobo';
import { soundManager } from '../utils/sound';

export const PlayerIntro = ({
  playerName = 'Explorer',
  onStartAdventure,
  onOpenHowToPlay,
  reducedMotion = false
}) => {
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      exit={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 w-full max-w-2xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center text-center"
    >
      {/* Personalized Greeting Header */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-2"
      >
        <span className="text-4xl md:text-5xl">🎉</span>
      </motion.div>

      <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-2">
        Yay, <span className="text-purple-600 underline decoration-wavy decoration-pink-400">{playerName}</span>!
      </h1>

      <p className="text-lg md:text-2xl font-bold text-slate-700 max-w-lg mb-6 leading-relaxed">
        Bobo has a secret magical number hidden in the treasure box!{' '}
        <span className="text-pink-600 block mt-1">Can you guess what it is? 🎁</span>
      </p>

      {/* Main Center Stage: Mascot + Magical Treasure Chest */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4 w-full">
        {/* Mascot Bobo */}
        <div className="flex flex-col items-center">
          <MascotBobo mood="thinking" size="lg" />
          <div className="mt-2 text-xs md:text-sm font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Bobo is thinking of a number!
          </div>
        </div>

        {/* Magical Treasure Chest with Glowing ? */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-400 rounded-3xl p-6 shadow-candy-yellow flex flex-col items-center justify-center w-52 h-52 select-none"
        >
          {/* Sparkle accents */}
          <div className="absolute top-2 left-3 text-xl">✨</div>
          <div className="absolute top-3 right-3 text-xl">⭐</div>
          <div className="absolute bottom-2 right-3 text-xl">✨</div>

          {/* Glowing bouncing mystery question mark */}
          <motion.div
            animate={reducedMotion ? {} : { scale: [1, 1.15, 1], rotate: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 flex items-center justify-center shadow-candy-pink"
          >
            <span className="text-6xl font-black text-white drop-shadow-md">?</span>
          </motion.div>

          <span className="mt-3 text-sm font-black text-amber-900 uppercase tracking-wider">
            Secret Mystery
          </span>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mt-4">
        {/* Start Adventure Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onStartAdventure();
          }}
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white font-black text-xl shadow-candy-green hover:opacity-95 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-white" />
          <span>Start Adventure!</span>
        </button>

        {/* How to Play Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onOpenHowToPlay();
          }}
          className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white border-3 border-sky-300 text-sky-700 font-extrabold text-lg shadow-candy-blue hover:bg-sky-50 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <HelpCircle className="w-5 h-5 text-sky-500" />
          <span>How to Play</span>
        </button>
      </div>

      {/* Rewards Preview Strip */}
      <div className="mt-8 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-200 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
          <Award className="w-4 h-4 text-purple-500" />
          <span>Rewards you can earn</span>
        </p>
        <div className="flex items-center justify-around gap-2 text-slate-700">
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="text-xl">⭐</span>
            <span>Magical Stars</span>
          </div>
          <span className="text-purple-300">•</span>
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="text-xl">🏆</span>
            <span>Explorer Badges</span>
          </div>
          <span className="text-purple-300">•</span>
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="text-xl">🪄</span>
            <span>Magic Clues</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
