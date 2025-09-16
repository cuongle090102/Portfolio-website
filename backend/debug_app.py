import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from database import db

# Load environment variables
load_dotenv()

def create_app():
    """Create and configure the Flask app with debugging"""
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
    
    print("Starting to import models...")
    # Import models (after db is initialized)
    import models
    print("Models imported successfully")
    
    print("Starting to import routes...")
    # Import and register blueprints
    try:
        from routes.public import public_bp
        print("Public blueprint imported")
        app.register_blueprint(public_bp, url_prefix='/api')
        print("Public blueprint registered")
        
        from routes.projects import projects_bp
        print("Projects blueprint imported")
        app.register_blueprint(projects_bp, url_prefix='/api/projects')
        print("Projects blueprint registered")
        
        from routes.admin import admin_bp
        print("Admin blueprint imported")
        app.register_blueprint(admin_bp, url_prefix='/api/admin')
        print("Admin blueprint registered")
        
    except Exception as e:
        print(f"Error importing/registering blueprints: {e}")
        import traceback
        traceback.print_exc()
    
    # Health check route
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Portfolio API is running', 'environment': 'development'}
    
    # Print all registered routes
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f"  {rule.rule} -> {rule.endpoint}")
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)