from flask import Flask, request, jsonify
from flask_cors import CORS
from weather_app.services.client import WeatherClient
from weather_app.services.store import CityStore, CacheStore
from weather_app.utils.exceptions import NetworkError, StorageError, NotFoundError

app = Flask(__name__)
CORS(app)

cities = CityStore()
cache = CacheStore()
client = WeatherClient(lang="en")

@app.get("/cities")
def get_cities():
    return jsonify(cities.load()), 200

@app.post("/cities")
def add_city():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    favs = cities.load()
    if name and all(c.lower()!=name.lower() for c in favs):
        favs.append(name)
        try:
            cities.save(favs)
        except StorageError as e:
            return jsonify({"error": str(e)}), 500
    return jsonify(favs), 200

@app.delete("/cities")
def remove_city():
    name = (request.args.get("name") or "").strip()
    favs = [c for c in cities.load() if c.lower() != name.lower()]
    try:
        cities.save(favs)
    except StorageError as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(favs), 200

@app.get("/weather")
def get_weather():
    city = request.args.get("city") or ""
    try:
        fc = client.current(city)
        cache.save_snapshot(fc)
        return jsonify(fc.to_dict()), 200
    except NotFoundError as e:
        return jsonify({"error": str(e)}), 404
    except NetworkError as e:
        return jsonify({"error": str(e)}), 502
    except StorageError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
