import sqlite3 as sql

db = sql.connect("database.db")
cursor = db.cursor()
query = "SELECT SUBSTR(purchase_timestamp, 6, 2), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 6, 2)"

a = cursor.execute(query)


print(a.fetchall())