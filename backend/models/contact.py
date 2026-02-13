from pydantic import BaseModel, EmailStr

class ContactInfo(BaseModel):
    email: EmailStr
    linkedin: str
    github: str
    resume: str
    isActive: bool = True

    class Config:
        json_schema_extra = {
            "example": {
                "email": "pratham@example.com",
                "linkedin": "https://linkedin.com/in/pratham",
                "github": "https://github.com/pratham",
                "resume": "/resume.pdf",
                "isActive": True
            }
        }
