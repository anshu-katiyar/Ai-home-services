
from pprint import pprint

from app.services.recommendation_data_audit import (
    audit_recommendation_data,
)


if __name__ == "__main__":
    report = audit_recommendation_data()
    print("HomeAI Recommendation Data Audit")
    pprint(report)
