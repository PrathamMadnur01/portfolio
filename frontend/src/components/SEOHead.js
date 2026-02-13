import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = () => {
  const siteUrl = 'https://pratham-portfolio.com';
  const title = 'Pratham M. - AI & Backend Engineer | LLM Systems | RAG | Agentic AI';
  const description = 'AI & Backend Engineer specializing in Agentic AI, LLM systems, RAG pipelines, and production-ready backend architecture. Python | FastAPI | Django | LangChain';
  const keywords = 'AI Engineer, Backend Developer, LLM, RAG, Agentic AI, Python, FastAPI, Django, Machine Learning, NLP, Docker, Retrieval Systems, Vector Database, FAISS, Transformers, LangChain, GPT, OpenAI, Software Engineer, Full Stack Developer';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pratham M.",
    "jobTitle": "AI & Backend Engineer",
    "description": description,
    "url": siteUrl,
    "sameAs": [
      "https://github.com/pratham",
      "https://linkedin.com/in/pratham"
    ],
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
    ],
    "alumniOf": "Computer Science and AI",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AI/ML Certification",
        "credentialCategory": "certificate",
        "recognizedBy": {
          "@type": "Organization",
          "name": "ISRO/IIRS"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pratham M." />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Pratham M. Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
};

export default SEOHead;
