import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, UserCheck, Edit3 } from 'lucide-react';
import { MascotBobo } from './MascotBobo';
import { soundManager } from '../utils/sound';

export const WelcomeScreen = ({
  existingName = '',
  onStartAdventure,
  reducedMotion = false
}) => {
  const [nameInput, setNameInput] = useState(existingName || '');
  const [validationError, setValidationError] = useState('');
  const [isChangingName, setIsChangingName] = useState(!existingName);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = nameInput.trim();

    if (!trimmed) {
      soundManager.playGentleOops();
      setValidationError("Oopsie! Bobo wants to know your name before we play! 🌸");
      return;
    }

    if (trimmed.length > 20) {
      soundManager.playGentleOops();
      setValidationError("That's a super cool name, but keep it within 20 letters! 🎈");
      return;
    }

    setValidationError('');
    soundManager.playPop();
    onStartAdventure(trimmed);
  };

  const handleContinueExisting = () => {
    soundManager.playPop();
    onStartAdventure(existingName);
  };

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 w-full max-w-xl mx-auto px-4 py-4 md:py-8 flex flex-col items-center text-center"
    >
      {/* Decorative Rainbow Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-pink-200 shadow-candy-sm mb-4"
        animate={reducedMotion ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xl">🌈</span>
        <span className="text-xs md:text-sm font-bold text-pink-600 tracking-wide uppercase">
          Magical Adventure Awaits
        </span>
        <span className="text-xl">✨</span>
      </motion.div>

      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight tracking-tight drop-shadow-sm mb-2">
        Welcome to the{' '}
        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
          Magical Number World!
        </span>
      </h1>

      <p className="text-base md:text-xl font-medium text-slate-600 max-w-md mx-auto mb-6">
        Let's have some fun and discover a secret number! 🪄
      </p>

      {/* Mascot & Speech Bubble */}
      <div className="relative flex flex-col items-center mb-6">
        {/* Animated Speech Bubble */}
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
          animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white border-3 border-purple-200 rounded-3xl p-4 shadow-candy mb-2 max-w-xs md:max-w-sm text-center"
        >
          <p className="text-base md:text-lg font-bold text-purple-900">
            {existingName && !isChangingName
              ? `Welcome back, explorer ${existingName}! 🎉`
              : 'Hi, little explorer! What’s your name? 🌟'}
          </p>
          {/* Bubble Tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
        </motion.div>

        {/* Mascot Bobo */}
        <MascotBobo mood="waving" size="lg" />
      </div>

      {/* Welcome Back Card vs Name Input Form */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 border-4 border-pink-200 shadow-candy relative overflow-hidden">
        {/* Top subtle decorative strip */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400" />

        {existingName && !isChangingName ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <UserCheck className="w-6 h-6 text-emerald-500" />
              <span className="text-xl font-bold">
                Playing as <span className="text-purple-600">{existingName}</span>
              </span>
            </div>

            <button
              onClick={handleContinueExisting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-extrabold text-xl shadow-candy-pink hover:opacity-95 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" />
              <span>Let's Play!</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playPop();
                setIsChangingName(true);
                setNameInput('');
              }}
              className="text-sm font-semibold text-purple-600 hover:text-purple-800 underline underline-offset-4 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Use a different name</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <div className="w-full text-left">
              <label htmlFor="playerNameInput" className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                Your Explorer Name:
              </label>
              <div className="relative">
                <input
                  id="playerNameInput"
                  type="text"
                  maxLength={20}
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="Enter your name here..."
                  autoFocus
                  className="w-full py-3.5 px-5 text-lg md:text-xl font-bold text-slate-800 bg-pink-50/70 border-3 border-pink-300 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-200 transition-all placeholder:text-slate-400 placeholder:font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl select-none">
                  ⭐
                </span>
              </div>

              {/* Validation Error Message */}
              <AnimatePresence>
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-2 text-xs md:text-sm font-bold text-rose-500 bg-rose-50 border border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5"
                  >
                    <span>🎈</span>
                    <span>{validationError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Let's Play Button */}
            <button
              type="submit"
              className="w-full mt-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-extrabold text-xl shadow-candy-pink hover:opacity-95 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span>Let's Play!</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            {existingName && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playPop();
                  setIsChangingName(false);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline"
              >
                Cancel and keep "{existingName}"
              </button>
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
};
