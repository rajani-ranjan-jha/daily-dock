'use client'
import { useState, useEffect } from "react";


export default function Weather(){
    
    const weather = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_CONSOLE
    const [weatherData, setWeatherData] = useState()

    async function fetchData() {
        try {
            const res = await fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=${weather}&location.latitude=37.4220&location.longitude=-122.0841`)
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
        <div>fetcing weather</div>
    );
}