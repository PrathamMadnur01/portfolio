import React, { useState } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, FileText, Code, Database, Brain, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects, skills, experience, contactInfo } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const Portfolio = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-mono text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            PRATHAM_M
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection('projects')} className="text-sm hover:text-cyan-500 transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-sm hover:text-cyan-500 transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-cyan-500 transition-colors">
              Contact
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-cyan-500/10"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Glassmorphism card */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-12 border border-cyan-500/20 shadow-2xl">
              <div className="space-y-6">
                <div className="inline-block">
                  <Badge variant="outline" className="px-4 py-1 border-cyan-500/50 text-cyan-500">
                    AI & Backend Engineer
                  </Badge>
                </div>
                <h1 className="text-6xl font-bold font-mono tracking-tight">
                  Pratham M.
                </h1>
                <p className="text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                  I design <span className="text-cyan-500 font-semibold">AI-first backend systems</span>, agent workflows, and LLM-powered automation that turn messy processes into reliable, production-grade pipelines.
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  I specialize in building scalable backend services and intelligent AI systems using Python, Django/FastAPI, and modern LLM tooling. My work focuses on agentic workflows, retrieval systems, and automation infrastructure that balances accuracy, latency, and cost for real-world deployments.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                    View Projects
                  </Button>
                  <Button variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10" asChild>
                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10" onClick={() => scrollToSection('contact')}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-16 animate-bounce">
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 font-mono">About Me</h2>
          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  I'm a <span className="text-foreground font-semibold">Computer Science and AI engineer</span> who builds backend-heavy AI applications that actually ship to production. My expertise lies at the intersection of:
                </p>
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-cyan-500" />
                    <span>Agentic AI workflows</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-cyan-500" />
                    <span>Retrieval Augmented Generation (RAG)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-cyan-500" />
                    <span>LLM tool use & function calling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-cyan-500" />
                    <span>Backend system design</span>
                  </div>
                </div>
                <p>
                  I focus on <span className="text-foreground font-semibold">modular architectures</span>, observability & evaluation, cost-efficient inference, guardrails against hallucination, and maintainable APIs.
                </p>
                <p>
                  I enjoy converting ambiguous business problems into reliable systems through rapid prototyping and iterative engineering.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 font-mono">Featured Projects</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>
                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-cyan-500 transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {project.description}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" asChild className="hover:bg-cyan-500/10">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      {selectedProject === project.id && (
                        <div className="space-y-4 animate-in slide-in-from-top-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-cyan-500">Key Features:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {project.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-cyan-500">Impact:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {project.impact.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                        className="text-cyan-500 hover:text-cyan-600 hover:bg-cyan-500/10"
                      >
                        {selectedProject === project.id ? 'Show Less' : 'View Details'}
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 font-mono">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-cyan-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-500">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-border/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 font-mono">Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {experience.map((exp, idx) => (
              <Card key={idx} className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <CardDescription>{exp.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-12 border border-cyan-500/20 text-center">
            <h2 className="text-4xl font-bold mb-4 font-mono">Let's Connect</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Open to AI engineering, backend systems, and applied ML roles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white" asChild>
                <a href={`mailto:${contactInfo.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </a>
              </Button>
              <Button variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10" asChild>
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10" asChild>
                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10" asChild>
                <a href={contactInfo.resume} download>
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="font-mono text-sm">
            Built with React + FastAPI • Designed with passion for AI engineering
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
