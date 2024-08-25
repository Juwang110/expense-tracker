from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from flask_mysqldb import MySQL
import logging
import requests

import os
from urllib.parse import urlparse

app = Flask(__name__, static_folder='../../build')
load_dotenv()
logging.basicConfig(level=logging.INFO)

frontend_origins = [
    'http://localhost:3000',  # Local development
    os.getenv('FRONTEND_ORIGIN')  # Vercel URL for deployed frontend
]
CORS(app, resources={r"/*": {"origins": frontend_origins}})

# Parse the JawsDB URL
jawsdb_url = os.getenv('JAWSDB_URL')
url = urlparse(jawsdb_url)

# Configuring MySQL connection
app.config['MYSQL_HOST'] = url.hostname
app.config['MYSQL_USER'] = url.username
app.config['MYSQL_PASSWORD'] = url.password
app.config['MYSQL_DB'] = url.path[1:]  # Removing leading '/'

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

# List of all category tables
tables = [
    'transport', 'flights', 'housing', 'food', 'medical', 'wellness', 
    'loans', 'entertainment', 'clothing', 'insurance', 'miscitems', 
    'saveinvest', 'miscexpense'
]

# Flask-Mail email route to send me an email
@app.route('/api/send_email', methods=['POST'])
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
        return jsonify({'message': 'Success'})
    except Exception as e:
        app.logger.error(f'Failed to send email: {str(e)}')
        return jsonify({'error': 'Fail'}), 500

# FRED data API connection route
@app.route('/api/fred_data_mostrecent')
def get_fred_data():
    fred_api_url = 'https://api.stlouisfed.org/fred/series/observations'
    api_key = os.getenv('FRED_KEY')
    series_id = request.args.get('series_id', 'PSAVERT') 
    
    params = {
        'series_id': series_id,
        'api_key': api_key,
        'file_type': 'json'
    }
    
    # Gets most recent PSAVERT table data point from FRED
    try:
        response = requests.get(fred_api_url, params=params)
        response.raise_for_status() 
        data = response.json()
        most_recent_observation = data['observations'][-1] if 'observations' in data and len(data['observations']) > 0 else None
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(most_recent_observation)

# Gets all PSAVERT table data from FRED
@app.route('/api/fred_data')
def get_fred_data_all():
    fred_api_url = 'https://api.stlouisfed.org/fred/series/observations'
    api_key = os.getenv('FRED_KEY')
    series_id = request.args.get('series_id', 'PSAVERT') 
    
    params = {
        'series_id': series_id,
        'api_key': api_key,
        'file_type': 'json'
    }
    
    try:
        response = requests.get(fred_api_url, params=params)
        response.raise_for_status() 
        data = response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(data)

# Adding a budget goal into the goals table
@app.route('/api/add_goal', methods=['POST'])
def add_goal():
    data = request.json
    user_id = data.get('id')  
    category = data.get('category')
    unit = data.get('unit')
    amount = data.get('amount')
    change_by = data.get('change_by')
    goal_month = data.get('goal_month')
    goal_year = data.get('goal_year')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO goals (user_id, category, unit, amount, change_by, goal_month, goal_year) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (user_id, category, unit, amount, change_by, goal_month, goal_year))

    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "updated"})

# Deleting a specified goal from the goals table
@app.route('/api/delete_goal', methods=['POST'])
def delete_goal():
    try:
        received_data = request.json
        goal_id = received_data.get("goal_id")
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM goals WHERE id = %s', (goal_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Goal deleted successfully"})
    except Exception as e:
        return jsonify({"error": "Failed to delete Goal"}), 500

# Gets all goals for a specific user
@app.route('/api/get_goals', methods=['POST'])
def get_goals():
    received_data = request.json
    user_id = received_data.get('id')
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM goals WHERE user_id = %s', (user_id,)) 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

# Gets all dates that the specified user filled out the survey for
@app.route('/api/get_dates', methods=['POST'])
def get_dates():
    received_data = request.json
    user_id = received_data.get('id')
    cur = mysql.connection.cursor()
    cur.execute('SELECT month, year FROM transport WHERE user_id = %s', (user_id,)) 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

# Login route attempting to retrieve user
@app.route('/api/get_user', methods=['POST'])
def get_user():
    received_data = request.json
    cur = mysql.connection.cursor()
    
    cur.execute('SELECT * FROM users WHERE email = %s',
                (received_data.get("email"),))
    user = cur.fetchone()
    cur.execute('SELECT * FROM users ORDER BY id DESC')
    top_user = cur.fetchone()
    cur.close()

    if user:
        if user[2] == received_data.get("password") and user[1] == received_data.get("username"):
            return jsonify({"message": "exists", "id" : user[0]})
        else:
            return jsonify({"message": "wrong password"})
    elif top_user:
        return jsonify({"message": "doesn't exist", "id" : top_user[0] + 1})
    else:
        return jsonify({"message": "doesn't exist", "id" : 1})

