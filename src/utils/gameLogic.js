// Game Logic, Difficulty Levels, Hints, and Badges

export const DIFFICULTIES = {
  easy: {
    id: 'easy',
    name: 'Easy Explorer',
    rangeLabel: '1 – 20',
    min: 1,
    max: 20,
    magicHintsCount: 3,
    baseStars: 3,
    theme: 'Flowers & Butterflies',
    accentColor: 'from-emerald-400 to-teal-300',
    bgCard: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    btnBg: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    description: 'A relaxing stroll with friendly numbers and lots of helpful clues!',
    icon: '🌸',
    secondaryIcon: '🦋'
  },
  medium: {
    id: 'medium',
    name: 'Brave Detective',
    rangeLabel: '1 – 50',
    min: 1,
    max: 50,
    magicHintsCount: 2,
    baseStars: 5,
    theme: 'Treasure Maps & Clues',
    accentColor: 'from-sky-400 to-blue-300',
    bgCard: 'bg-sky-50 border-sky-300 text-sky-950',
    btnBg: 'bg-sky-500 hover:bg-sky-600 text-white',
    description: 'A fun detective quest with hidden secrets waiting to be found!',
    icon: '🗺️',
    secondaryIcon: '🔍'
  },
  hard: {
    id: 'hard',
    name: 'Number Wizard',
    rangeLabel: '1 – 100',
    min: 1,
    max: 100,
    magicHintsCount: 1,
    baseStars: 8,
    theme: 'Magical Stars & Potions',
    accentColor: 'from-purple-400 to-pink-300',
    bgCard: 'bg-purple-50 border-purple-300 text-purple-950',
    btnBg: 'bg-purple-500 hover:bg-purple-600 text-white',
    description: 'The ultimate wizard challenge for smart adventurers!',
    icon: '🧙‍♂️',
    secondaryIcon: '✨'
  }
};

export const BADGES_LIST = [
  {
    id: 'first_victory',
    name: 'First Victory',
    emoji: '🏆',
    description: 'Win your very first game adventure!',
    check: (stats, currentWin) => currentWin.isWin && stats.victories >= 1
  },
  {
    id: 'quick_thinker',
    name: 'Quick Thinker',
    emoji: '⚡',
    description: 'Find the secret number within 5 guesses!',
    check: (stats, currentWin) => currentWin.isWin && currentWin.attempts <= 5
  },
  {
    id: 'super_detective',
    name: 'Super Detective',
    emoji: '🔍',
    description: 'Solve the mystery on Medium difficulty!',
    check: (stats, currentWin) => currentWin.isWin && currentWin.difficulty === 'medium'
  },
  {
    id: 'number_wizard',
    name: 'Number Wizard',
    emoji: '🪄',
    description: 'Conquer the magical 1–100 Hard difficulty!',
    check: (stats, currentWin) => currentWin.isWin && currentWin.difficulty === 'hard'
  },
  {
    id: 'star_collector',
    name: 'Star Collector',
    emoji: '⭐',
    description: 'Collect 20 or more shiny magical stars!',
    check: (stats, currentWin) => (stats.totalStars + (currentWin.starsEarned || 0)) >= 20
  },
  {
    id: 'bullseye',
    name: 'Lucky Spark',
    emoji: '🎯',
    description: 'Guess the secret number on your 1st or 2nd try!',
    check: (stats, currentWin) => currentWin.isWin && currentWin.attempts <= 2
  }
];

// Generate random secret number inside [min, max] inclusive
export const generateSecretNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Calculate bonus stars based on attempts
export const calculateStars = (difficultyId, attempts) => {
  const base = DIFFICULTIES[difficultyId]?.baseStars || 3;
  let bonus = 0;
  if (attempts <= 3) {
    bonus = 3; // Outstanding!
  } else if (attempts <= 5) {
    bonus = 2; // Super fast!
  } else if (attempts <= 7) {
    bonus = 1; // Great job!
  }
  return { base, bonus, total: base + bonus };
};

// Generate an accurate, kid-friendly magic hint from actual secret number
export const generateMagicHint = (secret, min, max, usedHintsCount) => {
  // Hint 1: Even or Odd
  if (usedHintsCount === 0) {
    const isEven = secret % 2 === 0;
    return {
      title: 'Even or Odd Clue',
      icon: isEven ? '🎈' : '🌟',
      text: isEven
        ? `The magical number is EVEN! It ends in 0, 2, 4, 6, or 8!`
        : `The magical number is ODD! It ends in 1, 3, 5, 7, or 9!`
    };
  }

  // Hint 2: Tighter Window Range
  if (usedHintsCount === 1) {
    const totalSpan = max - min;
    const windowRadius = Math.max(2, Math.floor(totalSpan * 0.2));
    const hintMin = Math.max(min, secret - Math.floor(Math.random() * (windowRadius - 1)) - 1);
    const hintMax = Math.min(max, hintMin + windowRadius + 2);
    
    // Ensure secret is strictly inside [hintMin, hintMax]
    const finalMin = Math.min(hintMin, secret);
    const finalMax = Math.max(hintMax, secret);

    return {
      title: 'Secret Zone Clue',
      icon: '🔮',
      text: `Bobo looked in the crystal ball! The secret number is between ${finalMin} and ${finalMax}!`
    };
  }

  // Hint 3: Special Math Clue
  if (secret % 5 === 0) {
    return {
      title: 'High Five Clue',
      icon: '🖐️',
      text: `Woohoo! The secret number is a multiple of 5 (ends in 5 or 0)!`
    };
  } else if (secret > (min + max) / 2) {
    const mid = Math.round((min + max) / 2);
    return {
      title: 'Highlands Clue',
      icon: '🏰',
      text: `Bobo's magical bird says: The number is HIGHER than ${mid}!`
    };
  } else {
    const mid = Math.round((min + max) / 2);
    return {
      title: 'Lowlands Clue',
      icon: '🏕️',
      text: `Bobo's magical bird says: The number is LOWER than or equal to ${mid}!`
    };
  }
};
