"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain } from "lucide-react";

// Mock weather data
const weatherData = {
  location: "Green Valley, CA",
  temperature: 72,
  unit: "°F",
  condition: "Sunny",
  forecast: [
    { day: "Mon", temp: 75, icon: <Sun className="w-6 h-6 text-yellow-500" /> },
    { day: "Tue", temp: 70, icon: <Cloud className="w-6 h-6 text-gray-400" /> },
    { day: "Wed", temp: 68, icon: <CloudRain className="w-6 h-6 text-blue-400" /> },
    { day: "Thu", temp: 73, icon: <Sun className="w-6 h-6 text-yellow-500" /> },
  ],
};

const CurrentWeatherIcon = () => {
  switch (weatherData.condition) {
    case "Sunny":
      return <Sun className="w-16 h-16 text-yellow-400" />;
    case "Cloudy":
      return <Cloud className="w-16 h-16 text-gray-500" />;
    case "Rainy":
      return <CloudRain className="w-16 h-16 text-blue-500" />;
    default:
      return <Sun className="w-16 h-16 text-yellow-400" />;
  }
};

export function WeatherWidget() {
  return (
    <Card className="w-full max-w-md shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div>
            <p className="text-lg text-muted-foreground">{weatherData.location}</p>
            <p className="text-6xl font-bold text-foreground">
              {weatherData.temperature}
              {weatherData.unit}
            </p>
            <p className="text-lg text-primary">{weatherData.condition}</p>
          </div>
          <div>
            <CurrentWeatherIcon />
          </div>
        </div>
        <div>
          <h4 className="font-headline mb-2">4-Day Forecast</h4>
          <div className="flex justify-between text-center">
            {weatherData.forecast.map((day) => (
              <div key={day.day} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-secondary transition-colors">
                <p className="font-semibold text-muted-foreground">{day.day}</p>
                {day.icon}
                <p className="font-bold text-foreground">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
