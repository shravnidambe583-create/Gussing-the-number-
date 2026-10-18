import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, History } from 'lucide-react';

export const GuessHistory = ({ guesses = [] }) => {
  if (guesses.length === 0) {
    return null;
  }

  // Reverse copy so newest guess is first
  const reversedGuesses = [...guesses].reverse();

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-5 border-2 border-purple-200 shadow-sm select-none">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-slate-700">
          <History className="w-4 h-4 text-purple-500" />
          <span>Your Past Guesses ({guesses.length})</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">Newest first</span>
      </div>

      {/* Horizontal / Wrap scrollable list of guess chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
        {reversedGuesses.map((item, idx) => {
          const isHigher = item.result === 'higher'; // secret is higher, so guess was too low
          const isLower = item.result === 'lower';   // secret is lower, so guess was too high

          return (
            <motion.div
              key={item.attemptNumber}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 font-black text-sm md:text-base shadow-sm ${
                isHigher
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : isLower
                  ? 'bg-sky-100 border-sky-300 text-sky-900'
                  : 'bg-emerald-100 border-emerald-300 text-emerald-900'
              }`}
            >
              <span className="text-[11px] font-bold opacity-60">#{item.attemptNumber}</span>
              <span className="text-base md:text-lg">{item.guess}</span>
              {isHigher && (
                <span className="flex items-center text-xs text-amber-700 font-bold ml-0.5" title="Too low! Try higher!">
                  <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Low</span>
                </span>
              )}
              {isLower && (
                <span className="flex items-center text-xs text-sky-700 font-bold ml-0.5" title="Too high! Try lower!">
                  <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
                  <span>High</span>
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
