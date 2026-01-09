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
