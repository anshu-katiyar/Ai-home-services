import { useEffect,useState } from "react";

import { getReviews } from "../services/reviewService";

export default function RatingCard({

    providerId

}){

    const[data,setData]=useState(null);

    useEffect(()=>{

        load();

    },[]);

    const load=async()=>{

        const res=await getReviews(providerId);

        setData(res);

    }

    if(!data){

        return null;

    }

    return(

        <div className="border rounded-xl p-4">

            <h2 className="text-2xl">

                ⭐ {data.average_rating}

            </h2>

            <p>

                {data.total_reviews} Reviews

            </p>

        </div>

    )

}