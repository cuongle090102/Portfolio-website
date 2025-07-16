from app import create_app
from models import Project

app = create_app()

with app.app_context():
    projects = Project.query.all()
    for p in projects:
        print(f'Project {p.id}: {p.title}')
        print(f'  Media: {p.media}')
        print(f'  Media type: {type(p.media)}')
        if p.media and len(p.media) > 0:
            print(f'  First media URL: {p.media[0].get("url", "No URL")}')
        print('---')