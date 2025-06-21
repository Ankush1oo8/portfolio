import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const greetings = [
  { text: 'Hello', font: 'font-inter' },
  { text: 'Hola', font: 'font-playfair' },
  { text: 'Bonjour', font: 'font-mono' },
  { text: 'Hallo', font: 'font-serif' },
  { text: 'Ciao', font: 'font-sans' },
  { text: 'こんにちは', font: 'font-inter' },
  { text: '안녕하세요', font: 'font-playfair' },
  { text: 'नमस्ते', font: 'font-serif' },
  { text: 'مرحبا', font: 'font-mono' },
  { text: 'Olá', font: 'font-sans' }
];

const AnimatedGreeting = ({ onComplete }: { onComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showFinal, setShowFinal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const greetingDuration = 700; // 700ms per greeting

  useEffect(() => {
    // Accessibility check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowGreeting(false);
      setShowFinal(true);
      onComplete();
      return;
    }

    // Start greeting cycle
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current!);
          setShowGreeting(false);
          setTimeout(() => {
            setShowFinal(true);
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, greetingDuration);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showGreeting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h1
                  className={`text-6xl lg:text-8xl font-bold text-white ${greetings[currentIndex].font}`}
                >
                  {greetings[currentIndex].text}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Smooth progress bar */}
            <div className="mt-8 w-64 h-1 bg-border rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: (greetings.length * greetingDuration) / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {showFinal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            className="text-white text-5xl lg:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to MyApp
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedGreeting;
