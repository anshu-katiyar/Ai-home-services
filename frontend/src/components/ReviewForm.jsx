import { useState } from "react";
import { addReview } from "../services/reviewService";

export default function ReviewForm({

    bookingId,
    providerId

}) {

    const [rating, setRating] = useState(5);

    const [review, setReview] = useState("");

    const submitReview = async () => {

        try {

            await addReview({

                booking_id: bookingId,

                provider_id: providerId,

                rating,

                review

            });

            alert("Review Submitted");

            setReview("");

        }

        catch (err) {

            console.log(err);

            alert("Failed");

        }

    };

    return (

        <div className="border rounded-xl p-5 mt-5">

            <h2 className="text-xl font-bold mb-4">

                Rate Service

            </h2>

            <select

                value={rating}

                onChange={(e)=>

                    setRating(Number(e.target.value))

                }

                className="border p-2 rounded"

            >

                <option value="5">⭐⭐⭐⭐⭐</option>

                <option value="4">⭐⭐⭐⭐</option>

                <option value="3">⭐⭐⭐</option>

                <option value="2">⭐⭐</option>

                <option value="1">⭐</option>

            </select>

            <textarea

                className="w-full border p-3 mt-4 rounded"

                placeholder="Write your review..."

                value={review}

                onChange={(e)=>

                    setReview(e.target.value)

                }

            />

            <button

                onClick={submitReview}

                className="bg-blue-600 text-white px-5 py-2 rounded mt-4"

            >

                Submit Review

            </button>

        </div>

    );

}