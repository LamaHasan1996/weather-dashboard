import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export default function WeatherCharts({ days }){
  if(!days?.length) return null;
  const data=days.map(d=>({date:d.date.slice(5), tmax:d.tmax, tmin:d.tmin}));
  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-3">Temperature Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{top:10,right:20,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="tmax" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="tmin" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
