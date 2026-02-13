from fastapi import APIRouter, Request, Depends
from models.analytics import PageView
from datetime import datetime

router = APIRouter(prefix="/analytics", tags=["analytics"])

# Dependency to get database from server
def get_db():
    from server import db
    return db

@router.post("/pageview")
async def log_pageview(pageview: PageView, request: Request, db = Depends(get_db)):
    """Log page view for analytics"""
    # Add IP address from request
    pageview_data = pageview.dict()
    pageview_data['ip'] = request.client.host if request.client else None
    pageview_data['timestamp'] = datetime.utcnow()
    
    await db.pageviews.insert_one(pageview_data)
    
    return {"success": True, "message": "Page view logged"}

@router.get("/stats")
async def get_stats(db = Depends(get_db)):
    """Get basic analytics stats"""
    total_views = await db.pageviews.count_documents({})
    unique_paths = await db.pageviews.distinct("path")
    
    return {
        "total_views": total_views,
        "unique_paths": len(unique_paths),
        "paths": unique_paths
    }
