import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Map, Keyboard, ArrowUpDown, RefreshCcw, Award } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const HowToPlayModal = ({ isOpen, onClose, reducedMotion = false }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Choose Your Adventure',
      desc: 'Pick Easy (1–20), Medium (1–50), or Hard (1–100)!',
      icon: '🗺️',
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      num: 2,
      title: 'Type Your Guess',
      desc: 'Pick any whole number inside the adventure range and press Guess!',
      icon: '🔢',
      color: 'bg-sky-100 text-sky-800'
    },
    {
      num: 3,
      title: 'Listen to Bobo’s Clue',
      desc: 'Bobo tells you if the secret number is BIGGER ⬆️ or SMALLER ⬇️!',
      icon: '🐰',
      color: 'bg-pink-100 text-pink-800'
    },
    {
      num: 4,
      title: 'Use Magic Clues',
      desc: 'Stuck? Press the magic wand 🪄 for special even/odd or secret zone hints!',
      icon: '🪄',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      num: 5,
      title: 'Win Stars & Badges!',
      desc: 'Find the secret number to celebrate with confetti and collect shiny trophies! 🏆',
      icon: '⭐',
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/50 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <motion.div
        initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
        exit={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 border-4 border-sky-300 shadow-candy my-6 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close how to play"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-teal-300 text-white flex items-center justify-center text-2xl shadow-candy-blue">
            📖
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              How to Play!
            </h2>
            <p className="text-xs md:text-sm font-bold text-sky-600">
              5 simple steps to become a Number Superstar!
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="flex flex-col gap-3 mb-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-xl shrink-0 font-black shadow-inner`}>
                {step.icon}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800">
                  {step.num}. {step.title}
                </h4>
                <p className="text-xs font-semibold text-slate-600 mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Big Ready Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-black text-lg shadow-candy-blue hover:opacity-95 active:translate-y-1 transition-all cursor-pointer"
        >
          I'm Ready to Play! 🚀
        </button>
      </motion.div>
    </div>
  );
};
