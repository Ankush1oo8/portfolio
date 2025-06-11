import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background grid with responsive blur */}
      <div className="absolute inset-0 opacity-10 backdrop-blur-md md:backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border-r border-b border-border/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.05,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-4"
            >
              <motion.h1 
                className="text-6xl lg:text-8xl font-playfair font-bold"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              >
                <span className="block text-gradient">Full Stack</span>
                <span className="block">Developer</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Crafting exceptional digital experiences with modern technologies. 
                Passionate about clean code, innovative solutions, and open source contributions.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="group premium-border text-white hover-lift glow-effect hover:text-black"
                asChild
              >
                <a href="/cv.pdf" download>
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Download Resume
                </a>
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-effect hover-lift group"
                  asChild
                >
                  <a href="https://github.com/ankush1oo8" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-effect hover-lift group"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/ankush-chudiwal/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-effect hover-lift group"
                  asChild
                >
                  <a href="mailto:ankushchudiwalwit@gmail.com">
                    <Mail className="h-5 w-5 group-hover:animate-pulse" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-primary/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-card via-accent to-muted glass-effect flex items-center justify-center">
                  <span className="text-6xl font-playfair font-bold text-gradient">A</span>
                </div>
                
                {['⚛️', '🔥', '⚡', '🚀'].map((icon, index) => (
                  <motion.div
                    key={icon}
                    className="absolute w-12 h-12 rounded-full glass-effect flex items-center justify-center text-xl"
                    style={{
                      top: `${20 + Math.sin(index * Math.PI / 2) * 40}%`,
                      left: `${20 + Math.cos(index * Math.PI / 2) * 40}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: 'easeInOut'
                    }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;