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
