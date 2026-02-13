import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, FileText, Code, Database, Brain, ChevronDown, Terminal, Cpu, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects, skills, experience, contactInfo } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import CustomCursor from './CustomCursor';
import ParticleBackground from './ParticleBackground';

const Portfolio = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5 transition-colors duration-300 cursor-none">
      <CustomCursor />
      <ParticleBackground />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/60 border-b border-purple-500/20 shadow-lg shadow-purple-500/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="font-mono text-lg font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            {'<PRATHAM_M />'}
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05, color: '#a855f7' }}
              onClick={() => scrollToSection('projects')} 
              className="text-sm hover:text-purple-400 transition-colors"
            >
              Projects
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: '#a855f7' }}
              onClick={() => scrollToSection('skills')} 
              className="text-sm hover:text-purple-400 transition-colors"
            >
              Skills
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: '#a855f7' }}
              onClick={() => scrollToSection('contact')} 
              className="text-sm hover:text-purple-400 transition-colors"
            >
              Contact
            </motion.button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-purple-500/10 hover:scale-110 transition-transform"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Glassmorphism card */}
            <motion.div 
              variants={fadeInUp}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl p-12 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
              <div className="space-y-6">
                <motion.div 
                  variants={fadeInUp}
                  className="inline-block"
                >
                  <Badge variant="outline" className="px-4 py-1 border-purple-400/50 text-purple-400 bg-purple-500/10">
                    <Terminal className="w-3 h-3 mr-2 inline" />
                    AI & Backend Engineer
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-7xl font-bold font-mono tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                >
                  Pratham M.
                </motion.h1>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                >
                  <Cpu className="w-6 h-6 text-purple-400 animate-pulse" />
                  <p className="text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                    I design <span className="text-purple-400 font-semibold">AI-first backend systems</span>, agent workflows, and LLM-powered automation that turn messy processes into reliable, production-grade pipelines.
                  </p>
                </motion.div>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-muted-foreground max-w-3xl"
                >
                  I specialize in building scalable backend services and intelligent AI systems using Python, Django/FastAPI, and modern LLM tooling. My work focuses on agentic workflows, retrieval systems, and automation infrastructure that balances accuracy, latency, and cost for real-world deployments.
                </motion.p>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex gap-4 pt-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => scrollToSection('projects')} 
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 shadow-lg shadow-purple-500/50"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      View Projects
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10 hover:border-purple-400" asChild>
                      <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-cyan-400/50 hover:bg-cyan-500/10 hover:border-cyan-400" onClick={() => scrollToSection('contact')}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Code-like decoration */}
                <motion.div 
                  variants={fadeInUp}
                  className="font-mono text-sm text-muted-foreground/50 mt-8"
                >
                  <span className="text-purple-400">const</span> enthusiasm = <span className="text-emerald-400">"∞"</span>;
                  <br />
                  <span className="text-purple-400">while</span>(true) {'{'} 
                  <span className="text-cyan-400"> code()</span>; 
                  <span className="text-emerald-400"> learn()</span>; 
                  <span className="text-green-400"> build()</span>; {'}'}
                </motion.div>
              </div>
              
              {/* Floating icons */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 right-10 text-purple-400/20"
              >
                <Code className="w-24 h-24" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-10 right-20 text-cyan-400/20"
              >
                <Brain className="w-20 h-20" />
              </motion.div>
            </motion.div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mt-16"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-8 font-mono bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {'<About />'}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="backdrop-blur-sm bg-card/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    I'm a <span className="text-foreground font-semibold text-purple-400">Computer Science and AI engineer</span> who builds backend-heavy AI applications that actually ship to production. My expertise lies at the intersection of:
                  </p>
                  <div className="grid grid-cols-2 gap-4 my-6">
                    <motion.div 
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20"
                    >
                      <Brain className="h-5 w-5 text-purple-400" />
                      <span>Agentic AI workflows</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20"
                    >
                      <Database className="h-5 w-5 text-cyan-400" />
                      <span>Retrieval Augmented Generation (RAG)</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-pink-500/5 border border-pink-500/20"
                    >
                      <Code className="h-5 w-5 text-pink-400" />
                      <span>LLM tool use & function calling</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20"
                    >
                      <FileText className="h-5 w-5 text-green-400" />
                      <span>Backend system design</span>
                    </motion.div>
                  </div>
                  <p>
                    I focus on <span className="text-foreground font-semibold text-cyan-400">modular architectures</span>, observability & evaluation, cost-efficient inference, guardrails against hallucination, and maintainable APIs.
                  </p>
                  <p>
                    I enjoy converting ambiguous business problems into reliable systems through rapid prototyping and iterative engineering.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-12 font-mono bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {'<Projects />'}
          </motion.h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm bg-card/50 border-purple-500/20 hover:border-purple-500/40 overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="md:col-span-1 relative overflow-hidden"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-purple-500/80 text-white">Featured</Badge>
                      </div>
                    </motion.div>
                    <div className="md:col-span-2 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-2xl mb-2 group-hover:text-purple-400 transition-colors">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {project.description}
                            </CardDescription>
                          </div>
                          <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                            <Button variant="ghost" size="icon" asChild className="hover:bg-purple-500/10">
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5 text-purple-400" />
                              </a>
                            </Button>
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 space-y-4">
                        {selectedProject === project.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div>
                              <h4 className="font-semibold mb-2 text-purple-400 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Key Features:
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {project.details.map((detail, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-cyan-400 flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                Impact:
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {project.impact.map((item, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    {item}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <motion.div
                              key={tech}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div whileHover={{ x: 5 }}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                            className="text-purple-400 hover:text-purple-500 hover:bg-purple-500/10"
                          >
                            {selectedProject === project.id ? '← Show Less' : 'View Details →'}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-12 font-mono bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
          >
            {'<Skills />'}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="backdrop-blur-sm bg-card/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <motion.div
                          key={skill}
                          whileHover={{ scale: 1.1, rotate: 2 }}
                        >
                          <Badge variant="outline" className="border-border/50 hover:border-purple-400/50 hover:bg-purple-500/10">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-12 font-mono bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            {'<Highlights />'}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="backdrop-blur-sm bg-card/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-400" />
                      {exp.title}
                    </CardTitle>
                    <CardDescription>{exp.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl p-12 border border-purple-500/30 text-center overflow-hidden"
          >
            {/* Background animation */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 -z-10"
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-4 font-mono bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {'<Contact />'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Open to AI engineering, backend systems, and applied ML roles.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50" asChild>
                  <a href={`mailto:${contactInfo.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10 hover:border-purple-400" asChild>
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-cyan-400/50 hover:bg-cyan-500/10 hover:border-cyan-400" asChild>
                  <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-pink-400/50 hover:bg-pink-500/10 hover:border-pink-400" asChild>
                  <a href={contactInfo.resume} download>
                    <FileText className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Terminal-style status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 font-mono text-sm text-muted-foreground/70"
            >
              <span className="text-green-400">●</span> Available for opportunities
              <span className="ml-4 text-cyan-400">→</span> Response time: {'<24h'}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="font-mono text-sm">
            <span className="text-purple-400">Built with</span> React + FastAPI + AI Magic ✨
          </p>
          <p className="text-xs mt-2">
            © 2025 Pratham M. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
