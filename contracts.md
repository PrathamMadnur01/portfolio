# API Contracts - Pratham Portfolio Backend

## Overview
Backend integration for portfolio website to replace mock data with database-backed APIs.

## Mocked Data in Frontend (mock.js)
1. **Projects** - Array of 4 project objects with details, tech stack, images
2. **Skills** - Object with categorized skills (AI/LLM, Backend, ML/Data, Languages)
3. **Experience** - Array of highlight objects
4. **Contact Info** - Object with email, linkedin, github, resume links

## Database Schema

### Collections

#### 1. Projects Collection
```json
{
  "_id": ObjectId,
  "id": Number,
  "title": String,
  "shortDesc": String,
  "description": String,
  "details": [String],
  "impact": [String],
  "techStack": [String],
  "image": String (URL),
  "github": String (URL),
  "order": Number,
  "isActive": Boolean,
  "createdAt": DateTime,
  "updatedAt": DateTime
}
```

#### 2. Skills Collection
```json
{
  "_id": ObjectId,
  "category": String,
  "skills": [String],
  "order": Number,
  "isActive": Boolean
}
```

#### 3. Experience Collection
```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "order": Number,
  "isActive": Boolean
}
```

#### 4. ContactInfo Collection
```json
{
  "_id": ObjectId,
  "email": String,
  "linkedin": String,
  "github": String,
  "resume": String,
  "isActive": Boolean
}
```

#### 5. PageViews Collection (Analytics)
```json
{
  "_id": ObjectId,
  "timestamp": DateTime,
  "path": String,
  "userAgent": String,
  "ip": String
}
```

## API Endpoints

### Public Endpoints (No Auth)

#### GET /api/projects
- **Description**: Get all active projects ordered by `order` field
- **Response**: 
```json
{
  "projects": [Project],
  "count": Number
}
```

#### GET /api/projects/:id
- **Description**: Get single project by ID
- **Response**: Project object

#### GET /api/skills
- **Description**: Get all skills grouped by category
- **Response**: 
```json
{
  "skills": {
    "category": [skills]
  }
}
```

#### GET /api/experience
- **Description**: Get all experience/highlights ordered
- **Response**:
```json
{
  "experience": [Experience]
}
```

#### GET /api/contact
- **Description**: Get contact information
- **Response**: ContactInfo object

#### POST /api/analytics/pageview
- **Description**: Log page view for analytics
- **Body**: 
```json
{
  "path": String,
  "userAgent": String
}
```
- **Response**: 
```json
{
  "success": true
}
```

## Frontend Integration Steps

### 1. Create API Service Layer
- Create `/app/frontend/src/services/api.js`
- Centralize all API calls with axios
- Handle errors globally

### 2. Update Components
- Replace mock imports with API calls
- Add loading states
- Add error handling UI
- Use React hooks (useState, useEffect)

### 3. Component Updates Required
- **Portfolio.js**: 
  - Fetch projects, skills, experience on mount
  - Show loading skeleton
  - Handle fetch errors
  - Add analytics pageview tracking

## Backend Implementation Plan

### Phase 1: Setup & Models
1. Create MongoDB models in `/app/backend/models/`
2. Seed database with mock data

### Phase 2: API Routes
1. Create route handlers in `/app/backend/routes/`
2. Implement CRUD operations
3. Add validation with Pydantic

### Phase 3: Seed Data
1. Create seed script to populate database with current mock data
2. Run seed on first deployment

### Phase 4: Testing
1. Test all endpoints with curl/Postman
2. Verify data integrity
3. Test frontend integration

## Notes
- All endpoints are READ-only for public (no auth needed)
- Data management can be done directly in MongoDB or future admin panel
- Analytics endpoint is write-only for tracking
- CORS already configured in backend
