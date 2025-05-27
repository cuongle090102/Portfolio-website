import os
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash

# Get environment variables
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

# Generate a password hash for the admin password (you should store this in your database in production)
ADMIN_PASSWORD_HASH = generate_password_hash(ADMIN_PASSWORD)

def generate_token(user_data):
    """Generate JWT token for authenticated user"""
    payload = {
        'user_id': user_data.get('id', 1),
        'username': user_data.get('username', 'admin'),
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def verify_token(token):
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    """Decorator to protect routes that require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # Get token from header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(' ')[1]  # Bearer <token>
            except IndexError:
                return jsonify({'error': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        # Verify token
        payload = verify_token(token)
        if payload is None:
            return jsonify({'error': 'Token is invalid or expired'}), 401
        
        # Add user data to request
        request.current_user = payload
        
        return f(*args, **kwargs)
    
    return decorated_function

def verify_admin_password(password):
    """Verify admin password"""
    return check_password_hash(ADMIN_PASSWORD_HASH, password)