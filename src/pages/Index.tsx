
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import OpenSource from '@/components/OpenSource';
import Contact from '@/components/Contact';
import AnimatedGreeting from '@/components/AnimatedGreeting';

const Index = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Smooth scrolling setup
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', smoothScroll);
    return () => document.removeEventListener('click', smoothScroll);
  }, []);

  const handleGreetingComplete = () => {
    setShowGreeting(false);
    setTimeout(() => setShowMainContent(true), 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>
        {showGreeting && (
          <AnimatedGreeting onComplete={handleGreetingComplete} />
        )}
      </AnimatePresence>

      {showMainContent && (
        <>
          <Navigation />
          
          <main>
            <section id="home">
              <Hero />
            </section>
            
            <section id="about">
              <About />
            </section>

            <section id="experience">
              <Experience />
            </section>
            
            <section id="skills">
              <Skills />
            </section>
            
            <section id="projects">
              <Projects />
            </section>
            
            <section id="opensource">
              <OpenSource />
            </section>
            
            <section id="contact">
              <Contact />
            </section>
          </main>

          {/* Footer */}
          <footer className="py-8 border-t border-border/20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">
                © 2024 Ankush. Built with React, TypeScript, and lots of ☕
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
