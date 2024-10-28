from API.engine import Engine
from fastapi import FastAPI


app = FastAPI()
engine = Engine()
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

class Charts:

    class LineGraph:

        @app.get("/transaction_per_day_line")
        def transactions_per_day():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 10) ASC"
            labels = []
            data = []
            for day, number_of_transactions in engine.execute(query).fetchall():
                day = engine.date(day)
                labels.append(day); data.append(number_of_transactions)
            return {"data": data, "labels":labels}
        
        @app.get("/transactions_per_month")
        def transactions_per_month():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 7), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 7)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 7) ASC"
            labels = []
            data = []
            for month_year, number_of_transactions in engine.execute(query).fetchall():
                month_year = engine.month(month_year)
                labels.append(month_year); data.append(number_of_transactions)
            return {"data": data, "labels": labels}
        
        @app.get("/transactions_per_year")
        def transactions_per_year():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 4), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 4)\
                ORDER BY SUBSTR(purchase_timestamp, 1, 4)"
            labels = []
            data = []
            for year, number_of_transactions in engine.execute(query).fetchall():
                year = engine.year(year)
                labels.append(year); data.append(number_of_transactions)
            return {"data": data, "labels": labels}
        
    class PieBarCharts:
        
        @app.get("/piebar_brand_revenue")
        def piebar_brand_revenue():
            query = "SELECT products.brand_name, SUM(transactions.quantity * products.price) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.brand_name"
            labels = []
            data = []
            for brand, amount in engine.execute(query).fetchall():
                labels.append(brand); data.append(amount)
            return {"data": data, "labels": labels}

        @app.get("/piebar_brand_sales")
        def piebar_brand_sales():
            query = "SELECT products.brand_name, SUM(transactions.quantity) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.brand_name"
            labels = []
            data = []
            for brand, sales in engine.execute(query).fetchall():
                labels.append(brand); data.append(sales)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_payment_method_revenue")
        def piebar_payment_method_revenue():
            query = "SELECT transactions.payment_method, SUM(transactions.quantity * products.price) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY transactions.payment_method"
            labels = []
            data = []
            for payment_method, amount in engine.execute(query).fetchall():
                labels.append(payment_method); data.append(amount)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_payment_method_sales")
        def piebar_payment_method_sales():
            query = "SELECT transactions.payment_method, SUM(transactions.quantity) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY transactions.payment_method"
            labels = []
            data = []
            for payment_method, sales in engine.execute(query).fetchall():
                labels.append(payment_method); data.append(sales)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_type_revenue")
        def piebar_type_revenue():
            query = "SELECT products.type, SUM(transactions.quantity * product.price) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.type"
            labels = []
            data = []
            for type_, amount in engine.execute(query).fetchall():
                labels.append(type_); data.append(amount)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_type_sales")
        def piebar_type_sales():
            query = "SELECT products.type, SUM(transactions.quantity) FROM products INNER JOIN transactions\
                ON products.product_name = transactions.product_name GROUP BY products.type"
            labels = []
            data = []
            for type_, sales in engine.execute(query).fetchall():
                labels.append(type_); data.append(sales)
            return {"data": data, "labels": labels}

        @app.get("/piebar_month_revenue")
        def piebar_month_revenue():
            query = "SELECT SUBSTR(transactions.purchase_timestamp, 6, 2), SUM(transactions.quantity * products.price) FROM\
                transactions INNER JOIN products ON transactions.product_name = products.product_name\
                GROUP BY SUBSTR(transactions.purchase_timestamp, 6, 2)"
            labels = []
            data = []
            for month, revenue in engine.execute(query).fetchall():
                labels.append(MONTHS[month]); data.append(revenue)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_month_sales")
        def piebar_month_sales():
            query = "SELECT SUBSTR(purchase_timestamp, 6, 2), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 6, 2)"
            labels = []
            data = []
            for month, sales in engine.execute(query).fetchall():
                labels.append(MONTHS[month]); data.append(sales)
            return {"data": data, "labels": labels}

        @app.get("/piebar_weekday_revenue")
        def piebar_weekday_revenue():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), SUM(transactions.quantity * products.price) FROM\
                transactions INNER JOIN products ON transactions.product_name = products.product_name\
                GROUP BY SUBSTR(purchase_timestamp, 1, 10)"
            labels = []
            data = []
            for weekday, revenue in engine.execute(query).fetchall():
                weekday = engine.day(weekday)
                labels.append(WEEKDAYS[weekday]); data.append(revenue)
            return {"data": data, "labels": labels}
        
        @app.get("/piebar_weekday_sales")
        def piebar_weekday_sales():
            query = "SELECT SUBSTR(purchase_timestamp, 1, 10), SUM(quantity) FROM transactions GROUP BY SUBSTR(purchase_timestamp, 1, 10)"
            labels = []
            data = []
            for weekday, sales in engine.execute(query).fetchall():
                weekday = engine.day(weekday)
                labels.append(WEEKDAYS[weekday]); data.append(sales)
            return {"data": data, "labels": labels}