import dayjs from "dayjs";
import React from "react";
import { WeatherIcon, OutfitIcon } from "../icons";

export default function CurrentWeather({ data }) {
  if (!data) return null;
  const { city, temp_c, wind_kmh, time_utc, humidity } = data;
  const codeHint =
    humidity && humidity > 85 ? "rain" : temp_c < 5 ? "snow" : "clear";
  return (
    <div className="min-h-[222px] card p-6 flex items-center justify-between gap-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{city}</h2>
        <p className="text-slate-500">
          {dayjs(time_utc).format("dddd, MMM D • HH:mm")}
        </p>
        <div className="mt-4 flex items-center gap-8">
          <div className="text-6xl font-extrabold text-slate-800">
            {Math.round(temp_c)}°C
          </div>
          <div className="flex flex-col text-slate-600 text-sm gap-1">
            <span>💨 Wind: {wind_kmh ?? "-"} km/h</span>
            {humidity != null && <span>💧 Humidity: {humidity}%</span>}
          </div>
        </div>
        <div className="mt-3">
          <OutfitIcon tempC={temp_c} />
        </div>
      </div>
      <WeatherIcon codeHint={codeHint} className="text-7xl text-brand-500" />
    </div>
  );
}
