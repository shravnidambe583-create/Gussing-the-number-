// LocalStorage Manager for Little Guesser

const STORAGE_KEY = 'little_guesser_v1';

const DEFAULT_PROFILE = {
  playerName: '',
  stats: {
    gamesPlayed: 0,
    victories: 0,
    totalStars: 0,
    bestAttempts: {
      easy: null,
      medium: null,
      hard: null
    }
  },
  unlockedBadges: [],
  settings: {
    soundEnabled: false,
    reducedMotion: false
  }
};

export const loadProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      stats: {
        ...DEFAULT_PROFILE.stats,
        ...(parsed.stats || {}),
        bestAttempts: {
          ...DEFAULT_PROFILE.stats.bestAttempts,
          ...((parsed.stats && parsed.stats.bestAttempts) || {})
        }
      },
      settings: {
        ...DEFAULT_PROFILE.settings,
        ...(parsed.settings || {})
      }
    };
  } catch (e) {
    console.error('Failed to load profile from localStorage', e);
    return { ...DEFAULT_PROFILE };
  }
};

export const saveProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to localStorage', e);
  }
};

export const resetProgress = (keepName = true) => {
  const current = loadProfile();
  const resetData = {
    ...DEFAULT_PROFILE,
    playerName: keepName ? current.playerName : '',
    settings: current.settings
  };
  saveProfile(resetData);
  return resetData;
};
