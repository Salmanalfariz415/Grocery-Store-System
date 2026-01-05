def get_all_uoms(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT Uom_id, Uom_name FROM uom")
    uoms = cursor.fetchall()
    cursor.close()
    return [{"id": u[0], "name": u[1]} for u in uoms]


def insert_new_product(connection, product):
    cursor = connection.cursor()
    
    # Convert unit name to uom_id
    cursor.execute("SELECT Uom_id FROM uom WHERE Uom_name = %s", (product['unit_name'],))
    result = cursor.fetchone()
    
    if not result:
        raise ValueError(f"Invalid unit: {product['unit_name']}")
    
    uom_id = result[0]
    
    query = "INSERT INTO products (Name, Uom_id, Price_per_unit,Uom_name) VALUES (%s, %s, %s,%s)"
    values = (product['name'], uom_id, product['price'], product['unit_name'])
    
    cursor.execute(query, values)
    connection.commit()
    cursor.close()
    
    return cursor.lastrowid