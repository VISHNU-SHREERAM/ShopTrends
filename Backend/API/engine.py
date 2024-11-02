import sqlite3 as sql
from datetime import datetime
from os import path


class Engine:
    def __init__(self):
        self._db_path = "./API/real_time_database.db"

    def execute(self, query: str) -> sql.Cursor:
        conn = sql.connect(self._db_path)
        cursor = conn.cursor()
        return cursor.execute(query)

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