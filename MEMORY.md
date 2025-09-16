# Portfolio Website - Development Memory

## Project Overview
A full-stack portfolio website for a data science/ML engineer with admin panel for content management.

### Architecture
- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **Backend**: Flask + SQLAlchemy + JWT Auth
- **Database**: SQLite (dev) / PostgreSQL (prod ready)
- **Media**: Cloudinary integration
- **Deployment**: Configured for both local and GitHub Pages

## Key Features Implemented

### 1. Homepage (`/`)
- Hero section with background video
- Skills showcase with tech logos and star ratings (Python, C++, SQL, etc.)
- Education section (HCMUS APCS program)
- IELTS certification (6.0 overall)
- Work preview with sample projects
- Personal methodology (4-step approach)
- Social media footer (email, Instagram, LinkedIn)

### 2. Projects Page (`/projects`)
- **3-section layout**: project list | preview | navigation
- **Modal system**: detailed project view with galleries
- **Media support**: images + YouTube/Vimeo embeds
- **Technology tags**: color-coded, responsive
- **External links**: demo/GitHub integration
- **Block renderer**: flexible content management

### 3. Favorites Page (`/favorites`)
- **Dual tabs**: Films & Sports personalities
- **Tier system**: S/A/B/C/D rankings with visual hierarchy
- **Films**: Oldboy, Eternal Sunshine, Mother, Mouse, Inception, etc.
- **Athletes**: Messi, Lee Chong Wei, Cristiano, Lin Dan, etc.
- **Sidebar navigation**: quick tier switching

### 4. Admin Dashboard (`/admin`)
- **JWT authentication**: secure admin access
- **Project CRUD**: create, edit, delete projects
- **Block editor**: rich content management
- **Media uploads**: Cloudinary integration
- **Contact management**: form submissions

## Database Schema

### Projects Table
- id, title, slug, descriptions (short/full)
- media (JSON array), tags, technologies
- links (demo/github), featured, status, views
- created_at, updated_at, order

### Favorites Table
- id, title, category (film/athlete)
- tier, year, genre_or_sport, achievement
- poster_or_photo, order, created_at

### Additional Tables
- Skills (name, category, proficiency, icon)
- Contacts (name, email, subject, message, status)

## File Structure
```
frontend-nextjs/
├── src/
│   ├── app/                 # Next.js 13+ app router
│   │   ├── page.tsx         # Homepage
│   │   ├── projects/        # Projects page
│   │   ├── favorites/       # Favorites page
│   │   └── admin/          # Admin dashboard
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── admin/          # Admin dashboard components
│   │   └── BlockRenderer.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   └── lib/
│       ├── api.ts          # API client with prod/dev modes
│       └── mockData.ts     # Static data for GitHub Pages

backend/
├── app.py                  # Main Flask application
├── models.py               # SQLAlchemy models
├── database.py             # Database initialization
├── routes/
│   ├── projects.py         # Project CRUD endpoints
│   ├── admin.py           # Admin authentication & management
│   ├── favorites.py       # Favorites endpoints
│   └── public.py          # Public endpoints
└── utils/
    ├── auth.py            # JWT utilities
    └── cloudinary_upload.py
```

## Current State & Next Steps

### What's Working
✅ Complete homepage with all sections
✅ Projects page with modal system
✅ Favorites page with tier system
✅ Admin authentication & project management
✅ Cloudinary media uploads
✅ Responsive design with animations
✅ API client with prod/dev switching

### Potential Enhancements
- [ ] Contact form integration (backend exists)
- [ ] Database-driven favorites (currently hardcoded)
- [ ] Blog/articles section
- [ ] Project filtering/search
- [ ] Analytics dashboard
- [ ] Email notifications for contacts
- [ ] SEO optimization
- [ ] Performance monitoring

### Recent Git Status
```
Current branch: master
Untracked files:
- backend/debug_app.py
- backend/simple_app.py
- backend/test_api_direct.py
- backend/test_routes.py
```

## Development Notes

### Running the Application
```bash
# Backend
cd backend
python app.py

# Frontend
cd frontend-nextjs
npm run dev
```

### Environment Variables
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `SECRET_KEY`: Flask secret key
- `DATABASE_URL`: Database connection string

### Key Design Decisions
1. **Block-based content**: Flexible project descriptions
2. **Dual-mode API**: Production (GitHub Pages) vs Development
3. **Tier-based favorites**: Visual hierarchy for personal preferences
4. **JWT authentication**: Secure admin access
5. **Cloudinary**: Reliable media hosting
6. **Responsive-first**: Mobile-optimized design

## Code Quality Notes
- TypeScript throughout frontend
- Error boundaries and loading states
- Graceful image fallbacks
- Consistent styling with TailwindCSS
- RESTful API design
- Proper authentication flow

---
*Last updated: 2025-09-14*
*Status: Fully functional portfolio website ready for deployment*