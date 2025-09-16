from debug_app import create_app
import json

app = create_app()

# Test the API endpoints directly
with app.test_client() as client:
    print("=== Testing API endpoints ===")
    
    # Test health
    response = client.get('/api/health')
    print(f"Health: {response.status_code} - {response.get_json()}")
    
    # Test projects
    response = client.get('/api/projects/')
    print(f"Projects: {response.status_code}")
    if response.status_code == 200:
        projects = response.get_json()
        print(f"Found {len(projects)} projects")
        for p in projects[:2]:  # Show first 2
            print(f"  - {p['title']}")
    
    # Test projects without trailing slash
    response = client.get('/api/projects')
    print(f"Projects (no slash): {response.status_code}")
    
# Test what Flask sees when we make the real request
print("\n=== URL Map ===")
for rule in app.url_map.iter_rules():
    if 'projects' in str(rule):
        print(f"Rule: {rule.rule} -> {rule.endpoint} (methods: {rule.methods})")