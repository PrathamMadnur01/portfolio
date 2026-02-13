from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.project import Project

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

# Dependency to get database from server
def get_db():
    from server import db
    return db

@router.get("/projects")
async def get_projects(db = Depends(get_db)):
    """Get all active projects"""
    projects = await db.projects.find(
        {"isActive": True},
        {"_id": 0, "createdAt": 0, "updatedAt": 0}
    ).sort("order", 1).to_list(100)
    
    return {
        "projects": projects,
        "count": len(projects)
    }

@router.get("/projects/{project_id}")
async def get_project(project_id: int, db = Depends(get_db)):
    """Get single project by ID"""
    project = await db.projects.find_one(
        {"id": project_id, "isActive": True},
        {"_id": 0, "createdAt": 0, "updatedAt": 0}
    )
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return project

@router.get("/skills")
async def get_skills(db = Depends(get_db)):
    """Get all skills grouped by category"""
    skills_list = await db.skills.find(
        {"isActive": True},
        {"_id": 0}
    ).sort("order", 1).to_list(100)
    
    # Convert to grouped format
    skills_dict = {}
    for skill in skills_list:
        skills_dict[skill['category']] = skill['skills']
    
    return {"skills": skills_dict}

@router.get("/experience")
async def get_experience(db = Depends(get_db)):
    """Get all experience/highlights"""
    experience = await db.experience.find(
        {"isActive": True},
        {"_id": 0}
    ).sort("order", 1).to_list(100)
    
    return {
        "experience": experience,
        "count": len(experience)
    }

@router.get("/contact")
async def get_contact(db = Depends(get_db)):
    """Get contact information"""
    contact = await db.contact_info.find_one(
        {"isActive": True},
        {"_id": 0, "isActive": 0}
    )
    
    if not contact:
        raise HTTPException(status_code=404, detail="Contact info not found")
    
    return contact
