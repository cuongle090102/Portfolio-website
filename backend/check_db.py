from app import create_app
from models import Project

app = create_app()

with app.app_context():
    projects = Project.query.all()
    print(f'Found {len(projects)} projects:')
    for p in projects:
        print(f'ID: {p.id}, Title: {p.title}, Status: {p.status}, Short desc: {p.short_description}')