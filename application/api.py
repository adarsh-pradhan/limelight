form flask import Flask, jsonify, request


app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    uesrname = data.get('username')
    password = data.get('password')