'use client'
import { useState, useEffect } from "react";


export default function Quotes(){
    
    const quotes = process.env.NEXT_PUBLIC_QUOTES
    const [quotesData, setQuotesData] = useState()

    async function fetchData() {
        try {
            const res = await fetch(`https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom`, {
                headers: { 'X-Api-Key': 'SLXllypNoDsGjRoKm1lrxS8Oapb3u2LT9ecJYSJN'},
                // contentType: 'application/json',
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
            
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return(
        <div>fetcing quotes</div>
    );
}