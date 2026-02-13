from fastapi import APIRouter, HTTPException
from typing import List
from models.project import Project
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

# Get database
def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("/projects")
async def get_projects():
    """Get all active projects"""
    db = get_db()
    projects = await db.projects.find({"isActive": True}).sort("order", 1).to_list(100)
    
    # Remove MongoDB _id field
    for project in projects:
        project.pop('_id', None)
        project.pop('createdAt', None)
        project.pop('updatedAt', None)
    
    return {
        "projects": projects,
        "count": len(projects)
    }

@router.get("/projects/{project_id}")
async def get_project(project_id: int):
    """Get single project by ID"""
    db = get_db()
    project = await db.projects.find_one({"id": project_id, "isActive": True})
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project.pop('_id', None)
    project.pop('createdAt', None)
    project.pop('updatedAt', None)
    
    return project

@router.get("/skills")
async def get_skills():
    """Get all skills grouped by category"""
    db = get_db()
    skills_list = await db.skills.find({"isActive": True}).sort("order", 1).to_list(100)
    
    # Convert to grouped format
    skills_dict = {}
    for skill in skills_list:
        skills_dict[skill['category']] = skill['skills']
    
    return {"skills": skills_dict}

@router.get("/experience")
async def get_experience():
    """Get all experience/highlights"""
    db = get_db()
    experience = await db.experience.find({"isActive": True}).sort("order", 1).to_list(100)
    
    # Remove MongoDB _id field
    for exp in experience:
        exp.pop('_id', None)
    
    return {
        "experience": experience,
        "count": len(experience)
    }

@router.get("/contact")
async def get_contact():
    """Get contact information"""
    db = get_db()
    contact = await db.contact_info.find_one({"isActive": True})
    
    if not contact:
        raise HTTPException(status_code=404, detail="Contact info not found")
    
    contact.pop('_id', None)
    contact.pop('isActive', None)
    
    return contact
