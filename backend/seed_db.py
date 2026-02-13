"""
Seed script to populate database with initial portfolio data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Seed data
projects_data = [
    {
        "id": 1,
        "title": "LLM-Powered PDF → Summary → Voice Briefing System",
        "shortDesc": "End-to-end pipeline converting large PDFs into concise summaries and natural audio briefings",
        "description": "Built an end-to-end pipeline that converts large PDFs into concise summaries and natural-sounding audio briefings.",
        "details": [
            "Quantized FLAN-T5 summarization",
            "Chunking + sliding context windows",
            "Prompt templates for factual consistency",
            "Text-to-Speech using Parler TTS",
            "Async processing pipeline",
            "Batch jobs for large documents",
            "Evaluation with ROUGE + BERTScore",
            "Caching summaries to reduce cost"
        ],
        "impact": [
            "Reduced reading time by 80%",
            "Handles 100+ page documents in minutes",
            "Designed for research papers and reports"
        ],
        "techStack": ["Python", "Transformers", "T5/FLAN", "TTS", "FastAPI", "Docker"],
        "image": "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25",
        "github": "https://github.com/pratham",
        "order": 1,
        "isActive": True
    },
    {
        "id": 2,
        "title": "Agentic Docker Shield – Autonomous Container Security Scanner",
        "shortDesc": "AI-agent system that scans Docker images, identifies CVEs, and generates remediation steps",
        "description": "Developed an AI-agent system that scans Docker images, identifies vulnerabilities (CVEs), and generates prioritized remediation steps.",
        "details": [
            "Multi-agent architecture using CrewAI-style patterns",
            "Tools for CVE database lookup + reasoning + patch suggestions",
            "Memory and retry strategies for stable tool usage",
            "Markdown/HTML reports auto-generated",
            "Risk scoring & prioritization",
            "Retrieval system for vulnerability docs",
            "Runs inside CI pipelines"
        ],
        "impact": [
            "Automated security auditing",
            "Reduced manual review time by 70%",
            "Works as a pre-deployment gate"
        ],
        "techStack": ["Python", "Docker", "Agents", "Retrieval", "CVE feeds"],
        "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
        "github": "https://github.com/pratham",
        "order": 2,
        "isActive": True
    },
    {
        "id": 3,
        "title": "Custom RAG Platform for Document Intelligence",
        "shortDesc": "Production-ready Retrieval Augmented Generation system for querying private documents with citations",
        "description": "Built a production-ready Retrieval Augmented Generation system for querying private documents with citations.",
        "details": [
            "Hybrid search (BM25 + embeddings)",
            "Sentence-transformer embeddings",
            "FAISS/Chroma vector DB",
            "Metadata enrichment",
            "Chunk heuristics experimentation",
            "Query rewriting + reranking",
            "Citation tracing",
            "Hallucination guardrails",
            "API-first architecture"
        ],
        "impact": [
            "40–50% answer accuracy improvement vs naive prompting",
            "Reduced hallucinations",
            "Sub-second retrieval latency"
        ],
        "techStack": ["Python", "LangChain", "FAISS", "FastAPI"],
        "image": "https://images.unsplash.com/photo-1743385779347-1549dabf1320",
        "github": "https://github.com/pratham",
        "order": 3,
        "isActive": True
    },
    {
        "id": 4,
        "title": "ROOTZ – Hotel Management Portal",
        "shortDesc": "Complete hotel operations platform with booking engine and role-based dashboards",
        "description": "Designed and built a complete hotel operations platform.",
        "details": [
            "Booking lifecycle engine",
            "Role-based dashboards",
            "JWT authentication",
            "Inventory + room allocation logic",
            "Admin analytics",
            "REST APIs",
            "Component refactoring",
            "Validation + testing",
            "Deployed on cloud"
        ],
        "impact": [
            "Simplified operations for admins",
            "Real-time availability tracking"
        ],
        "techStack": ["MongoDB", "Express", "React", "Node.js"],
        "image": "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
        "github": "https://github.com/pratham",
        "order": 4,
        "isActive": True
    }
]

skills_data = [
    {
        "category": "AI / LLM Systems",
        "skills": ["Agentic AI", "RAG", "Prompt Engineering", "Tool Use", "Function Calling", "Evaluation", "Guardrails"],
        "order": 1,
        "isActive": True
    },
    {
        "category": "Backend",
        "skills": ["Python", "Django", "FastAPI", "Node.js", "REST APIs", "Docker", "CI/CD"],
        "order": 2,
        "isActive": True
    },
    {
        "category": "ML / Data",
        "skills": ["Transformers", "FAISS", "Embeddings", "PyTorch"],
        "order": 3,
        "isActive": True
    },
    {
        "category": "Languages",
        "skills": ["Python", "C++", "JavaScript", "SQL"],
        "order": 4,
        "isActive": True
    }
]

experience_data = [
    {
        "title": "Research Intern – Edge AI",
        "description": "Published research in hybrid optimization",
        "order": 1,
        "isActive": True
    },
    {
        "title": "Top 10 – Smart India Hackathon",
        "description": "National level innovation challenge",
        "order": 2,
        "isActive": True
    },
    {
        "title": "200+ DSA Problems Solved",
        "description": "Strong foundation in algorithms and data structures",
        "order": 3,
        "isActive": True
    },
    {
        "title": "AI/ML Certification",
        "description": "ISRO/IIRS certified in AI/ML",
        "order": 4,
        "isActive": True
    }
]

contact_data = {
    "email": "pratham@example.com",
    "linkedin": "https://linkedin.com/in/pratham",
    "github": "https://github.com/pratham",
    "resume": "/resume.pdf",
    "isActive": True
}

async def seed_database():
    """Seed the database with initial data"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("🌱 Starting database seeding...")
    
    # Clear existing data
    print("🗑️  Clearing existing collections...")
    await db.projects.delete_many({})
    await db.skills.delete_many({})
    await db.experience.delete_many({})
    await db.contact_info.delete_many({})
    
    # Insert projects
    print("📦 Inserting projects...")
    result = await db.projects.insert_many(projects_data)
    print(f"✅ Inserted {len(result.inserted_ids)} projects")
    
    # Insert skills
    print("💡 Inserting skills...")
    result = await db.skills.insert_many(skills_data)
    print(f"✅ Inserted {len(result.inserted_ids)} skill categories")
    
    # Insert experience
    print("🏆 Inserting experience...")
    result = await db.experience.insert_many(experience_data)
    print(f"✅ Inserted {len(result.inserted_ids)} experience items")
    
    # Insert contact info
    print("📧 Inserting contact info...")
    result = await db.contact_info.insert_one(contact_data)
    print(f"✅ Inserted contact info")
    
    print("\\n✨ Database seeding completed successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
