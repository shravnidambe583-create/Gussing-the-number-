import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Home, Wand2, Send, AlertCircle, RefreshCw, Plus, Minus } from 'lucide-react';
import { MascotBobo } from './MascotBobo';
import { HintCard } from './HintCard';
import { GuessHistory } from './GuessHistory';
import { NumberRangeTracker } from './NumberRangeTracker';
import { MagicHintModal } from './MagicHintModal';
import { DIFFICULTIES, generateMagicHint } from '../utils/gameLogic';
import { soundManager } from '../utils/sound';

export const GameScreen = ({
  playerName = 'Explorer',
  difficultyId = 'easy',
  secretNumber,
  onVictory,
  onGoHomeRequest,
  reducedMotion = false
}) => {
  const diffConfig = DIFFICULTIES[difficultyId] || DIFFICULTIES.easy;
  const { min, max, magicHintsCount } = diffConfig;

  // Game state
  const [guessInput, setGuessInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentMin, setCurrentMin] = useState(min);
  const [currentMax, setCurrentMax] = useState(max);
  const [lastGuessResult, setLastGuessResult] = useState(null); // 'higher' | 'lower' | 'correct' | null
  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Bobo mood: 'idle' | 'higher' | 'lower' | 'thinking' | 'confused' | 'celebrate'
  const [boboMood, setBoboMood] = useState('idle');

  // Magic hints state
  const [hintsRevealed, setHintsRevealed] = useState([]);
  const [isMagicModalOpen, setIsMagicModalOpen] = useState(false);

  const inputRef = useRef(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle guess submission
  const handleGuessSubmit = (e) => {
    if (e) e.preventDefault();
    if (isProcessing) return;

    const trimmed = guessInput.trim();

    // 1. Check empty
    if (!trimmed) {
      soundManager.playGentleOops();
      setBoboMood('confused');
      setValidationError("Please enter a number first! Bobo is waiting! 🎈");
      return;
    }

    // 2. Check whole number & numeric validity
    if (!/^-?\d+$/.test(trimmed)) {
      soundManager.playGentleOops();
      setBoboMood('confused');
      setValidationError("Whole magical numbers only, please! No letters or decimals! 🔢");
      return;
    }

    const num = parseInt(trimmed, 10);

    // 3. Check bounds [min, max]
    if (num < min || num > max) {
      soundManager.playGentleOops();
      setBoboMood('confused');
      setValidationError(`Oopsie! Pick a number between ${min} and ${max}! 🌈`);
      return;
    }

    // Clear previous error
    setValidationError('');
    setIsProcessing(true);

    const newAttemptNumber = attempts + 1;
    setAttempts(newAttemptNumber);

    // Check result
    if (num === secretNumber) {
      // WIN!
      setLastGuessResult('correct');
      setBoboMood('celebrate');
      soundManager.playVictory();

      const newGuesses = [
        ...guesses,
        { guess: num, result: 'correct', attemptNumber: newAttemptNumber }
      ];
      setGuesses(newGuesses);

      // Delay victory trigger slightly so child sees the "WOW, YOU DID IT!" card first
      setTimeout(() => {
        onVictory({
          attempts: newAttemptNumber,
          difficulty: difficultyId,
          secretNumber: secretNumber
        });
        setIsProcessing(false);
      }, 900);

    } else if (num < secretNumber) {
      // Secret is HIGHER than guess
      setLastGuessResult('higher');
      setBoboMood('higher');
      soundManager.playHigher();

      // Narrow down tracker min if higher than current min
      if (num >= currentMin) {
        setCurrentMin(num + 1);
      }

      setGuesses((prev) => [
        ...prev,
        { guess: num, result: 'higher', attemptNumber: newAttemptNumber }
      ]);
      setGuessInput('');
      setIsProcessing(false);

    } else {
      // Secret is LOWER than guess
      setLastGuessResult('lower');
      setBoboMood('lower');
      soundManager.playLower();

      // Narrow down tracker max if lower than current max
      if (num <= currentMax) {
        setCurrentMax(num - 1);
      }

      setGuesses((prev) => [
        ...prev,
        { guess: num, result: 'lower', attemptNumber: newAttemptNumber }
      ]);
      setGuessInput('');
      setIsProcessing(false);
    }

    // Re-focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Magic hint action
  const handleUseMagicHint = () => {
    if (hintsRevealed.length >= magicHintsCount) return;

    const newHint = generateMagicHint(secretNumber, min, max, hintsRevealed.length);
    setHintsRevealed((prev) => [...prev, newHint]);
    setBoboMood('thinking');
  };

  const remainingHints = magicHintsCount - hintsRevealed.length;

  // Stepper helper buttons for touch-friendly guessing
  const handleAdjustGuess = (delta) => {
    soundManager.playPop();
    const currentVal = parseInt(guessInput, 10);
    let nextVal = isNaN(currentVal) ? min : currentVal + delta;
    if (nextVal < min) nextVal = min;
    if (nextVal > max) nextVal = max;
    setGuessInput(String(nextVal));
    if (validationError) setValidationError('');
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-2 md:py-4 flex flex-col items-center">
      {/* Top Status Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl border-2 border-purple-200 shadow-sm select-none">
        {/* Home / Back with confirmation */}
        <button
          onClick={() => {
            soundManager.playPop();
            onGoHomeRequest(attempts > 0);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm transition-all active:translate-y-0.5 cursor-pointer"
          title="Back to Home / Adventure selection"
        >
          <Home className="w-4 h-4 text-purple-600" />
          <span>Leave</span>
        </button>

        {/* Personalized Motivation */}
        <div className="text-center font-extrabold text-xs md:text-sm text-purple-900 truncate">
          <span>You can do it, </span>
          <span className="text-pink-600">{playerName}</span>! 🌟
        </div>

        {/* Attempts & Difficulty Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 font-extrabold text-xs">
            {diffConfig.name} ({min}–{max})
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-pink-100 border border-pink-200 text-pink-700 font-black text-xs md:text-sm">
            Tries: {attempts}
          </div>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-5 md:p-8 border-4 border-purple-200 shadow-candy flex flex-col items-center relative overflow-hidden mb-4">
        {/* Subtle decorative rainbow gradient line on top */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400" />

        {/* Center Mascot & Mystery Box Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-2 w-full">
          {/* Bobo Mascot */}
          <div className="flex flex-col items-center">
            <MascotBobo mood={boboMood} size="md" />
            <span className="text-xs font-bold text-purple-600 mt-1">Bobo</span>
          </div>

          {/* Mystery Secret Card */}
          <motion.div
            className="relative w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white border-4 border-yellow-300 shadow-candy-pink select-none"
            animate={
              reducedMotion
                ? {}
                : {
                    rotate: lastGuessResult === 'higher' ? [0, 4, 0] : lastGuessResult === 'lower' ? [0, -4, 0] : [0, -2, 2, 0],
                    scale: [1, 1.03, 1]
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Sparkles */}
            <span className="absolute top-2 left-2 text-yellow-300 text-lg">✨</span>
            <span className="absolute bottom-2 right-2 text-yellow-300 text-lg">⭐</span>

            <span className="text-6xl md:text-7xl font-black drop-shadow-md">?</span>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-yellow-200 mt-0.5">
              Secret Number
            </span>
          </motion.div>
        </div>

        {/* Heading & Instructions */}
        <h2 className="text-xl md:text-3xl font-black text-slate-800 mt-2 mb-1 text-center">
          Can you find my secret number?
        </h2>
        <p className="text-xs md:text-sm font-bold text-slate-500 mb-4 text-center">
          Pick any whole number between <span className="text-purple-600 font-black">{min}</span> and <span className="text-purple-600 font-black">{max}</span>!
        </p>

        {/* Number Range Tracker Bar */}
        <div className="w-full max-w-md mb-4">
          <NumberRangeTracker
            min={min}
            max={max}
            currentMin={currentMin}
            currentMax={currentMax}
          />
        </div>

        {/* Guess Input & Button Form */}
        <form onSubmit={handleGuessSubmit} className="w-full max-w-md flex flex-col items-center gap-3">
          <div className="w-full flex items-center justify-center gap-2">
            {/* Minus 1 stepper button */}
            <button
              type="button"
              onClick={() => handleAdjustGuess(-1)}
              className="w-12 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-black text-2xl flex items-center justify-center transition-all active:translate-y-1 cursor-pointer select-none"
              title="Decrease by 1"
              aria-label="Decrease guess by 1"
            >
              <Minus className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Input Field */}
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="number"
                min={min}
                max={max}
                value={guessInput}
                onChange={(e) => {
                  setGuessInput(e.target.value);
                  if (validationError) setValidationError('');
                }}
                placeholder="?"
                className="w-full h-14 text-center text-3xl md:text-4xl font-black text-purple-900 bg-purple-50/70 border-3 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-200 transition-all placeholder:text-purple-300"
              />
            </div>

            {/* Plus 1 stepper button */}
            <button
              type="button"
              onClick={() => handleAdjustGuess(1)}
              className="w-12 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-black text-2xl flex items-center justify-center transition-all active:translate-y-1 cursor-pointer select-none"
              title="Increase by 1"
              aria-label="Increase guess by 1"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Friendly Validation Error */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="w-full text-xs md:text-sm font-bold text-rose-600 bg-rose-50 border-2 border-rose-200 rounded-2xl px-3 py-2 flex items-center justify-center gap-1.5 text-center"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{validationError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Row: Guess Button + Magic Hint Button */}
          <div className="w-full flex items-center gap-2 mt-1">
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-black text-xl md:text-2xl shadow-candy-pink active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span>Guess!</span>
              <Send className="w-5 h-5 ml-1" />
            </button>

            {/* Magic Clue Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playPop();
                setIsMagicModalOpen(true);
              }}
              className="py-4 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 text-amber-900 font-extrabold text-sm shadow-candy-yellow active:translate-y-1 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              title="Open Magic Clues"
            >
              <Wand2 className="w-5 h-5 text-amber-600 animate-wiggle" />
              <span className="hidden sm:inline">Magic Clue</span>
              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xs">
                {remainingHints}
              </span>
            </button>
          </div>
        </form>

        {/* Live Hint Feedback Card */}
        <div className="w-full max-w-md mt-5">
          <HintCard
            lastGuess={guesses[guesses.length - 1]?.guess}
            hintType={lastGuessResult}
            playerName={playerName}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>

      {/* Past Guesses History Shelf */}
      <div className="w-full max-w-3xl">
        <GuessHistory guesses={guesses} />
      </div>

      {/* Magic Hint Modal */}
      <MagicHintModal
        isOpen={isMagicModalOpen}
        onClose={() => setIsMagicModalOpen(false)}
        hintsHistory={hintsRevealed}
        remainingHints={remainingHints}
        onUseHint={handleUseMagicHint}
        reducedMotion={reducedMotion}
      />
    </div>
  );
};
