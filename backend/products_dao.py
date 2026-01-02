from flask import Flask, jsonify, request
from sql_connection import get_sql_connection
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

# to convert uom_id to uom_name
@app.route('/api/uoms', methods=['GET'])
def get_uoms():
    connection = get_sql_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT Uom_id, Uom_name FROM uom")
    uoms = cursor.fetchall()
    cursor.close()
    
    return jsonify([{"id": u[0], "name": u[1]} for u in uoms])

@app.route('/api/products', methods=['POST'])
def add_product():
    connection = get_sql_connection()
    cursor=connection.cursor()

    data=request.json

    name=data['name']
    uom_id = data['uom_id']
    price=data['price']

    query= ("INSERT INTO products (Name, Uom_id, Price_per_unit) VALUES (%s, %s, %s)")
    values=(name, uom_id, price)

    cursor.execute(query, values)  
    connection.commit()
    cursor.close()

    return jsonify({"message": "Product added successfully"}) 

    
if __name__ == "__main__":
    app.run(debug=True, port=5000)