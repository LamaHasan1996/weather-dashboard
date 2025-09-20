import dayjs from "dayjs";
import React from "react";
import {WeatherIcon, codeFrom, rainHint} from "../icons";

export default function Forecast({days}) {
    if (!days?.length) return null;
    return (
        <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 text-slate-800">5-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {days.map((d, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl shadow text-center hover:shadow-md transition">
                        <div className="text-sm text-slate-500">{dayjs(d.date).format("ddd, MMM D")}</div>
                        <WeatherIcon codeHint={codeFrom(d.tmax, d.precip)} className="text-4xl my-2"/>
                        <div className="text-xs font-semibold text-slate-800">{Math.round(d.tmax)}° / {Math.round(d.tmin)}°
                        </div>
                        <div className="text-xs text-slate-500">{rainHint(d.precip)}</div>
                    </div>
                ))}
            </div>
        </div>

    );
}
