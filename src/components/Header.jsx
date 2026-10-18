import React from 'react';
import { Volume2, VolumeX, Sparkles, Award, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const Header = ({
  totalStars = 0,
  soundEnabled = false,
  onToggleSound,
  reducedMotion = false,
  onToggleReducedMotion,
  onOpenDashboard,
  onOpenHowToPlay,
  onGoHome,
  currentScreen
}) => {
  return (
    <header className="relative z-20 w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2 select-none">
      {/* Logo & Home Click */}
      <button
        onClick={() => {
          soundManager.playPop();
          onGoHome();
        }}
        className="flex items-center gap-2 group text-left transition-transform active:scale-95 focus-visible:ring-4 focus-visible:ring-purple-300 rounded-2xl p-1"
        title="Go to Home"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-400 to-amber-300 flex items-center justify-center text-white text-xl md:text-2xl shadow-candy-pink transform group-hover:rotate-6 transition-transform">
          🪄
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
            Little Guesser
          </h1>
          <p className="text-[11px] md:text-xs font-semibold text-purple-600/80 -mt-1 hidden sm:block">
            Magical Number Adventure
          </p>
        </div>
      </button>

      {/* Right Controls Bar */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Stars Counter Pill */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/90 border-2 border-amber-300 shadow-candy-sm text-amber-900 font-bold text-sm md:text-base cursor-default"
          title={`Total Stars Earned: ${totalStars}`}
        >
          <span className="text-lg md:text-xl animate-bounce-subtle">⭐</span>
          <span>{totalStars}</span>
        </div>

        {/* Trophy / Dashboard Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onOpenDashboard();
          }}
          className="p-2 md:px-3 md:py-2 rounded-2xl bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 shadow-candy-sm text-purple-700 font-bold flex items-center gap-1 transition-all active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-purple-300"
          title="Trophy Room & Badges"
          aria-label="View trophies and progress"
        >
          <Award className="w-5 h-5 text-purple-600" />
          <span className="hidden md:inline text-xs">Badges</span>
        </button>

        {/* How to Play Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onOpenHowToPlay();
          }}
          className="p-2 md:px-3 md:py-2 rounded-2xl bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 shadow-candy-sm text-sky-700 font-bold flex items-center gap-1 transition-all active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-sky-300"
          title="How to Play"
          aria-label="How to play guide"
        >
          <HelpCircle className="w-5 h-5 text-sky-600" />
          <span className="hidden md:inline text-xs">Help</span>
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className={`p-2 rounded-2xl border-2 transition-all active:translate-y-0.5 shadow-candy-sm focus-visible:ring-4 ${
            soundEnabled
              ? 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-700 focus-visible:ring-emerald-300'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500 focus-visible:ring-slate-300'
          }`}
          title={soundEnabled ? 'Sound is ON (Click to Mute)' : 'Sound is MUTED (Click to Enable Sound)'}
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <VolumeX className="w-5 h-5 text-slate-500" />
          )}
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={() => {
            soundManager.playPop();
            onToggleReducedMotion();
          }}
          className={`p-2 rounded-2xl border-2 transition-all active:translate-y-0.5 shadow-candy-sm focus-visible:ring-4 ${
            reducedMotion
              ? 'bg-amber-100 border-amber-300 text-amber-700 focus-visible:ring-amber-300'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500 focus-visible:ring-slate-300'
          }`}
          title={reducedMotion ? 'Gentle Motion Active (Reduced animations)' : 'Normal Motion Active'}
          aria-label="Toggle reduced motion"
        >
          {reducedMotion ? (
            <EyeOff className="w-5 h-5 text-amber-600" />
          ) : (
            <Eye className="w-5 h-5 text-slate-500" />
          )}
        </button>
      </div>
    </header>
  );
};
