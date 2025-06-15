import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import projectImage from '/project.png';

const Projects = () => {
  const projects = [
    {
      title: 'Full-Stack Web Application',
      description: 'A dynamic web application with user authentication, session management, and media handling. Features secure login via Passport, dynamic EJS templates, and cloud-based storage with MongoDB Atlas and Cloudinary.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Passport', 'EJS', 'Cloudinary', 'MongoDB Atlas'],
      image: projectImage,
      github: 'https://github.com/Ankush1oo8/Project',
      demo: 'https://major-project-z4v3.onrender.com/listings',
      featured: true
    },
    {
      title: 'OFFPAY',
      description: 'An offline UPI payment solution using USSD, SMS, and NFC technologies for transactions without internet. Designed for feature phones with secure encryption and data synchronization.',
      tech: ['JavaScript', 'Node.js', 'MongoDB'],
      image: '/placeholder.svg',
      github: 'https://github.com/Ankush1oo8/offpay',
      demo: 'https://github.com/Ankush1oo8/offpay',
      featured: true
    },
    {
      title: 'SilentSpeak',
      description: 'An anonymous messaging application enabling secure secret message sending with optional acceptance settings. Features custom OTP-based authentication and user validation.',
      tech: ['Next.js', 'TypeScript', 'MongoDB', 'React Hooks', 'OpenAI API'],
      image: '/placeholder.svg',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with smooth animations, dark mode support, and optimized performance.',
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      image: '/placeholder.svg',
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id='projects' className="py-32">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-playfair font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <motion.div
                  className="relative group overflow-hidden rounded-lg premium-border hover-lift"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.image && project.image !== '#' && project.image !== '' && project.image !== '/placeholder.svg' ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover aspect-video rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={`aspect-video bg-gradient-to-br from-accent to-muted rounded-lg flex items-center justify-center ${
                      project.image && project.image !== '#' && project.image !== '' && project.image !== '/placeholder.svg' ? 'hidden' : 'flex'
                    }`}
                  >
                    <span className="text-4xl font-playfair font-bold text-gradient">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button variant="outline" size="sm" className="glass-effect" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="glow-effect" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div>
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm glass-effect rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="group" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      View Code
                    </a>
                  </Button>
                  <Button className="group glow-effect" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-12">
            Other <span className="text-gradient">Projects</span>
          </h3>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="premium-border p-6 hover-lift glow-effect group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-bold group-hover:text-gradient transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-accent rounded text-accent-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;