import { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AnimatedGreeting from '@/components/AnimatedGreeting';
import { preload } from '@/lib/preload';

const componentImports = [
  () => import('@/components/Hero'),
  () => import('@/components/About'),
  () => import('@/components/Experience'),
  () => import('@/components/Skills'),
  () => import('@/components/Projects'),
  () => import('@/components/OpenSource'),
  () => import('@/components/Contact'),
];

const Hero = lazy(componentImports[0]);
const About = lazy(componentImports[1]);
const Experience = lazy(componentImports[2]);
const Skills = lazy(componentImports[3]);
const Projects = lazy(componentImports[4]);
const OpenSource = lazy(componentImports[5]);
const Contact = lazy(componentImports[6]);

const Index = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [preloadingFinished, setPreloadingFinished] = useState(false);

  useEffect(() => {
    const doPreload = async () => {
      await preload(componentImports);
      setPreloadingFinished(true);
    }
    doPreload();

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
    if (preloadingFinished) {
      setShowMainContent(true);
    }
  };

  useEffect(() => {
    if (preloadingFinished && !showGreeting) {
      setShowMainContent(true);
    }
  }, [preloadingFinished, showGreeting]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
    </div>
  );
};

export default Index;