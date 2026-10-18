import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowLeft, ArrowRight, Wand2, Star } from 'lucide-react';
import { DIFFICULTIES } from '../utils/gameLogic';
import { soundManager } from '../utils/sound';

export const DifficultySelector = ({
  onSelectDifficulty,
  onBack,
  reducedMotion = false
}) => {
  const [selectedDiff, setSelectedDiff] = useState('easy');

  const diffList = Object.values(DIFFICULTIES);

  const handleStartGame = () => {
    soundManager.playPop();
    onSelectDifficulty(selectedDiff);
  };

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 w-full max-w-4xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center text-center"
    >
      {/* Top Navigation / Back button */}
      <div className="w-full flex items-center justify-between mb-2">
        <button
          onClick={() => {
            soundManager.playPop();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-purple-200 text-purple-700 font-bold text-sm shadow-sm transition-all active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs md:text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          Step 2 of 3
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-2">
        Choose Your Adventure! 🗺️
      </h1>

      <p className="text-base md:text-xl font-medium text-slate-600 max-w-lg mb-6">
        Pick how big you want Bobo's secret number to be!
      </p>

      {/* 3 Difficulty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mb-8">
        {diffList.map((diff) => {
          const isSelected = selectedDiff === diff.id;

          return (
            <motion.div
              key={diff.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundManager.playPop();
                setSelectedDiff(diff.id);
              }}
              className={`relative rounded-3xl p-6 cursor-pointer text-left transition-all flex flex-col justify-between border-4 ${
                isSelected
                  ? 'border-purple-500 bg-white shadow-candy ring-4 ring-purple-200 scale-105 z-10'
                  : 'border-slate-200 bg-white/85 hover:border-purple-300 shadow-sm opacity-90'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute -top-3.5 -right-2 bg-purple-600 text-white rounded-full p-1.5 shadow-md flex items-center justify-center animate-bounce-subtle">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div>
                {/* Theme & Icons */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center text-3xl shadow-inner">
                    {diff.icon}
                  </div>
                  <span className="text-2xl">{diff.secondaryIcon}</span>
                </div>

                {/* Difficulty Title */}
                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-1">
                  {diff.name}
                </h3>

                {/* Range Tag */}
                <div className="inline-block px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-extrabold text-sm mb-3">
                  Range: {diff.rangeLabel}
                </div>

                {/* Short Description */}
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  {diff.description}
                </p>
              </div>

              {/* Bottom Feature Badges */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {diff.baseStars} Stars
                </span>
                <span className="flex items-center gap-1">
                  <Wand2 className="w-3.5 h-3.5 text-purple-500" />
                  {diff.magicHintsCount} Magic Clues
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Start Adventure Button */}
      <button
        onClick={handleStartGame}
        className="w-full max-w-sm py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-2xl shadow-candy-pink hover:opacity-95 active:translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer"
      >
        <Sparkles className="w-7 h-7 text-yellow-300" />
        <span>Let's Guess!</span>
        <ArrowRight className="w-7 h-7" />
      </button>
    </motion.div>
  );
};
