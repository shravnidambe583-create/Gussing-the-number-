import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { FloatingDecor } from './components/FloatingDecor';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PlayerIntro } from './components/PlayerIntro';
import { DifficultySelector } from './components/DifficultySelector';
import { GameScreen } from './components/GameScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { RewardsPanel } from './components/RewardsPanel';
import { HowToPlayModal } from './components/HowToPlayModal';
import { ConfirmDialog } from './components/ConfirmDialog';
import { loadProfile, saveProfile, resetProgress } from './utils/storage';
import {
  DIFFICULTIES,
  BADGES_LIST,
  generateSecretNumber,
  calculateStars
} from './utils/gameLogic';
import { soundManager } from './utils/sound';

export default function App() {
  // Load persistent user profile
  const [profile, setProfile] = useState(() => loadProfile());

  // Navigation flow: 'welcome' | 'intro' | 'difficulty' | 'game'
  const [currentScreen, setCurrentScreen] = useState(() => {
    // If player already has a name, we can still start on welcome screen so they see "Welcome back, [Name]!"
    return 'welcome';
  });

  // Active game config
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const [secretNumber, setSecretNumber] = useState(null);

  // Modals & Overlays
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false);
  const [victoryData, setVictoryData] = useState(null);

  // Synchronize sound manager with stored preferences
  useEffect(() => {
    soundManager.setMuted(!profile.settings.soundEnabled);
  }, [profile.settings.soundEnabled]);

  // Persist profile helper
  const updateProfile = (updater) => {
    setProfile((prev) => {
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveProfile(updated);
      return updated;
    });
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const nextState = !profile.settings.soundEnabled;
    soundManager.setMuted(!nextState);
    if (nextState) {
      soundManager.playPop();
    }
    updateProfile((prev) => ({
      ...prev,
      settings: { ...prev.settings, soundEnabled: nextState }
    }));
  };

  // Toggle Reduced Motion
  const handleToggleReducedMotion = () => {
    updateProfile((prev) => ({
      ...prev,
      settings: { ...prev.settings, reducedMotion: !prev.settings.reducedMotion }
    }));
  };

  // Screen 1: Submit Name -> go to Screen 2 (Intro)
  const handleStartAdventureWithName = (name) => {
    updateProfile((prev) => ({
      ...prev,
      playerName: name
    }));
    setCurrentScreen('intro');
  };

  // Screen 2: Press Start Adventure -> go to Screen 3 (Difficulty Selector)
  const handleGoToDifficulty = () => {
    setCurrentScreen('difficulty');
  };

  // Screen 3: Pick Difficulty & Start Game -> go to Screen 4 (GameScreen)
  const handleStartNewGame = (diffId) => {
    const chosenDiff = diffId || currentDifficulty;
    setCurrentDifficulty(chosenDiff);

    const config = DIFFICULTIES[chosenDiff] || DIFFICULTIES.easy;
    // Generate fresh secret number in React state
    const newSecret = generateSecretNumber(config.min, config.max);
    setSecretNumber(newSecret);

    // Increment games played counter
    updateProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        gamesPlayed: prev.stats.gamesPlayed + 1
      }
    }));

    setVictoryData(null);
    setCurrentScreen('game');
  };

  // Screen 4: Game Victory
  const handleGameVictory = ({ attempts, difficulty, secretNumber }) => {
    const starsReward = calculateStars(difficulty, attempts);

    const currentWin = {
      isWin: true,
      attempts,
      difficulty,
      starsEarned: starsReward.total
    };

    // Check newly unlocked badges
    const currentUnlocked = profile.unlockedBadges || [];
    const newlyUnlockedBadges = BADGES_LIST.filter(
      (badge) => !currentUnlocked.includes(badge.id) && badge.check(profile.stats, currentWin)
    );

    const newlyUnlockedIds = newlyUnlockedBadges.map((b) => b.id);
    const updatedBadges = [...new Set([...currentUnlocked, ...newlyUnlockedIds])];

    // Update best attempts for this difficulty
    const currentBest = profile.stats.bestAttempts[difficulty];
    const newBest = currentBest === null ? attempts : Math.min(currentBest, attempts);

    // Save stats to localStorage
    updateProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        victories: prev.stats.victories + 1,
        totalStars: prev.stats.totalStars + starsReward.total,
        bestAttempts: {
          ...prev.stats.bestAttempts,
          [difficulty]: newBest
        }
      },
      unlockedBadges: updatedBadges
    }));

    // Trigger Victory Celebration Screen
    setVictoryData({
      playerName: profile.playerName,
      secretNumber,
      attempts,
      difficultyId: difficulty,
      starsEarned: starsReward.total,
      newBadges: newlyUnlockedBadges
    });
  };

  // Restart game on same level
  const handlePlayAgain = () => {
    setVictoryData(null);
    handleStartNewGame(currentDifficulty);
  };

  // Change difficulty
  const handleChangeDifficulty = () => {
    setVictoryData(null);
    setCurrentScreen('difficulty');
  };

  // Go to Home (welcome screen)
  const handleGoHome = (hasActiveGame = false) => {
    if (hasActiveGame) {
      setIsConfirmExitOpen(true);
    } else {
      setVictoryData(null);
      setCurrentScreen('welcome');
    }
  };

  // Confirm leave active game
  const handleConfirmExit = () => {
    setIsConfirmExitOpen(false);
    setVictoryData(null);
    setCurrentScreen('welcome');
  };

  // Change player name from dashboard
  const handleChangeName = (newName) => {
    updateProfile((prev) => ({
      ...prev,
      playerName: newName
    }));
  };

  // Reset progress from dashboard
  const handleResetProgress = () => {
    const fresh = resetProgress(true);
    setProfile(fresh);
  };

  const isReduced = profile.settings.reducedMotion;

  return (
    <div
      className={`min-h-screen flex flex-col justify-between relative overflow-x-hidden ${
        isReduced ? 'reduced-motion' : ''
      }`}
    >
      {/* Background Floating Cartoon Decorations */}
      <FloatingDecor reducedMotion={isReduced} />

      {/* Persistent Header */}
      <Header
        totalStars={profile.stats.totalStars}
        soundEnabled={profile.settings.soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={isReduced}
        onToggleReducedMotion={handleToggleReducedMotion}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onGoHome={() => handleGoHome(currentScreen === 'game')}
        currentScreen={currentScreen}
      />

      {/* Main Screen Content Router */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full py-2">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <WelcomeScreen
              key="welcome"
              existingName={profile.playerName}
              onStartAdventure={handleStartAdventureWithName}
              reducedMotion={isReduced}
            />
          )}

          {currentScreen === 'intro' && (
            <PlayerIntro
              key="intro"
              playerName={profile.playerName}
              onStartAdventure={handleGoToDifficulty}
              onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
              reducedMotion={isReduced}
            />
          )}

          {currentScreen === 'difficulty' && (
            <DifficultySelector
              key="difficulty"
              onSelectDifficulty={(diffId) => handleStartNewGame(diffId)}
              onBack={() => setCurrentScreen('intro')}
              reducedMotion={isReduced}
            />
          )}

          {currentScreen === 'game' && (
            <GameScreen
              key={`game-${currentDifficulty}`}
              playerName={profile.playerName}
              difficultyId={currentDifficulty}
              secretNumber={secretNumber}
              onVictory={handleGameVictory}
              onGoHomeRequest={(hasGuesses) => handleGoHome(hasGuesses)}
              reducedMotion={isReduced}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Kid-Friendly Footer */}
      <footer className="relative z-10 w-full text-center py-3 text-xs font-bold text-purple-700/70 select-none">
        <p>Made with 💖 for young explorers • Little Guesser Magical Game</p>
      </footer>

      {/* Victory Celebration Modal */}
      {victoryData && (
        <VictoryScreen
          playerName={victoryData.playerName}
          secretNumber={victoryData.secretNumber}
          attempts={victoryData.attempts}
          difficultyId={victoryData.difficultyId}
          starsEarned={victoryData.starsEarned}
          newBadges={victoryData.newBadges}
          onPlayAgain={handlePlayAgain}
          onChangeDifficulty={handleChangeDifficulty}
          onGoHome={() => {
            setVictoryData(null);
            setCurrentScreen('welcome');
          }}
          reducedMotion={isReduced}
        />
      )}

      {/* Player Dashboard / Trophy Room Modal */}
      <RewardsPanel
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        playerName={profile.playerName}
        stats={profile.stats}
        unlockedBadges={profile.unlockedBadges}
        onChangeName={handleChangeName}
        onResetProgress={handleResetProgress}
        reducedMotion={isReduced}
      />

      {/* How to Play Guide Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        reducedMotion={isReduced}
      />

      {/* Confirm Exit Modal */}
      <ConfirmDialog
        isOpen={isConfirmExitOpen}
        title="Leave Current Game?"
        message="Are you sure you want to go back? Your current round will end, but your stars and badges stay safe!"
        confirmLabel="Yes, Go Back"
        cancelLabel="Keep Playing! 🪄"
        onConfirm={handleConfirmExit}
        onCancel={() => setIsConfirmExitOpen(false)}
        reducedMotion={isReduced}
      />
    </div>
  );
}
