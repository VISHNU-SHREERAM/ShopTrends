import sqlite3 as sql
from datetime import datetime

class Engine:
    def __init__(self):
        self._conn = sql.connect("database.db")
        self._cursor = self._conn.cursor()

    def execute(self, query: str) -> sql.Cursor:
        return self._cursor.execute(query)

    def date(self, string:str):
        return datetime.strptime(string, "%Y-%m-%d").date()
    
    def timestamp(self, string:str):
        return datetime.strptime(string, "%Y-%m-%d %H:%M:%S").timestamp()
    
    def month(self, string:str):
        return datetime.strptime(string, "%Y-%m")
    
    def year(self, string:str):
        return datetime.strptime(string, "%Y")
    
    def day(self, string: str):
        return datetime.strptime(string, "%Y-%m-%d").date().weekday()