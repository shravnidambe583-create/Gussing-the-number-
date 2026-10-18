import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { MascotBobo } from './MascotBobo';
import { soundManager } from '../utils/sound';

export const MagicHintModal = ({
  isOpen,
  onClose,
  hintsHistory = [],
  remainingHints = 0,
  onUseHint,
  reducedMotion = false
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-sm select-none">
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.85, opacity: 0, y: 15 }}
          animate={reducedMotion ? {} : { scale: 1, opacity: 1, y: 0 }}
          exit={reducedMotion ? {} : { scale: 0.85, opacity: 0 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 border-4 border-purple-300 shadow-candy overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            aria-label="Close hints"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl shadow-candy-pink">
              🪄
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">
                Bobo’s Magic Clues!
              </h2>
              <p className="text-xs font-bold text-purple-600">
                {remainingHints > 0
                  ? `You have ${remainingHints} magic clue${remainingHints > 1 ? 's' : ''} left!`
                  : 'No magic clues left for this round!'}
              </p>
            </div>
          </div>

          {/* Active Hints Revealed List */}
          <div className="flex flex-col gap-3 my-4 max-h-60 overflow-y-auto pr-1">
            {hintsHistory.length === 0 ? (
              <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-200 text-center text-sm font-semibold text-purple-800">
                <p>Bobo hasn't cast any clue spells yet!</p>
                <p className="text-xs text-purple-500 mt-1">
                  Press the magic button below to unlock a special clue!
                </p>
              </div>
            ) : (
              hintsHistory.map((hint, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 shadow-sm flex items-start gap-3"
                >
                  <span className="text-2xl shrink-0">{hint.icon}</span>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-600">
                      Clue #{idx + 1}: {hint.title}
                    </h4>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                      {hint.text}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Action Button */}
          <div className="mt-4 flex flex-col gap-2">
            {remainingHints > 0 ? (
              <button
                onClick={() => {
                  soundManager.playMagicChime();
                  onUseHint();
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-black text-lg shadow-candy-pink active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wand2 className="w-5 h-5 text-yellow-300 animate-wiggle" />
                <span>Cast Magic Clue! ({remainingHints} left)</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl bg-slate-200 text-slate-700 font-bold text-base hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Got It! Back to Game
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
