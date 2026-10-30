import { CloudSun, Search } from "lucide-react";
import { useState } from "react";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("Searching for...", city);

    if(city.trim() === "") {
      console.error("City name is empty");
      return;
    }
    getCityCoordinates(city);
  };

  const getCityCoordinates = (cityName) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch city data");
      }

      return res.json();
    })
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
      }

      return data.results[0];
    })
    .then((cityData) => {
      console.log("City details:", cityData);
      console.log("City name:", cityData.name);
      console.log("Latitude:", cityData.latitude);
      console.log("Longitude:", cityData.longitude);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};
  getCityCoordinates("Indore");

  return (
    <div className="bg-blue-950 p-4 min-h-screen text-white">
      <div className="flex gap-2">
        <CloudSun className="w-12 h-12 border rounded-full p-2" />

        <div>
          <h2 className="text-lg font-bold">Weather Dashboard</h2>
          <p className="text-sm text-gray-400">
            Get the latest weather updates for your location.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 gap-2 border border-gray-600 rounded-md p-1">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          className="focus:outline-none text-gray-400 w-full"
          placeholder="Enter your city"
        />
        <button
          className="text-gray-500 bg-gray-300 p-1 rounded-md"
          onClick={handleSearch}
        >
          <Search strokeWidth={1.25} size={20} />
        </button>
      </div>

      <div className="flex flex-col justify-center items-start gap-2 border-gray-600 mt-4 border rounded-md p-2 shadow-md">
        <span>City:</span>
        <span>Temperature:</span>
        <span>Condition:</span>
      </div>

      <div className="grid grid-cols-2 justify-evenly items-center gap-2 mt-4 border border-gray-600 rounded-md p-1">
        <span className="border w-full rounded-xl p-1 text-center border-gray-600">
          Humidity:
        </span>
        <span className="border w-full rounded-xl p-1 text-center border-gray-600">
          Wind Speed:
        </span>
      </div>
    </div>
  );
}
