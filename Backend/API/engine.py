import sqlite3 as sql

class Engine:
    def __init__(self):
        self._conn = sql.connect("database.db")
        self._cursor = self._conn.cursor()


    
    