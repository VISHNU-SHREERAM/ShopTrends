from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
from API.engine import ENGINE
import pandas as pd

class APRIORI:

    def encode(self, dataset:list[list]):
        """
        Converts lists to one hot encodings or products.
        A preprocessing step to be done before other applications
        """
        encoder = TransactionEncoder()
        array = encoder.fit_transform(dataset)
        df = pd.DataFrame(array, encoder.columns_)
        return df


    def frequent_itemsets(self, df:pd.DataFrame, min_support:float=0.5):
        """
        Get frequent itemsets
        """
        itemsets = apriori(df, min_support=min_support, use_colnames=True)
        return itemsets
    
    def association_rules(self, itemsets:pd.DataFrame, num_itemsets:int=5 ,metric:str='confidence', min_threshold:float=0.8):
        """
        Get association rules
        """
        chosen_ones = association_rules(itemsets, num_itemsets=num_itemsets ,metric=metric, min_threshold=0.8)
        return chosen_ones
    
    def get_dataset(self, itemsets: pd.DataFrame, num_itemsets:int=5 ,metric:str='confidence', min_threshold:float=0.8):
        """
        Get dataset from database
        """
        unique_transaction_ids = ENGINE.execute("SELECT distinct(transaction_id) FROM transactions").fetchall()
        dataset = [0]*len(unique_transaction_ids)
        for ID in unique_transaction_ids:
            query = f"SELECT product_name FROM transactions WHERE transaction_id = {ID}"
            products = ENGINE.execute(query).fetchall()
            dataset[ID] = products
        return dataset