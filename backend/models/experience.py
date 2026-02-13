from pydantic import BaseModel

class Experience(BaseModel):
    title: str
    description: str
    order: int = 0
    isActive: bool = True

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Research Intern – Edge AI",
                "description": "Published research in hybrid optimization",
                "order": 1,
                "isActive": True
            }
        }
