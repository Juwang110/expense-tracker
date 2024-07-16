from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from flask_mysqldb import MySQL
import logging
import requests


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

tables = [
    'Transport', 'Flights', 'Housing', 'Food', 'Medical', 'Wellness', 
    'Loans', 'Entertainment', 'Clothing', 'Insurance', 'MiscItems', 
    'SaveInvest', 'MiscExpense'
]

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
    
    try:
        response = requests.get(fred_api_url, params=params)
        response.raise_for_status() 
        data = response.json()
        most_recent_observation = data['observations'][-1] if 'observations' in data and len(data['observations']) > 0 else None
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(most_recent_observation)

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


@app.route('/api/add_goal', methods=['POST'])
@cross_origin()
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
    cur.execute("INSERT INTO Goals (user_id, category, unit, amount, change_by, goal_month, goal_year) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (user_id, category, unit, amount, change_by, goal_month, goal_year))

    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "updated"})

@app.route('/api/delete_goal', methods=['POST'])
def delete_goal():
    try:
        received_data = request.json
        goal_id = received_data.get("goal_id")
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM Goals WHERE id = %s', (goal_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Goal deleted successfully"})
    except Exception as e:
        return jsonify({"error": "Failed to delete Goal"}), 500


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
    
@app.route('/api/get_goals', methods=['POST'])
def get_goals():
    received_data = request.json
    user_id = received_data.get('id')
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM Goals WHERE user_id = %s', (user_id,)) 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/api/get_dates', methods=['POST'])
def get_dates():
    received_data = request.json
    user_id = received_data.get('id')
    cur = mysql.connection.cursor()
    cur.execute('SELECT month, year FROM Transport WHERE user_id = %s', (user_id,)) 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/api/get_user', methods=['POST'])
@cross_origin()
def get_user():
    received_data = request.json
    app.logger.info(f"Received data: {received_data}")
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM Users WHERE username = %s AND email = %s',
                (received_data.get("username"), received_data.get("email")))
    user = cur.fetchone()
    cur.execute('SELECT * FROM Users ORDER BY id DESC')
    top_user = cur.fetchone()
    cur.close()

    if user:
        if user[2] == received_data.get("password"):
            return jsonify({"message": "exists", "id" : user[0]})
        else:
            return jsonify({"message": "wrong password"})
    elif top_user:
        return jsonify({"message": "doesn't exist", "id" : top_user[0] + 1})
    else:
        return jsonify({"message": "doesn't exist", "id" : 1})
    
@app.route('/api/update_user', methods=['PUT'])
@cross_origin()
def update_user():
    received_data = request.json
    user_id = received_data.get("id")
    email = received_data.get("email")
    username = received_data.get("username")
    password = received_data.get("password")
    app.logger.info(f"Received data: {received_data}")
    cur = mysql.connection.cursor()
    if email:
        cur.execute('UPDATE Users SET email = %s WHERE id = %s', (email, user_id))
    if username:
        cur.execute('UPDATE Users SET username = %s WHERE id = %s', (username, user_id))
    if password:
        cur.execute('UPDATE Users SET password = %s WHERE id = %s', (password, user_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "updated"})

@app.route('/api/update_consent', methods=['PUT'])
@cross_origin()
def update_consent():
    received_data = request.json
    consent = received_data.get("consent")
    user_id = received_data.get("id")
    cur = mysql.connection.cursor()
    cur.execute('UPDATE Users SET consent = %s WHERE id = %s', (consent, user_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "updated"})

@app.route('/api/delete_user', methods=['POST'])
def delete_user():
    try:
        received_data = request.json
        user_id = received_data.get("id")
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM Users WHERE id = %s', (user_id,))
        for table in tables:
            cur.execute(f'DELETE FROM {table} WHERE user_id = %s', (user_id,))
        
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        return jsonify({"error": "Failed to delete user"}), 500


@app.route('/api/get_users', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM Users') 
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/api/add_user', methods=['POST'])
def add_user():
    recieved_data = request.json
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO Users (username, password, email, consent) VALUES (%s, %s, %s, %s)",
                (recieved_data.get("username"), recieved_data.get("password"), recieved_data.get("email"), True))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User added successfully!'})


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

