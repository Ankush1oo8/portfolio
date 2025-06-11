
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import OpenSource from '@/components/OpenSource';
import Contact from '@/components/Contact';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
            © 2025 Ankush Chudiwal. Built with Next JS, React, TypeScript, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
