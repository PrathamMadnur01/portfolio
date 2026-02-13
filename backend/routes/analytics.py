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
    pageview_data = pageview.model_dump()
    pageview_data['ip'] = request.client.host if request.client else None
    pageview_data['timestamp'] = datetime.utcnow()
    
    await db.pageviews.insert_one(pageview_data)
    
    return {"success": True, "message": "Page view logged"}

@router.get("/stats")
async def get_stats(db = Depends(get_db)):
    """Get basic analytics stats"""
    # Use estimated count for better performance
    total_views = await db.pageviews.estimated_document_count()
    
    # Use aggregation with limit for unique paths
    pipeline = [
        {"$group": {"_id": "$path"}},
        {"$limit": 100},
        {"$project": {"_id": 0, "path": "$_id"}}
    ]
    unique_paths_cursor = db.pageviews.aggregate(pipeline)
    unique_paths = [doc["path"] async for doc in unique_paths_cursor]
    
    return {
        "total_views": total_views,
        "unique_paths": len(unique_paths),
        "paths": unique_paths
    }