@app.route('/api/total_expenses', methods=['POST'])
@cross_origin()
def get_total_expenses():
    try:
        received_data = request.json
        user_id = received_data.get("id")
        cur = mysql.connection.cursor()
        query = """
            SELECT month, year, SUM(total_expense) AS total_expenditure
            FROM (
                SELECT month, year, monthly_expense AS total_expense
                FROM Transport
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Flights
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Housing
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Food
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Medical
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Wellness
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Loans
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Entertainment
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Clothing
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM Insurance
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM MiscItems
                WHERE user_id = %s

                UNION ALL

                SELECT month, year, monthly_expense
                FROM MiscExpense
                WHERE user_id = %s

            ) AS all_expenses
            GROUP BY month, year;
        """

        app.logger.info("Before executing SQL query")
        cur.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id))
        data = cur.fetchall()
        cur.close()
        
        return jsonify(data)
    
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/all_expenses', methods=['POST'])
@cross_origin()
def get_expenses():
    try:
        received_data = request.json
        user_id = received_data.get("id")
        month = received_data.get("month")
        year = received_data.get("year")

        app.logger.info(f"Received data: {received_data}")

        cur = mysql.connection.cursor()

        query = """
            SELECT 'Transport' AS category, Transport.monthly_expense AS value
            FROM Users 
            JOIN Transport ON Users.id = Transport.user_id
            WHERE Users.id = %s AND Transport.month = %s AND Transport.year = %s
            
            UNION ALL
            
            SELECT 'Flights' AS category, Flights.monthly_expense AS value
            FROM Users 
            JOIN Flights ON Users.id = Flights.user_id
            WHERE Users.id = %s AND Flights.month = %s AND Flights.year = %s
            
            UNION ALL
            
            SELECT 'Housing' AS category, Housing.monthly_expense AS value
            FROM Users 
            JOIN Housing ON Users.id = Housing.user_id
            WHERE Users.id = %s AND Housing.month = %s AND Housing.year = %s
            
            UNION ALL
            
            SELECT 'Food' AS category, Food.monthly_expense AS value
            FROM Users 
            JOIN Food ON Users.id = Food.user_id
            WHERE Users.id = %s AND Food.month = %s AND Food.year = %s
            
            UNION ALL
            
            SELECT 'Medical' AS category, Medical.monthly_expense AS value
            FROM Users 
            JOIN Medical ON Users.id = Medical.user_id
            WHERE Users.id = %s AND Medical.month = %s AND Medical.year = %s
            
            UNION ALL
            
            SELECT 'Wellness' AS category, Wellness.monthly_expense AS value
            FROM Users 
            JOIN Wellness ON Users.id = Wellness.user_id
            WHERE Users.id = %s AND Wellness.month = %s AND Wellness.year = %s
            
            UNION ALL
            
            SELECT 'Loans' AS category, Loans.monthly_expense AS value
            FROM Users 
            JOIN Loans ON Users.id = Loans.user_id
            WHERE Users.id = %s AND Loans.month = %s AND Loans.year = %s
            
            UNION ALL
            
            SELECT 'Entertainment' AS category, Entertainment.monthly_expense AS value
            FROM Users 
            JOIN Entertainment ON Users.id = Entertainment.user_id
            WHERE Users.id = %s AND Entertainment.month = %s AND Entertainment.year = %s
            
            UNION ALL
            
            SELECT 'Clothing' AS category, Clothing.monthly_expense AS value
            FROM Users 
            JOIN Clothing ON Users.id = Clothing.user_id
            WHERE Users.id = %s AND Clothing.month = %s AND Clothing.year = %s
            
            UNION ALL
            
            SELECT 'Insurance' AS category, Insurance.monthly_expense AS value
            FROM Users 
            JOIN Insurance ON Users.id = Insurance.user_id
            WHERE Users.id = %s AND Insurance.month = %s AND Insurance.year = %s
            
            UNION ALL
            
            SELECT 'MiscItems' AS category, MiscItems.monthly_expense AS value
            FROM Users 
            JOIN MiscItems ON Users.id = MiscItems.user_id
            WHERE Users.id = %s AND MiscItems.month = %s AND MiscItems.year = %s
            
            UNION ALL
            
            SELECT 'SaveInvest' AS category, SaveInvest.monthly_expense AS value
            FROM Users 
            JOIN SaveInvest ON Users.id = SaveInvest.user_id
            WHERE Users.id = %s AND SaveInvest.month = %s AND SaveInvest.year = %s
            
            UNION ALL
            
            SELECT 'MiscExpense' AS category, MiscExpense.monthly_expense AS value
            FROM Users 
            JOIN MiscExpense ON Users.id = MiscExpense.user_id
            WHERE Users.id = %s AND MiscExpense.month = %s AND MiscExpense.year = %s
        """

        app.logger.info("Before executing SQL query")
        cur.execute(query, (user_id, month, year, user_id, month, year, user_id, month, year, user_id, month, year, user_id, month, year,
                            user_id, month, year, user_id, month, year, user_id, month, year, user_id, month, year, user_id, month, year,
                            user_id, month, year, user_id, month, year, user_id, month, year))
        expenses = cur.fetchall()
        app.logger.info(f"Query result: {expenses}")
        app.logger.info("After executing SQL query")
        cur.close()
        
        # Convert the result into a list of dictionaries
        formatted_expenses = [{'category': expense[0], 'value': int(expense[1])} for expense in expenses]
        
        return jsonify(formatted_expenses)
    
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/handle_survey', methods=['POST'])
def handle_transport():
    received_data = request.json
    user_id = received_data.get("id")
    transportExpense = received_data.get("transportExpense")
    flightExpense = received_data.get("flightExpense")
    housingExpense = received_data.get("housingExpense")
    foodExpense = received_data.get("foodExpense")
    medicalExpense = received_data.get("medicalExpense")
    wellnessExpense = received_data.get("wellnessExpense")
    loanExpense = received_data.get("loanExpense")
    entExpense = received_data.get("entExpense")
    clothingExpense = received_data.get("clothingExpense")
    insuranceExpense = received_data.get("insuranceExpense")
    itemsExpense = received_data.get("itemsExpense")
    saveExpense = received_data.get("saveExpense")
    miscExpense = received_data.get("miscExpense")
    year = received_data.get("year")
    month = received_data.get("month")
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM Transport WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Transport SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (transportExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Transport (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, transportExpense, year, month))

    cur.execute("SELECT * FROM Flights WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Flights SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (flightExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Flights (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, flightExpense, year, month))  

    cur.execute("SELECT * FROM Housing WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Housing SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (housingExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Housing (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, housingExpense, year, month))  

    cur.execute("SELECT * FROM Food WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Food SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (foodExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Food (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, foodExpense, year, month))  

    cur.execute("SELECT * FROM Medical WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Medical SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (medicalExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Medical (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, medicalExpense, year, month))  

    cur.execute("SELECT * FROM Wellness WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Wellness SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (wellnessExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Wellness (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, wellnessExpense, year, month))  

    cur.execute("SELECT * FROM Loans WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Loans SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (loanExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Loans (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, loanExpense, year, month))  

    cur.execute("SELECT * FROM Entertainment WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Entertainment SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (entExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Entertainment (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, entExpense, year, month))  

    cur.execute("SELECT * FROM Clothing WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Clothing SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (clothingExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Clothing (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, clothingExpense, year, month))  

    cur.execute("SELECT * FROM Insurance WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE Insurance SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (insuranceExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO Insurance (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, insuranceExpense, year, month)) 
         
    cur.execute("SELECT * FROM MiscItems WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE MiscItems SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (itemsExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO MiscItems (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, itemsExpense, year, month))

    cur.execute("SELECT * FROM SaveInvest WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE SaveInvest SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (saveExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO SaveInvest (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, saveExpense, year, month))  

    cur.execute("SELECT * FROM MiscExpense WHERE user_id = %s AND year = %s AND month = %s", (user_id, year, month))
    if cur.fetchone():
        cur.execute("UPDATE MiscExpense SET monthly_expense = %s WHERE user_id = %s AND year = %s AND month = %s", (miscExpense, user_id, year, month))
    else:
        cur.execute("INSERT INTO MiscExpense (user_id, monthly_expense, year, month) VALUES (%s, %s, %s, %s)", (user_id, miscExpense, year, month))  

    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'success'})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
