from fastapi import APIRouter, Request
from models.analytics import PageView
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

router = APIRouter(prefix="/analytics", tags=["analytics"])

# Get database
def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/pageview")
async def log_pageview(pageview: PageView, request: Request):
    """Log page view for analytics"""
    db = get_db()
    
    # Add IP address from request
    pageview_data = pageview.dict()
    pageview_data['ip'] = request.client.host if request.client else None
    pageview_data['timestamp'] = datetime.utcnow()
    
    await db.pageviews.insert_one(pageview_data)
    
    return {"success": True, "message": "Page view logged"}

@router.get("/stats")
async def get_stats():
    """Get basic analytics stats"""
    db = get_db()
    
    total_views = await db.pageviews.count_documents({})
    unique_paths = await db.pageviews.distinct("path")
    
    return {
        "total_views": total_views,
        "unique_paths": len(unique_paths),
        "paths": unique_paths
    }
