import React, { useEffect } from 'react';

const SEOHead = () => {
  useEffect(() => {
    // Set title
    document.title = 'Pratham M. - AI & Backend Engineer | LLM Systems | RAG | Agentic AI';
    
    // Set meta tags
    const metaTags = [
      { name: 'description', content: 'AI & Backend Engineer specializing in Agentic AI, LLM systems, RAG pipelines, and production-ready backend architecture. Python | FastAPI | Django | LangChain' },
      { name: 'keywords', content: 'AI Engineer, Backend Developer, LLM, RAG, Agentic AI, Python, FastAPI, Django, Machine Learning, NLP, Docker, Retrieval Systems, Vector Database, FAISS, Transformers, LangChain, GPT, OpenAI, Software Engineer, Full Stack Developer' },
      { name: 'author', content: 'Pratham M.' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Pratham M. - AI & Backend Engineer' },
      { property: 'og:description', content: 'AI & Backend Engineer specializing in Agentic AI, LLM systems, RAG pipelines, and production-ready backend architecture.' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: 'Pratham M. - AI & Backend Engineer' },
      { name: 'theme-color', content: '#8B5CF6' },
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (tag.property) {
          element.setAttribute('property', tag.property);
        } else {
          element.setAttribute('name', tag.name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Pratham M.",
      "jobTitle": "AI & Backend Engineer",
      "description": "AI & Backend Engineer specializing in Agentic AI, LLM systems, RAG pipelines, and production-ready backend architecture.",
      "knowsAbout": [
        "Artificial Intelligence",
        "Large Language Models",
        "Backend Development",
        "Python Programming",
        "FastAPI",
        "Django",
        "Machine Learning",
        "Retrieval Augmented Generation",
        "Agentic AI",
        "Docker",
        "REST APIs"
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
};

export default SEOHead;
