import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Favorites from "./components/Favorites";
import WeatherCharts from "./components/WeatherCharts";
import {
  fetchCities,
  addCity,
  removeCity,
  getCurrent,
  getForecast5d,
} from "./api";
import "./index.css";

export default function App() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    loadCities();
  }, []);

  async function loadCities() {
    const cs = await fetchCities();
    setCities(cs);
    const selectedStillExists =
      city && cs.some((c) => c.toLowerCase() === city.toLowerCase());
    if ((!city || !selectedStillExists) && cs?.length) {
      await selectCity(cs[0]);
    } else if (!cs?.length) {
      setCity("");
      setCurrent(null);
      setDays([]);
    }
  }

  async function selectCity(c) {
    setCity(c);
    setLoading(true);
    try {
      const [cur, fc] = await Promise.all([getCurrent(c), getForecast5d(c)]);
      setCurrent(cur);
      setDays(fc);
      setNotice("");
    } catch (e) {
      setNotice(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(q) {
    if (!q) return;
    await selectCity(q);
  }

  async function handleAddFavorite() {
    if (!city) return;
    const cs = await addCity(city);
    setCities(cs);
  }

  async function handleRemoveFavorite(name) {
    const cs = await removeCity(name);
    setCities(cs);

    if (name && city && name.toLowerCase() === city.toLowerCase()) {
      if (cs.length) {
        await selectCity(cs[0]);
      } else {
        setCity("");
        setCurrent(null);
        setDays([]);
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/weather.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-extrabold text-slate-800">
            Weather Dashboard
          </h1>
        </div>
        <button
          onClick={handleAddFavorite}
          className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-md"
          disabled={!city}
        >
          ⭐ Add to Favorites
        </button>
      </header>
      <div className="card p-4 mb-6">
        <SearchBar onSearch={handleSearch} />
        {notice && <div className="mt-3 text-red-600">{notice}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="card p-6 text-slate-600">Loading...</div>
          ) : (
            <CurrentWeather data={current} />
          )}
        </div>
        <Favorites
          items={cities}
          onPick={(c) => selectCity(c)}
          onRemove={(c) => handleRemoveFavorite(c)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Forecast days={days} />
        <WeatherCharts days={days} />
      </div>

      <footer className="mt-8 text-center text-white/80 text-sm">
        Data: Open-Meteo · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
