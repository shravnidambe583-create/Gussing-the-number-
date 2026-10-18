import React from 'react';
import { motion } from 'framer-motion';

export const MascotBobo = ({ mood = 'idle', size = 'md', className = '' }) => {
  // Sizes
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-48 h-48 md:w-56 md:h-56',
    xl: 'w-56 h-56 md:w-64 md:h-64'
  };

  // Animation variants depending on mood
  const getVariants = () => {
    switch (mood) {
      case 'celebrate':
        return {
          animate: {
            y: [0, -16, 0, -12, 0],
            rotate: [0, -6, 6, -3, 0],
            transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
          }
        };
      case 'higher':
        return {
          animate: {
            y: [0, -12, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }
        };
      case 'lower':
        return {
          animate: {
            y: [0, 8, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }
        };
      case 'thinking':
        return {
          animate: {
            rotate: [0, -4, 4, 0],
            transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
          }
        };
      case 'waving':
        return {
          animate: {
            rotate: [0, -3, 3, 0],
            transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }
        };
      default: // idle
        return {
          animate: {
            y: [0, -6, 0],
            transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }
        };
    }
  };

  return (
    <motion.div
      className={`relative inline-block select-none filter drop-shadow-lg ${sizeMap[size] || sizeMap.md} ${className}`}
      variants={getVariants()}
      animate="animate"
      whileHover={{ scale: 1.05, rotate: 2 }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Bobo Fur Gradient - Magical Lilac to Sky Soft Pink */}
          <linearGradient id="boboBodyGrad" x1="40" y1="30" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4B5FD" />
            <stop offset="0.5" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>

          {/* Bobo Belly Gradient */}
          <linearGradient id="boboBellyGrad" x1="70" y1="100" x2="130" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF1F2" />
            <stop offset="1" stopColor="#FDE2E4" />
          </linearGradient>

          {/* Ear Inner Pink */}
          <linearGradient id="boboEarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FDA4AF" />
            <stop offset="1" stopColor="#F43F5E" />
          </linearGradient>

          {/* Wizard / Party Hat Grad */}
          <linearGradient id="hatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy="186" rx="65" ry="12" fill="rgba(0,0,0,0.08)" />

        {/* Ears */}
        {/* Left Ear */}
        <g className="transition-transform duration-300">
          <circle cx="56" cy="62" r="28" fill="url(#boboBodyGrad)" />
          <circle cx="56" cy="62" r="17" fill="url(#boboEarGrad)" opacity="0.8" />
        </g>
        {/* Right Ear */}
        <g className="transition-transform duration-300">
          <circle cx="144" cy="62" r="28" fill="url(#boboBodyGrad)" />
          <circle cx="144" cy="62" r="17" fill="url(#boboEarGrad)" opacity="0.8" />
        </g>

        {/* Body & Head */}
        <rect
          x="38"
          y="52"
          width="124"
          height="126"
          rx="62"
          fill="url(#boboBodyGrad)"
          stroke="#7C3AED"
          strokeWidth="3.5"
        />

        {/* Belly Patch */}
        <ellipse cx="100" cy="138" rx="42" ry="34" fill="url(#boboBellyGrad)" />

        {/* Belly Star Decal */}
        <path
          d="M100 126 L103 133 L110 134 L105 139 L106 146 L100 142 L94 146 L95 139 L90 134 L97 133 Z"
          fill="#FBBF24"
          opacity="0.9"
        />

        {/* Cute Cheeks */}
        <ellipse cx="64" cy="116" rx="10" ry="6" fill="#FB7185" opacity="0.55" />
        <ellipse cx="136" cy="116" rx="10" ry="6" fill="#FB7185" opacity="0.55" />

        {/* Eyes according to mood */}
        {mood === 'celebrate' ? (
          // Joyful curved happy squint eyes ^ ^
          <g stroke="#312E81" strokeWidth="4" strokeLinecap="round">
            <path d="M68 102 Q78 88 88 102" />
            <path d="M112 102 Q122 88 132 102" />
          </g>
        ) : mood === 'thinking' ? (
          // Curious eyes looking up to the corner
          <g>
            <circle cx="78" cy="98" r="12" fill="#312E81" />
            <circle cx="82" cy="94" r="5" fill="white" />
            <circle cx="85" cy="99" r="2" fill="white" />

            <circle cx="122" cy="98" r="12" fill="#312E81" />
            <circle cx="126" cy="94" r="5" fill="white" />
            <circle cx="129" cy="99" r="2" fill="white" />
          </g>
        ) : mood === 'confused' ? (
          // One big eye, one squint eye
          <g>
            <circle cx="76" cy="98" r="13" fill="#312E81" />
            <circle cx="73" cy="94" r="5" fill="white" />

            <path d="M116 100 Q124 92 132 100" stroke="#312E81" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : (
          // Default big sparkly eyes
          <g>
            <circle cx="76" cy="100" r="12" fill="#312E81" />
            <circle cx="73" cy="96" r="4.5" fill="white" />
            <circle cx="79" cy="103" r="2" fill="white" />

            <circle cx="124" cy="100" r="12" fill="#312E81" />
            <circle cx="121" cy="96" r="4.5" fill="white" />
            <circle cx="127" cy="103" r="2" fill="white" />
          </g>
        )}

        {/* Mouth according to mood */}
        {mood === 'celebrate' ? (
          // Big laughing open mouth with cute tongue
          <g>
            <path d="M90 114 Q100 132 110 114 Z" fill="#BE123C" stroke="#312E81" strokeWidth="2.5" />
            <path d="M94 122 Q100 118 106 122" fill="#F43F5E" />
          </g>
        ) : mood === 'higher' ? (
          // Excited open "O" mouth
          <ellipse cx="100" cy="116" rx="7" ry="9" fill="#BE123C" stroke="#312E81" strokeWidth="2.5" />
        ) : mood === 'lower' ? (
          // Friendly gentle small smile
          <path d="M92 114 Q100 124 108 114" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : mood === 'confused' ? (
          // Wavy squiggly mouth
          <path d="M92 118 Q97 114 101 118 Q105 122 109 116" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          // Cheerful open smile
          <path d="M91 113 Q100 125 109 113" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}

        {/* Nose */}
        <ellipse cx="100" cy="106" rx="4" ry="3" fill="#6366F1" />

        {/* Arms / Hands */}
        {mood === 'celebrate' ? (
          // Both arms up in the air!
          <g>
            <motion.path
              d="M38 120 Q20 90 32 75"
              stroke="#A78BFA"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              d="M162 120 Q180 90 168 75"
              stroke="#A78BFA"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : mood === 'waving' ? (
          // Left hand resting, right hand waving high!
          <g>
            <path d="M42 135 Q30 145 44 152" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M158 130 Q176 100 182 85" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle cx="182" cy="84" r="8" fill="#C4B5FD" />
          </g>
        ) : mood === 'higher' ? (
          // Pointing up towards the sky
          <g>
            <path d="M42 135 Q34 148 46 154" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M158 130 Q170 100 170 80" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            {/* Little wand with star */}
            <line x1="168" y1="88" x2="180" y2="60" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            <polygon points="180,50 183,57 190,58 185,63 186,70 180,66 174,70 175,63 170,58 177,57" fill="#FDE047" />
          </g>
        ) : mood === 'lower' ? (
          // Pointing down
          <g>
            <path d="M42 135 Q34 148 46 154" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M158 130 Q175 145 178 165" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle cx="178" cy="165" r="8" fill="#C4B5FD" />
          </g>
        ) : mood === 'thinking' ? (
          // Paw on cheek
          <g>
            <path d="M42 135 Q34 148 46 154" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M158 135 Q145 125 136 122" stroke="#A78BFA" strokeWidth="14" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          // Default cozy cute paws on belly
          <g>
            <circle cx="56" cy="142" r="10" fill="#A78BFA" />
            <circle cx="144" cy="142" r="10" fill="#A78BFA" />
          </g>
        )}

        {/* Hat for celebrate mood or wizard mood */}
        {mood === 'celebrate' ? (
          // Party cone hat with pompom and stripes
          <g>
            <polygon points="82,46 118,46 100,10" fill="url(#hatGrad)" stroke="#D97706" strokeWidth="2" />
            <circle cx="100" cy="10" r="7" fill="#EC4899" />
            {/* Confetti squiggles */}
            <path d="M88,38 Q100,32 112,38" stroke="#3B82F6" strokeWidth="2.5" fill="none" />
            <path d="M92,26 Q100,22 108,26" stroke="#10B981" strokeWidth="2.5" fill="none" />
          </g>
        ) : (
          // Little cute magic star clip on left ear
          <polygon
            points="54,34 57,41 64,42 59,47 60,54 54,50 48,54 49,47 44,42 51,41"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.5"
          />
        )}
      </svg>
    </motion.div>
  );
};
