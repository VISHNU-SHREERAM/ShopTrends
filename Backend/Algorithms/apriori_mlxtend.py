from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
from API.engine import ENGINE
import pandas as pd

class APRIORI:

    @staticmethod
    def encode(dataset:list[list]) -> pd.DataFrame:
        """
        Converts lists to one hot encodings or products.
        A preprocessing step to be done before other applications
        """
        encoder = TransactionEncoder()
        array = encoder.fit_transform(dataset)
        df = pd.DataFrame(array, columns = encoder.columns_)
        return df

    @staticmethod
    def frequent_itemsets(df:pd.DataFrame, min_support:float=0.5) -> pd.DataFrame:
        """
        Get frequent itemsets
        """
        itemsets = apriori(df, min_support=min_support, use_colnames=True)
        return itemsets
    
    @staticmethod
    def association_rules(itemsets:pd.DataFrame, num_itemsets:int=5 ,metric:str='confidence', min_threshold:float=0.8) -> pd.DataFrame:
        """
        Get association rules
        """
        chosen_ones = association_rules(itemsets, num_itemsets=num_itemsets ,metric=metric, min_threshold=0.8)
        return chosen_ones
    
    @staticmethod
    def get_dataset() -> list[str]:
        """
        Get dataset from database
        """
        unique_transaction_ids = ENGINE.execute("SELECT transaction_id FROM transactions").fetchall()
        dataset = []
        for (ID,) in unique_transaction_ids:
            query = f"SELECT product_name FROM transactions WHERE transaction_id = {ID}"
            products = [p for (p,) in ENGINE.execute(query).fetchall()]
            dataset.append(products)
        return dataset