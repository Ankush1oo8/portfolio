import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const greetings = [
  { text: 'Hello', font: 'font-inter' },
  { text: 'Hola', font: 'font-playfair' },
  { text: 'Bonjour', font: 'font-mono' },
  { text: 'Hallo', font: 'font-serif' },
  { text: 'Ciao', font: 'font-sans' },
  { text: 'こんにちは', font: 'font-inter' }, // Japanese
  { text: '안녕하세요', font: 'font-playfair' }, // Korean
  { text: 'नमस्ते', font: 'font-serif' }, // Hindi (Devanagari)
  { text: 'مرحبا', font: 'font-mono' }, // Arabic
  { text: 'Olá', font: 'font-sans' }
];

const AnimatedGreeting = ({ onComplete }: { onComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showFinal, setShowFinal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const greetingDuration = 700; // milliseconds per greeting

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowGreeting(false);
      setShowFinal(true);
      onComplete();
      return;
    }

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

  const greetingText = greetings[currentIndex].text;

  // Hindi detection based on Devanagari Unicode block
  const isHindi = /[\u0900-\u097F]/.test(greetingText);
  const shouldSplit = !isHindi; // All non-Hindi greetings split normally

  // Split graphemes correctly for Hindi, otherwise split by char
  const graphemes = shouldSplit
    ? greetingText.split('')
    : [...new Intl.Segmenter('hi', { granularity: 'grapheme' }).segment(greetingText)];

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.h1
                  className={`text-6xl lg:text-8xl font-bold text-white flex justify-center ${greetings[currentIndex].font}`}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.04
                      },
                    },
                  }}
                >
                  {graphemes.map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {shouldSplit ? char : char.segment}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>
            </AnimatePresence>

            {/* Smooth continuous progress bar */}
            <div className="mt-8 w-64 h-1 bg-border rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: (greetings.length * greetingDuration) / 1000,
                  ease: 'linear',
                }}
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
