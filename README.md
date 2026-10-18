# 🪄 Little Guesser — The Magical Number Adventure

A magical, interactive, child-friendly number guessing game website built with React, Vite, Tailwind CSS, Lucide icons, Framer Motion, canvas-confetti, and Web Audio API synthesis.

---

## ✨ Features

- **Magical Storybook Visual Design**: Pastel gradients (pink, sky blue, lavender, mint, sunshine yellow), cute floating clouds, stars, butterflies, balloons, and 3D candy buttons.
- **Adorable Animated Mascot "Bobo"**: Full vector illustration with reactive facial expressions (waving, thinking, celebrate with party hat, higher, lower, confused).
- **Personalized Experience**:
  - Screen 1: Welcome Screen with name input, validation, and "Welcome back, [Name]!" detection.
  - Screen 2: Personalized game introduction with magical treasure chest.
  - Screen 3: Choose Your Adventure (Easy Explorer 1–20, Brave Detective 1–50, Number Wizard 1–100).
  - Screen 4: Main Guessing Game with reactive Bobo, mystery card, visual number line range tracker, attempts counter, stepper buttons, and directional arrows.
- **Smart Hint System**:
  - Immediate directional feedback ("Oops! My number is BIGGER! Try higher! ⬆️", "Almost! My number is SMALLER! Try lower! ⬇️").
  - Limited Magic Clues (Even/Odd clues, narrowed zone crystal ball clues, high/low land clues) calculated accurately from the actual secret number.
- **Rewards & Badges**:
  - Base stars + bonus stars for quick guessing.
  - 6 Unlockable badges (First Victory, Quick Thinker, Super Detective, Number Wizard, Star Collector, Lucky Spark).
  - Child-friendly Trophy Room / Player Dashboard with authentic local statistics and reset option.
- **Winning Celebration**:
  - Full celebratory screen with multi-colored confetti cannons, dancing party-hat Bobo, revealed number card, earned stars animation, and badge fanfare.
- **Child-Friendly Sound & Accessibility**:
  - Synthesized Web Audio API sound effects (popping bubbles, magical chimes, victory fanfare, gentle oops) with no external audio file dependencies.
  - Muted by default with clear 🔊/🔇 toggle.
  - Reduced-motion toggle (gentle motion mode) and full keyboard accessibility.
- **Pure Local Storage**:
  - Progress, stars, badges, and preferences are automatically saved in browser `localStorage`. No accounts, no backend, and no paid APIs required.

---

## 🚀 Running the Project Locally

To run the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```
