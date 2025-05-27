from flask import Blueprint, request, jsonify
from database import db
from models import Project

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/', methods=['GET'])
def get_projects():
    """Get all projects with optional filtering"""
    try:
        # Get query parameters
        featured = request.args.get('featured', type=bool)
        tag = request.args.get('tag')
        technology = request.args.get('technology')
        status = request.args.get('status', 'completed')
        sort_by = request.args.get('sort_by', 'order')
        
        # Build query
        query = Project.query
        
        if featured is not None:
            query = query.filter_by(featured=featured)
        if status:
            query = query.filter_by(status=status)
        if tag:
            query = query.filter(Project.tags.contains(tag))
        if technology:
            query = query.filter(Project.technologies.contains(technology))
        
        # Sort
        if sort_by == 'date':
            query = query.order_by(Project.created_at.desc())
        elif sort_by == 'views':
            query = query.order_by(Project.views.desc())
        else:
            query = query.order_by(Project.order, Project.created_at.desc())
        
        projects = query.all()
        
        return jsonify([{
            'id': p.id,
            'title': p.title,
            'slug': p.slug,
            'short_description': p.short_description,
            'media': p.media,
            'tags': p.tags,
            'technologies': p.technologies,
            'featured': p.featured,
            'status': p.status,
            'views': p.views,
            'created_at': p.created_at.isoformat() if p.created_at else None
        } for p in projects])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/<slug>', methods=['GET'])
def get_project(slug):
    """Get single project by slug"""
    try:
        project = Project.query.filter_by(slug=slug).first()
        
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        # Increment view count
        project.views += 1
        db.session.commit()
        
        return jsonify({
            'id': project.id,
            'title': project.title,
            'slug': project.slug,
            'short_description': project.short_description,
            'full_description': project.full_description,
            'media': project.media,
            'tags': project.tags,
            'technologies': project.technologies,
            'links': project.links,
            'featured': project.featured,
            'status': project.status,
            'views': project.views,
            'created_at': project.created_at.isoformat() if project.created_at else None,
            'updated_at': project.updated_at.isoformat() if project.updated_at else None
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/related/<slug>', methods=['GET'])
def get_related_projects(slug):
    """Get related projects based on tags and technologies"""
    try:
        current_project = Project.query.filter_by(slug=slug).first()
        
        if not current_project:
            return jsonify({'error': 'Project not found'}), 404
        
        # Find projects with similar tags or technologies
        related_projects = []
        all_projects = Project.query.filter(Project.slug != slug).all()
        
        for project in all_projects:
            score = 0
            
            # Check tag overlap
            if current_project.tags and project.tags:
                common_tags = set(current_project.tags) & set(project.tags)
                score += len(common_tags) * 2
            
            # Check technology overlap
            if current_project.technologies and project.technologies:
                common_tech = set(current_project.technologies) & set(project.technologies)
                score += len(common_tech)
            
            if score > 0:
                related_projects.append((project, score))
        
        # Sort by score and get top 3
        related_projects.sort(key=lambda x: x[1], reverse=True)
        top_related = related_projects[:3]
        
        return jsonify([{
            'id': p[0].id,
            'title': p[0].title,
            'slug': p[0].slug,
            'short_description': p[0].short_description,
            'media': p[0].media[0] if p[0].media else None,
            'tags': p[0].tags,
            'score': p[1]
        } for p in top_related])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500