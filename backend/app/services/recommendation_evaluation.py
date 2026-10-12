
def evaluate_ranking(recommendations):
    """
    Descriptive evaluation of recommendation output.
    These diagnostics are not ML accuracy metrics.
    """

    scores = [
        item["recommendation_score"]
        for item in recommendations
    ]

    return {
        "providers_recommended": len(recommendations),
        "scores_in_descending_order": (
            scores == sorted(scores, reverse=True)
        ),
        "providers_with_verified_reviews": sum(
            1 for item in recommendations
            if item.get("verified_reviews_used", 0) > 0
        ),
        "average_recommendation_score": round(
            sum(scores) / len(scores), 2
        ) if scores else 0
    }
