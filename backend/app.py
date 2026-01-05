from flask import Flask, jsonify, request
from flask_cors import CORS
from sql_connection import get_sql_connection
import products_dao
import traceback

app = Flask(__name__)
CORS(app)

@app.route('/api/uoms', methods=['GET'])
def get_uoms():
    try:
        connection = get_sql_connection()
        uoms = products_dao.get_all_uoms(connection)
        print("UOMs fetched:", uoms)
        return jsonify(uoms)
    except Exception as e:
        print("=== ERROR in get_uoms ===")
        print(str(e))
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/products', methods=['POST'])
def add_product():
    try:
        print("=== POST /api/products called ===")
        connection = get_sql_connection()
        data = request.json
        print("Received data:", data)

        name = data.get('name', '').strip()
        unit_name = data.get('unit', '').strip()  # Changed from uom_id to unit
        price = data.get('price', 0)

        print(f"Parsed - name: {name}, unit: {unit_name}, price: {price}")

        if not name or name == 'New Product':
            return jsonify({"error": "Product name is required"}), 400
        if not unit_name:
            return jsonify({"error": "Unit is required"}), 400
        
        try:
            price_float = float(price)
            if price_float <= 0:
                return jsonify({"error": "Valid price is required"}), 400
        except ValueError:
            return jsonify({"error": "Price must be a number"}), 400

        product = {
            'name': name,
            'unit_name': unit_name,  # Changed
            'price': price_float
        }

        print(f"Inserting product: {product}")
        product_id = products_dao.insert_new_product(connection, product)
        print(f"Product inserted with ID: {product_id}")
        
        return jsonify({
            "message": "Product added successfully",
            "product_id": product_id
        }), 200

    except Exception as e:
        print("=== ERROR ===")
        print(str(e))
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True, port=5000)