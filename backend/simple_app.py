from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3002'])

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'Simple Flask app running'})

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'Test endpoint works!', 'data': [1, 2, 3]})

@app.route('/api/projects/', methods=['GET'])
def get_projects():
    return jsonify([
        {'id': 1, 'title': 'Test Project 1', 'description': 'Test description'},
        {'id': 2, 'title': 'Test Project 2', 'description': 'Another test'}
    ])

if __name__ == '__main__':
    print("Starting simple Flask app...")
    app.run(debug=True, host='127.0.0.1', port=5000)