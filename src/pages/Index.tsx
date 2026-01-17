import { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AnimatedGreeting from '@/components/AnimatedGreeting';
const Hero = lazy(() => import('@/components/Hero'));
const About = lazy(() => import('@/components/About'));
const Experience = lazy(() => import('@/components/Experience'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const OpenSource = lazy(() => import('@/components/OpenSource'));
const Contact = lazy(() => import('@/components/Contact'));
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
    (<div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>
        {showGreeting &&
          (<AnimatedGreeting onComplete={handleGreetingComplete} />)}
      </AnimatePresence>
      {showMainContent &&
        (<>
          <Navigation />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
          </main>
          {/* Footer */}
          <footer className="py-8 border-t border-border/20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">
                © 2024 Ankush. Built with React, TypeScript, and lots of ☕
              </p>
            </div>
          </footer>
        </>)}
    </div>)
  );
};
export default Index;
