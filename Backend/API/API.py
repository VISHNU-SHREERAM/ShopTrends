from API.engine import ENGINE
from fastapi import FastAPI
from Algorithms.apriori_mlxtend import APRIORI
from collections import Counter

app = FastAPI()
MONTHS = {
    "1": "Jan",
    "2": "Feb",
    "3": "Mar",
    "4": "Apr",
    "5": "May",
    "6": "Jun",
    "7": "Jul",
    "8": "Aug",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
}
WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
from datetime import datetime


class RuleMining:

    @app.get("/rulemining/getallitems")
    def getallitems():
        data = APRIORI.get_dataset()
        return {"data":data}
    
    @app.get("/rulemining/itemsets")
    def getitemsets(min_support=0.5):
        dataset = APRIORI.get_dataset()
        encoded = APRIORI.encode(dataset)
        itemsets = APRIORI.frequent_itemsets(encoded, min_support=min_support).to_dict()
        return {"data": itemsets}

    @app.get("/rulemining/association_rules")
    def get_association_rules(min_support=0.5):
        pass

class Charts:

    class LineGraph:
        # @app.get("/sales_on_date/{date}")
        # @app.get("/recommeder/{item}")
        # def 
        
        @app.get("/get_all_products")
        def get_all_products():
            query = "SELECT * FROM products"
            labels = []
            data = []
            for product in engine.execute(query).fetchall():
                labels.append(product[0]); data.append(product[1])
            return {"data": data, "labels": labels}
        @app.get("/sales_on_date/{date}")
        def transactions_per_day_(date: str):
            # Modified query to filter by the specified date
            query = f"""
                SELECT SUBSTR(purchase_timestamp, 1, 16) AS date_hour_minute, SUM(quantity)
                FROM transactions
                WHERE SUBSTR(purchase_timestamp, 1, 10) = '{date}'
                GROUP BY date_hour_minute
                ORDER BY date_hour_minute ASC
            """
            labels = []
            data = []
            
            for date_hour_minute, number_of_transactions in engine.execute(query).fetchall():
                # Convert to datetime (handling both date and time)
                day = datetime.strptime(date_hour_minute, "%Y-%m-%d %H:%M")  # This handles the full datetime string
                labels.append(day.strftime("%Y-%m-%d %H:%M"))  # Format it back to string if needed for API response
                data.append(number_of_transactions)
            
            return {"data": data, "labels": labels}

            # def sales_on_date(date: str):
            #     query = "SELECT SUBSTR(purchase_timestamp, 1, 16), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)\
            #         ORDER BY SUBSTR(purchase_timestamp, 1, 16) ASC"
            #     labels = []
            #     data = []
            #     for day, number_of_transactions in engine.execute(query).fetchall():
            #         day = engine.date(day)
            #         labels.append(day); data.append(number_of_transactions)
            #     return {"data": data, "labels":labels} 
        @app.get("/sales_over_days")
        def transactions_per_day():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 10) ASC"
            labels = []
            data = []
            for day, number_of_transactions in ENGINE.execute(query).fetchall():
                day = ENGINE.date(day)
                labels.append(day); data.append(number_of_transactions)
            return {"data": data, "labels":labels} 
        
        @app.get("/sales_over_months")
        def transactions_per_month():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 7), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 7)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 7) ASC"
            labels = []
            data = []
            for month_year, number_of_transactions in ENGINE.execute(query).fetchall():
                month_year = ENGINE.month(month_year)
                labels.append(month_year); data.append(number_of_transactions)
            return {"data": data, "labels": labels}
        
        @app.get("/sales_over_years")
        def transactions_per_year():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 4), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 4)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 4)"
            labels = []
            data = []
            for year, number_of_transactions in ENGINE.execute(query).fetchall():
                year = ENGINE.year(year)
                labels.append(year); data.append(number_of_transactions)
            return {"data": data, "labels": labels}
        
        @app.get("/transactions_over_days")
        def transactions_per_day():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), COUNT(transaction_id) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 10) ASC"
            labels = []
            data = []
            for day, number_of_transactions in ENGINE.execute(query).fetchall():
                day = ENGINE.date(day)
                labels.append(day); data.append(number_of_transactions)
            return {"data": data, "labels":labels}
        
        @app.get("/transactions_over_months")
        def transactions_per_month():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 7), COUNT(transaction_id) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 7)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 7) ASC"
            labels = []
            data = []
            for month_year, number_of_transactions in ENGINE.execute(query).fetchall():
                month_year = ENGINE.month(month_year)
                labels.append(month_year); data.append(number_of_transactions)
            return {"data": data, "labels": labels}
        
        @app.get("/transactions_over_years")
        def transactions_per_year():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 4), COUNT(transaction_id) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 4)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 4)"
            labels = []
            data = []
            for year, number_of_transactions in ENGINE.execute(query).fetchall():
                year = ENGINE.year(year)
                labels.append(year); data.append(number_of_transactions)
            return {"data": data, "labels": labels}

        @app.get("/users_over_days")
        def transactions_per_day():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), COUNT(distinct phone_number) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 10) ASC"
            labels = []
            data = []
            for day, number_of_transactions in ENGINE.execute(query).fetchall():
                day = ENGINE.date(day)
                labels.append(day); data.append(number_of_transactions)
            return {"data": data, "labels":labels}

    class PieBarCharts:
        
        @app.get("/piebar_brand_revenue")
        def piebar_brand_revenue():
            query = "SELECT products.brand_name, SUM(transactions.quantity * products.price) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.brand_name"
            labels = []
            data = []
            for brand, amount in ENGINE.execute(query).fetchall():
                labels.append(brand); data.append(amount)
            return {"data": data, "labels": labels}

        @app.get("/piebar_brand_sales")
        def piebar_brand_sales():
            query = "SELECT products.brand_name, SUM(transactions.quantity) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.brand_name"
            labels = []
            data = []
            for brand, sales in ENGINE.execute(query).fetchall():
                labels.append(brand); data.append(sales)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_payment_method_revenue")
        def piebar_payment_method_revenue():
            query = "SELECT transactions.payment_method, SUM(transactions.quantity * products.price) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY transactions.payment_method"
            labels = []
            data = []
            for payment_method, amount in ENGINE.execute(query).fetchall():
                labels.append(payment_method); data.append(amount)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_payment_method_sales")
        def piebar_payment_method_sales():
            query = "SELECT transactions.payment_method, SUM(transactions.quantity) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY transactions.payment_method"
            labels = []
            data = []
            for payment_method, sales in ENGINE.execute(query).fetchall():
                labels.append(payment_method); data.append(sales)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_type_revenue")
        def piebar_type_revenue():
            query = "SELECT products.type, SUM(transactions.quantity * product.price) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.type"
            labels = []
            data = []
            for type_, amount in ENGINE.execute(query).fetchall():
                labels.append(type_); data.append(amount)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_type_sales")
        def piebar_type_sales():
            query = "SELECT products.type, SUM(transactions.quantity) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.type"
            labels = []
            data = []
            for type_, sales in ENGINE.execute(query).fetchall():
                labels.append(type_); data.append(sales)
            return {"data": data, "labels": labels}

        @app.get("/piebar_month_revenue")
        def piebar_month_revenue():
            query = "SELECT SUBSTR(transactions.purchase_timestamp, 6, 2), SUM(transactions.quantity * products.price) FROM\
                transactions INNER JOIN products ON transactions.product_name = products.product_name\
                GROUP BY SUBSTR(transactions.purchase_timestamp, 6, 2)"
            labels = []
            data = []
            for month, revenue in ENGINE.execute(query).fetchall():
                labels.append(MONTHS[month]); data.append(revenue)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_month_sales")
        def piebar_month_sales():
            query = "SELECT SUBSTR(purchase_timestamp, 6, 2), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 6, 2)"
            labels = []
            data = []
            for month, sales in ENGINE.execute(query).fetchall():
                labels.append(MONTHS[month]); data.append(sales)
            return {"data": data, "labels": labels}

        @app.get("/piebar_weekday_revenue")
        def piebar_weekday_revenue():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), SUM(transactions.quantity * products.price) FROM\
                transactions INNER JOIN products ON transactions.product_name = products.product_name\
                GROUP BY SUBSTR(purchase_timestamp, 1, 10)"
            labels = []
            data = []
            for weekday, revenue in ENGINE.execute(query).fetchall():
                weekday = ENGINE.day(weekday)
                labels.append(WEEKDAYS[weekday]); data.append(revenue)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_weekday_sales")
        def piebar_weekday_sales():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)"
            labels = []
            data = []
            for weekday, sales in ENGINE.execute(query).fetchall():
                weekday = ENGINE.day(weekday)
                labels.append(WEEKDAYS[weekday]); data.append(sales)
            return {"data": data, "labels": labels}

        @app.get("/piebar_product_distribution_by_category")
        def piebar_product_distribution_by_category(category:str):
            assert isinstance(category, str)
            query = f"SELECT product_name, COUNT(product_name) FROM products WHERE type = '{category}' GROUP BY product_name"
            products_of_category = ENGINE.execute(query).fetchall()

            data = []
            labels = []

            for key, count in products_of_category:
                data.append(count); labels.append(key)

            return {"data": data, "labels": labels}
        
        @app.get("/piebar_product_distribution_by_brand")
        def piebar_product_distribution_by_category(brand:str):
            assert isinstance(brand, str)
            query = f"SELECT product_name, COUNT(product_name) FROM products WHERE brand_name = '{brand}' GROUP BY product_name"
            products_of_brand = ENGINE.execute(query).fetchall()

            data = []
            labels = []

            for key, count in products_of_brand:
                data.append(count); labels.append(key)

            return {"data": data, "labels": labels}