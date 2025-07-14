import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from database import db

# Load environment variables
load_dotenv()

def create_app():
    """Create and configure the Flask app"""
    app = Flask(__name__)
    
    # Configure app
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///portfolio.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions with app
    db.init_app(app)
    
    # Configure CORS for development
    frontend_urls = [
        os.getenv('FRONTEND_URL', 'http://localhost:3000'),
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:3004',
        'http://localhost:3005'
    ]
    CORS(app, origins=frontend_urls, supports_credentials=True)
    
    # Configure Cloudinary
    cloudinary.config(
        cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key=os.getenv('CLOUDINARY_API_KEY'),
        api_secret=os.getenv('CLOUDINARY_API_SECRET')
    )
    
    # Import models (after db is initialized)
    import models
    
    # Import and register blueprints
    from routes.public import public_bp
    from routes.projects import projects_bp
    from routes.admin import admin_bp
    
    app.register_blueprint(public_bp, url_prefix='/api')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'error': 'Internal server error'}, 500
    
    # Health check route
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Portfolio API is running'}
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=os.getenv('FLASK_ENV') == 'development', port=5000)