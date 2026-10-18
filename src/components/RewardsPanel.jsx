import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, X, Trophy, Edit3, Trash2, CheckCircle2, Lock, Flame } from 'lucide-react';
import { BADGES_LIST, DIFFICULTIES } from '../utils/gameLogic';
import { soundManager } from '../utils/sound';

export const RewardsPanel = ({
  isOpen,
  onClose,
  playerName = 'Explorer',
  stats,
  unlockedBadges = [],
  onChangeName,
  onResetProgress,
  reducedMotion = false
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(playerName);

  if (!isOpen) return null;

  const handleSaveName = (e) => {
    e.preventDefault();
    const trimmed = tempName.trim();
    if (trimmed && trimmed.length <= 20) {
      soundManager.playPop();
      onChangeName(trimmed);
      setIsEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/50 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <motion.div
        initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
        exit={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 border-4 border-purple-300 shadow-candy my-6 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close Trophy Room"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-2xl shadow-candy-yellow">
            🏆
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              Explorer Trophy Room
            </h2>
            <p className="text-xs md:text-sm font-bold text-purple-600">
              Your magical accomplishments & badges
            </p>
          </div>
        </div>

        {/* Player Name Card */}
        <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 mb-5 flex items-center justify-between gap-3">
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full">
              <input
                type="text"
                maxLength={20}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 py-1.5 px-3 rounded-xl border-2 border-purple-400 font-bold text-slate-800 text-base"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="px-2 py-1.5 text-xs text-slate-500 font-bold"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <div>
                <span className="text-[11px] font-bold text-purple-500 uppercase tracking-wider block">
                  Explorer Name
                </span>
                <span className="text-xl font-black text-purple-900">
                  {playerName}
                </span>
              </div>
              <button
                onClick={() => {
                  soundManager.playPop();
                  setTempName(playerName);
                  setIsEditingName(true);
                }}
                className="p-2 rounded-xl bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Change Name"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Rename</span>
              </button>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
          <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <span className="text-[10px] md:text-xs font-bold text-amber-700 uppercase">Total Stars</span>
            <p className="text-xl md:text-2xl font-black text-amber-800 flex items-center justify-center gap-1 mt-0.5">
              <span>⭐</span>
              <span>{stats?.totalStars || 0}</span>
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase">Victories</span>
            <p className="text-xl md:text-2xl font-black text-emerald-800 mt-0.5">
              {stats?.victories || 0}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
            <span className="text-[10px] md:text-xs font-bold text-sky-700 uppercase">Games Played</span>
            <p className="text-xl md:text-2xl font-black text-sky-800 mt-0.5">
              {stats?.gamesPlayed || 0}
            </p>
          </div>
        </div>

        {/* Best Scores Shelf */}
        <div className="mb-5 bg-slate-50 rounded-2xl p-4 border-2 border-slate-200">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Best Scores (Fewest Guesses)</span>
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-500 block">Easy (1–20)</span>
              <span className="font-black text-sm text-purple-700">
                {stats?.bestAttempts?.easy ? `${stats.bestAttempts.easy} tries` : '—'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-500 block">Med (1–50)</span>
              <span className="font-black text-sm text-purple-700">
                {stats?.bestAttempts?.medium ? `${stats.bestAttempts.medium} tries` : '—'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-500 block">Hard (1–100)</span>
              <span className="font-black text-sm text-purple-700">
                {stats?.bestAttempts?.hard ? `${stats.bestAttempts.hard} tries` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Badges Shelf */}
        <div className="mb-6">
          <h3 className="text-sm font-black text-slate-800 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Badges Collection ({unlockedBadges.length}/{BADGES_LIST.length})</span>
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BADGES_LIST.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-amber-50 to-yellow-50 border-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="relative text-3xl mb-1">
                    {isUnlocked ? badge.emoji : '🔒'}
                    {isUnlocked && (
                      <span className="absolute -top-1 -right-1 text-xs">✨</span>
                    )}
                  </div>
                  <h4 className="font-black text-xs text-slate-800 leading-tight">
                    {badge.name}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5 leading-snug">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Reset Progress with confirmation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {showResetConfirm ? (
            <div className="w-full flex items-center justify-between gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-700">
                Reset all stars & badges?
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    soundManager.playPop();
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs cursor-pointer"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Progress</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playPop();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
