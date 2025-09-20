import React from "react";
import {WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog} from "react-icons/wi";
import {LuShirt, LuSnowflake, LuSun} from "react-icons/lu";
import { GiClothes } from "react-icons/gi";

export function WeatherIcon({codeHint = "clear", className = "text-5xl"}) {
    const map = {
        clear: <WiDaySunny className={className}/>,
        cloud: <WiCloudy className={className}/>,
        rain: <WiRain className={className}/>,
        snow: <WiSnow className={className}/>,
        fog: <WiFog className={className}/>
    };
    return map[codeHint] || map.clear;
}

export function OutfitIcon({ tempC }) {
    if (tempC <= 5) {
        return (
            <div className="flex items-center gap-2">
                <LuSnowflake className="text-3xl text-blue-500" title="Heavy Coat" />
            </div>
        );
    }
    if (tempC <= 15) {
        return (
            <div className="flex items-center gap-2">
                <GiClothes className="text-3xl text-indigo-500" title="Light Jacket" />
            </div>
        );
    }
    if (tempC <= 25) {
        return (
            <div className="flex items-center gap-2">
                <LuShirt className="text-3xl text-emerald-500" title="T-Shirt" />
            </div>
        );
    }
    return (
        <div className="flex items-center gap-2">
            <LuShirt className="text-3xl text-yellow-500" title="Summer Clothes" />
        </div>
    );
}
export function rainHint(p) {
    if (!p || p < 1) return "Low chance of rain";
    if (p < 5) return "Light rain possible";
    return "Bring an umbrella";
}

export function codeFrom(tmax, precip) {
    if (precip > 1) return "rain";
    if (tmax <= 2) return "snow";
    return "clear";
}
