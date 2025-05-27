from flask import Blueprint, request, jsonify
from datetime import datetime
from flask import Blueprint, request, jsonify
from datetime import datetime
from database import db
from models import Project, Skill, Contact
from utils.auth import token_required, verify_admin_password, generate_token
from utils.cloudinary_upload import upload_to_cloudinary, delete_from_cloudinary, upload_multiple_files
import re

admin_bp = Blueprint('admin', __name__)

def generate_slug(title):
    """Generate URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug)
    return slug.strip('-')

@admin_bp.route('/login', methods=['POST'])
def admin_login():
    """Admin login endpoint"""
    try:
        data = request.get_json()
        password = data.get('password')
        
        if not password:
            return jsonify({'error': 'Password is required'}), 400
        
        if verify_admin_password(password):
            # Generate token
            token = generate_token({'id': 1, 'username': 'admin'})
            return jsonify({
                'token': token,
                'message': 'Login successful'
            })
        else:
            return jsonify({'error': 'Invalid password'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/projects', methods=['POST'])
@token_required
def create_project():
    """Create new project"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('title'):
            return jsonify({'error': 'Title is required'}), 400
        
        # Generate slug if not provided
        slug = data.get('slug') or generate_slug(data['title'])
        
        # Check if slug already exists
        existing = Project.query.filter_by(slug=slug).first()
        if existing:
            slug = f"{slug}-{int(datetime.now().timestamp())}"
        
        # Create project
        project = Project(
            title=data['title'],
            slug=slug,
            short_description=data.get('short_description', ''),
            full_description=data.get('full_description', ''),
            media=data.get('media', []),
            tags=data.get('tags', []),
            technologies=data.get('technologies', []),
            links=data.get('links', {}),
            featured=data.get('featured', False),
            status=data.get('status', 'completed'),
            order=data.get('order', 0)
        )
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            'message': 'Project created successfully',
            'project': {
                'id': project.id,
                'slug': project.slug,
                'title': project.title
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/projects/<int:id>', methods=['PUT'])
@token_required
def update_project(id):
    """Update existing project"""
    try:
        project = Project.query.get(id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        if 'title' in data:
            project.title = data['title']
        if 'slug' in data and data['slug'] != project.slug:
            # Check if new slug is available
            existing = Project.query.filter_by(slug=data['slug']).first()
            if not existing or existing.id == id:
                project.slug = data['slug']
        if 'short_description' in data:
            project.short_description = data['short_description']
        if 'full_description' in data:
            project.full_description = data['full_description']
        if 'media' in data:
            project.media = data['media']
        if 'tags' in data:
            project.tags = data['tags']
        if 'technologies' in data:
            project.technologies = data['technologies']
        if 'links' in data:
            project.links = data['links']
        if 'featured' in data:
            project.featured = data['featured']
        if 'status' in data:
            project.status = data['status']
        if 'order' in data:
            project.order = data['order']
        
        project.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Project updated successfully',
            'project': {'id': project.id, 'slug': project.slug}
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/projects/<int:id>', methods=['DELETE'])
@token_required
def delete_project(id):
    """Delete project"""
    try:
        project = Project.query.get(id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        # Delete associated media from Cloudinary
        if project.media:
            for media_item in project.media:
                if media_item.get('public_id'):
                    delete_from_cloudinary(media_item['public_id'])
        
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({'message': 'Project deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/upload', methods=['POST'])
@token_required
def upload_media():
    """Upload media files to Cloudinary"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        folder = request.form.get('folder', 'portfolio')
        
        # Upload to Cloudinary
        result = upload_to_cloudinary(file, folder)
        
        return jsonify({
            'message': 'File uploaded successfully',
            'media': result
        })
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/upload-multiple', methods=['POST'])
@token_required
def upload_multiple_media():
    """Upload multiple media files"""
    try:
        files = request.files.getlist('files')
        if not files:
            return jsonify({'error': 'No files provided'}), 400
        
        folder = request.form.get('folder', 'portfolio')
        
        # Upload files
        uploaded, errors = upload_multiple_files(files, folder)
        
        return jsonify({
            'message': f'{len(uploaded)} files uploaded successfully',
            'uploaded': uploaded,
            'errors': errors
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/contacts', methods=['GET'])
@token_required
def get_contacts():
    """Get all contact messages"""
    try:
        status = request.args.get('status')
        
        query = Contact.query
        if status:
            query = query.filter_by(status=status)
        
        contacts = query.order_by(Contact.created_at.desc()).all()
        
        return jsonify([{
            'id': c.id,
            'name': c.name,
            'email': c.email,
            'subject': c.subject,
            'message': c.message,
            'status': c.status,
            'created_at': c.created_at.isoformat() if c.created_at else None
        } for c in contacts])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/contacts/<int:id>/status', methods=['PUT'])
@token_required
def update_contact_status(id):
    """Update contact message status"""
    try:
        contact = Contact.query.get(id)
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        data = request.get_json()
        status = data.get('status')
        
        if status not in ['unread', 'read', 'replied']:
            return jsonify({'error': 'Invalid status'}), 400
        
        contact.status = status
        db.session.commit()
        
        return jsonify({'message': 'Status updated successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/skills', methods=['POST'])
@token_required
def create_skill():
    """Create new skill"""
    try:
        data = request.get_json()
        
        skill = Skill(
            name=data['name'],
            category=data.get('category', 'Other'),
            proficiency=data.get('proficiency', 50),
            icon=data.get('icon', '')
        )
        
        db.session.add(skill)
        db.session.commit()
        
        return jsonify({
            'message': 'Skill created successfully',
            'skill': {'id': skill.id, 'name': skill.name}
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/skills/<int:id>', methods=['DELETE'])
@token_required
def delete_skill(id):
    """Delete skill"""
    try:
        skill = Skill.query.get(id)
        if not skill:
            return jsonify({'error': 'Skill not found'}), 404
        
        db.session.delete(skill)
        db.session.commit()
        
        return jsonify({'message': 'Skill deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500