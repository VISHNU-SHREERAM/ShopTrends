import sqlite3 as sql
import random
from datetime import datetime, timedelta
import time
import names
from faker import Faker
from os import path
from os import remove

class TransactionSimulator:
    def __init__(self, db_name="real_time_database.db"):
        self.db_name = db_name
        self.fake = Faker()
        self.payment_methods = ["Credit Card", "Debit Card", "Cash", "UPI", "Net Banking"]
        self.product_types = ["Groceries", "Electronics", "Clothing", "Home Goods", "Beauty"]
        self.simulation_start_time = datetime.now()
        self.time_acceleration = 7200  # 2 hours (7200 seconds) per real second
        if path.exists("real_time_database.db"):
            # delete the database file if it exists
            remove("real_time_database.db")
        self.setup_initial_data()

    def get_connection(self):
        return sql.connect(self.db_name)

    def get_simulated_time(self):
        """Calculate the simulated time based on elapsed real time"""
        real_elapsed = datetime.now() - self.simulation_start_time
        simulated_elapsed = real_elapsed.total_seconds() * self.time_acceleration
        return self.simulation_start_time + timedelta(seconds=simulated_elapsed)

    def setup_initial_data(self):
        """Initialize the database with sample products and customers"""
        products = [
            # Groceries
            ("Milk 1L", "Amul", "Groceries", 60.0),
            ("Bread", "Britannia", "Groceries", 40.0),
            ("Rice 1kg", "India Gate", "Groceries", 80.0),
            ("Eggs 12pc", "Farm Fresh", "Groceries", 90.0),
            # Electronics
            ("Headphones", "Sony", "Electronics", 1999.0),
            ("Power Bank", "Mi", "Electronics", 999.0),
            ("USB Cable", "Anker", "Electronics", 299.0),
            # Clothing
            ("T-Shirt", "Levis", "Clothing", 799.0),
            ("Jeans", "Wrangler", "Clothing", 1499.0),
            ("Socks", "Jockey", "Clothing", 199.0),
            # Home Goods
            ("Bedsheet", "Spaces", "Home Goods", 899.0),
            ("Towel", "Bombay Dyeing", "Home Goods", 399.0),
            ("Pillows", "Sleepwell", "Home Goods", 299.0),
            # Beauty
            ("Shampoo", "Dove", "Beauty", 299.0),
            ("Face Wash", "Himalaya", "Beauty", 199.0),
            ("Moisturizer", "Nivea", "Beauty", 249.0)
        ]

        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            cursor.executescript("""
                CREATE TABLE IF NOT EXISTS products(
                    product_name TEXT,
                    brand_name TEXT,
                    type TEXT,
                    price REAL,
                    PRIMARY KEY(product_name)
                );

                CREATE TABLE IF NOT EXISTS customers(
                    phone_number VARCHAR(10),
                    name TEXT,
                    address TEXT,
                    address_id INTEGER,
                    PRIMARY KEY(phone_number)
                );

                CREATE TABLE IF NOT EXISTS transactions(
                    unique_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    phone_number VARCHAR(10),
                    product_name TEXT,
                    quantity INTEGER,
                    purchase_timestamp TEXT,
                    payment_method TEXT,
                    transaction_id INTEGER,
                    FOREIGN KEY(phone_number) REFERENCES customers(phone_number),
                    FOREIGN KEY(product_name) REFERENCES products(product_name)
                );
            """)

            cursor.executemany("""
                INSERT OR IGNORE INTO products (product_name, brand_name, type, price)
                VALUES (?, ?, ?, ?)
            """, products)

            # Generate and insert 100 sample customers
            for _ in range(100):
                phone = ''.join([str(random.randint(0, 9)) for _ in range(10)])
                name = names.get_full_name()
                address = self.fake.address().replace('\n', ', ')
                address_id = random.randint(1, 1000)
                
                cursor.execute("""
                    INSERT OR IGNORE INTO customers (phone_number, name, address, address_id)
                    VALUES (?, ?, ?, ?)
                """, (phone, name, address, address_id))

            conn.commit()

    def adjust_transaction_probability(self, simulated_time):
        """Adjust transaction probability based on time of day"""
        hour = simulated_time.hour
        
        # Define peak hours (higher probability)
        if 11 <= hour <= 14 or 18 <= hour <= 21:  # Lunch and dinner times
            return 0.8
        # Define moderate hours
        elif 9 <= hour <= 20:  # Regular business hours
            return 0.5
        # Define off-peak hours
        elif 0 <= hour <= 5:  # Late night
            return 0.1
        else:  # Early morning and other times
            return 0.3

    def generate_transaction(self,num_of_products,curr_transaction_id):
        """Generate a random transaction with simulated timestamp"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Get random customer
            cursor.execute("SELECT phone_number FROM customers ORDER BY RANDOM() LIMIT 1")
            phone_number = cursor.fetchone()[0]
            
            
            # Generate other transaction details
            payment_method = random.choice(self.payment_methods)

            transaction_id = random.randint(1, 200)
            
            # Use simulated time for timestamp
            simulated_time = self.get_simulated_time()
            purchase_timestamp = simulated_time.strftime('%Y-%m-%d %H:%M:%S')
            
            for i in range(num_of_products):
                # Insert transaction
                # Get random product
                cursor.execute("SELECT product_name FROM products ORDER BY RANDOM() LIMIT 1")
                quantity = random.randint(1, 5)
                product_name = cursor.fetchone()[0]
                cursor.execute("""
                    INSERT INTO transactions 
                    (phone_number, product_name, quantity, purchase_timestamp, payment_method,transaction_id)
                    VALUES (?, ?, ?, ?, ?,?)
                """, (phone_number, product_name, quantity, purchase_timestamp, payment_method,curr_transaction_id))
                
                conn.commit()
                
                yield {
                    'transaction_id': curr_transaction_id,
                    'phone_number': phone_number,
                    'product_name': product_name,
                    'quantity': quantity,
                    'payment_method': payment_method,
                    'timestamp': purchase_timestamp,
                    'simulated_time': simulated_time
                }

    def run_simulation(self, duration_minutes=None, transaction_delay=(0.2, 1)):
        """
        Run the simulation for specified duration or indefinitely
        duration_minutes: How long to run (None for indefinite)
        transaction_delay: Tuple of (min_seconds, max_seconds) between transactions
        """
        start_time = datetime.now()
        transaction_count = 1
        
        try:
            while True:
                current_simulated_time = self.get_simulated_time()
                
                # Check if we should generate a transaction based on time of day
                if random.random() < self.adjust_transaction_probability(current_simulated_time):
                    # Generate and log transaction
                    num_of_products = random.randint(1, 5)
                    transactions=[]
                    for t in self.generate_transaction(num_of_products,transaction_count):
                        transactions.append(t)
                    transaction_count += 1
                    
                    # Calculate simulated time progression
                    simulated_elapsed = transactions[0]['simulated_time'] - self.simulation_start_time
                    simulated_days = simulated_elapsed.days
                    simulated_hours = simulated_elapsed.seconds // 3600
                    
                    print(f"\nTransaction #{transaction_count}")
                    print(f"Simulated Time: {transactions[0]['timestamp']}")
                    print(f"Simulation Progress: {simulated_days} days, {simulated_hours} hours")
                    print(f"Customer Phone: {transactions[0]['phone_number']}")
                    print(f"Payment Method: {transactions[0]['payment_method']}")
                    print("Products Purchased:")
                    for transaction in transactions:
                        print(f"Product: {transaction['product_name']}")
                        print(f"Quantity: {transaction['quantity']}")
                        print()
                    print("-" * 50)
                
                # Check if duration exceeded
                if duration_minutes:
                    elapsed = datetime.now() - start_time
                    if elapsed.total_seconds() >= duration_minutes * 60:
                        print(f"\nSimulation completed: {transaction_count} transactions generated")
                        break

                # Random delay before next transaction
                delay = random.uniform(transaction_delay[0], transaction_delay[1])
                time.sleep(delay)
                
        except KeyboardInterrupt:
            print(f"\nSimulation stopped: {transaction_count} transactions generated")

if __name__ == "__main__":
    # Create and run simulator
    simulator = TransactionSimulator()
    
    # Run for 30 minutes with 0.2-1 seconds between transactions
    # This will simulate approximately 60 days of transaction data
    simulator.run_simulation(duration_minutes=300, transaction_delay=(0.01, 0.1))