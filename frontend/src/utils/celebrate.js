// Confetti burst for completing a module. Loaded on demand; skipped for reduced-motion users.
export const celebrate = async () => {
  const { default: confetti } = await import('canvas-confetti');
  const shared = { disableForReducedMotion: true, zIndex: 60, colors: ['#10b981', '#fbbf24', '#fb923c', '#38bdf8', '#a78bfa'] };

  confetti({ ...shared, particleCount: 120, spread: 80, startVelocity: 45, origin: { y: 0.65 } });
  setTimeout(() => {
    confetti({ ...shared, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
    confetti({ ...shared, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
  }, 250);
};
