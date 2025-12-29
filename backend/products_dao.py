from sql_connection import get_sql_connection

def get_all_products(connection):
    cursor = connection.cursor()
    query = ("SELECT products.Product_id, products.Name, products.Uom_id, products.Price_per_unit FROM products inner join uom on products.Uom_id = uom.Uom_id")
    
    cursor.execute(query)

    response = []
    
    for(product_id, product_name, uom_id, price_per_unit) in cursor:
        response.append(
            { 
            'product_id': product_id,
            'product_name': product_name,
            'uom_id': uom_id,
            'price_per_unit': price_per_unit
        } 
        )
    return response 

def insert_new_product(connection,product):
    cursor=connection.cursor()
    
    query= ("INSERT INTO products (Name, Uom_id, Price_per_unit) VALUES (%s, %s, %s)")
    data=(product['product_name'], product['uom_id'], product['price_per_unit'])

    cursor.execute(query,data)
    connection.commit()

    return cursor.lastrowid

def delete_product(connection,product_id):
    cursor=connection.cursor()
    
    query=("DELETE FROM products WHERE Product_id = " + str(product_id))
    cursor.execute(query)
    
    connection.commit()

if __name__ == "__main__":
    connection = get_sql_connection()
    print(insert_new_product(connection,{
        'product_name': 'Cabbage',
        'uom_id': 1,
        'price_per_unit': 10
    }))