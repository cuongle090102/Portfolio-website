from flask import Blueprint, jsonify, request
from models import Favorite
from database import db

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/', methods=['GET'])
def get_favorites():
    """Get all favorites grouped by category and tier"""
    try:
        favorites = Favorite.query.order_by(Favorite.tier, Favorite.order, Favorite.created_at).all()
        
        result = {
            'films': {},
            'athletes': {}
        }
        
        for favorite in favorites:
            category = 'films' if favorite.category == 'film' else 'athletes'
            tier = favorite.tier
            
            if tier not in result[category]:
                result[category][tier] = []
            
            item_data = {
                'id': favorite.id,
                'title': favorite.title,
                'year': favorite.year,
                'poster': favorite.poster_or_photo
            }
            
            if favorite.category == 'film':
                item_data['genre'] = favorite.genre_or_sport
            else:
                item_data['name'] = favorite.title
                item_data['sport'] = favorite.genre_or_sport
                item_data['achievement'] = favorite.achievement
                item_data['photo'] = favorite.poster_or_photo
                # Remove title for athletes as they use 'name'
                del item_data['title']
            
            result[category][tier].append(item_data)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@favorites_bp.route('/', methods=['POST'])
def create_favorite():
    """Create a new favorite item"""
    try:
        data = request.get_json()
        
        favorite = Favorite(
            title=data.get('title'),
            category=data.get('category'),
            tier=data.get('tier'),
            year=data.get('year'),
            genre_or_sport=data.get('genre_or_sport'),
            achievement=data.get('achievement'),
            poster_or_photo=data.get('poster_or_photo'),
            order=data.get('order', 0)
        )
        
        db.session.add(favorite)
        db.session.commit()
        
        return jsonify({'message': 'Favorite created successfully', 'id': favorite.id}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500