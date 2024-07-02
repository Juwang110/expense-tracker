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
    cur.execute("INSERT INTO Users (username, password, email) VALUES (%s, %s, %s)",
                (recieved_data.get("username"), recieved_data.get("password"), recieved_data.get("email")))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User added successfully!'})

@app.route('/api/all_expenses', methods=['POST'])
@cross_origin()
def get_expenses():
    try:
        
        received_data = request.json
        user_id = received_data.get("id")
        app.logger.info(f"Received data: {user_id}")
        
        cur = mysql.connection.cursor()
        query = """
            SELECT 'Transport' AS category, Transport.monthly_expense AS value
            FROM Users 
            JOIN Transport ON Users.id = Transport.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Flights' AS category, Flights.monthly_expense AS value
            FROM Users 
            JOIN Flights ON Users.id = Flights.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Housing' AS category, Housing.monthly_expense AS value
            FROM Users 
            JOIN Housing ON Users.id = Housing.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Food' AS category, Food.monthly_expense AS value
            FROM Users 
            JOIN Food ON Users.id = Food.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Medical' AS category, Medical.monthly_expense AS value
            FROM Users 
            JOIN Medical ON Users.id = Medical.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Wellness' AS category, Wellness.monthly_expense AS value
            FROM Users 
            JOIN Wellness ON Users.id = Wellness.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Loans' AS category, Loans.monthly_expense AS value
            FROM Users 
            JOIN Loans ON Users.id = Loans.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Entertainment' AS category, Entertainment.monthly_expense AS value
            FROM Users 
            JOIN Entertainment ON Users.id = Entertainment.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Clothing' AS category, Clothing.monthly_expense AS value
            FROM Users 
            JOIN Clothing ON Users.id = Clothing.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'Insurance' AS category, Insurance.monthly_expense AS value
            FROM Users 
            JOIN Insurance ON Users.id = Insurance.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'MiscItems' AS category, MiscItems.monthly_expense AS value
            FROM Users 
            JOIN MiscItems ON Users.id = MiscItems.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'SaveInvest' AS category, SaveInvest.monthly_expense AS value
            FROM Users 
            JOIN SaveInvest ON Users.id = SaveInvest.user_id
            WHERE Users.id = %s
            
            UNION ALL
            
            SELECT 'MiscExpense' AS category, MiscExpense.monthly_expense AS value
            FROM Users 
            JOIN MiscExpense ON Users.id = MiscExpense.user_id
            WHERE Users.id = %s
        """
        app.logger.info("Before executing SQL query")
        cur.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, 
                            user_id, user_id, user_id, user_id, user_id, user_id, 
                            user_id))
        expenses = cur.fetchall()
        app.logger.info(f"Received data: {expenses}")
        app.logger.info("After executing SQL query")
        cur.close()
        
        # Convert the result into a list of dictionaries
        formatted_expenses = [{'category': expense[0], 'value': int(expense[1])} for expense in expenses]
        
        return jsonify(formatted_expenses)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/handle_survey', methods=['POST'])
