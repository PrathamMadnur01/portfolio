from pydantic import BaseModel
from typing import List

class Skill(BaseModel):
    category: str
    skills: List[str]
    order: int = 0
    isActive: bool = True

    class Config:
        json_schema_extra = {
            "example": {
                "category": "Backend",
                "skills": ["Python", "FastAPI", "Django"],
                "order": 1,
                "isActive": True
            }
        }
