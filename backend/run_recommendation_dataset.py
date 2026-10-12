
from pprint import pprint

from app.services.recommendation_dataset import (
    build_recommendation_dataset,
)


if __name__ == "__main__":
    dataset = build_recommendation_dataset()

    print("HomeAI Recommendation Dataset")
    print("Total provider-service rows:", len(dataset))
    pprint(dataset)
