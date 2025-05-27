from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from database import db
from models import Project, Skill, Contact

public_bp = Blueprint('public', __name__)

@public_bp.route('/skills', methods=['GET'])
def get_skills():
    """Get all skills"""
    try:
        skills = Skill.query.order_by(Skill.category, Skill.proficiency.desc()).all()
        return jsonify([{
            'id': s.id,
            'name': s.name,
            'category': s.category,
            'proficiency': s.proficiency,
            'icon': s.icon
        } for s in skills])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@public_bp.route('/contact', methods=['POST'])
def submit_contact():
    """Submit contact form"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new contact
        contact = Contact(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )
        
        db.session.add(contact)
        db.session.commit()
        
        # TODO: Send email notification
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'contact_id': contact.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@public_bp.route('/search', methods=['GET'])
def search():
    """Search projects"""
    try:
        query = request.args.get('q', '')
        
        if not query:
            return jsonify({'results': []})
        
        # Search in title, description, tags, and technologies
        projects = Project.query.filter(
            or_(
                Project.title.contains(query),
                Project.short_description.contains(query),
                Project.full_description.contains(query),
                Project.tags.contains(query),
                Project.technologies.contains(query)
            )
        ).all()
        
        results = [{
            'id': p.id,
            'title': p.title,
            'slug': p.slug,
            'short_description': p.short_description,
            'media': p.media[0] if p.media else None,
            'tags': p.tags,
            'featured': p.featured
        } for p in projects]
        
        return jsonify({'results': results, 'count': len(results)})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500