
import { useEffect, useState } from "react";
import { getReviews } from "../services/reviewService";

export default function RatingCard({ providerId, bookingId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;

        const loadReviews = async () => {
            if (!providerId) {
                setData(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(false);

            try {
                const result = await getReviews(providerId);

                if (active) {
                    setData(result);
                }
            } catch (err) {
                console.error("Unable to load reviews:", err);

                if (active) {
                    setError(true);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadReviews();

        return () => {
            active = false;
        };
    }, [providerId]);

    if (loading) {
        return (
            <div className="my-3 rounded-lg border border-gray-200 p-4 text-sm text-gray-500">
                Loading reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                Unable to load reviews.
            </div>
        );
    }

    if (!data) {
        return null;
    }

    // Top of dashboard: overall provider rating
    if (!bookingId) {
        return (
            <div className="my-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl font-bold text-gray-900">
                        {Number(data.average_rating || 0).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-600">
                        / 5
                    </span>
                </div>

                <p className="mt-1 text-sm text-gray-600">
                    {data.total_reviews || 0} customer reviews
                </p>
            </div>
        );
    }

    // Inside a booking: only reviews for that booking
    const matchingReviews = (data.reviews || []).filter(
        (item) =>
            String(item.booking_id) === String(bookingId)
    );

    if (matchingReviews.length === 0) {
        return (
            <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-800">
                    Customer Feedback
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    No review for this booking yet.
                </p>
            </div>
        );
    }

    return (
        <div className="my-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="mb-3 font-bold text-gray-900">
                ⭐ Customer Rating & Feedback
            </h3>

            {matchingReviews.map((item) => (
                <div
                    key={item.id || `${item.booking_id}-${item.customer_email}`}
                    className="rounded-lg bg-white p-4"
                >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-semibold text-gray-900">
                            {item.customer_email || "HomeAI Customer"}
                        </div>

                        <div className="font-bold text-amber-600">
                            {"★".repeat(
                                Math.max(
                                    0,
                                    Math.min(5, Number(item.rating) || 0)
                                )
                            )}
                            <span className="ml-2 text-gray-700">
                                {item.rating}/5
                            </span>
                        </div>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                        {item.review || "No written feedback provided."}
                    </p>
                </div>
            ))}
        </div>
    );
}
