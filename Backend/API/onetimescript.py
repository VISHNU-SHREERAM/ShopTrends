import sqlite3 as sql


db = sql.connect("database.db")
cursor = db.cursor()

script = """
CREATE TABLE IF NOT EXISTS products(
    product_name TEXT,
    brand_name TEXT,
    type TEXT,
    price REAL,
    PRIMARY KEY(product_name)
);

CREATE TABLE IF NOT EXISTS inventory(
    product_name TEXT,
    added_date VARCHAR(10),
    expiry_date VARCHAR(10),
    quantity INT,
    FOREIGN KEY(product_name) REFERENCES products(product_name)
);

CREATE TABLE IF NOT EXISTS customers(
    phone_number VARCHAR(10),
    name TEXT,
    address TEXT,
    PRIMARY KEY(phone_number)
);

CREATE TABLE IF NOT EXISTS transactions(
    phone_number VARCHAR(10),
    product_name TEXT,
    quantity INT,
    purchase_timestamp TEXT,
    payment_method TEXT,
    FOREIGN KEY(phone_number) REFERENCES customers(phone_number),
    FOREIGN KEY(product_name) REFERENCES products(product_name)
);
"""

cursor.executescript(script)
print("successful")