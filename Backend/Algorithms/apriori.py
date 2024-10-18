from itertools import chain, combinations

def is_supported(target_itemset, basket, thres = 0.4):
    count = 0
    for itemset in basket:
        if len(itemset & target_itemset) == len(target_itemset):
            count += 1
    if count >= thres * len(basket):
        return True
    return False


def get_item_sets(basket, products, thres = 0.4):
    itemsets_list = [[{i} for i in products if is_supported({i}, basket)]]

    def make_item_sets():
        curritemsets = itemsets_list[-1]
        new_set = []
        for itemset in curritemsets:
            for product in products:
                new_itemset = itemset | {product}
                if is_supported(new_itemset, basket, thres) and len(new_itemset) == len(itemset) + 1:
                    new_set.append(new_itemset)
        # filtering duplicates
        new_set = list(set([tuple(i) for i in new_set]))
        new_set = [set(i) for i in new_set]
        itemsets_list.append(new_set)

    for i in range(len(products)): make_item_sets()

    final_itemsets = []
    for itemsets in itemsets_list:
        for itemset in itemsets:
            if len(itemset) > 1:
                final_itemsets.append(list(itemset))
    return final_itemsets


def get_rules(basket, sup_thres=0.4, conf_thres=0.7):

    if len(basket) != 0 and not isinstance(basket[0], set):
        basket = [set(itemset) for itemset in basket]
    products = set()
    for itemset in basket:
        products |= itemset    
    
    itemsets = get_item_sets(basket, products, sup_thres)
    rules = set()  # Use a set to automatically handle duplicates
    
    for itemset in itemsets:
        subsets = list(chain(*[combinations(itemset, i) for i in range(1, len(itemset))]))
        
        for subset in subsets:
            antecedent = set(subset)
            consequent = set(itemset) - antecedent
            
            if not consequent:
                continue

            antecedent_count = sum(1 for b in basket if antecedent.issubset(b))
            joint_count = sum(1 for b in basket if set(itemset).issubset(b))
            
            if antecedent_count > 0:
                confidence = joint_count / antecedent_count
                if confidence >= conf_thres:
                    # Sort to standardize the rule and add as a tuple to the set
                    rule = (tuple(sorted(antecedent)), tuple(sorted(consequent)), confidence)
                    rules.add(rule)
    
    # Convert the set back to a list of lists for the final output
    return [(list(antecedent), list(consequent), confidence) for antecedent, consequent, confidence in rules]


# get_rules(basket, products)

if __name__ == "__main__":
    basket = [
        ["Bread", "Butter", "Milk"],
        ["Bread", "Butter"],
        ["Beer", "Cookies", "Diapers"],
        ["Milk", "Diapers", "Bread", "Butter"],
        ["Beer", "Diapers"]
    ]
    for x,y,z in get_rules(basket):
        print(x, "==>", y, ":", z)