from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PageView(BaseModel):
    path: str
    userAgent: Optional[str] = None
    ip: Optional[str] = None
    timestamp: datetime = datetime.utcnow()

    class Config:
        json_schema_extra = {
            "example": {
                "path": "/",
                "userAgent": "Mozilla/5.0",
                "ip": "192.168.1.1",
                "timestamp": "2025-01-01T00:00:00"
            }
        }
