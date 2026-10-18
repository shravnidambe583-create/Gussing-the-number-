import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, ArrowRight, Home, Star, Award, Zap } from 'lucide-react';
import { MascotBobo } from './MascotBobo';
import { soundManager } from '../utils/sound';

export const VictoryScreen = ({
  playerName = 'Explorer',
  secretNumber,
  attempts,
  difficultyId,
  starsEarned,
  newBadges = [],
  onPlayAgain,
  onChangeDifficulty,
  onGoHome,
  reducedMotion = false
}) => {
  const [animatedStars, setAnimatedStars] = useState(0);

  // Trigger kid-friendly confetti explosion on mount
  useEffect(() => {
    if (!reducedMotion) {
      // Gentle, colorful confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF8FAB', '#7DD3FC', '#FDE047', '#D8B4FE', '#A7F3D0']
        });

        // Second wave after 400ms
        const timer = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#F472B6', '#38BDF8', '#FBBF24']
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#A855F7', '#34D399', '#FB923C']
          });
        }, 400);

        return () => clearTimeout(timer);
      } catch (e) {
        console.error('Confetti error', e);
      }
    }
  }, [reducedMotion]);

  // Play badge sound if new badge unlocked
  useEffect(() => {
    if (newBadges.length > 0) {
      const timer = setTimeout(() => {
        soundManager.playBadgeUnlock();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [newBadges]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/60 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <motion.div
        initial={reducedMotion ? {} : { scale: 0.8, opacity: 0, y: 20 }}
        animate={reducedMotion ? {} : { scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 border-4 border-yellow-300 shadow-candy text-center overflow-hidden my-6"
      >
        {/* Top Rainbow Header Accent */}
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-pink-400 via-yellow-400 via-emerald-400 to-purple-400" />

        {/* Floating background celebratory emojis */}
        <div className="absolute top-4 left-6 text-2xl select-none animate-bounce-subtle">🎈</div>
        <div className="absolute top-6 right-6 text-2xl select-none animate-bounce-subtle">🎉</div>

        {/* Bobo Dancing with Party Hat */}
        <div className="flex flex-col items-center mt-2 mb-3">
          <MascotBobo mood="celebrate" size="lg" />
        </div>

        {/* Personalized Heading */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-1 leading-tight">
          Amazing Job, <span className="text-purple-600">{playerName}</span>! 🌟
        </h1>

        <p className="text-base md:text-lg font-bold text-slate-600 mb-4">
          You found the magical secret number!
        </p>

        {/* Revealed Secret Number Card */}
        <motion.div
          animate={reducedMotion ? {} : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex flex-col items-center justify-center px-8 py-4 rounded-3xl bg-gradient-to-tr from-amber-300 via-yellow-200 to-pink-200 border-4 border-amber-400 shadow-candy-yellow mb-5"
        >
          <span className="text-xs font-black uppercase tracking-widest text-amber-900">
            Secret Number
          </span>
          <span className="text-6xl md:text-7xl font-black text-amber-950 drop-shadow-sm">
            {secretNumber}
          </span>
        </motion.div>

        {/* Round Performance Badges & Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5 max-w-sm mx-auto">
          {/* Attempts */}
          <div className="p-3 rounded-2xl bg-pink-50 border-2 border-pink-200">
            <span className="text-xs font-bold text-pink-600 uppercase">Guesses Taken</span>
            <p className="text-2xl font-black text-pink-700">{attempts} {attempts === 1 ? 'try' : 'tries'}</p>
          </div>

          {/* Stars Earned */}
          <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <span className="text-xs font-bold text-amber-600 uppercase">Stars Won</span>
            <p className="text-2xl font-black text-amber-700 flex items-center justify-center gap-1">
              <span>⭐</span>
              <span>+{starsEarned}</span>
            </p>
          </div>
        </div>

        {/* New Badges Unlocked Section */}
        {newBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-sm"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-purple-900 uppercase tracking-wide mb-1">
              <Award className="w-4 h-4 text-purple-600" />
              <span>New Badge Unlocked!</span>
            </div>
            {newBadges.map((badge) => (
              <div key={badge.id} className="flex items-center justify-center gap-2 mt-1">
                <span className="text-2xl">{badge.emoji}</span>
                <span className="font-extrabold text-purple-900 text-sm">{badge.name}</span>
                <span className="text-xs text-purple-700">({badge.description})</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
          {/* Play Again */}
          <button
            onClick={() => {
              soundManager.playPop();
              onPlayAgain();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xl shadow-candy-green active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>Play Again!</span>
          </button>

          {/* Try Harder Level / Change Difficulty */}
          <button
            onClick={() => {
              soundManager.playPop();
              onChangeDifficulty();
            }}
            className="w-full py-3 px-6 rounded-2xl bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 text-purple-900 font-extrabold text-base shadow-sm active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Try Another Level!</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Back to Home */}
          <button
            onClick={() => {
              soundManager.playPop();
              onGoHome();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-slate-800 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home Screen</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
