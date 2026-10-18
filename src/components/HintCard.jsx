import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, Sparkles, Smile } from 'lucide-react';

export const HintCard = ({
  lastGuess = null,
  hintType = null, // 'higher' | 'lower' | 'correct' | null
  playerName = 'Explorer',
  reducedMotion = false
}) => {
  return (
    <div className="w-full select-none">
      <AnimatePresence mode="wait">
        {hintType === 'higher' ? (
          <motion.div
            key="higher"
            initial={reducedMotion ? {} : { scale: 0.9, opacity: 0, y: -5 }}
            animate={reducedMotion ? {} : { scale: 1, opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-4 md:p-5 shadow-candy-yellow text-center flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-3xl shadow-md shrink-0 animate-bounce-subtle">
              <ArrowUpCircle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg md:text-xl font-black text-amber-950">
                Oops! My number is BIGGER!
              </p>
              <p className="text-sm md:text-base font-bold text-amber-800">
                Try a little higher! <span className="inline-block animate-bounce">⬆️</span>
              </p>
            </div>
          </motion.div>
        ) : hintType === 'lower' ? (
          <motion.div
            key="lower"
            initial={reducedMotion ? {} : { scale: 0.9, opacity: 0, y: -5 }}
            animate={reducedMotion ? {} : { scale: 1, opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-gradient-to-r from-sky-50 to-blue-50 border-3 border-sky-300 rounded-3xl p-4 md:p-5 shadow-candy-blue text-center flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-400 text-white flex items-center justify-center text-3xl shadow-md shrink-0 animate-bounce-subtle">
              <ArrowDownCircle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg md:text-xl font-black text-sky-950">
                Almost! My number is SMALLER!
              </p>
              <p className="text-sm md:text-base font-bold text-sky-800">
                Try a little lower! <span className="inline-block animate-bounce">⬇️</span>
              </p>
            </div>
          </motion.div>
        ) : hintType === 'correct' ? (
          <motion.div
            key="correct"
            initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
            animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
            className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-yellow-50 border-3 border-emerald-400 rounded-3xl p-4 md:p-5 shadow-candy-green text-center flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
              🌟
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg md:text-xl font-black text-emerald-950">
                WOW, {playerName}! YOU DID IT!
              </p>
              <p className="text-sm md:text-base font-bold text-emerald-800">
                You're a Number Superstar! 🌟
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="initial"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            className="w-full bg-white/80 border-2 border-purple-200 rounded-3xl p-4 text-center flex items-center justify-center gap-2 text-purple-900 font-bold text-sm md:text-base"
          >
            <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
            <span>Type your guess below and press the button! Bobo is excited! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
