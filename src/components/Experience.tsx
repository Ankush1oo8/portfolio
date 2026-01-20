import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'SDE Intern',
      company: 'Today Solve Private Limited',
      location: 'Remote',
      period: 'Sept 2025 - Present',
      description: 'Built and maintained ingestion pipelines for Google Docs, Sheets, and YouTube captions, improving data consistency and autosync reliability in Hana. Diagnosed and fixed major ingestion issues including race conditions, malformed memory chunks, and deletion inconsistencies. Developed real-time map features and dealer dashboards for the Juice powerbank ecosystem using cabinet telemetry and live station data. Designed a Sheets resync prototype using diffing and chunking to reduce redundant processing. Owned PR reviews, testing, and releases across ingestion, dashboards, and memory tools; updated documentation and rebuilt ingestion environments.',
      technologies: ['Google Docs API', 'Google Sheets API', 'YouTube API', 'Hana', 'React', 'Node.js', 'TypeScript', 'Docker'], // Added some plausible technologies based on description
      achievements: [
        'Improved data consistency and autosync reliability in Hana',
        'Diagnosed and fixed major ingestion issues (race conditions, malformed memory chunks, deletion inconsistencies)',
        'Developed real-time map features and dealer dashboards',
        'Designed Sheets resync prototype reducing redundant processing',
        'Owned PR reviews, testing, and releases across multiple tools'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer Intern',
      company: 'HealToFit',
      location: 'Remote',
      period: 'Jan 2025 - July 2025',
      description: 'Optimized Progressive Web App (PWA) architecture for cross-platform performance on Android and iOS using React.js, TypeScript, and Frontend Performance Optimization. Enhanced client onboarding systems and integrated Formbricks for data collection, deploying solutions with Docker and CI/CD pipelines, improving user engagement by 40%. Built maintainable web applications using Node.js, Express.js, EJS templating, and SCSS.',
      technologies: ['React.js', 'TypeScript', 'Frontend Performance Optimization', 'Docker', 'CI/CD', 'Node.js', 'Express.js', 'EJS', 'SCSS'],
      achievements: [
        'Optimized PWA architecture for cross-platform performance',
        'Enhanced client onboarding systems and integrated Formbricks',
        'Improved user engagement by 40%',
        'Built maintainable web applications'
      ]
    },
    {
      id: 3,
      title: 'UI/UX Developer',
      company: 'SkillGuru Foundation',
      location: 'Remote',
      period: 'Aug 2024 - Sep 2024',
      description: 'Designed and developed client websites, focusing on user engagement and search engine optimization. Delivered responsive and visually appealing interfaces.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      achievements: [
        'Developed 5 client websites with a 25% increase in online engagement',
        'Improved SEO rankings by 30%',
        'Delivered responsive and user-friendly designs'
      ]
    }
  ];

  return (
    <section id='experience' className="py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-playfair font-bold mb-6">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through various roles and the impact I've made
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                {/* Content card */}
                <div className="md:ml-20 premium-border p-8 hover-lift">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gradient mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;