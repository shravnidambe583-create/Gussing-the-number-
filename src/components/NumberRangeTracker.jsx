import React from 'react';
import { motion } from 'framer-motion';

export const NumberRangeTracker = ({ min, max, currentMin, currentMax }) => {
  // Calculate percentage range currently possible
  const totalSpan = max - min;
  const leftPercent = Math.max(0, Math.min(100, ((currentMin - min) / totalSpan) * 100));
  const rightPercent = Math.max(0, Math.min(100, ((max - currentMax) / totalSpan) * 100));
  const widthPercent = Math.max(4, 100 - leftPercent - rightPercent);

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-3 border-2 border-purple-200 shadow-sm select-none">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5 px-1">
        <span className="flex items-center gap-1">
          <span>Min:</span>
          <span className="text-purple-700 font-extrabold text-sm">{min}</span>
        </span>
        <span className="text-purple-600 font-extrabold text-xs bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
          Secret Zone: {currentMin} – {currentMax}
        </span>
        <span className="flex items-center gap-1">
          <span>Max:</span>
          <span className="text-purple-700 font-extrabold text-sm">{max}</span>
        </span>
      </div>

      {/* Visual Number Line Bar */}
      <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        {/* Active remaining range zone */}
        <motion.div
          className="absolute top-0 bottom-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 rounded-full"
          animate={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
