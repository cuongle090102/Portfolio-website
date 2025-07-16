from app import create_app
from models import Project
from database import db

app = create_app()

with app.app_context():
    # Update one project to completed status
    project = Project.query.filter_by(id=5).first()
    if project:
        project.status = 'completed'
        db.session.commit()
        print(f'Updated project {project.id} to completed status')
    else:
        print('Project not found')