def handle_transport():
    recieved_data = request.json
    user_id = recieved_data.get("id")
    transportExpense = recieved_data.get("transportExpense")
    flightExpense = recieved_data.get("flightExpense")
    housingExpense = recieved_data.get("housingExpense")
    foodExpense = recieved_data.get("foodExpense")
    medicalExpense = recieved_data.get("medicalExpense")
    wellnessExpense = recieved_data.get("wellnessExpense")
    loanExpense = recieved_data.get("loanExpense")
    entExpense = recieved_data.get("entExpense")
    clothingExpense = recieved_data.get("clothingExpense")
    insuranceExpense = recieved_data.get("insuranceExpense")
    itemsExpense = recieved_data.get("itemsExpense")
    saveExpense = recieved_data.get("saveExpense")
    miscExpense = recieved_data.get("miscExpense")
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM Transport WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Transport SET monthly_expense = %s WHERE user_id = %s", (transportExpense, user_id))
    else:
        cur.execute("INSERT INTO Transport (user_id, monthly_expense) VALUES (%s, %s)", (user_id, transportExpense))

    cur.execute("SELECT * FROM Flights WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Flights SET monthly_expense = %s WHERE user_id = %s", (flightExpense, user_id))
    else:
        cur.execute("INSERT INTO Flights (user_id, monthly_expense) VALUES (%s, %s)", (user_id, flightExpense))  

    cur.execute("SELECT * FROM Housing WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Housing SET monthly_expense = %s WHERE user_id = %s", (housingExpense, user_id))
    else:
        cur.execute("INSERT INTO Housing (user_id, monthly_expense) VALUES (%s, %s)", (user_id, housingExpense))  

    cur.execute("SELECT * FROM Food WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Food SET monthly_expense = %s WHERE user_id = %s", (foodExpense, user_id))
    else:
        cur.execute("INSERT INTO Food (user_id, monthly_expense) VALUES (%s, %s)", (user_id, foodExpense))  

    cur.execute("SELECT * FROM Medical WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Medical SET monthly_expense = %s WHERE user_id = %s", (medicalExpense, user_id))
    else:
        cur.execute("INSERT INTO Medical (user_id, monthly_expense) VALUES (%s, %s)", (user_id, medicalExpense))  

    cur.execute("SELECT * FROM Wellness WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Wellness SET monthly_expense = %s WHERE user_id = %s", (wellnessExpense, user_id))
    else:
        cur.execute("INSERT INTO Wellness (user_id, monthly_expense) VALUES (%s, %s)", (user_id, wellnessExpense))  

    cur.execute("SELECT * FROM Loans WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Loans SET monthly_expense = %s WHERE user_id = %s", (loanExpense, user_id))
    else:
        cur.execute("INSERT INTO Loans (user_id, monthly_expense) VALUES (%s, %s)", (user_id, loanExpense))  

    cur.execute("SELECT * FROM Entertainment WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Entertainment SET monthly_expense = %s WHERE user_id = %s", (entExpense, user_id))
    else:
        cur.execute("INSERT INTO Entertainment (user_id, monthly_expense) VALUES (%s, %s)", (user_id, entExpense))  

    cur.execute("SELECT * FROM Clothing WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Clothing SET monthly_expense = %s WHERE user_id = %s", (clothingExpense, user_id))
    else:
        cur.execute("INSERT INTO Clothing (user_id, monthly_expense) VALUES (%s, %s)", (user_id, clothingExpense))  

    cur.execute("SELECT * FROM Insurance WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE Insurance SET monthly_expense = %s WHERE user_id = %s", (insuranceExpense, user_id))
    else:
        cur.execute("INSERT INTO Insurance (user_id, monthly_expense) VALUES (%s, %s)", (user_id, insuranceExpense)) 
         
    cur.execute("SELECT * FROM MiscItems WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE MiscItems SET monthly_expense = %s WHERE user_id = %s", (itemsExpense, user_id))
    else:
        cur.execute("INSERT INTO MiscItems (user_id, monthly_expense) VALUES (%s, %s)", (user_id, itemsExpense))

    cur.execute("SELECT * FROM SaveInvest WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE SaveInvest SET monthly_expense = %s WHERE user_id = %s", (saveExpense, user_id))
    else:
        cur.execute("INSERT INTO SaveInvest (user_id, monthly_expense) VALUES (%s, %s)", (user_id, saveExpense))  

    cur.execute("SELECT * FROM MiscExpense WHERE user_id = %s", (user_id,))
    if cur.fetchone():
        cur.execute("UPDATE MiscExpense SET monthly_expense = %s WHERE user_id = %s", (miscExpense, user_id))
    else:
        cur.execute("INSERT INTO MiscExpense (user_id, monthly_expense) VALUES (%s, %s)", (user_id, miscExpense))  


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
