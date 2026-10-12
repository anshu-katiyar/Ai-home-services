
import csv
from pathlib import Path

from app.services.recommendation_dataset import (
    build_recommendation_dataset,
)


OUTPUT_FILE = Path("recommendation_training_data.csv")


def prepare_ranking_data():
    dataset = build_recommendation_dataset()

    training_rows = []
    excluded_rows = 0

    for row in dataset:
        rating = row.get("average_verified_rating")
        review_count = row.get("verified_review_count", 0)

        # Do not invent labels for providers without verified reviews.
        if not review_count or rating is None:
            excluded_rows += 1
            continue

        # Provisional label based on observed verified ratings.
        # This is a weak label, not ground-truth ranking data.
        label = 1 if rating >= 4.0 else 0

        training_rows.append({
            "service_id": row["service_id"],
            "provider_id": row["provider_id"],
            "completed_bookings": row["completed_bookings"],
            "completion_rate": row["completion_rate"],
            "cancellation_rate": row["cancellation_rate"],
            "verified_review_count": review_count,
            "average_verified_rating": rating,
            "ranking_label": label,
        })

    if training_rows:
        with OUTPUT_FILE.open(
            "w",
            newline="",
            encoding="utf-8",
        ) as file:
            writer = csv.DictWriter(
                file,
                fieldnames=training_rows[0].keys(),
            )
            writer.writeheader()
            writer.writerows(training_rows)

        print(f"CSV saved: {OUTPUT_FILE.resolve()}")
    else:
        print("No verified ratings available for labeling.")

    print("Total provider-service rows:", len(dataset))
    print("Rows with provisional labels:", len(training_rows))
    print("Rows excluded due to missing verified ratings:", excluded_rows)

    if training_rows:
        print(
            "Positive labels:",
            sum(row["ranking_label"] == 1 for row in training_rows),
        )
        print(
            "Negative labels:",
            sum(row["ranking_label"] == 0 for row in training_rows),
        )


if __name__ == "__main__":
    prepare_ranking_data()
