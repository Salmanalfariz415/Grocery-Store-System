def product_dropdown(connection):
    cursor=connection.cursor()
    try:
        query="SELECT Name,Product_id FROM products"
        cursor.execute(query)
        products=cursor.fetchall()
        product_list=[]
        for p in products:
            product={
                "name":p[0],
                "id":p[1]
            }
            product_list.append(product)
        return product_list
    finally:
        cursor.close()  

def get_prices(connection,productId):
    cursor=connection.cursor()
    try:
        query="SELECT Price_per_unit FROM products WHERE Product_id=%s"
        values=(productId,)
        cursor.execute(query,values)
        price=cursor.fetchone()
        if price:
            return {"price": price[0]}
        return {"price": 0}
    finally:
        cursor.close()

def post_orders(connection,orders):
    cursor=connection.cursor()
    try:
        query="INSERT INTO orders (customer_name,total,datetime) VALUES (%s,%s,%s)"
        values=(orders['name'],orders['total'],orders['date'],)
        cursor.execute(query,values)    
        connection.commit()
        return cursor.lastrowid
    finally:
        cursor.close()

def post_order_details(connection,orders):
    cursor=connection.cursor()
    try:
        query="INSERT INTO order_details (order_id,product_id,quantity,total_price) VALUES (%s,%s,%s,%s)"
        values=(orders['order_id'],orders['product_id'],orders['quantity'],orders['total_price'])
        cursor.execute(query,values)
        connection.commit()
        return cursor.lastrowid
    finally:
        cursor.close()

def list_orders(connection):
    cursor=connection.cursor()
    try:
        query="SELECT order_id,customer_name,total,datetime FROM orders"
        cursor.execute(query)
        orders=cursor.fetchall()
        order_list=[]
        for o in orders:
            order={
                "order_id":o[0],
                "customer_name":o[1],
                "total":o[2],
                "date":o[3].strftime('%Y-%m-%d %H:%M:%S')
            }
            order_list.append(order)
        return order_list
    finally:
        cursor.close()