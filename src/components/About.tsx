
import { motion } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 50, suffix: '+', label: 'Projects Completed' },
    { number: 7, suffix: '+', label: 'months Experience' },
    { number: 20, suffix: '+', label: 'Open Source Contributions' },
    { number: 15, suffix: '+', label: 'Technologies Mastered' },
  ];

  return (
    <section id='about' className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-playfair font-bold mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  I'm a passionate full stack developer with a love for creating 
                  innovative digital solutions. My journey in web development began 
                  over 3 years ago, and I've been constantly learning and evolving ever since.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  I specialize in modern web technologies including React, Node.js, 
                  TypeScript, and cloud platforms. I believe in writing clean, 
                  maintainable code and contributing to the open source community.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source projects, or sharing my knowledge 
                  through blog posts and community engagement.
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="premium-border p-6 text-center hover-lift glow-effect"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-4xl font-bold text-gradient mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <span>{stat.number}</span>
                  <span>{stat.suffix}</span>
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl" />
    </section>
  );
};

export default About;
