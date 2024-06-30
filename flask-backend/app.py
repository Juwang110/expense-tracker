from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from flask_mysqldb import MySQL
import logging

import os

app = Flask(__name__, static_folder='../../build')
CORS(app)
load_dotenv()
logging.basicConfig(level=logging.INFO)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_ROOT_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DB_NAME")

# Initialize MySQL
mysql = MySQL(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

# Initialize Flask-Mail
mail = Mail(app)

@app.route('/api/send_email', methods=['POST'])
@cross_origin()
def send_email():
    data = request.json
    sender_email = data.get('email')  
    subject = "Contact me " + data.get('email')
    body = data.get('message')

    recipient_email = os.getenv('MAIL_USERNAME')

    msg = Message(subject, sender=sender_email, recipients=[recipient_email])
    msg.body = body

    try:
        mail.send(msg)
        app.logger.info('Email sent successfully!')
        return jsonify({'message': 'Success'})
    except Exception as e:
        app.logger.error(f'Failed to send email: {str(e)}')
        return jsonify({'error': 'Fail'}), 500

@app.route('/api/get_user', methods=['POST', 'OPTIONS'])
@cross_origin()
def get_user():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, headers)
    received_data = request.json
    app.logger.info(f"Received data: {received_data}")
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE username = %s AND email = %s',
                (received_data.get("username"), received_data.get("email")))
    user = cur.fetchone()
    app.logger.info(f"Fetched user from database: {user}")
    cur.close()

    if user:
        if user[2] == received_data.get("password"):
            return jsonify({"message": "exists"})
        else:
            return jsonify({"message": "wrong password"})
    else:
        return jsonify({"message": "doesn't exist"})

@app.route('/api/get_users', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users') 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/api/add_user', methods=['POST'])
def add_user():
    recieved_data = request.json
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
                (recieved_data.get("username"), recieved_data.get("password"), recieved_data.get("email")))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User added successfully!'})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
