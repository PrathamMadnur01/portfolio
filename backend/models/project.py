from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    id: int
    title: str
    shortDesc: str
    description: str
    details: List[str]
    impact: List[str]
    techStack: List[str]
    image: str
    github: str
    order: int = 0
    isActive: bool = True
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "LLM-Powered PDF System",
                "shortDesc": "End-to-end pipeline",
                "description": "Built pipeline",
                "details": ["Feature 1", "Feature 2"],
                "impact": ["Impact 1"],
                "techStack": ["Python", "FastAPI"],
                "image": "https://example.com/image.png",
                "github": "https://github.com/user/repo",
                "order": 1,
                "isActive": True
            }
        }
