from flask import Blueprint, request, jsonify
from database import db
from models import Project
from utils.auth import token_required
import re

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
            'description': p.short_description,
            'content': p.full_description,
            'technologies': ','.join(p.technologies) if p.technologies else '',
            'demo_url': p.links.get('demo', '') if p.links else '',
            'github_url': p.links.get('github', '') if p.links else '',
            'image_url': p.media[0]['url'] if p.media and len(p.media) > 0 else '',
            'status': p.status,
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

def generate_slug(title):
    """Generate URL-friendly slug from title"""
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

@projects_bp.route('/', methods=['POST'])
@token_required
def create_project(current_user):
    """Create new project"""
    try:
        data = request.get_json()
        
        if not data.get('title'):
            return jsonify({'error': 'Title is required'}), 400
        
        # Generate slug from title
        slug = generate_slug(data['title'])
        
        # Check if slug already exists
        existing = Project.query.filter_by(slug=slug).first()
        if existing:
            # Add number to make unique
            counter = 1
            while existing:
                new_slug = f"{slug}-{counter}"
                existing = Project.query.filter_by(slug=new_slug).first()
                counter += 1
            slug = new_slug
        
        # Prepare data for the model
        project_data = {
            'title': data.get('title'),
            'slug': slug,
            'short_description': data.get('description', ''),
            'full_description': data.get('content', ''),
            'technologies': data.get('technologies', '').split(',') if data.get('technologies') else [],
            'status': data.get('status', 'published'),
            'featured': False,
            'views': 0
        }
        
        # Handle links
        links = {}
        if data.get('demo_url'):
            links['demo'] = data['demo_url']
        if data.get('github_url'):
            links['github'] = data['github_url']
        project_data['links'] = links
        
        # Handle media/images
        media = []
        if data.get('image_url'):
            media.append({
                'type': 'image',
                'url': data['image_url'],
                'caption': ''
            })
        project_data['media'] = media
        
        # Create project
        project = Project(**project_data)
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            'id': project.id,
            'title': project.title,
            'description': project.short_description,
            'content': project.full_description,
            'technologies': ','.join(project.technologies) if project.technologies else '',
            'demo_url': project.links.get('demo', '') if project.links else '',
            'github_url': project.links.get('github', '') if project.links else '',
            'image_url': project.media[0]['url'] if project.media and len(project.media) > 0 else '',
            'status': project.status
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/<int:project_id>', methods=['PUT'])
@token_required
def update_project(current_user, project_id):
    """Update existing project"""
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        data = request.get_json()
        
        # Update basic fields
        if 'title' in data:
            project.title = data['title']
            # Regenerate slug if title changed
            project.slug = generate_slug(data['title'])
        
        if 'description' in data:
            project.short_description = data['description']
        
        if 'content' in data:
            project.full_description = data['content']
        
        if 'status' in data:
            project.status = data['status']
        
        # Update technologies
        if 'technologies' in data:
            project.technologies = data['technologies'].split(',') if data['technologies'] else []
        
        # Update links
        links = project.links or {}
        if 'demo_url' in data:
            if data['demo_url']:
                links['demo'] = data['demo_url']
            elif 'demo' in links:
                del links['demo']
        
        if 'github_url' in data:
            if data['github_url']:
                links['github'] = data['github_url']
            elif 'github' in links:
                del links['github']
        
        project.links = links
        
        # Update media
        if 'image_url' in data:
            media = project.media or []
            if data['image_url']:
                # Update or add image
                if media and len(media) > 0:
                    media[0]['url'] = data['image_url']
                else:
                    media.append({
                        'type': 'image',
                        'url': data['image_url'],
                        'caption': ''
                    })
            else:
                # Remove image
                media = []
            project.media = media
        
        db.session.commit()
        
        return jsonify({
            'id': project.id,
            'title': project.title,
            'description': project.short_description,
            'content': project.full_description,
            'technologies': ','.join(project.technologies) if project.technologies else '',
            'demo_url': project.links.get('demo', '') if project.links else '',
            'github_url': project.links.get('github', '') if project.links else '',
            'image_url': project.media[0]['url'] if project.media and len(project.media) > 0 else '',
            'status': project.status
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@token_required
def delete_project(current_user, project_id):
    """Delete project"""
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({'message': 'Project deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500