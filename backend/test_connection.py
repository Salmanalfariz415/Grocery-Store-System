from sql_connection import get_sql_connection

try:
    connection = get_sql_connection()
    print("Connection successful!")
    print(connection)
    connection.close()
except Exception as e:
    print("Connection failed:", e)