# Updates the current user with a new email/user/pass
@app.route('/api/update_user', methods=['PUT'])
def update_user():
    received_data = request.json
    user_id = received_data.get("id")
    email = received_data.get("email")
    username = received_data.get("username")
    password = received_data.get("password")
    cur = mysql.connection.cursor()
    if email:
        cur.execute('UPDATE users SET email = %s WHERE id = %s', (email, user_id))
    if username:
        cur.execute('UPDATE users SET username = %s WHERE id = %s', (username, user_id))
    if password:
        cur.execute('UPDATE users SET password = %s WHERE id = %s', (password, user_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "updated"})


# Deletes the specified user
@app.route('/api/delete_user', methods=['POST'])
def delete_user():
    try:
        received_data = request.json
        user_id = received_data.get("id")
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM users WHERE id = %s', (user_id,))
        for table in tables:
            cur.execute(f'DELETE FROM {table} WHERE user_id = %s', (user_id,))
        
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        return jsonify({"error": "Failed to delete user"}), 500

# Gets all users
@app.route('/api/get_users', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users') 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

# Adds a new user
@app.route('/api/add_user', methods=['POST'])
def add_user():
    received_data = request.json
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
                (received_data.get("username"), received_data.get("password"), received_data.get("email")))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User added successfully!'})

# Gets all category survey entries from a specified category with the current user
@app.route('/api/get_category', methods=['POST'])
def get_category():
    received_data = request.json
    user_id = received_data.get('id')
    category = received_data.get('category')
    
    cur = mysql.connection.cursor()
    try:
        query = f"SELECT * FROM {category} WHERE user_id = %s"
        cur.execute(query, (user_id,))
        data = cur.fetchall()
        cur.close()
        return jsonify(data)
    except Exception as e:
        cur.close()
        return jsonify({'error': str(e)}), 500

# Gets the total expenses of all categories except Save/Invest
@app.route('/api/total_expenses', methods=['POST'])
def get_total_expenses():
    try:
        received_data = request.json
        user_id = received_data.get("id")
        cur = mysql.connection.cursor()
        query = """
            SELECT month, year, SUM(total_expense) AS total_expenditure
            FROM (
                SELECT month, year, monthly_expense AS total_expense
                FROM transport
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM flights
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM housing
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM food
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM medical
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM wellness
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM loans
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM entertainment
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM clothing
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM insurance
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM miscitems
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM miscexpense
                WHERE user_id = %s

            ) AS all_expenses
            GROUP BY month, year;
        """

        cur.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id))
        data = cur.fetchall()
        cur.close()
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Gets each category's expense during a given month and year
@app.route('/api/all_expenses', methods=['POST'])
def get_expenses():
    try:
        received_data = request.json
        user_id = received_data.get("id")
        month = received_data.get("month")
        year = received_data.get("year")

        cur = mysql.connection.cursor()

        categories = [
            'transport', 'flights', 'housing', 'food', 'medical',
            'wellness', 'loans', 'entertainment', 'clothing',
            'insurance', 'miscitems', 'saveinvest', 'miscexpense'
        ]
        
        query_parts = []
        query_values = []

        for category in categories:
            query_parts.append(f"""
                SELECT '{category}' AS category, {category}.monthly_expense AS value
                FROM users 
                JOIN {category} ON users.id = {category}.user_id
                WHERE users.id = %s AND {category}.month = %s AND {category}.year = %s
            """)
            query_values.extend([user_id, month, year])

        query = " UNION ALL ".join(query_parts)

        cur.execute(query, query_values)
        expenses = cur.fetchall()
        cur.close()
        
        # Convert the result into a list of dictionaries to use for pie chart
        formatted_expenses = [{'category': expense[0], 'value': int(expense[1])} for expense in expenses]
        
        return jsonify(formatted_expenses)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Handles the expense survey either updating or inserting depending on completion for that month and year
@app.route('/api/handle_survey', methods=['POST'])
def handle_survey():
    received_data = request.json
    user_id = received_data.get("id")
    expenses = {
        'transport': received_data.get("transportExpense"),
        'flights': received_data.get("flightExpense"),
        'housing': received_data.get("housingExpense"),
        'food': received_data.get("foodExpense"),
        'medical': received_data.get("medicalExpense"),
        'wellness': received_data.get("wellnessExpense"),
        'loans': received_data.get("loanExpense"),
        'entertainment': received_data.get("entExpense"),
        'clothing': received_data.get("clothingExpense"),
        'insurance': received_data.get("insuranceExpense"),
        'miscitems': received_data.get("itemsExpense"),
        'saveinvest': received_data.get("saveExpense"),
        'miscexpense': received_data.get("miscExpense")
    }
    year = received_data.get("year")
    month = received_data.get("month")
    cur = mysql.connection.cursor()

    for category, expense in expenses.items():
        cur.execute(f"SELECT * FROM {category} WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
        if cur.fetchone():
            cur.execute(f"UPDATE {category} SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (expense, user_id, year, month))
        else:
            cur.execute(f"INSERT INTO {category} (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, expense, year, month))

    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'success'})



@app.route('/api/test_db_connection', methods=['GET'])
def test_db_connection():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        cursor.close()
        return jsonify({"tables": tables}), 200
    except Exception as e:
        app.logger.error(f'Failed to connect to the database: {str(e)}')
        return jsonify({"error": "Failed to connect to the database"}), 500


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
