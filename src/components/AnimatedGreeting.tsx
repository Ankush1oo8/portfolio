
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedGreeting = ({ onComplete }: { onComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        } else {
          // Animation complete, start fade out
          setTimeout(() => {
            setShowGreeting(false);
            setTimeout(onComplete, 300); // Call onComplete after fade out
          }, 400); // Show last greeting for shorter time
          clearInterval(timer);
          return prev;
        }
      });
    }, 300); // Change greeting every 300ms (faster)

    return () => clearInterval(timer);
  }, [onComplete, greetings.length]);

  if (!showGreeting) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            <h1 className={`text-6xl lg:text-8xl font-bold text-white ${greetings[currentIndex].font}`}>
              {greetings[currentIndex].text}
            </h1>
          </motion.div>
        </AnimatePresence>
        
        {/* Progress indicator */}
        <motion.div 
          className="mt-8 w-64 h-1 bg-border rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / greetings.length) * 100}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedGreeting;
