import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "Do you want to leave your current guessing game?",
  confirmLabel = "Yes, Leave",
  cancelLabel = "Keep Playing!",
  onConfirm,
  onCancel,
  reducedMotion = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/50 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <motion.div
        initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
        exit={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-candy text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm">
          🤔
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-2">
          {title}
        </h3>

        <p className="text-xs md:text-sm font-semibold text-slate-600 mb-5 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col gap-2">
          {/* Cancel button (primary for kid safety) */}
          <button
            onClick={() => {
              soundManager.playPop();
              onCancel();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-black text-base shadow-candy-green active:translate-y-1 transition-all cursor-pointer"
          >
            {cancelLabel}
          </button>

          {/* Confirm leave button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onConfirm();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
