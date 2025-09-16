from app import create_app
import requests
import json

app = create_app()

with app.test_client() as client:
    # Test health endpoint
    response = client.get('/api/health')
    print(f"Health endpoint: {response.status_code}")
    print(f"Response: {response.get_json()}")
    
    # Test projects endpoint
    response = client.get('/api/projects/')
    print(f"Projects endpoint: {response.status_code}")
    if response.status_code == 200:
        data = response.get_json()
        print(f"Number of projects: {len(data)}")
        if data:
            print(f"First project: {data[0]['title']}")
    else:
        print(f"Error response: {response.get_data()}")