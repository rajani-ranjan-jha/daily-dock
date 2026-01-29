"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cloud,
  Sun,
  CloudRain,
  Menu,
  X,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { getCurrentOpenWeather, getCurrentOpenWeather2, getLocationFromIPInfo } from "./logics/weather";

// Weather Component
const Weather = () => {
  const weather = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_CONSOLE;
  const [weatherData, setWeatherData] = useState();

  async function fetchData() {
   const IPdata =  await getLocationFromIPInfo();
   const lat = IPdata.loc.split(',')[0]
   const lon =  IPdata.loc.split(',')[1]
   console.log("from IPinfo: ", lat, lon)

   const weather1 = await getCurrentOpenWeather(lat,lon)
   const weather2 = await getCurrentOpenWeather2()

   console.log("from weather1: ", weather1)
   console.log("from weather2: ", weather2)


  }

  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <Card className="w-full backdrop-blur-md bg-white/10 border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="text-yellow-300" size={24} />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-4xl font-bold">24°C</div>
          <div className="text-white/80">Sunny</div>
          <div className="text-sm text-white/60">Kolkata, West Bengal</div>
          <div className="flex gap-4 mt-4 text-sm">
            <div>
              <div className="text-white/60">High</div>
              <div className="font-semibold">28°C</div>
            </div>
            <div>
              <div className="text-white/60">Low</div>
              <div className="font-semibold">20°C</div>
            </div>
            <div>
              <div className="text-white/60">Humidity</div>
              <div className="font-semibold">65%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather;
