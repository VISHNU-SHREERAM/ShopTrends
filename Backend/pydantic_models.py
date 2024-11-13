from pydantic import BaseModel
from typing import List, Literal


class ConsequentRequest(BaseModel):
    antecedents: List[str]
    min_support: float = 0.001
    min_lift: float = 1
    order: Literal["dsc", "asc"] = "dsc"
    top_k: int = 1

class RulesRequest(BaseModel):
    min_support: float = 0.1
    min_lift: float = 1
    order: Literal["dsc", "asc"] = "dsc"
    top_k: int = 3

class ItemsetRequest(BaseModel):
    min_support: float = 0.1
    order: Literal["dsc", "asc"] = "dsc"
    top_k: int = 3