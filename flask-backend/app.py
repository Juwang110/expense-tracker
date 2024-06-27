from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from flask_mysqldb import MySQL

import os

app = Flask(__name__, static_folder='../../build')
CORS(app)  # Allow CORS for all origins
load_dotenv()
# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_ROOT_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DB_NAME")

# Initialize MySQL
mysql = MySQL(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users') 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/test_mysql')
def test_mysql():
    cur = mysql.connection.cursor()
    cur.execute("SELECT VERSION()")
    version = cur.fetchone()
    cur.close()
    return jsonify({"mysql_version": version[0]})

@app.route('/api/add_user', methods=['POST'])
def add_user():
    username = 'test'
    password = 'test'
    try:
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'User added successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
