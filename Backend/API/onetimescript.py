import sqlite3 as sql
from os import remove, path

if path.exists("database.db"):
    remove("database.db")

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
    item_id TEXT,
    product_name TEXT,
    added_date VARCHAR(10),
    expiry_date VARCHAR(10),
    quantity INT,
    PRIMARY KEY(item_id),
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

-- Insert data into products table
INSERT INTO products (product_name, brand_name, type, price) VALUES
('Apple', 'Fresh Farm', 'Fruit', 0.5),
('Milk', 'Dairy Best', 'Dairy', 1.2);

-- Insert data into inventory table
INSERT INTO inventory (item_id, product_name, added_date, expiry_date, quantity) VALUES
('INV001', 'Apple', '2024-10-01', '2024-10-10', 100),
('INV002', 'Milk', '2024-10-01', '2024-10-05', 50);

-- Insert data into customers table
INSERT INTO customers (phone_number, name, address) VALUES
('1234567890', 'John Doe', '123 Main St'),
('0987654321', 'Jane Smith', '456 Elm St');

-- Insert data into transactions table
INSERT INTO transactions (phone_number, product_name, quantity, purchase_timestamp, payment_method) VALUES
('1234567890', 'Apple', 5, '2024-10-03 10:30:00', 'Cash'),
('0987654321', 'Milk', 2, '2024-10-04 14:20:00', 'Card');


"""

cursor.executescript(script)
print("successful")