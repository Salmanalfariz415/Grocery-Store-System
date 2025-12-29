import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

__cnx=None

def get_sql_connection():
    global __cnx
    if __cnx is None:
        __cnx = mysql.connector.connect(
            host='localhost',
            user='root',
            password=os.getenv('DB_PASSWORD'),
            database='grocery_store'
        )
    return __cnx        